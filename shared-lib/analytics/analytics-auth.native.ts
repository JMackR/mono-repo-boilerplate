// import analytics from "@react-native-firebase/analytics"
// import crashlytics from "@react-native-firebase/crashlytics"
import { GTAG_EVENT_LOGIN, GTAG_EVENT_SIGN_UP, EVENT_PARAM_EMAIL } from "./analytics-constants"
import { logEvent } from "./analytics-event-logger"

/**
 * These analytics events are app-specific, for things like firebase
 */
export class AnalyticsAuth {
  public static setUserId(userId?: number) {
    const formattedId = userId ? String(userId) : ""
    // analytics().setUserId(formattedId)
  }

  public static trackLoginWithEmail() {
    // crashlytics().log("System: Login With Email Successful")
    // Standard gtag onboarding event
    logEvent(GTAG_EVENT_LOGIN, { method: EVENT_PARAM_EMAIL })
    // Custom  onboarding event
    // TODO: CLIENT-452 Replace with new event name and params from BizOps
    // analytics().logEvent('Auth_UI_Event', {
    //   element_name: 'CompletedLogin',
    //   type: 'Email'
    // })
  }

  public static trackSignUpWithEmail() {
    // crashlytics().log("System: SignUp With Email Successful")
    // Standard gtag onboarding event
    logEvent(GTAG_EVENT_SIGN_UP, { method: EVENT_PARAM_EMAIL })
    // Custom  onboarding event
    // TODO: CLIENT-453 Replace with new event name and params from BizOps
    // analytics().logEvent('Auth_UI_Event', {
    //   element_name: 'CompletedRegistration',
    //   type: 'Email'
    // })
  }

  public static trackLogout() {
    // crashlytics().log("System: Logout Successful")
    // // TODO: Replace with new event name and params from BizOps
    // // analytics().logEvent('logout')
    // analytics().setUserId("")
  }
}
