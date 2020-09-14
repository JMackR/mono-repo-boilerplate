import { AnalyticsElementType, AnalyticsActionType } from "../analytics-constants"
import { AnalyticsUIEvent } from "../analytics-common"
import { logEvent } from "../analytics-event-logger"
import { TabNavigatorElementType, TabNavigatorEventType } from "../constants/navigation-constants"

export interface BottomNavEventInput {
  screenName: string
  elementName: TabNavigatorElementType
}
export class AnalyticsNavigation {
  /**
   * Log event when pressing on a buton from the bottom nav to show screen
   */
  public static trackBottomNavEventButtonClick(eventInput: BottomNavEventInput) {
    const params: AnalyticsUIEvent = {
      action_type: AnalyticsActionType.Click,
      element_name: eventInput.elementName,
      element_type: AnalyticsElementType.Button,
      screen_name: eventInput.screenName,
    }
    logEvent(TabNavigatorEventType.BotttomNavigation, params)
  }

  /**
   * Log event when screen is showed after pressing on a button from the bottom nav
   */
  public static trackBottomNavEventScreenShow(eventInput: BottomNavEventInput) {
    const params: AnalyticsUIEvent = {
      action_type: AnalyticsActionType.Show,
      element_name: eventInput.elementName,
      element_type: AnalyticsElementType.Button,
      screen_name: eventInput.screenName,
    }
    logEvent(TabNavigatorEventType.BotttomNavigation, params)
  }
}
