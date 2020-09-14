import { AuthChannel, AuthScreenElement, AuthScreen, AuthScreenContext, AccountEventName } from "../constants"
import { AnalyticsElementType, AnalyticsActionType } from "../analytics-constants"
import {
  buildAuthEventParams,
  buildClickEventParams,
  buildUIEventParams,
  AnalyticsUIEvent,
  buildScreenViewEventParams,
} from "../analytics-common"
import { logBrazeEvent, logEvent } from "../analytics-event-logger"

/**
 * These analytics events are for reporting our biz ops events
 */
export class AnalyticsAuthShared {
  public static trackUserLoggedIn(channel: AuthChannel) {
    logEvent(AccountEventName.UserLoggedIn, buildAuthEventParams(channel))
    logBrazeEvent(AccountEventName.UserLoggedIn, buildAuthEventParams(channel))
  }

  public static trackUserRegistered(channel: AuthChannel) {
    logEvent(AccountEventName.UserRegistered, buildAuthEventParams(channel))
    logBrazeEvent(AccountEventName.UserRegistered, buildAuthEventParams(channel))
  }

  public static trackChangePasswordEventClick(element: AuthScreenElement, withSuccess?: boolean) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(AuthScreen.ChangePassword, element, AnalyticsElementType.Button),
      success: withSuccess,
    }
    logEvent(AccountEventName.MyAccount, params)
  }

  public static trackChangePasswordEventShow(element: AuthScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildScreenViewEventParams(AuthScreen.ChangePassword),
      element_name: element,
      element_type: AnalyticsElementType.Button,
    }
    logEvent(AccountEventName.MyAccount, params)
  }

  public static trackResetPasswordEventClick(element: AuthScreenElement, withSuccess?: boolean) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(AuthScreen.ResetPasswordThroughEmail, element, AnalyticsElementType.Button),
      success: withSuccess,
    }
    logEvent(AccountEventName.ResetPassword, params)
  }

  public static trackResetPasswordEventShow(element: AuthScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildScreenViewEventParams(AuthScreen.ResetPasswordThroughEmail),
      element_name: element,
      element_type: AnalyticsElementType.Button,
    }
    logEvent(AccountEventName.MyAccount, params)
  }

  public static trackLoginUiEventClick(screenName: AuthScreen, element: AuthScreenElement, withSuccess?: boolean) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(screenName, element, AnalyticsElementType.Button),
      success: withSuccess,
    }
    logEvent(AccountEventName.Login, params)
  }

  public static trackPhoneVerificationUiEventClick(
    screenName: AuthScreen,
    element: AuthScreenElement,
    context?: AuthScreenContext,
    withSuccess?: boolean,
  ) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(screenName, element, AnalyticsElementType.Button),
      success: withSuccess,
      context: context?.toString(),
    }
    logEvent(AccountEventName.PhoneVerification, params)
  }

  public static trackPhoneVerificationUiEventShow(
    screenName: AuthScreen,
    element: AuthScreenElement,
    context?: AuthScreenContext,
  ) {
    const params: AnalyticsUIEvent = {
      ...buildUIEventParams(screenName, element, AnalyticsElementType.Button, AnalyticsActionType.Show),
      context: context?.toString(),
    }
    logEvent(AccountEventName.PhoneVerification, params)
  }

  public static trackEmailVerificationUiEventClick(screenName: AuthScreen, element: AuthScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(screenName, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.EmailVerification, params)
  }

  public static trackEmailVerificationUiEventShow(screenName: AuthScreen, element: AuthScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(screenName, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.EmailVerification, params)
  }

  public static trackAccountCreationUiEventClick(screenName: AuthScreen, element: AuthScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(screenName, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.AccountCreation, params)
  }

  public static trackOTPUiEventClick(
    screenName: AuthScreen,
    element: AuthScreenElement,
    context?: AuthScreenContext,
    withSuccess?: boolean,
  ) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(screenName, element, AnalyticsElementType.Button),
      success: withSuccess,
      context: context?.toString(),
    }
    logEvent(AccountEventName.AccountChallenge, params)
  }

  public static trackOTPUiEventShow(screenName: AuthScreen, element: AuthScreenElement, context?: AuthScreenContext) {
    const params: AnalyticsUIEvent = {
      ...buildUIEventParams(screenName, element, AnalyticsElementType.Button, AnalyticsActionType.Show),
      context: context?.toString(),
    }
    logEvent(AccountEventName.AccountChallenge, params)
  }

  public static trackAccountChallengeEventSuccess(context?: AuthScreenContext) {
    const params = {
      context: context?.toString(),
    }
    logEvent(AccountEventName.AccountChallenged, params)
  }

  public static trackPhoneVerifiedEventSuccess(context?: AuthScreenContext, channel?: AuthChannel) {
    const params = {
      context: context?.toString(),
      verification_sent_channel: channel?.toString(),
    }
    logEvent(AccountEventName.PhoneVerified, params)
  }

  public static trackAccountResetPasswordDialogClick(element: AuthScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(AuthScreen.ResetPasswordThroughEmail, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.ResetPassword, params)
  }

  public static trackAccountResetPasswordCheckyourEmailDialogShow() {
    const params: AnalyticsUIEvent = {
      ...buildUIEventParams(
        AuthScreen.ResetPasswordThroughEmail,
        AuthScreenElement.CheckYourEmail,
        AnalyticsElementType.Dialogue,
        AnalyticsActionType.Show,
      ),
    }
    logEvent(AccountEventName.ResetPassword, params)
  }
}
