import _ from "lodash"
import {
  Button,
  EmailEnvelope,
  EmptyState,
  Flex,
  List,
  Margin,
  Separator,
  Spacer,
  useSelectable,
  ActivityIndicator,
  Center,
  ErrorBearFailure,
} from "uc-lib"
import React, { FC, useContext } from "react"
import { InboxDataContext, AlertType } from "../../providers/todos"
import { AnalyticsInbox, EMPTY_STATE } from "../../analytics/analytics-inbox"
import { AnalyticsActionType } from "../../analytics"
import { GraphGQLErrorParser } from "../../network"
import { translate } from "../../utilities/i18n"
import { NotificationRow } from "uc-lib/widgets/notification-row/notification-row"
import { NotificationRowProps } from "uc-lib/widgets/notification-row/notification-row.props"

export const InboxNotifications: FC<{
  onMessageSelect: (item: Alert) => void
  editing: boolean
}> = ({ onMessageSelect, editing }) => {
  const { notifications, notificationsError, refetchNotification, archiveNotifications } = useContext(InboxDataContext)
  const { selected } = useSelectable()
  const data = notifications?.alertsWithAds?.alertsWithAds
  if (notificationsError) {
    const { title, message } = GraphGQLErrorParser(notificationsError)
    return (
      <Center>
        <EmptyState
          icon={ErrorBearFailure}
          title={title}
          subtitle={message}
          buttonTitle={translate("common-errors.server-error.button-title")}
          buttonHandler={refetchNotification}
          testID="inbox-screen.error-state"
        />
      </Center>
    )
  } else if (!data) {
    return <ActivityIndicator />
  } else if (_.isEmpty(data)) {
    AnalyticsInbox.trackInboxUIEvent(AlertType.NOTIFICATION, AnalyticsActionType.Show, EMPTY_STATE)
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
      AnalyticsInbox.trackInboxUIEvent(AlertType.NOTIFICATION, AnalyticsActionType.Delete, id)
    })
    archiveNotifications(selected)
  }

  const renderRow = (notification: Alert) => {
    const handleClick = () => {
      onMessageSelect(notification)
    }

    const notificationRowProps: NotificationRowProps = {
      read: notification.read || notification.seen,
      avatar: notification.sender?.profile?.avatars?.squareImage,
      title: notification.notificationText?.trim() || "",
      dateAdded: notification.dateAdded,
      secondaryImage: (notification.contentThumbnails.length > 0 && notification.contentThumbnails[0]) || undefined,
      editing,
      selectId: notification.id,
      handleClick,
    }

    return <NotificationRow {...notificationRowProps} />
  }

  const onVisibilityChange = (visible: boolean, item: Alert) => {
    if (visible) {
      AnalyticsInbox.trackInboxUIEvent(AlertType.NOTIFICATION, AnalyticsActionType.Show, item.objectId, item.type)
    }
  }

  const keyExtractor = (item: Alert, _index: number) => {
    return item.id
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
        <List keyExtractor={keyExtractor} data={data} renderItem={renderRow} onVisibilityChange={onVisibilityChange} />
      </Flex>
    </Flex>
  )
}
