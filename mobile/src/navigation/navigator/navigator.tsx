import React from "react"

import { createStackNavigator } from "@react-navigation/stack"
import { WebViewProps } from "uc-lib/widgets/webview/index.native"
import { LocationPicker, LocationPickerScreenProps } from "../../screens/location-picker/location-picker"
import { WebViewScreen } from "../../screens"
import { PermissionDialogProps } from "../../widgets/dialog"
import { PermissionDialog } from "../../widgets/dialog"
import { StaticModalPopup } from "../../widgets/modal-card/modal-static"
import { NavigationPayload } from "../navigation"
import { TabNavigator } from "../tab-navigator"
import { NavigableRoute } from "../navigator/navigableroute"
import {
  AffirmRejectDialogScreen,
  AffirmRejectDialogScreenProps,
  ErrorDialogScreenProps,
  ErrorDialogScreen,
} from "../../widgets/dialog"
import { PhoneValidationNavigator } from "../phone-validation-navigator/phone-validation-navigator"
import {
  ModalDialogOverlayOptions,
  ModalCardOverlayOption,
  FullScreenModalOptions,
  FullScreenModalNoAnimateOptions,
  PushPopStackAnimationOptions,
  useMultiStepCardNavigatorOptions,
  ForcedFullScreenModalOptions,
} from "../common"
import { AuthStackNavigator } from "../auth-navigator"
import { AuthScreenContext } from "shared-lib"
import { InitializeDeeplinking } from "../../third-party/branch-subscriber"
import { PushManager } from "../../pushnotifications"
import { ForcedAppUpgrade } from "../../screens/app-upgrade/forced-app-upgrade-screen"
import { AccountMFANavigator } from "../account-mfa-navigator/acount-mfa-navigator"
import { ImageSelectionStackNavigator } from "../image-selection-navigator"
import { UpdateNameScreen } from "../../screens/profile/settings/update-name-screen"
import { AccountPasswordChangeScreen } from "../../screens/profile/settings/account-password-change"
import { ResourceScreen } from "../../screens"
import { ProfilePreviewScreen } from "../../screens/profile"
import { VerifyEmailScreen } from "../../screens/profile/settings/verify-email-screen"
import { authenticationChecker } from "../../../../shared-lib/providers/auth-provider/use-provide-auth.native"
import SplashScreen from "react-native-splash-screen"
// import { OnboardingNavigator } from "../onboarding-navigator/onboarding-navigator"
import { DashboardReadyModal } from "../../screens/dashboard/dashboard-ready-modal"
import { DashboardStackNavigator } from "../dashboard-navigator"
import { PortfolioStackNavigator } from "../portfolio-navigator"
import { TodoStackNavigator } from "../todo-navigator"
import { ResourceStackNavigator } from "../resource-navigator"
import { ProfileStackNavigator } from "../profile-navigator"
import { OnboardingNavigator } from "../onboarding-navigator/onboarding-navigator"

export type NavigatorParamList = {
  // import { CustomizeThemeScreen } from "../../screens/profile/settings/customize-design-theme-screen"
  // import { NotificationPreferenceType, NotificationPreferencesScreen } from "../../screens/profile/settings"
  // import { AccountVanityUrlScreen } from "../../screens/profile"
  // import { SearchSortModalScreen, SearchSuggestionScreen, SearchScreen, SearchNavigationProps } from "../../screens/portfolio"
  // import { AccountSearchAlertsScreen } from "../../screens/profile/search-alert/search-alerts-screen"
  [NavigableRoute.UpdateApp]: NavigationPayload<{
    iosAppStoreUrl: string
    androidPlayStoreUrl: string
  }>
  [NavigableRoute.HomeTabs]: NavigationPayload<undefined>
  [NavigableRoute.ModalCard]: NavigationPayload<{ modalId: string }>
  [NavigableRoute.LocationPicker]: NavigationPayload<LocationPickerScreenProps>
  [NavigableRoute.PermissionsDialog]: NavigationPayload<PermissionDialogProps>
  [NavigableRoute.WebViewScreen]: NavigationPayload<WebViewProps>
  [NavigableRoute.AffirmRejectDialog]: NavigationPayload<AffirmRejectDialogScreenProps>
  [NavigableRoute.ErrorDialog]: NavigationPayload<ErrorDialogScreenProps>
  [NavigableRoute.CustomizeTheme]: NavigationPayload<undefined>
  [NavigableRoute.DashboardStack]: NavigationPayload<undefined>
  [NavigableRoute.PortfolioStack]: NavigationPayload<undefined>
  [NavigableRoute.ResourceStack]: NavigationPayload<undefined>
  [NavigableRoute.ProfileStack]: NavigationPayload<undefined>
  [NavigableRoute.TodoStack]: NavigationPayload<undefined>
  /**
   * Profiles
   */
  [NavigableRoute.ProfilePreview]: NavigationPayload<{ userId: number }>
  /**
   * Account
   */
  [NavigableRoute.AuthStack]: NavigationPayload<undefined>
  // [NavigableRoute.OnboardingStack]: NavigationPayload<undefined>
  [NavigableRoute.ProfileImageStack]: NavigationPayload<{}>
  [NavigableRoute.VerifyPhoneStack]: NavigationPayload<undefined>
  [NavigableRoute.AccountMFAStack]: NavigationPayload<undefined>
  // [NavigableRoute.NotificationPreferences]: NavigationPayload<{
  //   notificationType: NotificationPreferenceType
  // }>
  [NavigableRoute.VerifyEmail]: NavigationPayload<{
    email: string
    verified: boolean
    context?: AuthScreenContext
  }>
  [NavigableRoute.ProfilePasswordChange]: NavigationPayload<undefined>
}

const Stack = createStackNavigator()

export const Navigator = () => {
  React.useEffect(() => {
    SplashScreen.hide()
    InitializeDeeplinking()
    //
    // PushManager.getInitialNotification(notificationPayload => {
    //   PushManager.navigateUsingNotification(notificationPayload)
    // })
    // const newPushNotificationSubscription = PushManager.startListeningForNotifications(notificationPayload => {
    //   PushManager.navigateUsingNotification(notificationPayload)
    // })
    //
    // return () => {
    //   newPushNotificationSubscription.remove()
    // }
  }, [])

  // const { MultiStepModalCardNavigatorOptions } = useMultiStepCardNavigatorOptions()
  const authenticated = authenticationChecker()
  return (
    <Stack.Navigator
      initialRouteName={authenticated ? NavigableRoute.HomeTabs : NavigableRoute.AuthLanding}
      headerMode="none"
      screenOptions={PushPopStackAnimationOptions}
    >
      <Stack.Screen name={NavigableRoute.HomeTabs} component={TabNavigator} />

      <Stack.Screen
        name={NavigableRoute.AuthLanding}
        component={AuthStackNavigator}
        options={ForcedFullScreenModalOptions}
      />

      <Stack.Screen
        name={NavigableRoute.OnboardingStack}
        component={OnboardingNavigator}
        options={{ ...FullScreenModalOptions, gestureEnabled: false }}
      />
      <Stack.Screen name={NavigableRoute.ModalCard} component={StaticModalPopup} options={ModalCardOverlayOption} />
      {/* <Stack.Screen name={NavigableRoute.WebViewScreen} component={WebViewScreen} options={FullScreenModalOptions} />
      <Stack.Screen name={NavigableRoute.LocationPicker} component={LocationPicker} options={ModalCardOverlayOption} />*/}
      <Stack.Screen
        name={NavigableRoute.PermissionsDialog}
        component={PermissionDialog}
        options={ModalDialogOverlayOptions}
      />
      <Stack.Screen
        name={NavigableRoute.AffirmRejectDialog}
        component={AffirmRejectDialogScreen}
        options={ModalDialogOverlayOptions}
      />
      <Stack.Screen name={NavigableRoute.ErrorDialog} component={ErrorDialogScreen} options={ModalDialogOverlayOptions} />
      <Stack.Screen
        name={NavigableRoute.VerifyPhoneStack}
        component={PhoneValidationNavigator}
        options={FullScreenModalOptions}
      />
      <Stack.Screen
        name={NavigableRoute.AccountMFAStack}
        component={AccountMFANavigator}
        options={ModalDialogOverlayOptions}
      />
      <Stack.Screen
        name={NavigableRoute.ProfileImageStack}
        component={ImageSelectionStackNavigator}
        options={FullScreenModalOptions}
      />
      <Stack.Screen name={NavigableRoute.UpdateApp} component={ForcedAppUpgrade} options={ForcedFullScreenModalOptions} />
      {/* Profiles */}
      <Stack.Screen name={"ResourceScreen"} component={ResourceScreen} />
      {/* Account */}
      {/*<Stack.Screen
        name={NavigableRoute.NotificationPreferences}
        component={NotificationPreferencesScreen}
        options={FullScreenModalOptions}
      />*/}
      <Stack.Screen name={NavigableRoute.VerifyEmail} component={VerifyEmailScreen} options={FullScreenModalOptions} />
      <Stack.Screen
        name={NavigableRoute.ProfilePasswordChange}
        component={AccountPasswordChangeScreen}
        options={FullScreenModalOptions}
      />
    </Stack.Navigator>
  )
}
