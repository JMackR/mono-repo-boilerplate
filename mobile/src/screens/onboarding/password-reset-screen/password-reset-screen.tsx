import { AuthParamList } from "mobile/src/navigation/auth-navigator"
import {
  ValidatedForm,
  ValidatedFormButton,
  ValidatedFormInput,
  RESET_PASSWORD_MUTATION,
  translate,
  AuthScreenElement,
} from "shared-lib"
import { AuthScreen } from "shared-lib/analytics"
import { useMutation } from "@apollo/react-hooks"
import {
  RequiredValidator,
  EmailValidator,
  Margin,
  SpacerFlex,
  Stack,
  Text,
  Spacer,
  Flex,
  Button,
  SVG,
  LocalSVGSource,
  HomeSignin,
  HomeImage1,
} from "uc-lib"
import React, { FC, useState, useEffect } from "react"
import { useSafeArea } from "react-native-safe-area-context"
import {
  KeyboardAvoidanceOverlayContainer,
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceView,
} from "../../../keyboardavoidance"
import { ScreenRouteAndStackNavigation } from "../../../navigation/route"
import { Navigation, CommonNavs } from "../../../navigation/navigation"
import { NavigableRoute } from "../../../navigation/navigator/navigableroute"
import { Screen } from "../../../widgets"
import { AffirmRejectDialogScreenProps } from "../dialog"
import { LoginHeader } from "../common/login-header"
import { Image } from "react-native"
// import { AnalyticsAuthShared } from "shared-lib/analytics/account/analytics-auth-shared"
const homeImage = require("../images/reset.png")

export const PasswordResetScreen: FC<ScreenRouteAndStackNavigation<AuthParamList, NavigableRoute.PasswordReset>> = ({
  route,
}) => {
  const insets = useSafeArea()
  const [email, setEmail] = useState(route.params.props.email)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const makeRequest = async () => {
    setLoading(true)
    setError(undefined)
    try {
      // await resetPassword({
      //   variables: {
      //     email,
      //   },
      // })
      // AnalyticsAuthShared.trackResetPasswordEventClick(AuthScreenElement.Send, true)
    } catch (error) {
      CommonNavs.presentError({ error })
      // AnalyticsAuthShared.trackResetPasswordEventClick(AuthScreenElement.Send, false)
    }
    setLoading(false)
  }

  useEffect(() => {
    // AnalyticsAuthShared.trackResetPasswordEventShow(AuthScreenElement.Send)
  }, [])

  const onSendClick = async () => {
    // await makeRequest()
    // const props: AffirmRejectDialogScreenProps = {
    //   onAffirm: () => {
    //     Navigation.popToTop()
    //     // AnalyticsAuthShared.trackAccountResetPasswordDialogClick(AuthScreenElement.GotIt)
    //   },
    //   onReject: async () => {
    //     // AnalyticsAuthShared.trackAccountResetPasswordDialogClick(AuthScreenElement.Resend)
    //     await makeRequest()
    //   },
    //   dismissOnReject: false,
    //   affirmText: translate("auth.reset-password.got-it"),
    //   rejectText: translate("auth.reset-password.resend"),
    //   title: translate("auth.reset-password.dialog-title"),
    //   body: translate("auth.reset-password.dialog-content"),
    // }
    // AnalyticsAuthShared.trackAccountResetPasswordCheckyourEmailDialogShow()
    Navigation.navigateToRoute(NavigableRoute.ResetConfirm, { originPayload: route.params?.props?.originPayload })
  }
  const onRememberClick = () => {
    console.log("FIRE on click")
    // AnalyticsAuthShared.trackLoginUiEventClick(AuthScreen.EmailLogin, AuthScreenElement.CreateAccount)
    Navigation.navigateToRoute(NavigableRoute.AuthLogin, { originPayload: route.params?.props?.originPayload })
  }
  const resizeSVGForNavigationBarItem = (svgSource: LocalSVGSource | undefined) => {
    if (svgSource) {
      return {
        SVG: svgSource.SVG,
        size: {
          width: "100%",
        },
      }
    }
    return undefined
  }

  const resizedSVG = resizeSVGForNavigationBarItem(HomeImage1)
  return (
    <Screen safeAreaMode="all" screenName={AuthScreen.ResetPasswordThroughEmail} dismissKeyboardOnTap={true}>
      <ValidatedForm
        validators={{
          email: [RequiredValidator, EmailValidator],
        }}
      >
        <KeyboardAvoidanceRollawayContainer direction="row" grow={1}>
          <Stack direction="column" childSeparationStep={10} grow={1}>
            <Spacer direction="column" sizeStep={2} />
            <SVG localSVG={resizedSVG} />
            <Margin marginStep={4} grow={1} direction="column">
              <KeyboardAvoidanceView stackOrder={1} direction="column" shrink={0}>
                <Stack childSeparationStep={8} direction="column">
                  <Margin marginStep={4} direction="column" grow={1}>
                    <Stack childSeparationStep={10} direction="column" crossAxisDistribution={"center"}>
                      <Text textType="headline2" text={translate("auth.reset-password.title")} />
                    </Stack>
                  </Margin>
                  <Text textType="primaryBody2" text={translate("auth.reset-password.reset-password-note")} />
                  <Stack childSeparationStep={4} direction="column">
                    <ValidatedFormInput
                      role="email"
                      text={email}
                      keyboardType="email-address"
                      title={translate("auth.email-address")}
                      textChangeHandler={setEmail}
                      hint={translate("auth.email-address-hint")}
                    />
                  </Stack>
                </Stack>
              </KeyboardAvoidanceView>
            </Margin>
            <SpacerFlex />
            {error && <Text textAlign="center" text={error} color="error" textType="tertiaryBody2" />}
          </Stack>
        </KeyboardAvoidanceRollawayContainer>
        <KeyboardAvoidanceOverlayContainer absoluteBottom={insets.bottom} grow={0} direction="row">
          <KeyboardAvoidanceView stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
            <Margin marginStep={4} direction="column" grow={1}>
              <Stack direction="column" childSeparationStep={4}>
                <ValidatedFormButton
                  title={translate("auth.reset-password.send")}
                  buttonSize="large"
                  buttonType={loading ? "disabled" : "primary"}
                  onClick={onSendClick}
                />
              </Stack>
              <Stack direction="column">
                <Spacer direction="column" sizeStep={8} />
                <Flex direction="row" grow={0} axisDistribution="center">
                  <Text
                    color="brand"
                    textType="secondaryBody2"
                    onPress={onRememberClick}
                    textDecorationLine={"underline"}
                    testID="email-reset-password-screen.remember"
                    text={translate("auth.reset-password.remember")}
                  />
                </Flex>
                <Spacer direction="column" sizeStep={2} />
              </Stack>
            </Margin>
          </KeyboardAvoidanceView>
        </KeyboardAvoidanceOverlayContainer>
      </ValidatedForm>
    </Screen>
  )
}
