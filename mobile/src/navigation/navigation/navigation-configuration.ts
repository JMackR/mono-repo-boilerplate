import { Navigation, NAVIGATION_ROUTES_SCHEME, generatePathHandler } from "./navigation"
import { NavigationPathHandler, NavigationPayload } from "./navigation.d"
import { NavigationContainerRef } from "@react-navigation/native"
import { NavigableRoute, navigableRoutes } from "../navigator/navigableroute"
import { authenticationChecker } from "shared-lib/providers/auth-provider/use-provide-auth.native"

/**
 * NOT NEEDED FOR PROJECT
 */
const RTES_THAT_DO_NOT_REQUIRE_AUTHENTICATION: string[] = [
  NavigableRoute.AuthLanding,
  NavigableRoute.AuthEmailLanding,
  // NavigableRoute.OnboardingStack,
  NavigableRoute.OnboardingFlowStep1,
  NavigableRoute.OnboardingFlowStep2,
  NavigableRoute.OnboardingFlowStep3,
  NavigableRoute.OnboardingFlowStep4,
  NavigableRoute.OnboardingFlowStep5,
  NavigableRoute.PasswordReset,
  NavigableRoute.ResetConfirm,
  NavigableRoute.SignUpAccount,
  NavigableRoute.SignUpNDA,
  NavigableRoute.SignUpApa,
  NavigableRoute.SignUpRegistered,
  NavigableRoute.SignUpCongrats,
  NavigableRoute.AuthSignup,
  NavigableRoute.AuthGetUserEmail,
  NavigableRoute.AuthMultifactor,
  NavigableRoute.PasswordReset,
  NavigableRoute.ConfirmPhoneCode,
  NavigableRoute.ModalCard,
  NavigableRoute.WebViewScreen,
  NavigableRoute.PermissionsDialog,
  NavigableRoute.LocationPicker,
  NavigableRoute.AffirmRejectDialog,
  NavigableRoute.ErrorDialog,
]

export const APP_AUTHORITY: string[] = ["redibs.com", "redibs-stg.com", "redibs-int.com"]
const APP_SCHEME = ["https://", "redibs://"]
const routeUrlsMap = new Map<string, string[]>()

export const initializeNavigation = (navigationRef: React.RefObject<NavigationContainerRef>) => {
  Navigation.start(navigationRef)

  for (const scheme of APP_SCHEME) {
    Navigation.addScheme(scheme)
  }
  Navigation.addScheme(NAVIGATION_ROUTES_SCHEME)
  initializeActionPath()
  initializeGlobalSchemePaths()
  // Navigation.addPaths(
  //   NAVIGATION_ROUTES_SCHEME,
  //   [NavigableRoute.OnboardingStackShadowForModalPostFlowTab],
  //   generateAuthPathHandler(NavigableRoute.OnboardingStack),
  // )
  // Navigation.addPaths("redibs", ["App.CloseWebView"], webNavigationHandler)
}

const initializeActionPath = () => {
  ///////// ONBOARDING /////////
  addActionPathsNavigableRouteAssociation(NavigableRoute.AuthLanding, "/auth/auth-landing")
  addActionPathsNavigableRouteAssociation(NavigableRoute.PasswordReset, "/auth/password-reset")
  addActionPathsNavigableRouteAssociation(NavigableRoute.ResetConfirm, "/auth/ResetConfirm")
  addActionPathsNavigableRouteAssociation(NavigableRoute.AuthSignup, "/auth/auth-signup")
  addActionPathsNavigableRouteAssociation(NavigableRoute.AuthLogin, "/auth/auth-login")
  addActionPathsNavigableRouteAssociation(NavigableRoute.SignUpAccount, "/auth/signup-account")
  addActionPathsNavigableRouteAssociation(NavigableRoute.SignUpNDA, "/auth/signup-nda")
  addActionPathsNavigableRouteAssociation(NavigableRoute.SignUpNDA, "/auth/signup-profile")
  addActionPathsNavigableRouteAssociation(NavigableRoute.SignUpApa, "/auth/signup-apa")
  addActionPathsNavigableRouteAssociation(NavigableRoute.SignUpRegistered, "/auth/signup-registered")
  addActionPathsNavigableRouteAssociation(NavigableRoute.SignUpCongrats, "/auth/signup-congrats")
  addActionPathsNavigableRouteAssociation(NavigableRoute.VerifyEmail, "/auth/email/verification/sent")
  addActionPathsNavigableRouteAssociation(NavigableRoute.VerifyPhone, "/auth/verify/phone")
  ///////// ONBOARDING /////////
  // addActionPathsNavigableRouteAssociation(NavigableRoute.OnboardingStack, "/auth/onboarding-stack")

  ///////// DASHBOARD /////////
  addActionPathsNavigableRouteAssociation(NavigableRoute.Dashboard, "/dashboard")
  addActionPathsNavigableRouteAssociation(NavigableRoute.Dashboard, "/edit")
  addActionPathsNavigableRouteAssociation(NavigableRoute.Dashboard, "/dashboard-ready")

  ///////// PORTFOLIO /////////
  addActionPathsNavigableRouteAssociation(NavigableRoute.Portfolio, "/portfolio")
  addActionPathsNavigableRouteAssociation(NavigableRoute.Portfolio, "/filters")
  addActionPathsNavigableRouteAssociation(NavigableRoute.Portfolio, "/add-edit-property")
  addActionPathsNavigableRouteAssociation(NavigableRoute.Portfolio, "/import-property")

  ///////// TODOS /////////
  addActionPathsNavigableRouteAssociation(NavigableRoute.Todos, "/todos")
  addActionPathsNavigableRouteAssociation(NavigableRoute.Todos, "/todos/send-message")

  ///////// RESRCES /////////
  addActionPathsNavigableRouteAssociation(NavigableRoute.Resources, "/resources")
  addActionPathsNavigableRouteAssociation(NavigableRoute.Resources, "/resources/videos")
  addActionPathsNavigableRouteAssociation(NavigableRoute.Resources, "/resources/agent-info")

  ///////// PROFILE /////////
  addActionPathsNavigableRouteAssociation(NavigableRoute.Profile, "/profile")
  addActionPathsNavigableRouteAssociation(NavigableRoute.ProfileImageSelect, "/profile/my-account")
  addActionPathsNavigableRouteAssociation(NavigableRoute.ProfileImageSelect, "/profile/terms")
  addActionPathsNavigableRouteAssociation(NavigableRoute.ProfileImageSelect, "/profile/apa")
  addActionPathsNavigableRouteAssociation(NavigableRoute.ProfileImageSelect, "/profile/social")
  addActionPathsNavigableRouteAssociation(NavigableRoute.ProfileImageSelect, "/profile/agent-info")
  addActionPathsNavigableRouteAssociation(NavigableRoute.ProfileImageSelect, "/profile/public-preview")
  addActionPathsNavigableRouteAssociation(NavigableRoute.ProfileImageSelect, "/profile/profile_picture/update")

  // addActionPathsNavigableRouteAssociation(NavigableRoute.ProfileSettings, "/profile/settings")
  // addActionPathsNavigableRouteAssociation(NavigableRoute.ProfileImageStack, "/profile/background/update")
  // addActionPathsNavigableRouteAssociation(NavigableRoute.HomeTabs, '/profile/facebook/connect')

  ///////// Help Center Deeplinks /////////
  // addActionPathsNavigableRouteAssociation(NavigableRoute.HomeTabs, '/app/help/*')

  ///////// Webview Configuration Overrides /////////
  // Not sure if we need these two, or if they even belong here.
  // Legacy apps use these routes to disable back button on webviews when reporting a user or canceling a payment.
  // addActionPathsNavigableRouteAssociation(NavigableRoute.HomeTabs, "/accounts/block")
}

const addActionPathsNavigableRouteAssociation = (route: NavigableRoute, path: string) => {
  const pathArray: string[] = routeUrlsMap.get(route) || []
  for (const scheme of APP_SCHEME) {
    // console.log("what is the auth", APP_AUTHORITY)
    for (const authority of APP_AUTHORITY) {
      pathArray.push(scheme.concat(authority.concat(path)))
    }
  }
  const NAV_SCHEME = NAVIGATION_ROUTES_SCHEME + "://"
  pathArray.push(NAV_SCHEME.concat(path))

  if (!pathArray.includes(route)) {
    pathArray.push(NAV_SCHEME.concat(route))
  }

  routeUrlsMap.set(route, pathArray)
}

const addUrlsForRouteAndHandler = (route: string, handler: NavigationPathHandler) => {
  const urlsForRoute = routeUrlsMap.get(route)

  if (!urlsForRoute) {
    Navigation.addPaths(NAVIGATION_ROUTES_SCHEME, [route], handler)
    return
  }
  urlsForRoute.forEach(urlString => {
    const urlParts = urlString.split("://")
    Navigation.addPaths(urlParts[0], [urlParts[1]], handler)
  })
}

interface NavOverridesMap {
  [key: string]: "push" | "navigate" | "replace" | undefined
}

const routeNavOverrides: NavOverridesMap = {
  // [NavigableRoute.ListingDetail]: "push",
  // [NavigableRoute.DiscussionStack]: "push",
  // [NavigableRoute.AcceptDeclineOffer]: "push",
  // [NavigableRoute.CarBuyerProfile]: "push",
  // [NavigableRoute.AddBankDepositMethodReplace]: "replace",
  // [NavigableRoute.AddDebitDepositMethodReplace]: "replace",
}

const initializeGlobalSchemePaths = () => {
  navigableRoutes.forEach(route => {
    let pathHandler: NavigationPathHandler
    if (route === NavigableRoute.CloseWebview) {
      pathHandler = webNavigationHandler
    } else if (RTES_THAT_DO_NOT_REQUIRE_AUTHENTICATION.includes(route)) {
      pathHandler = generatePathHandler(route, routeNavOverrides[route])
    } else {
      pathHandler = generateAuthPathHandler(route, routeNavOverrides[route])
    }

    addUrlsForRouteAndHandler(route, pathHandler)
  })
}

const generateAuthPathHandler = (route: string, navType?: "navigate" | "push" | "replace") => {
  return generatePathHandler(
    route,
    navType || "navigate",
    (): Promise<boolean> => {
      const authenticated = authenticationChecker()
      return new Promise<boolean>((resolve, _reject) => {
        // console.log("what is the resolve", authenticated)
        resolve(true)
        // resolve(authenticated)
      })
    },
    NavigableRoute.AuthLanding,
  )
}

export const webNavigationHandler: NavigationPathHandler = async (
  navigationRef: React.RefObject<NavigationContainerRef>,
  _payload: NavigationPayload<any>,
) => {
  // close the webview
  navigationRef.current?.goBack()
  return true
}
