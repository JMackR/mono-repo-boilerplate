import { NativeModules, NativeEventEmitter } from "react-native"
import { Navigation } from "../navigation/navigation"

// tslint:disable: no-any

const EVENT_NOTIFICATION_RECEIVED = "notificationReceived"
const NOTIFICATION_TYPE_CHAT = "thread_id"
const NOTIFICATION_TYPE_FOLLOWER = "follower_id"
const NOTIFICATION_TYPE_DEEPLINKGOTO = "goto_url"
const NOTIFICATION_TYPE_RATING = "item_rating_id"
const NOTIFICATION_TYPE_ACTIONPATH = "action_path"

const manager = NativeModules.PPushNotificationManagerReactNative

const getExtrasFromNotification = (notificationPayload: any): any => {
  return notificationPayload?.rawNotification?.extra
}

const getActionPathFromExtras = (extras: any): string | undefined => {
  if (!extras) {
    return undefined
  }

  let actionPath: string | undefined
  if (extras[NOTIFICATION_TYPE_ACTIONPATH]) {
    actionPath = extras[NOTIFICATION_TYPE_ACTIONPATH]
  } else if (extras[NOTIFICATION_TYPE_DEEPLINKGOTO]) {
    actionPath = extras[NOTIFICATION_TYPE_DEEPLINKGOTO]
  } else if (extras[NOTIFICATION_TYPE_CHAT]) {
    const threadId = extras[NOTIFICATION_TYPE_CHAT]
    actionPath = `/item/0/discussions/${threadId}/messages/`
  } else if (extras[NOTIFICATION_TYPE_FOLLOWER]) {
    const userId = extras[NOTIFICATION_TYPE_FOLLOWER]
    actionPath = `/p/${userId}`
  } else if (extras[NOTIFICATION_TYPE_RATING]) {
    const itemId = extras[NOTIFICATION_TYPE_RATING]
    actionPath = `/rate/transaction/${itemId}`
  }

  return actionPath
}

export const PushManager = {
  setBadgeCount(count: number) {
    manager.setBadgeCount(count)
  },
  getInitialNotification(callback: (notificationPayload: any) => void) {
    manager.getInitialNotification(callback)
  },
  startListeningForNotifications(callback: (notificationPayload: any) => void) {
    const managerEmitter = new NativeEventEmitter(manager)
    const subscription = managerEmitter.addListener(EVENT_NOTIFICATION_RECEIVED, callback)
    return subscription
  },
  navigateUsingNotification(notificationPayload: any) {
    if (!notificationPayload) {
      return
    }

    const actionPath = getActionPathFromExtras(getExtrasFromNotification(notificationPayload))
    if (actionPath) {
      Navigation.performWhenAvailable(() => Navigation.navigateToActionPath(actionPath))
    }
  },
}
