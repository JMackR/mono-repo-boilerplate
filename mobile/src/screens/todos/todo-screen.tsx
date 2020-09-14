import { TodosScreenIdentifier } from "shared-lib/analytics/constants/todos-constants"
import { translate } from "shared-lib/utilities/i18n"
import { NavigationBar, SegmentedControl } from "uc-lib"
import React, { useContext } from "react"
import { Screen } from "../../widgets/screen"
import { MessagesTab } from "./messages-tab"
import { NotificationsTab } from "./notifications-tab"
import { TabInfo } from "uc-lib/widgets/segmented-control/segmented-control.d"
// import { InboxDataContext } from "shared-lib/providers/todos/inbox-state-provider"
import { UnseenAlertCount } from "shared-lib"

enum Segments {
  Messages = 0,
  Notifications,
}

const defaultSegment = (unseenAlertCount?: UnseenAlertCount): Segments => {
  const hasMessages = unseenAlertCount !== undefined && unseenAlertCount.inbox > 0
  const hasNotifications = unseenAlertCount !== undefined && unseenAlertCount.notifications > 0

  return !hasMessages && hasNotifications ? Segments.Notifications : Segments.Messages
}

export const TodoScreen: React.FC = () => {
  // const {
  //   unseenAlertCount,
  //   refetchInbox,
  //   refetchNotification,
  //   clearUnseenInboxCount,
  //   clearUnseenNotificationsCount,
  // } = useContext(InboxDataContext)
  // const [selectedIndex, setSelectedIndex] = React.useState<number>(defaultSegment(unseenAlertCount))
  const [showMessagesGleam, setShowMessagesGleam] = React.useState<boolean>(false)
  const [showNotificationsGleam, setShowNotificationsGleam] = React.useState<boolean>(false)
  const [focused, setFocused] = React.useState(false)

  const routes: TabInfo[] = [
    {
      key: TodosScreenIdentifier.Todos,
      title: translate("todos-screen.messages"),
      tabContent: <MessagesTab />,
      testID: "todos-screen.tabs.messages",
      showGleam: showMessagesGleam,
    },
    {
      key: TodosScreenIdentifier.Notifications,
      title: translate("todos-screen.notifications"),
      tabContent: <NotificationsTab />,
      testID: "todos-screen.tabs.notifications",
      showGleam: showNotificationsGleam,
    },
  ]

  const onFocus = () => {
    setFocused(true)
  }

  const onBlur = () => {
    setFocused(false)
  }

  // React.useEffect(() => {
  //   const currentUnseenMessages = unseenAlertCount !== undefined ? unseenAlertCount.inbox : 0
  //   const currentUnseenNotifications = unseenAlertCount !== undefined ? unseenAlertCount.notifications : 0
  //   setShowMessagesGleam(currentUnseenMessages > 0 && selectedIndex !== Segments.Messages)
  //   setShowNotificationsGleam(currentUnseenNotifications > 0 && selectedIndex !== Segments.Notifications)
  // }, [selectedIndex, unseenAlertCount])

  // React.useEffect(() => {
  //   if (focused) {
  //     return
  //   }
  //
  //   setSelectedIndex(defaultSegment(unseenAlertCount))
  // }, [unseenAlertCount])

  // React.useEffect(() => {
  //   if (!focused) {
  //     return
  //   }
  //
  //   if (selectedIndex === Segments.Messages) {
  //     clearUnseenInboxCount()
  //     refetchInbox()
  //   } else {
  //     clearUnseenNotificationsCount()
  //     refetchNotification()
  //   }
  // }, [focused, selectedIndex])

  return (
    <Screen backgroundColor={"secondary"} safeAreaMode="top" onFocus={onFocus} onBlur={onBlur}>
      <NavigationBar
        title={translate("todos-stack.todos-screen.header")}
        isRootNavBar={true}
        testID="inbox-screen.navigation-bar"
      />
      {/*<SegmentedControl tabs={routes} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />*/}
    </Screen>
  )
}
