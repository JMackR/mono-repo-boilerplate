import { AuthParamList } from "mobile/src/navigation/auth-navigator"
import { Screen } from "mobile/src/widgets/screen"
import {
  AUTH_ERROR_CODE,
  GraphGQLErrorParser,
  ValidatedForm,
  ValidatedFormButton,
  ValidatedFormInput,
  translate,
} from "shared-lib"
import { AuthScreen } from "shared-lib/analytics"
import { useAuth } from "shared-lib/providers"
import { useMutation } from "@apollo/react-hooks"

import {
  Background,
  Button,
  Flex,
  Margin,
  Spacer,
  Stack,
  Text,
  TextEntryRef,
  RequiredValidator,
  EmailValidator,
  HomeSignup,
  SVG,
  HomeSignin,
  LocalSVGSource,
} from "uc-lib"
import React, { useRef, useState, useEffect } from "react"
import { Keyboard } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  KeyboardAvoidanceOverlayContainer,
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceView,
} from "../../../keyboardavoidance"
import { ScreenRoute } from "../../../navigation/route"
import { Navigation } from "../../../navigation/navigation/navigation"
import { NavigableRoute } from "../../../navigation/navigator/navigableroute"
import { LoginAttributionText } from "../common/login-attribution-text"
import { handleSuccessfulLogin, openForgotPassword } from "../common/login-common"
import { LoginHeader } from "../common/login-header"
import { CommonNavs } from "../../../navigation/navigation"
import { isEmpty } from "lodash"
import { useNavigationState } from "@react-navigation/native"
// import { AuthChannel, AuthScreenElement, AnalyticsAuth } from "shared-lib/analytics"
// import { AnalyticsAuthShared } from "shared-lib/analytics/account/analytics-auth-shared"
const SignInImage = require("../images/sign-in.png")
export const LoginScreen: React.FC<ScreenRoute<AuthParamList, NavigableRoute.AuthLogin>> = ({ route }) => {
  const [email, setEmail] = useState<string | undefined>()
  const [password, setPassword] = useState<string | undefined>()
  const [emailError, setEmailError] = useState<string | undefined>()
  const [passwordError, setPasswordError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [isInvalidCredentials, setIsInvalidCredentials] = useState<boolean>(false)
  const pwRef = useRef<TextEntryRef>(null)
  const insets = useSafeAreaInsets()

  const auth = useAuth()
  // const [login] = useMutation(LOGIN_MUTATION)

  const onLogin = async () => {
    Keyboard.dismiss()
    setEmailError(undefined)
    setPasswordError(undefined)
    setIsInvalidCredentials(false)

    setLoading(true)
    let successfulLogin = false
    Navigation.navigateToRoute(NavigableRoute.HomeTabs, { originPayload: route.params?.props?.originPayload })
    // try {
    //   // const { data } = await login({
    //   //   variables: {
    //   //     email,
    //   //     password,
    //   //   },
    //   // })
    //
    //   // await auth.handleSuccessfulAuth(data.login)
    //   successfulLogin = true
    //   // // AnalyticsAuth.trackLoginWithEmail()
    //
    //   // AnalyticsAuthShared.trackUserLoggedIn(AuthChannel.Email)
    //   // AnalyticsAuthShared.trackLoginUiEventClick(AuthScreen.EmailLogin, AuthScreenElement.Login, true)
    // } catch (error) {
    //   const exception = GraphGQLErrorParser(error)
    //   const { code } = exception
    //
    //   if (code === AUTH_ERROR_CODE.MFA_REQUIRED) {
    //     Navigation.navigateToRoute(NavigableRoute.AuthMultifactor, { email, password })
    //     return
    //   } else if (code === AUTH_ERROR_CODE.INVALID_CREDENTIALS) {
    //     setEmailError(translate("auth.username-password-error"))
    //     setPasswordError(translate("auth.username-password-error"))
    //     setIsInvalidCredentials(true)
    //   } else {
    //     CommonNavs.presentError({ exception })
    //   }
    //
    //   // AnalyticsAuthShared.trackLoginUiEventClick(AuthScreen.EmailLogin, AuthScreenElement.Login, false)
    // }
    //
    // try {
    //   // this is done separately to seprate error handling between graphql layer (above), and routing layer
    //   if (successfulLogin) {
    //     handleSuccessfulLogin(route.params.props?.originPayload)
    //   }
    // } catch (error) {
    //   Navigation.navigateToRoute(NavigableRoute.AuthLogin)
    // }

    setLoading(false)
  }

  const onSignupClick = () => {
    console.log("FIRE on click")
    // AnalyticsAuthShared.trackLoginUiEventClick(AuthScreen.EmailLogin, AuthScreenElement.CreateAccount)
    Navigation.navigateToRoute(NavigableRoute.AuthSignup, { originPayload: route.params?.props?.originPayload })
  }

  const focusPassword = () => {
    pwRef.current?.focus()
  }

  const onForgotPasswordPressed = () => {
    openForgotPassword(AuthScreen.EmailLogin, email)
  }

  // Submit is visually, but not funcationally, disabled until the user enters something in each required field. Below works upon
  // screen entry with how isSubmitDisabled  is initially, but will be overridden by it after errors appear
  const isSubmitVisuallyDisabled = isEmpty(email) || isEmpty(password)

  // Disable the Submit button if there is any error text displayed
  const isSubmitDisabled = loading || isInvalidCredentials || !isEmpty(emailError) || !isEmpty(passwordError)

  // If the credentials were invalid, we need to clear the error on both fields when either of them is used.
  // We only want to clear the changed field for all other errors.
  const onEmailChanged = (changedText?: string) => {
    setEmail(changedText)
    setEmailError(undefined)

    if (isInvalidCredentials) {
      setPasswordError(undefined)
      setIsInvalidCredentials(false)
    }
  }

  const onPasswordChanged = (changedText?: string) => {
    setPassword(changedText)
    setPasswordError(undefined)

    if (isInvalidCredentials) {
      setEmailError(undefined)
      setIsInvalidCredentials(false)
    }
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

  const resizedSVG = resizeSVGForNavigationBarItem(HomeSignin)

  return (
    <Screen safeAreaMode="all" screenName={AuthScreen.EmailLogin} dismissKeyboardOnTap={true}>
      <ValidatedForm
        validators={{
          email: [RequiredValidator, EmailValidator],
          password: [RequiredValidator],
        }}
      >
        <KeyboardAvoidanceRollawayContainer direction="row" grow={1}>
          <Stack direction="column" childSeparationStep={1} grow={0}>
            <Spacer direction="column" sizeStep={10} />
            <SVG localSVG={resizedSVG} />
          </Stack>
          <Stack direction="column" childSeparationStep={5} grow={0}>
            <Spacer direction="column" sizeStep={10} />
            <Margin marginStep={4} direction="column" grow={1}>
              <Stack childSeparationStep={2} direction="column" crossAxisDistribution={"center"}>
                <Text textType="headline2" text={translate("auth.login-title")} />
              </Stack>
            </Margin>

            <Margin marginStep={4} grow={1} direction="column">
              <KeyboardAvoidanceView stackOrder={1} direction="column" shrink={0}>
                <Stack childSeparationStep={2} direction="column">
                  <ValidatedFormInput
                    role="email"
                    text={email}
                    keyboardType="email-address"
                    title={translate("auth.email-address")}
                    hint={translate("auth.email-address-hint")}
                    textChangeHandler={onEmailChanged}
                    onSubmitEditing={focusPassword}
                    returnKeyType={"next"}
                    error={emailError}
                    testID="email-login-screen.email"
                  />
                  <ValidatedFormInput
                    ref={pwRef}
                    role="password"
                    text={password}
                    title={translate("auth.password")}
                    secureTextEntry={true}
                    onSubmitEditing={onLogin}
                    returnKeyType={"done"}
                    textChangeHandler={onPasswordChanged}
                    error={passwordError}
                    testID="email-login-screen.password"
                  />
                </Stack>
              </KeyboardAvoidanceView>
            </Margin>
          </Stack>
        </KeyboardAvoidanceRollawayContainer>
        <KeyboardAvoidanceOverlayContainer absoluteBottom={insets.bottom} grow={0} direction="row">
          <KeyboardAvoidanceView stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
            <Margin marginStep={4} direction="column" grow={1}>
              <Stack direction="column" childSeparationStep={6}>
                <Background />

                <ValidatedFormButton
                  title={translate("auth.login-button")}
                  buttonSize="large"
                  onClick={onLogin}
                  buttonType={isSubmitVisuallyDisabled ? "disabled" : "primary"}
                  disabled={isSubmitVisuallyDisabled}
                  testID="email-login-screen.login-button"
                />
                <Button
                  buttonSize="large"
                  buttonType="secondary"
                  title={translate("auth.signup-button")}
                  onClick={onSignupClick}
                  testID="email-landing-screen.signup-button"
                />
              </Stack>

              <Stack direction="column">
                <Spacer direction="column" sizeStep={8} />
                <Flex direction="row" grow={0} axisDistribution="center">
                  <Text
                    color="brand"
                    textType="secondaryBody2"
                    onPress={onForgotPasswordPressed}
                    textDecorationLine={"underline"}
                    testID="email-login-screen.forgot-password-link"
                    text={translate("auth.forgot-your-password")}
                  />
                </Flex>
                <Spacer direction="column" sizeStep={1} />
              </Stack>
            </Margin>
          </KeyboardAvoidanceView>
        </KeyboardAvoidanceOverlayContainer>
      </ValidatedForm>
    </Screen>
  )
}
