// import analytics from "@react-native-firebase/analytics";
// import crashlytics from "@react-native-firebase/crashlytics";
import { Platform } from "react-native"
import DeviceInfo from "react-native-device-info"
import { EVENT_APP_STATE_ACTIVE, AnalyticsElementType } from "./analytics-constants"
import { buildClickEventParams, buildScreenViewEventParams } from "./analytics-common"
import { logEvent } from "./analytics-event-logger"

export class AnalyticsApp {
  public static trackScreenView(screenName: string, screenRoute?: string) {
    // crashlytics().log("Screen: " + screenName);
    // analytics().setCurrentScreen(screenName);
    logEvent("screenview", buildScreenViewEventParams(screenName, screenRoute))
  }

  public static trackAppStateChange(state: string) {
    // crashlytics().log("System: App State Changed: " + state);
  }

  public static async trackScreenClickEvent(screen: string, elementName: string, elementType: AnalyticsElementType) {
    logEvent(`${screen}_click`, buildClickEventParams(screen, elementName, elementType))
  }

  public static trackAppStateActive() {
    // This is needed here per Appsflyer documentation.
    // https://github.com/AppsFlyerSDK/appsflyer-react-native-plugin/blob/master/Docs/API.md#-trackapplaunch

    // TODO: Replace with new event name and params from BizOps
    logEvent(EVENT_APP_STATE_ACTIVE, {
      platform_os: Platform.OS,
      platform_version: Platform.Version,
      device_brand: DeviceInfo.getBrand(),
      device_type: DeviceInfo.getDeviceType(),
      device_hardware: DeviceInfo.getDeviceId(),
    })
  }
}
