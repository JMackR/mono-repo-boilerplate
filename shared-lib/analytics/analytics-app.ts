// import { firebaseApp } from "./firebase";
import { buildClickEventParams, buildScreenViewEventParams } from "./analytics-common"
import { AnalyticsElementType } from "./analytics-constants"
import { logEvent } from "./analytics-event-logger"

export class AnalyticsApp {
  public static trackScreenView(screenName: string, screenRoute?: string) {
    // firebaseApp.analytics().setCurrentScreen(screenName);
    logEvent("screenview", buildScreenViewEventParams(screenName, screenRoute))
  }

  public static async trackScreenClickEvent(screen: string, elementName: string, elementType: AnalyticsElementType) {
    logEvent(`${screen}_click`, buildClickEventParams(screen, elementName, elementType))
  }

  public static trackAppStateChange(_state: string) {
    // Not used on web
  }

  public static trackAppStateActive() {
    // Not used on web
  }
}
