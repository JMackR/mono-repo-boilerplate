import React, { FC, useContext } from "react"
import { InboxDataContext, AlertType } from "../../providers/todos"
import _ from "lodash"
import {
  Margin,
  Spacer,
  EmptyState,
  EmailEnvelope,
  Flex,
  Button,
  Separator,
  List,
  InboxRow,
  InboxRowProps,
  BingInboxAdRow,
  BingInboxAdRowProps,
  useSelectable,
  ActivityIndicator,
  Center,
  ErrorBearFailure,
} from "uc-lib"
import { BING_AD_TYPE_NAME, ALERT_TYPE_NAME } from "../../utilities"
import { AnalyticsInbox, EMPTY_STATE } from "../../analytics/analytics-inbox"
import { AnalyticsActionType } from "../../analytics"
import { GraphGQLErrorParser } from "../../network"
import { translate } from "../../utilities/i18n"
import { toString } from "lodash"

export const InboxMessages: FC<{
  onMessageSelect: (item: Alert | BingAd) => void
  editing: boolean
}> = ({ onMessageSelect, editing }) => {
  const { inbox, inboxError, refetchInbox, trackAdImpression, archiveMessages } = useContext(InboxDataContext)
  const data = inbox?.alertsWithAds.alertsWithAds
  const { selected } = useSelectable()

  if (inboxError) {
    const { title, message } = GraphGQLErrorParser(inboxError)
    return (
      <Center>
        <EmptyState
          icon={ErrorBearFailure}
          title={title}
          subtitle={message}
          buttonTitle={translate("common-errors.server-error.button-title")}
          buttonHandler={refetchInbox}
          testID="inbox-screen.error-state"
        />
      </Center>
    )
  } else if (!data) {
    return <ActivityIndicator />
  } else if (_.isEmpty(data)) {
    AnalyticsInbox.trackInboxUIEvent(AlertType.MESSAGE, AnalyticsActionType.Show, EMPTY_STATE)
    return (
      <Margin crossAxisDistribution="center" direction="column" axisDistribution="center" marginStep={4}>
        <Spacer direction="column" sizeStep={12} />
        <EmptyState
          title={translate("todos-screen.empty-alerts-title")}
          subtitle={translate("todos-screen.empty-alerts-subtitle")}
          icon={EmailEnvelope}
          iconTint="brand"
        />
      </Margin>
    )
  }
  const onDeleteClick = () => {
    selected?.forEach(id => {
      AnalyticsInbox.trackInboxUIEvent(AlertType.MESSAGE, AnalyticsActionType.Delete, id)
    })
    archiveMessages(selected)
  }
  const renderRow = (item: Alert | BingAd) => {
    if (item.__typename === BING_AD_TYPE_NAME) {
      return renderBingAd(item as BingAd)
    } else {
      return renderMessageRow(item as Alert)
    }
  }

  const renderBingAd = (bingAd: BingAd) => {
    const bingAdProps: BingInboxAdRowProps = {
      title: bingAd.itemName,
      image: bingAd.imageUrl,
      sellerName: bingAd.sellerName,
      highPrice: _.toNumber(bingAd.price),
      lowPrice: bingAd.lowPrice || undefined,
      contentUrl: bingAd.contentUrl,
    }
    return <BingInboxAdRow {...bingAdProps} />
  }

  const renderMessageRow = (alert: Alert) => {
    const handleClick = () => {
      onMessageSelect(alert)
    }

    let secondaryImage: string | undefined
    if (alert.contentThumbnails && alert.contentThumbnails.length > 0) {
      secondaryImage = alert.contentThumbnails[0]
    }

    // For alerts with no title (aka the notification tab), we want to body to show as the title
    const title = alert.title || alert.notificationText
    const body = alert.title ? alert.notificationText : null

    const inboxRowProps: InboxRowProps = {
      read: alert.read || alert.seen,
      avatar: alert.sender?.profile?.avatars.squareImage,
      isTruyouVerified: alert.sender?.profile?.isTruyouVerified || false,
      isAutosDealer: alert.sender?.profile?.isAutosDealer || false,
      title: title?.trim() || "",
      notificationText: body?.trim() || "",
      dateAdded: alert.dateAdded,
      visualTags: alert.visualTags,
      secondaryImage,
      handleClick,
      editing,
      selectId: alert.id,
    }

    return <InboxRow {...inboxRowProps} />
  }

  const onVisibiltyChange = (visible: boolean, item: Alert | BingAd) => {
    if (visible && item) {
      if (item.__typename === BING_AD_TYPE_NAME) {
        const ad = item as BingAd
        trackAdImpression && trackAdImpression(ad.ouAdId, ad.impressionFeedbackUrl)
      } else if (item.__typename === ALERT_TYPE_NAME) {
        const alert = item as Alert
        AnalyticsInbox.trackInboxUIEvent(AlertType.MESSAGE, AnalyticsActionType.Show, alert.objectId, alert.type)
      }
    }
  }

  const keyExtractor = (item: Alert | BingAd, index: number) => {
    if (item.__typename === BING_AD_TYPE_NAME) {
      return item.ouAdId
    } else if (item.__typename === ALERT_TYPE_NAME) {
      return item.id
    } else {
      return toString(index)
    }
  }

  return (
    <Flex direction="column" grow={1}>
      {editing ? (
        <Margin direction="row" marginStep={2}>
          <Button
            buttonSize="large"
            buttonType={selected && selected.length > 0 ? "tertiary" : "disabled"}
            title={translate("todos-screen.delete")}
            onClick={onDeleteClick}
          />
        </Margin>
      ) : null}
      <Flex direction="column" grow={1}>
        <Separator direction="column" />
        <List keyExtractor={keyExtractor} onVisibilityChange={onVisibiltyChange} data={data} renderItem={renderRow} />
      </Flex>
    </Flex>
  )
}
