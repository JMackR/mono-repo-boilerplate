import _ from "lodash"
import React, { useContext, useEffect } from "react"
import VersionNumber from "react-native-version-number"
import Config from "react-native-config"
import { getNavigationBackButton } from "../../../navigation/common"
import { ScreenRouteAndStackNavigation } from "../../../navigation/route"
import { NavigableRoute } from "../../../navigation/navigator"
import { AccountParamList } from "../../../navigation/profile-navigator"
import { Screen } from "../../../widgets/screen"
import { useAuth, AccountDataContext, AuthScreenContext, GraphGQLErrorParser, LocationDetails } from "shared-lib"
import { useMutation, useQuery } from "@apollo/react-hooks"
// import { AccountAnalyticsController } from "shared-lib/analytics/account/analytics-account"
import { AccountSettingsScreenElement, AccountScreenNames } from "shared-lib/analytics/constants/profile-constants"
import { useFacebookConnect } from "shared-lib/controllers/social-controller/"
import { localizePhoneNumber, translate } from "shared-lib/utilities/i18n"
import { colorThemes, useTheme, MATCH_SYSTEM_COLOR_THEME_ID } from "uc-lib"
import {
  RadioButtonSelected,
  RadioButtonUnselected,
  FacebookConnectedIcon,
  ErrorBearFailure,
  LogoCircle,
} from "uc-lib/assets"
import { Button, Center, Flex, Margin, ScrollView, Spacer, Stack, Text, ActivityIndicator } from "uc-lib/controls"
import {
  NAVIGATION_BAR_HEIGHT,
  FlexibleAction,
  FlexibleRow,
  FlexibleRowContainer,
  NavigationBar,
  EmptyState,
} from "uc-lib/widgets"
import { AccountSectionLabel } from "uc-lib/widgets/account"
import { CommonNavs, Navigation } from "../../../navigation/navigation"
import { ACCNT_FLEX_ROW_HEIGHT } from "../account-screen"
import { NotificationPreferenceType } from "./notification-preferences-screen"
import { LocationPickerType } from "../../location-picker/location-picker"
import { AffirmRejectDialogScreenProps } from "../../onboarding/dialog"
import { nativeThemeChange } from "../../../utilities"
import { useSettingsServerType, useSettingsWebViewLinks } from "../../../providers/settings-provider"

export const AccountSettingScreen: React.FC<ScreenRouteAndStackNavigation<
  AccountParamList,
  NavigableRoute.AccountSettings
>> = () => {
  const { loading: accountLoading, data: accountData, refetch: refetchUserInfo } = useContext(AccountDataContext)
  const { serverTitle } = useSettingsServerType()
  const webViewLinks = useSettingsWebViewLinks()
  const { error, loading, data, refetch } = useQuery<Query>(ACCNT_SETTINGS_QUERY)
  const { colorThemeId, setColorThemeId, isUsingSystemProvidedTheme } = useTheme()
  const auth = useAuth()
  const [updateLocation] = useMutation(UPDATE_LOCATION_MUTATION, {
    onCompleted: () => refetchUserInfo(),
  })

  useEffect(() => {
    // AccountAnalyticsController.trackMyAccountSettingsUIEventShow(AccountSettingsScreenElement.Aboutredibs)
    // AccountAnalyticsController.trackMyAccountSettingsUIEventShow(AccountSettingsScreenElement.LogOut)
    // AccountAnalyticsController.trackMyAccountSettingsUIEventShow(AccountSettingsScreenElement.EmailNotification)
    // AccountAnalyticsController.trackMyAccountSettingsUIEventShow(AccountSettingsScreenElement.PushNotification)
    // AccountAnalyticsController.trackMyAccountSettingsUIEventShow(AccountSettingsScreenElement.ChangePassword)
    // AccountAnalyticsController.trackMyAccountSettingsUIEventShow(AccountSettingsScreenElement.Location)
    // AccountAnalyticsController.trackMyAccountSettingsUIEventShow(AccountSettingsScreenElement.Name)
    // AccountAnalyticsController.trackMyAccountSettingsUIEventShow(AccountSettingsScreenElement.Email)
    // AccountAnalyticsController.trackMyAccountSettingsUIEventShow(AccountSettingsScreenElement.TruYou)
  }, [])

  const onError = (error: any) => {
    CommonNavs.presentError({ error })
  }

  const getToAbout = () => {
    // AccountAnalyticsController.trackMyAccountSettingsUIEventClick(AccountSettingsScreenElement.Aboutredibs)
    CommonNavs.presentWebView(webViewLinks.redibsAbout, translate("profile-stack.settings-screen.about-mobile"))
  }

  const { onConnectFacebook } = useFacebookConnect(onError)

  const logOutPressed = () => {
    const props: AffirmRejectDialogScreenProps = {
      onAffirm: () => {
        Navigation.goBack()
        logOut()
      },
      onReject: () => {
        // no op
      },
      dismissOnReject: true,
      affirmText: translate("profile-stack.settings-screen.log-out"),
      rejectText: translate("common-actions.cancel"),
      title: translate("profile-stack.settings-screen.log-out-dialog-title"),
      body: translate("profile-stack.settings-screen.log-out-dialog-body"),
    }
    Navigation.navigateToRoute(NavigableRoute.AffirmRejectDialog, props)
  }

  const logOut = async () => {
    // AccountAnalyticsController.trackMyAccountSettingsUIEventClick(AccountSettingsScreenElement.LogOut)
    auth.handleLogout()
    Navigation.performWhenAvailable(() => {
      Navigation.navigateToRoute(NavigableRoute.HomeFeed)
    })
  }

  const addAction: FlexibleAction = { type: "brandtext", props: translate("profile-stack.settings-screen.add") }
  const editAction: FlexibleAction = { type: "brandtext", props: translate("profile-stack.settings-screen.edit") }
  const verifyAction: FlexibleAction = { type: "brandtext", props: translate("profile-stack.settings-screen.verify") }

  const name = accountData?.profile?.name || ""

  const renderMatchSystemThemeRow = () => {
    const iconForSystemThemeRow = isUsingSystemProvidedTheme ? RadioButtonSelected : RadioButtonUnselected
    const matchSystemThemeRow = (
      <FlexibleRow
        key="system-theme-row"
        height={ACCNT_FLEX_ROW_HEIGHT}
        rightArrowHidden={true}
        mainContent={translate("profile-stack.settings-screen.match-system-design-theme")}
        clickAction={matchSystemTheme}
        rightIcon={iconForSystemThemeRow}
        testID="settings-screen.system-theme"
      />
    )
    return matchSystemThemeRow
  }

  const renderAvailableThemes = () => {
    const themeRows = Object.keys(colorThemes).map(key => {
      const theme = colorThemes[key]
      const isSelected = colorThemeId === theme.identifier && !isUsingSystemProvidedTheme
      const icon = isSelected ? RadioButtonSelected : RadioButtonUnselected
      const clickAction = () => {
        if (!isSelected) {
          setColorThemeId(theme.identifier)
          nativeThemeChange(theme.identifier)
        }
      }
      return (
        <FlexibleRow
          key={key}
          height={ACCNT_FLEX_ROW_HEIGHT}
          rightArrowHidden={true}
          mainContent={theme.displayName}
          clickAction={clickAction}
          rightIcon={icon}
          testID={"settings-screen." + key}
        />
      )
    })
    return themeRows
  }

  const matchSystemTheme = () => {
    setColorThemeId(MATCH_SYSTEM_COLOR_THEME_ID)
    nativeThemeChange(MATCH_SYSTEM_COLOR_THEME_ID)
  }

  const customizeThemeClicked = () => {
    Navigation.navigateToRoute(NavigableRoute.CustomizeTheme)
  }

  const getEmail = () => {
    return `${_.property("me.profile.email")(data)}`
  }

  const getLocation = () => {
    const location = _.property("profile.publicLocationName")(accountData) as string
    if (location === undefined || location === null) {
      return translate("profile-stack.settings-screen.set-display-location")
    } else {
      return location
    }
  }

  const openEmailNotificationSettings = () => {
    // AccountAnalyticsController.trackMyAccountSettingsUIEventClick(AccountSettingsScreenElement.EmailNotification)
    openNotificationSettings(NotificationPreferenceType.Email)
  }

  const openPushNotificationSettings = () => {
    // AccountAnalyticsController.trackMyAccountSettingsUIEventClick(AccountSettingsScreenElement.PushNotification)
    openNotificationSettings(NotificationPreferenceType.Push)
  }

  const openChangePasswordScreen = () => {
    // AccountAnalyticsController.trackMyAccountSettingsUIEventClick(AccountSettingsScreenElement.ChangePassword)
    Navigation.navigateToRoute(NavigableRoute.AccountPasswordChange)
  }

  const openNotificationSettings = (notificationType: NotificationPreferenceType) => {
    Navigation.navigateToRoute(NavigableRoute.NotificationPreferences, { notificationType })
  }

  const showServerMenu = Config.SHOW_SERVER_MENU === "true"
  const openDevServerSetting = () => {
    if (!showServerMenu) {
      return
    }
    Navigation.navigateToRoute(NavigableRoute.DevServerSetting)
  }

  const openSetLocation = () => {
    // AccountAnalyticsController.trackMyAccountSettingsUIEventClick(AccountSettingsScreenElement.Location)
    CommonNavs.presentLocationPicker({
      testID: "settings-screen.location",
      screenName: AccountScreenNames.MyAccountSettings_Location,
      pickerType: LocationPickerType.User,
      resultCallback: async (locationDetails: LocationDetails) => {
        try {
          await updateLocation({
            variables: {
              latitude: locationDetails.lat,
              longitude: locationDetails.lon,
            },
          })
        } catch (error) {
          CommonNavs.presentError({ error })
        }
      },
    })
  }

  const openChangeNameScreen = () => {
    // AccountAnalyticsController.trackMyAccountSettingsUIEventClick(AccountSettingsScreenElement.Name)
    Navigation.navigateToRoute(NavigableRoute.UpdateName, { name })
  }

  const AddPhoneRow = () => {
    const phoneVerified = accountData?.profile?.isPhoneNumberVerified
    const phoneNumber = accountData?.profile?.phoneNumber || ""
    const rowText: string = phoneNumber ? localizePhoneNumber(phoneNumber) : translate("profile-stack.settings-screen.phone")

    const onPhoneClick = () => {
      Navigation.navigateToRoute(NavigableRoute.VerifyPhone, {
        skippable: false,
        context: AuthScreenContext.PhoneNumberChange,
      })
    }

    return (
      <FlexibleRow
        mainContent={rowText}
        height={ACCNT_FLEX_ROW_HEIGHT}
        clickAction={onPhoneClick}
        rightAction={phoneNumber ? (phoneVerified ? editAction : verifyAction) : addAction}
        rightArrowHidden={true}
        testID="settings-screen.phone"
      />
    )
  }

  const VerifyEmailRow = () => {
    const verified = accountData?.profile?.isEmailVerified || false

    const openVerifyEmail = () => {
      // AccountAnalyticsController.trackMyAccountSettingsUIEventClick(AccountSettingsScreenElement.Email)
      Navigation.navigateToRoute(NavigableRoute.VerifyEmail, {
        email: getEmail(),
        verified,
        context: AuthScreenContext.ExistingUser,
      })
    }

    return (
      <FlexibleRow
        mainContent={getEmail()}
        height={ACCNT_FLEX_ROW_HEIGHT}
        clickAction={openVerifyEmail}
        testID="settings-screen.email"
        rightArrowHidden={true}
        rightAction={verified ? editAction : verifyAction}
      />
    )
  }

  const goToTruYouVerify = () => {
    // AccountAnalyticsController.trackMyAccountSettingsUIEventClick(AccountSettingsScreenElement.TruYou)
    Navigation.navigateToRoute(NavigableRoute.TruYouVerify)
  }
  const TruYouVerifiedRow = () => {
    const verified = data?.me.profile?.isTruyouVerified
    const truYouState = accountData?.profile?.truYouVerificationStatus
    if (verified) {
      return (
        <FlexibleRow mainContent={translate("profile-stack.settings-screen.truyverified")} height={ACCNT_FLEX_ROW_HEIGHT} />
      )
    } else {
      return (
        <FlexibleRow
          mainContent={translate("profile-stack.settings-screen.truyou")}
          height={ACCNT_FLEX_ROW_HEIGHT}
          rightIcon={verified}
          rightAction={verified ? undefined : addAction}
          clickAction={goToTruYouVerify}
          testID="settings-screen.truyou"
          rightArrowHidden={true}
        />
      )
    }
  }

  const FacebookConnectRow = () => {
    const facebookId = data?.me?.account?.facebookId

    return (
      <FlexibleRow
        mainContent={translate("profile-stack.settings-screen.facebook")}
        clickAction={onConnectFacebook}
        height={ACCNT_FLEX_ROW_HEIGHT}
        rightIcon={facebookId ? FacebookConnectedIcon : undefined}
        rightAction={facebookId ? undefined : addAction}
        rightArrowHidden={true}
        testID="settings-screen.facebook"
      />
    )
  }

  const version = VersionNumber.appVersion
  const ouError = GraphGQLErrorParser(error)
  return (
    <Screen safeAreaMode={"top"}>
      <Flex direction="column" grow={0} height={NAVIGATION_BAR_HEIGHT}>
        <NavigationBar
          title={translate("profile-stack.settings-screen.title")}
          leftItems={[getNavigationBackButton("settings-screen.navigation-bar")]}
          testID="settings-screen.navigation-bar"
        />
      </Flex>

      {loading || accountLoading ? (
        <Center>
          <ActivityIndicator size={"large"} />
        </Center>
      ) : error ? (
        <Center>
          <EmptyState
            icon={ErrorBearFailure}
            title={ouError.title}
            subtitle={ouError.message}
            buttonTitle={translate("common-errors.server-error.button-title")}
            buttonHandler={refetch}
            testID="settings-screen.empty-state"
          />
        </Center>
      ) : (
        <ScrollView testID="account-stack.settings-screen">
          <Spacer direction="column" sizeStep={8} />
          <Flex direction="column" grow={1}>
            <AccountSectionLabel title={translate("profile-stack.settings-screen.section-label.profile")} />
            <FlexibleRowContainer extendMargin={false} skipFirstSeparator={true}>
              <FlexibleRow
                mainContent={name}
                height={ACCNT_FLEX_ROW_HEIGHT}
                clickAction={openChangeNameScreen}
                rightArrowHidden={true}
                rightAction={editAction}
                testID="settings-screen.name"
              />
              <AddPhoneRow />
              <VerifyEmailRow />
              <TruYouVerifiedRow />
              <FacebookConnectRow />
              <FlexibleRow
                mainContent={translate("profile-stack.settings-screen.password")}
                height={ACCNT_FLEX_ROW_HEIGHT}
                clickAction={openChangePasswordScreen}
                rightAction={editAction}
                rightArrowHidden={true}
                testID="settings-screen.password"
              />
              <FlexibleRow
                mainContent={getLocation()}
                height={ACCNT_FLEX_ROW_HEIGHT}
                clickAction={openSetLocation}
                rightAction={editAction}
                rightArrowHidden={true}
                testID="settings-screen.location"
              />
            </FlexibleRowContainer>

            <AccountSectionLabel title={translate("profile-stack.settings-screen.section-label.design-theme")} />
            <FlexibleRowContainer extendMargin={false} skipFirstSeparator={true}>
              {renderMatchSystemThemeRow()}
              {renderAvailableThemes()}
            </FlexibleRowContainer>

            <AccountSectionLabel title={translate("profile-stack.settings-screen.section-label.notifications")} />
            <FlexibleRowContainer extendMargin={false} skipFirstSeparator={true}>
              <FlexibleRow
                mainContent={translate("profile-stack.settings-screen.email")}
                height={ACCNT_FLEX_ROW_HEIGHT}
                clickAction={openEmailNotificationSettings}
                rightAction={editAction}
                rightArrowHidden={true}
                testID="settings-screen.email-notifications"
              />
              <FlexibleRow
                mainContent={translate("profile-stack.settings-screen.push")}
                height={ACCNT_FLEX_ROW_HEIGHT}
                clickAction={openPushNotificationSettings}
                rightAction={editAction}
                rightArrowHidden={true}
                testID="settings-screen.push-notifications"
              />
            </FlexibleRowContainer>

            {showServerMenu && (
              <>
                <AccountSectionLabel title={translate("profile-stack.settings-screen.section-label.developer")} />
                <FlexibleRowContainer extendMargin={false} skipFirstSeparator={true}>
                  <FlexibleRow
                    mainContent={
                      serverTitle
                        ? translate("profile-stack.settings-screen.server", { server: serverTitle })
                        : translate("profile-stack.server-setting.title")
                    }
                    height={ACCNT_FLEX_ROW_HEIGHT}
                    clickAction={openDevServerSetting}
                    rightAction={editAction}
                    rightArrowHidden={true}
                    testID="settings-screen.server"
                  />
                </FlexibleRowContainer>
              </>
            )}

            <AccountSectionLabel title={translate("profile-stack.settings-screen.section-label.info")} />
            <FlexibleRowContainer extendMargin={false} skipFirstSeparator={true}>
              <FlexibleRow
                mainContent={translate("profile-stack.settings-screen.about-mobile")}
                height={ACCNT_FLEX_ROW_HEIGHT}
                clickAction={getToAbout}
                rightArrowHidden={true}
                rightIcon={LogoCircle}
                testID="settings-screen.about"
              />
            </FlexibleRowContainer>

            <Margin marginStep={4} axisDistribution="center" crossAxisDistribution={"center"} direction="row" grow={1}>
              <Stack direction="column" childSeparationStep={4} grow={1}>
                <Button
                  buttonSize="large"
                  buttonType="tertiary"
                  title={translate("profile-stack.settings-screen.log-out")}
                  onClick={logOutPressed}
                  testID="settings-screen.log-out"
                />
                <Center>
                  <Text color="secondary" textType="tertiaryBody2">
                    {translate("auth.app-version", { version })}
                  </Text>
                </Center>
              </Stack>
            </Margin>
          </Flex>
        </ScrollView>
      )}
    </Screen>
  )
}
