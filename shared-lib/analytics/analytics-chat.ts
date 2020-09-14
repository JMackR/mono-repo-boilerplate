import { AnalyticsUIEvent, buildUIEventParams, buildScreenViewEventParams } from "./analytics-common"
import { logEvent } from "./analytics-event-logger"
import { AnalyticsElementType, AnalyticsActionType } from "./analytics-constants"
import { ChatScreenName, ChatUserRole, SuggestMeetUpTab } from "./constants"

export class ChatAnalyticsController {
  public static trackSuggestMeetUpUIEvent(
    elementName: string,
    elementType: AnalyticsElementType,
    actionType: AnalyticsActionType,
    userRole: ChatUserRole,
    tabName?: SuggestMeetUpTab,
  ) {
    const params: AnalyticsUIEvent = {
      ...this.buildBaseChatUIEventParams(ChatScreenName.SuggestMeetUp, elementName, elementType, actionType, userRole),
      tab_name: tabName || undefined,
    }
    this.logChatUIEvent(params)
  }

  public static trackChatScreenUIEvent(
    elementName: string,
    elementType: AnalyticsElementType,
    actionType: AnalyticsActionType,
    userRole: ChatUserRole,
  ) {
    const params: AnalyticsUIEvent = {
      ...this.buildBaseChatUIEventParams(ChatScreenName.Chat, elementName, elementType, actionType, userRole),
    }
    this.logChatUIEvent(params)
  }

  public static trackChatTakePhotoUIEvent(
    elementName: string,
    elementType: AnalyticsElementType,
    actionType: AnalyticsActionType,
    numPhotos?: number,
  ) {
    const params: AnalyticsUIEvent = {
      ...this.buildBaseChatUIEventParams(
        ChatScreenName.ChatTakePhoto,
        elementName,
        elementType,
        actionType,
        ChatUserRole.Seller,
      ),
      num_photos: numPhotos,
    }
    this.logChatUIEvent(params)
  }

  public static trackChatCameraRollUIEvent(
    elementName: string,
    elementType: AnalyticsElementType,
    actionType: AnalyticsActionType,
    numPhotos?: number,
  ) {
    const params: AnalyticsUIEvent = {
      ...this.buildBaseChatUIEventParams(
        ChatScreenName.ChatCameraRoll,
        elementName,
        elementType,
        actionType,
        ChatUserRole.Seller,
      ),
      num_photos: numPhotos,
    }
    this.logChatUIEvent(params)
  }

  public static trackChatUIEvent(
    screenName: ChatScreenName,
    elementName: string,
    elementType: AnalyticsElementType,
    actionType: AnalyticsActionType,
    userRole: ChatUserRole,
  ) {
    const params: AnalyticsUIEvent = {
      ...this.buildBaseChatUIEventParams(screenName, elementName, elementType, actionType, userRole),
    }
    this.logChatUIEvent(params)
  }

  public static getUserRole(sellerId: string, myId: string): ChatUserRole {
    return sellerId === myId ? ChatUserRole.Seller : ChatUserRole.Buyer
  }

  private static buildBaseChatUIEventParams(
    screenName: ChatScreenName,
    elementName: string,
    elementType: AnalyticsElementType,
    actionType: AnalyticsActionType,
    userRole: ChatUserRole,
  ): AnalyticsUIEvent {
    return {
      ...buildUIEventParams(screenName, elementName, elementType, actionType),
      user_role: userRole,
    }
  }

  private static logChatUIEvent(params: AnalyticsUIEvent) {
    logEvent("chat_ui_event", params)
  }
}
