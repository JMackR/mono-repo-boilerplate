import { AuthScreen, AuthScreenElement } from "shared-lib"
// import { AnalyticsAuthShared } from "shared-lib/analytics/account/analytics-auth-shared"
import { translate } from "shared-lib/utilities/i18n/i18n"
import { Navigation, CommonNavs } from "../../../navigation/navigation"
import { NavigationPathHandler, NavigationPayload } from "../../../navigation/navigation/navigation.d"
import { NavigableRoute } from "../../../navigation/navigator/navigableroute"
import { WebViewLinks } from "shared-lib/constants"

// tslint:disable-next-line: no-any
export const handleSuccessfulLogin = (redirectPayload?: NavigationPayload<any>) => {
  Navigation.popRootNavigator((lockContext) => {
    if (redirectPayload) {
      Navigation.navigateToURL(redirectPayload.details.url, redirectPayload.props, { lockContext })
    }
  })
}

export const openTerms = (screen: AuthScreen, webViewLinks: WebViewLinks) => {
  // AnalyticsAuthShared.trackLoginUiEventClick(screen, AuthScreenElement.TermsOfService)
  CommonNavs.presentWebView(webViewLinks.RedibsTerms, translate("auth.terms"))
}

export const openPrivacyPolicy = (screen: AuthScreen, webViewLinks: WebViewLinks) => {
  // AnalyticsAuthShared.trackLoginUiEventClick(screen, AuthScreenElement.PrivacyPolicy)
  CommonNavs.presentWebView(webViewLinks.RedibsPrivacy, translate("auth.privacy-policy"))
}

export const openHelp = (screen: AuthScreen, webViewLinks: WebViewLinks) => {
  // AnalyticsAuthShared.trackLoginUiEventClick(screen, AuthScreenElement.Help)
  CommonNavs.presentWebView(webViewLinks.HelpCenter)
}

export const openForgotPassword = (screen: AuthScreen, email?: string) => {
  // AnalyticsAuthShared.trackLoginUiEventClick(screen, AuthScreenElement.ForgotPassword)
  Navigation.navigateToRoute(NavigableRoute.PasswordReset, { email })
}

export const openLoginScreen = (payload?: NavigationPayload<any>) => {
  Navigation.navigateToRoute(NavigableRoute.AuthLogin, { originPayload: payload })
}

export const openScreenWithOriginalPayload = (route: string, payload?: NavigationPayload<any>) => {
  Navigation.navigateToRoute(route, { originPayload: payload })
}
