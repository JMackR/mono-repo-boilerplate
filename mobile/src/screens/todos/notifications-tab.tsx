import React, { FC, useContext } from "react"
import { ApolloError } from "apollo-client"
import { ActivityIndicator, Center, EmptyState, ErrorBearFailure, Margin, NotificationOutline } from "uc-lib"
import { Alert, GraphGQLErrorParser, translate, AnalyticsActionType, MARK_THREAD_AS_READ } from "shared-lib"
import { useMutation } from "@apollo/react-hooks"
// import { AlertType, InboxDataContext } from "shared-lib/providers/todos"
import { AnalyticsInbox, EMPTY_STATE } from "shared-lib/analytics/analytics-inbox"
import { isEmpty } from "lodash"
import { Navigation } from "../../navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator"
import { NotificationRowProps } from "uc-lib/widgets/notification-row/notification-row.props.native"
import { NotificationRow } from "uc-lib/widgets/notification-row/notification-row"
import { StockPTRList } from "../../widgets"

const RATING_NOTIFICATION_TYPE = "rating_invitation"

export interface NotificationsTabProps {
  notifications?: Alert[]
  loading: boolean
  error: ApolloError | undefined
  refetch: () => Promise<any>
  archiveNotifications: (alertIds: string[]) => void
}

const EMPTY_MESSAGES_ICON_WIDTH = 48
const EMPTY_MESSAGES_ICON_HEIGHT = 48

export const NotificationsTab: FC = () => {
  const {
    notifications: data,
    notificationsLoading: loading,
    notificationsError: error,
    refetchNotificationRef: refetch,
    archiveNotificationsRef,
    clearUnseenNotificationsCount,
  } = useContext(InboxDataContext)
  const notifications = data?.alerts.alerts
  const testId = "todos-screen.notifications-tab"

  const onVisibilityChanged = (visible: boolean, item: Alert) => {
    if (visible && item) {
      AnalyticsInbox.trackInboxUIEvent(AlertType.NOTIFICATION, AnalyticsActionType.Show, item.objectId, item.type)
    }
  }

  const archiveNotification = React.useCallback((id: string, objectId: string, type: string) => {
    AnalyticsInbox.trackInboxUIEvent(AlertType.MESSAGE, AnalyticsActionType.Delete, objectId, type)
    archiveNotificationsRef?.current([id])
  }, [])

  const openNotification = React.useCallback(
    (id: string, objectId: string, type: string, read: boolean, actionPath?: string) => {
      if (!read) {
        markThreadAsRead({ variables: { id } }).then(() => {
          return refetch.current()
        })
      }
      AnalyticsInbox.trackInboxUIEvent(AlertType.NOTIFICATION, AnalyticsActionType.Click, objectId, type)
      if (type === RATING_NOTIFICATION_TYPE) {
        Navigation.navigateToRoute(NavigableRoute.RateUser, { listingId: objectId })
      } else if (actionPath) {
        Navigation.navigateToActionPath(actionPath)
      }
    },
    [],
  )

  const renderRow = (notification: Alert, index: number) => {
    const read = notification.read

    const notificationRowProps: NotificationRowProps = {
      read,
      avatar: notification.displayAvatar,
      title: notification.notificationText?.trim() || "",
      dateAdded: notification.dateAdded,
      archiveNotification,
      handleClick: openNotification,
      secondaryImage: (notification.contentThumbnails.length > 0 && notification.contentThumbnails[0]) || undefined,
      testId: testId + "." + index,
      id: notification.id,
      actionPath: notification.actionPath || undefined,
      objectId: notification.objectId,
      type: notification.type,
    }
    return <NotificationRow {...notificationRowProps} />
  }

  const keyExtractor = (item: Alert, index: number) => {
    return item.id
  }

  const refreshHandler = async (): Promise<void> => {
    const result = await refetch.current()
    if (result.errors) {
      return new Promise<void>((_resolve, reject) => reject())
    } else {
      clearUnseenNotificationsCount()
      return new Promise<void>((resolve, _reject) => resolve())
    }
  }

  const [markThreadAsRead] = useMutation(MARK_THREAD_AS_READ)
  if (loading) {
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    )
  } else if (error) {
    const { title, message } = GraphGQLErrorParser(error)
    return (
      <Center>
        <EmptyState
          icon={ErrorBearFailure}
          title={title}
          subtitle={message}
          buttonTitle={translate("common-errors.server-error.button-title")}
          buttonHandler={refetch.current}
          testID="inbox-screen.error-state"
        />
      </Center>
    )
  } else if (isEmpty(notifications)) {
    AnalyticsInbox.trackInboxUIEvent(AlertType.NOTIFICATION, AnalyticsActionType.Show, EMPTY_STATE)
    return (
      <Margin marginTopStep={20}>
        <EmptyState
          icon={NotificationOutline}
          iconSize={{ width: EMPTY_MESSAGES_ICON_WIDTH, height: EMPTY_MESSAGES_ICON_HEIGHT }}
          title={translate("todos-screen.empty-notifications-title")}
          subtitle={translate("todos-screen.empty-notifications-subtitle")}
          testID={testId + ".empty-alerts"}
        />
      </Margin>
    )
  } else {
    return (
      <StockPTRList
        data={notifications}
        keyExtractor={keyExtractor}
        onVisibilityChange={onVisibilityChanged}
        renderItem={renderRow}
        showSeparator={true}
        leadingRefreshHandler={refreshHandler}
        testID="inbox-screen.pull-to-refresh"
      />
    )
  }
}
