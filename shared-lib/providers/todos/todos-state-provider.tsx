import _, { setWith } from "lodash"
import React, { createContext, FC, useContext, useEffect, useState } from "react"
import { useAuth } from ".."
import { StorageController, TODOS_DRAFT_MESSAGE_STORAGE_KEY } from "../../utilities/storage"
import { Uploadable, PhotoUploadContext } from "../../network/photo-upload-provider"

interface DraftMessageData {
  [discussionId: string]: string
}

export enum AlertType {
  MESSAGE,
  NOTIFICATION,
}

export interface TodosDataContextProps {
  inbox?: Query
  notifications?: Query
  draftMessage: DraftMessageData
  notificationsLoading: boolean
  notificationsError: ApolloError | undefined
  refetchNotification: () => Promise<any>
  refetchNotificationRef?: React.MutableRefObject<() => Promise<any>>
  inboxLoading: boolean
  inboxError: ApolloError | undefined
  refetchInbox: () => Promise<any>
  refetchInboxRef?: React.MutableRefObject<() => Promise<any>>
  setDraftMessage: (discussionId: string) => (value?: string) => void
  sendImageMessage: (discussionId: string, image: Uploadable) => Promise<void>
  archiveMessages: (alertIds: string[]) => void
  /**
   * A reference to archiveMessages function which is always up-to-date. For advanced useCallback usage.
   */
  archiveMessagesRef?: React.MutableRefObject<(alertIds: string[]) => void>
  archiveNotifications: (alertIds: string[]) => void
  /**
   * A reference to archiveNotifications function which is always up-to-date. For advanced useCallback usage.
   */
  archiveNotificationsRef?: React.MutableRefObject<(alertIds: string[]) => void>
  trackAdImpression: (ouAdId: string, impressionFeedbackUrl: string) => void
  unseenAlertCount?: UnseenAlertCount
  clearUnseenInboxCount: () => void
  clearUnseenNotificationsCount: () => void
  refetchUnseenAlertCount: () => Promise<any>
}

export const TodosDataContext = createContext<TodosDataContextProps>({
  draftMessage: {},
  inboxLoading: false,
  inboxError: undefined,
  refetchInbox: async () => {},
  notificationsLoading: false,
  notificationsError: undefined,
  refetchNotification: async () => {},
  setDraftMessage: (_discussionId: string) => (_value?: string) => {},
  sendImageMessage: async (_discussionId: string, _image: Uploadable) => {},
  archiveMessages: (_alertId: string[]) => {},
  archiveNotifications: (_alertId: string[]) => {},
  trackAdImpression: (_ouAdId: string, _impressionFeedbackUrl: string) => {},
  clearUnseenInboxCount: () => {},
  clearUnseenNotificationsCount: () => {},
  refetchUnseenAlertCount: async () => {},
})

export const TodosDataProvider: FC = ({ children }) => {
  const auth = useAuth()
  const [
    fetchNotifications,
    { data: notifications, loading: notificationsLoading, refetch: _refetchNotification, error: notificationsError },
  ] = useLazyQuery<Query>(NOTIFICATIONS_QUERY, {
    fetchPolicy: "network-only",
  })
  const [archiveAlerts] = useMutation(ARCHIVE_ALERTS)
  const [draftMessage, setDraft] = useState<DraftMessageData>({})
  const [sendMessage] = useMutation(SEND_MESSAGE)
  const [trackedAds] = useState<Set<string>>(new Set<string>())
  const [fetchInbox, { data: inbox, loading: inboxLoading, refetch: _refetchInbox, error: inboxError }] = useLazyQuery<
    Query
  >(INBOX_WITH_ADS_QUERY, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      trackedAds.clear()
    },
  })
  const [fetchUnseenNotifications, { data: unseenAlertCount, refetch: refetchUnseenAlertCount }] = useLazyQuery<Query>(
    UNSEEN_NOTIFICATION_CNT_QUERY,
    {
      fetchPolicy: "network-only",
    },
  )
  const { uploadPhotos } = useContext(PhotoUploadContext)
  const [initialClearInbox] = useMutation(CLEAR_UNSEEN_INBOX_CNT)
  const [initialClearNotifications] = useMutation(CLEAR_UNSEEN_NOTIFICATIONS_CNT)
  const trackAdImpression = useAdTracking()

  const loadDraftFromDisk = async () => {
    StorageController<DraftMessageData>(TODOS_DRAFT_MESSAGE_STORAGE_KEY)
      .getItem()
      .then(draftFromDisk => {
        setDraft(draftFromDisk || {})
      })
  }

  const sendImageMessage = async (discussionId: string, image: Uploadable) => {
    const photoUuids = await uploadPhotos([image])

    await sendMessage({
      variables: {
        discussionId,
        photoUuids,
      },
    })
  }
  useEffect(() => {
    loadDraftFromDisk()
  }, [])

  useEffect(() => {
    if (auth.isAuthed) {
      fetchNotifications()
      fetchInbox()
      fetchUnseenNotifications()
    }
  }, [auth.isAuthed])

  useEffect(() => {
    StorageController<DraftMessageData>(TODOS_DRAFT_MESSAGE_STORAGE_KEY).setItem(draftMessage)
  }, [draftMessage])

  const setDraftMessage = (discussionId: string) => {
    return (value?: string) => {
      setDraft(draft => setWith({ ...draft }, `${discussionId}`, value))
    }
  }

  const archiveMessage = async (alertIds: string[]) => {
    const matches = (element: Alert | BingAd) => {
      if (element.__typename === "BingAd") {
        return false
      }
      const alert = element as Alert
      return alertIds.includes(alert.id)
    }

    _.remove(inbox?.alertsWithAds.alertsWithAds || [], matches)
    await archiveAlert(alertIds)
  }

  const archiveNotification = async (alertIds: string[]) => {
    _.remove(notifications?.alerts.alerts || [], (notification: Alert) => {
      return alertIds.includes(notification.id)
    })
    await archiveAlert(alertIds)
  }

  const archiveAlert = async (alertIds: string[]) => {
    try {
      await archiveAlerts({ variables: { alertIds } })
    } catch (error) {
      // TO-DO extract to each platform
      // CommonNavs.presentError({ error })
    }
  }

  const clearUnseenInboxCount = async () => {
    await initialClearInbox()
      .then(() => {
        refetchUnseenAlertCount()
      })
      .catch(() => {})
  }

  const clearUnseenNotificationsCount = async () => {
    await initialClearNotifications()
      .then(() => {
        refetchUnseenAlertCount()
      })
      .catch(() => {})
  }

  const refetchInbox = async () => {
    refetchUnseenAlertCount()
    return _refetchInbox()
  }

  const refetchNotification = async () => {
    refetchUnseenAlertCount()
    return _refetchNotification()
  }

  const refetchTodosRefFunc = React.useRef(refetchInbox)
  refetchTodosRefFunc.current = refetchInbox

  const refetchNotificationsRefFunc = React.useRef(refetchNotification)
  refetchNotificationsRefFunc.current = refetchNotification

  const archiveMessgesRefFunc = React.useRef(archiveMessage)
  archiveMessgesRefFunc.current = archiveMessage // make sure ref is up-to-date

  const archiveNotificationsRefFunc = React.useRef(archiveNotification)
  archiveNotificationsRefFunc.current = archiveNotification // make sure ref is up-to-date
  return (
    <TodosDataContext.Provider
      value={
        {
          // draftMessage,
          // setDraftMessage,
          // inbox,
          // notifications,
          // inboxLoading,
          // inboxError,
          // refetchInbox,
          // refetchInboxRef: refetchTodosRefFunc,
          // notificationsLoading,
          // notificationsError,
          // refetchNotification,
          // refetchNotificationRef: refetchNotificationsRefFunc,
          // sendImageMessage,
          // archiveMessages: archiveMessage,
          // archiveMessagesRef: archiveMessgesRefFunc,
          // archiveNotificationsRef: archiveNotificationsRefFunc,
          // trackAdImpression,
          // unseenAlertCount: unseenAlertCount?.unseenNotificationCount,
          // clearUnseenInboxCount,
          // clearUnseenNotificationsCount,
          // refetchUnseenAlertCount,
        }
      }
    >
      {children}
    </TodosDataContext.Provider>
  )
}
