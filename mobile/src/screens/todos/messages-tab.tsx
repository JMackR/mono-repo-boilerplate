import React, { FC, useContext } from "react"
// import { AlertType, InboxDataContext } from "shared-lib/providers/todos"
import {
  BingAd,
  Alert,
  translate,
  GraphGQLErrorParser,
  AnalyticsActionType,
  AnalyticsAds,
  AdScreenName,
  BING_AD_TYPE_NAME,
  ALERT_TYPE_NAME,
  MARK_THREAD_AS_READ,
} from "shared-lib"
import { useMutation } from "@apollo/react-hooks"
import { ApolloError } from "apollo-client"
import {
  Center,
  EmptyState,
  ErrorBearFailure,
  ActivityIndicator,
  BingInboxAdRowProps,
  BingInboxAdRow,
  InboxRow,
  NotificationOutline,
  Margin,
} from "uc-lib"
import { InboxRowProps } from "uc-lib/widgets/inbox-row/inbox-row.props.native"
import { AnalyticsInbox, EMPTY_STATE } from "shared-lib/analytics/analytics-inbox"
import { OpenURL } from "../../utilities"
import { CommonNavs } from "../../navigation/navigation"
import { isEmpty, toString } from "lodash"
import { StockPTRList } from "../../widgets"

export interface MessagesTabProps {
  messagesAndAds?: (Alert | BingAd)[]
  loading: boolean
  error: ApolloError | undefined
  refetch: () => Promise<any>
  archiveMessages: (alertIds: string[]) => void
  trackAdImpression: (ouAdId: string, impressionFeedbackUrl: string) => void
}

const EMPTY_MESSAGES_ICON_WIDTH = 48
const EMPTY_MESSAGES_ICON_HEIGHT = 48

const trackAdTileEvent = (feedItem: BingAd, actionType: AnalyticsActionType) => {
  const {
    ouAdId: adId,
    adExperimentId: experimentId,
    adRequestId,
    adNetwork,
    experimentDataHash,
    searchId,
  } = feedItem as BingAd
  AnalyticsAds.trackTile({
    screenName: AdScreenName.Inbox,
    actionType,
    adId,
    adNetwork,
    adRequestId,
    experimentId,
    experimentDataHash: experimentDataHash || undefined,
    searchId,
  })
}

export const MessagesTab: FC = () => {
  const testId = "todos-screen.messages-tab"
  const {
    inbox,
    inboxLoading: loading,
    inboxError: error,
    refetchInboxRef: refetch,
    archiveMessagesRef,
    trackAdImpression,
    clearUnseenInboxCount,
  } = useContext(InboxDataContext)
  const messagesAndAds = inbox?.alertsWithAds?.alertsWithAds
  const [markThreadAsRead] = useMutation(MARK_THREAD_AS_READ)

  const visibiltyChanged = (visible: boolean, item: Alert | BingAd, _index: number) => {
    if (visible && item) {
      if (item.__typename === BING_AD_TYPE_NAME) {
        const ad = item as BingAd
        trackAdImpression && trackAdImpression(ad.ouAdId, ad.impressionFeedbackUrl)
        trackAdTileEvent(ad, AnalyticsActionType.Show)
      } else if (item.__typename === ALERT_TYPE_NAME) {
        AnalyticsInbox.trackInboxUIEvent(AlertType.MESSAGE, AnalyticsActionType.Show, item.objectId, item.type)
      }
    }
  }

  const archiveDiscussion = React.useCallback((id: string, objectId: string, type: string) => {
    AnalyticsInbox.trackInboxUIEvent(AlertType.MESSAGE, AnalyticsActionType.Delete, objectId, type)
    archiveMessagesRef?.current([id])
  }, [])

  const openDiscussion = React.useCallback((id: string, objectId: string, type: string, read: boolean) => {
    if (!read) {
      markThreadAsRead({ variables: { id } }).then(() => {
        return refetch.current()
      })
    }
    AnalyticsInbox.trackInboxUIEvent(AlertType.MESSAGE, AnalyticsActionType.Click, objectId, type)
    CommonNavs.navigateToChat({ discussionId: objectId })
  }, [])

  const onPressAd = React.useCallback((bingAd: BingAd) => {
    trackAdTileEvent(bingAd, AnalyticsActionType.Click)
    OpenURL.openInExternalBrowser(bingAd.contentUrl)
  }, [])

  const renderRow = (item: Alert | BingAd, index: number) => {
    if (item.__typename === BING_AD_TYPE_NAME) {
      return renderBingInboxAdRow(item, index)
    } else {
      return renderMessageRow(item as Alert, index)
    }
  }

  const renderBingInboxAdRow = (bingAd: BingAd, index: number) => {
    const bingAdProps: BingInboxAdRowProps = {
      testID: testId + "." + index,
      onPress: onPressAd,
      bingAd,
    }

    return <BingInboxAdRow {...bingAdProps} />
  }

  const renderMessageRow = (message: Alert, index: number) => {
    const secondaryImage = (message.contentThumbnails.length > 0 && message.contentThumbnails[0]) || undefined
    const read = message.read

    const messageRowProps: InboxRowProps = {
      id: message.id,
      objectId: message.objectId,
      type: message.type,
      read,
      avatar: message.sender?.profile?.avatars?.squareImage,
      isTruyouVerified: message.sender?.profile?.isTruyouVerified || false,
      isAutosDealer: message.sender?.profile?.isAutosDealer || false,
      title: (message.title && message.title.trim()) || "",
      notificationText: (message.notificationText && message.notificationText.trim()) || "",
      dateAdded: message.dateAdded,
      secondaryImage,
      visualTags: message.visualTags,
      archiveMessage: archiveDiscussion,
      handleClick: openDiscussion,
      testID: testId + "." + index,
      allowSwipeActions: true,
    }
    return <InboxRow {...messageRowProps} />
  }

  const keyExtractor = (item: Alert | BingAd, index: number) => {
    if (item.__typename === BING_AD_TYPE_NAME) {
      return toString(item.ouAdId)
    } else if (item.__typename === ALERT_TYPE_NAME) {
      return toString(item.id)
    } else {
      // shouldn't happen, but warnings complain if there isn't a fall through return
      return toString(index)
    }
  }

  const refreshHandler = async (): Promise<void> => {
    const result = await refetch.current()
    if (result.errors) {
      return new Promise<void>((_resolve, reject) => reject())
    } else {
      clearUnseenInboxCount()
      return new Promise<void>((resolve, _reject) => resolve())
    }
  }

  if (!messagesAndAds || loading) {
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
  } else if (isEmpty(messagesAndAds)) {
    AnalyticsInbox.trackInboxUIEvent(AlertType.MESSAGE, AnalyticsActionType.Show, EMPTY_STATE)
    return (
      <Margin marginTopStep={20}>
        <EmptyState
          icon={NotificationOutline}
          iconSize={{ width: EMPTY_MESSAGES_ICON_WIDTH, height: EMPTY_MESSAGES_ICON_HEIGHT }}
          title={translate("todos-screen.empty-alerts-title")}
          subtitle={translate("todos-screen.empty-alerts-subtitle")}
          testID={testId + ".empty-alerts"}
        />
      </Margin>
    )
  } else {
    return (
      <StockPTRList
        data={messagesAndAds}
        keyExtractor={keyExtractor}
        onVisibilityChange={visibiltyChanged}
        renderItem={renderRow}
        showSeparator={true}
        leadingRefreshHandler={refreshHandler}
        testID="inbox-screen.pull-to-refresh"
      />
    )
  }
}
