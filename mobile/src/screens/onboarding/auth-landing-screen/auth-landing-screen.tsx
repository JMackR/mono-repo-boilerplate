import { translate } from "shared-lib"
import { AuthScreen } from "shared-lib/analytics"
import { Button, Margin, Stack, Spacer, Text, Center, LogoPrimaryWithTag, SVG, AuthLandingImage } from "uc-lib"
import React, { FC } from "react"
import { AuthParamList } from "../../../navigation/auth-navigator"
import { ScreenRoute } from "../../../navigation/route"
import { NavigableRoute } from "../../../navigation/navigator/navigableroute"
import { Screen } from "../../../widgets"
import { openScreenWithOriginalPayload } from "../common/login-common"
import { LoginHeader } from "../common/login-header"
import { LoginAttributionText } from "../common/login-attribution-text"
import VersionNumber from "react-native-version-number"
import { Image } from "react-native"
import { useNavigationState } from "@react-navigation/native"

export const AuthLandingScreen: FC<ScreenRoute<AuthParamList, NavigableRoute.AuthEmailLanding>> = ({ route }) => {
  const onSignupClick = () => {
    // AnalyticsAuthShared.trackLoginUiEventClick(AuthScreen.EmailLogin, AuthScreenElement.CreateAccount)
    // console.log("what is this", NavigableRoute.AuthSignup)
    openScreenWithOriginalPayload(NavigableRoute.AuthSignup, route.params?.props?.originPayload)
  }

  const openLoginScreenPassingParams = () => {
    // AnalyticsAuthShared.trackLoginUiEventClick(AuthScreen.LoginCreateAccount, AuthScreenElement.LoginEmail)
    openScreenWithOriginalPayload(NavigableRoute.AuthLogin, route.params?.props?.originPayload)
  }
  // AuthLandingImage
  const version = VersionNumber.appVersion
  const state = useNavigationState((state) => state)
  return (
    <Screen safeAreaMode="none" screenName={AuthScreen.EmailLanding}>
      {/* <SVG localSVG={AuthLandingImage} size={{ width: "100%" }} />*/}
      <Image source={require("../images/initial-screen.png")} style={{ width: "100%" }} />
      <Margin direction="column" grow={1} marginStep={4} marginTopStep={15}>
        <Stack direction="column" grow={1} childSeparationStep={10}>
          <Button
            buttonSize="large"
            buttonType="primary"
            title={translate("auth.login-button")}
            onClick={openLoginScreenPassingParams}
            testID="email-landing-screen.login-button-button"
          />
          <Button
            buttonSize="large"
            buttonType="secondary"
            title={translate("auth.signup-button")}
            onClick={onSignupClick}
            testID="email-landing-screen.signup-button"
          />
        </Stack>
      </Margin>
      <Stack direction="column" childSeparationStep={4}>
        {/* <Margin marginRightStep={1} marginLeftStep={1} direction="column" crossAxisDistribution="center">
          <LoginAttributionText screen={AuthScreen.LoginCreateAccount} />
        </Margin>*/}
        <Center>
          <Text color="secondary" textType="tertiaryBody2" text={translate("auth.app-version", { version })} />
        </Center>
        <Spacer direction="column" sizeStep={5} />
      </Stack>
    </Screen>
  )
}
