import React, { useRef, useState } from "react"
import { AUTH_ERROR_CODE, ValidatedForm, ValidatedFormButton, ValidatedFormInput, translate } from "shared-lib"
import { useAuth } from "shared-lib/providers"
import {
  RequiredValidator,
  EmailValidator,
  Margin,
  SpacerFlex,
  Stack,
  Text,
  ErrorIcon,
  Spacer,
  TextEntryRef,
  Background,
  Button,
  Flex,
  HomeImage1,
  SVG,
  HomeSignup,
  LocalSVGSource,
  HomeSignin,
} from "uc-lib"
import { AuthChannel, AuthScreen, AuthScreenContext, AuthScreenElement, AnalyticsAuth } from "shared-lib/analytics"
import { Screen } from "mobile/src/widgets/screen"
import {
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceView,
  KeyboardAvoidanceOverlayContainer,
} from "../../../keyboardavoidance"
import { AuthParamList } from "../../../navigation/auth-navigator"
import { ScreenRoute } from "../../../navigation/route"
import { Navigation } from "../../../navigation/navigation"
import { NavigableRoute } from "../../../navigation/navigator/navigableroute"
import { AffirmRejectDialogScreenProps } from "../dialog"
import { LoginAttributionText } from "../common/login-attribution-text"
import { openLoginScreen, openScreenWithOriginalPayload } from "../common/login-common"
import { LoginHeader } from "../common/login-header"
import { Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { isEmpty } from "lodash"
// import { AnalyticsAuthShared } from "shared-lib/analytics/account/analytics-auth-shared"
const SignUpImage = require("../images/create-account.png")

export const SignupScreen: React.FC<ScreenRoute<AuthParamList, NavigableRoute.AuthSignup>> = ({ route }) => {
  const [error, setError] = useState<string | undefined>()
  const auth = useAuth()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string | undefined>()
  const [name, setName] = useState<string | undefined>()
  const [password, setPassword] = useState<string | undefined>()
  const emailRef = useRef<TextEntryRef>(null)
  const passwordRef = useRef<TextEntryRef>(null)
  const insets = useSafeAreaInsets()
  const onSignup = async () => {
    // AnalyticsAuthShared.trackAccountCreationUiEventClick(AuthScreen.CreateAccount, AuthScreenElement.CreateAccount)

    console.log("fire signup")
    openScreenWithOriginalPayload(NavigableRoute.OnboardingStack, route.params?.props?.originPayload)
    // Navigation.navigateToRoute(NavigableRoute.OnboardingFlowStep1, {})
    try {
      setError(undefined)
      setLoading(true)
      // const { data } = await signup({
      //   variables: {
      //     email,
      //     name,
      //     password,
      //     clientType,
      //   },
      // })
      // auth.handleSuccessfulAuth(data.signup)
      // AnalyticsAuthShared.trackUserRegistered(AuthChannel.Email)
      // AnalyticsAuth.trackSignUpWithEmail()
      console.log("what is fire")

      // Navigation.navigateToRoute(NavigableRoute.VerifyPhone, {
      //   skippable: true,
      //   context: AuthScreenContext.Registration,
      //   originPayload: route.params.props.originPayload,
      // })
    } catch (e) {
      // const { message, code } = GraphGQLErrorParser(e)
      // if (AUTH_ERROR_CODE.EMAIL_ALREADY_REGISTERED === code) {
      //   showDialogExistingAccount()
      //   setLoading(false)
      //   return
      // }
      // setError(message)
      setLoading(false)
    }
  }
  const showDialogExistingAccount = () => {
    const props: AffirmRejectDialogScreenProps = {
      onAffirm: () => {
        Navigation.performWhenAvailable(() => {
          openScreenWithOriginalPayload(NavigableRoute.AuthLogin, route.params.props.originPayload)
        })
      },
      onReject: () => {},
      icon: ErrorIcon,
      affirmText: translate("auth.login-button"),
      rejectText: translate("common-actions.cancel"),
      title: translate("auth.already-have-account-error"),
      body: translate("auth.already-have-account-error-body"),
    }
    Navigation.navigateToRoute(NavigableRoute.AffirmRejectDialog, props)
  }

  const focusEmail = () => {
    emailRef.current?.focus()
  }

  const focusPassword = () => {
    passwordRef.current?.focus()
  }

  // Submit is visually, but not funcationally, disabled until the user enters something in each required field. Below works upon
  // screen entry with how isSubmitDisabled  is initially, but will be overridden by it after errors appear
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

  const resizedSVG = resizeSVGForNavigationBarItem(HomeSignup)
  const alreadyHaveAccountPressed = () => {
    openLoginScreen()
  }

  return (
    <Screen safeAreaMode="all" screenName={AuthScreen.CreateAccount} dismissKeyboardOnTap={true}>
      <ValidatedForm
        validators={{
          email: [RequiredValidator, EmailValidator],
          password: [RequiredValidator],
        }}
      >
        <KeyboardAvoidanceRollawayContainer direction="row" grow={1}>
          <Spacer direction="column" sizeStep={10} />
          <Stack
            direction="column"
            childSeparationStep={5}
            grow={0}
            crossAxisDistribution={"center"}
            axisDistribution={"center"}
          >
            <SVG localSVG={resizedSVG} />
            <Spacer direction="column" sizeStep={5} />
          </Stack>
          <Stack direction="column" childSeparationStep={5} grow={0}>
            <Spacer direction="column" sizeStep={20} />
            <Margin marginStep={4} direction="column" grow={1}>
              <Stack childSeparationStep={2} direction="column" crossAxisDistribution={"center"}>
                <Text textType="headline2" text={translate("auth.signup-title")} />
              </Stack>
            </Margin>

            <Margin marginStep={4} grow={1} direction="column">
              <KeyboardAvoidanceView stackOrder={1} direction="column" shrink={0}>
                <Stack childSeparationStep={6} direction="column">
                  <ValidatedFormInput
                    ref={emailRef}
                    role="email"
                    text={email}
                    keyboardType="email-address"
                    title={translate("auth.email-address")}
                    hint={translate("auth.email-address-hint")}
                    textChangeHandler={setEmail}
                    onSubmitEditing={focusPassword}
                    returnKeyType={"next"}
                    testID="create-account-screen.email"
                  />
                  <ValidatedFormInput
                    ref={passwordRef}
                    role="password"
                    text={password}
                    title={translate("auth.password")}
                    secureTextEntry={true}
                    textChangeHandler={setPassword}
                    returnKeyType={"done"}
                    testID="create-account-screen.password"
                  />
                </Stack>
              </KeyboardAvoidanceView>
              <Stack direction="column">
                <Spacer direction="column" sizeStep={4} />
                {error && <Text textAlign="center" text={error} color="error" textType="tertiaryBody2" />}
              </Stack>
            </Margin>
          </Stack>
        </KeyboardAvoidanceRollawayContainer>
        <KeyboardAvoidanceOverlayContainer absoluteBottom={insets.bottom} grow={0} direction="row">
          <KeyboardAvoidanceView stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
            <Margin marginStep={4} direction="column" grow={1}>
              <Stack direction="column" childSeparationStep={12}>
                <Background />
                <ValidatedFormButton
                  title={translate("auth.signup-button")}
                  buttonSize="large"
                  buttonType={"primary"}
                  disabled={false}
                  onClick={onSignup}
                  testID="create-account-screen.create-account-button"
                />
              </Stack>
              <Spacer direction="column" sizeStep={4} />
              <Flex direction="row" grow={0} axisDistribution="center">
                <Button
                  buttonType={"flat"}
                  buttonSize={"small"}
                  onClick={alreadyHaveAccountPressed}
                  testID="create-account-screen.have-account-link"
                  title={translate("auth.already-have-account")}
                />
              </Flex>
            </Margin>
          </KeyboardAvoidanceView>
        </KeyboardAvoidanceOverlayContainer>
      </ValidatedForm>
    </Screen>
  )
}
