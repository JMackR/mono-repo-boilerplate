import { AnalyticsUIEvent, buildUIEventParams } from "./analytics-common"
import { AnalyticsActionType, AnalyticsElementType } from "./analytics-constants"
import { logEvent } from "./analytics-event-logger"
// import { AlertType } from "../providers/todos/inbox-state-provider"

export const EMPTY_STATE = "empty_state"

export class AnalyticsInbox {
  // public static trackInboxUIEvent(
  //   alertType: AlertType,
  //   actionType: AnalyticsActionType,
  //   elementName: string,
  //   alertTypeDescription?: string,
  // ) {
  //   let typeDescription = {}
  //   if (alertType === AlertType.MESSAGE) {
  //     typeDescription = {
  //       message_type: alertTypeDescription,
  //     }
  //   } else {
  //     typeDescription = {
  //       notification_type: alertTypeDescription,
  //     }
  //   }
  //   const params: AnalyticsUIEvent = {
  //     ...buildUIEventParams("Inbox", elementName, AnalyticsElementType.InAppMessage, actionType),
  //     tab_name: alertType === AlertType.MESSAGE ? "Messages" : "Notifications",
  //     ...typeDescription,
  //   }
  //   logEvent(alertType === AlertType.MESSAGE ? "message_ui_event" : "notification_ui_event", params)
  // }
}
