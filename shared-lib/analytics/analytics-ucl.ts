import { AnalyticsActionTypeParam, AnalyticsElementType } from "./analytics-constants"
import { AnalyticsParams, getAnalyticsActionTypeFromString } from "./analytics-common"
import { logEvent } from "./analytics-event-logger"

export interface UCLAnalyticsProps {
  affectedUserId?: string
}

interface UCLEventCommonArgs {
  screenName: string
  screenRoute: string
  actionType: AnalyticsActionTypeParam
  testId?: string
  affectedUserId?: string
}

interface UCLButtonEventArgs extends UCLEventCommonArgs {
  buttonTitle: string
  buttonSize: string
  buttonType: string
}

const paramsWithCommonArgs = (args: UCLEventCommonArgs): AnalyticsParams => {
  const { screenName, screenRoute, actionType, testId, affectedUserId } = args
  return {
    screen_name: screenName,
    screen_route: screenRoute,
    action_type: getAnalyticsActionTypeFromString(actionType),
    test_id: testId,
    affected_user_id: affectedUserId,
  }
}

const UCL_EVENT_NAME = "redibs-ucl_event"

export class UCLAnalyticsController {
  public static trackButtonEvent(args: UCLButtonEventArgs) {
    const { buttonTitle, buttonType, buttonSize } = args
    const analyticsParams = {
      ...paramsWithCommonArgs(args),
      element_type: AnalyticsElementType.Button,
      button_size: buttonSize,
      button_title: buttonTitle,
      button_type: buttonType,
    }
    logEvent(UCL_EVENT_NAME, analyticsParams)
  }

  public static trackClickableEvent(args: UCLEventCommonArgs) {
    const analyticsParams = {
      ...paramsWithCommonArgs(args),
      element_type: AnalyticsElementType.Clickable,
    }
    logEvent(UCL_EVENT_NAME, analyticsParams)
  }
}
