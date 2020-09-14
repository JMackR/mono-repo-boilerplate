import { ScreenRouteAndStackNavigation } from "../../../navigation/route"
import { NavigableRoute } from "../../../navigation/navigator/navigableroute"
import { Screen } from "../../../widgets"
import {
  NavigationBar,
  Flex,
  Margin,
  Stack,
  Spacer,
  SVG,
  TwoFactorLock,
  Text,
  Input,
  Button,
  TextEntryRef,
  ScrollView,
  OnlyNumbersValidator,
  useValidated,
} from "uc-lib"
import {
  translate,
  useAuth,
  AnalyticsAuth,
  REQUEST_MULTI_FACTOR_CODE_MUTATION,
  MULTI_FACTOR_LOGIN_MUTATION,
  removeNonNumericCharacters,
  GraphGQLErrorParser,
  AuthScreenElement,
  AuthScreenContext,
} from "shared-lib"
import { AuthScreen } from "shared-lib/analytics"
import { useMutation } from "@apollo/react-hooks"
import { getNavigationBackButton } from "../../../navigation/common"
import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { CommonNavs, Navigation } from "../../../navigation/navigation"
import { AccountLoadingScreen } from "uc-lib/widgets/account"
import { AuthParamList } from "../../../navigation/auth-navigator"
import { MultiFactorMetadata } from "../shared-lib/type-defs/generated-types/type-defs"
// import { AnalyticsAuthShared } from "shared-lib/analytics/account/analytics-auth-shared"
import { useSafeArea } from "react-native-safe-area-context"
import {
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceView,
  KeyboardAvoidanceOverlayContainer,
} from "../../../keyboardavoidance"

export const MultiFactorAuthScreen: React.FC<ScreenRouteAndStackNavigation<
  AuthParamList,
  NavigableRoute.AuthMultifactor
>> = ({ route }) => {
  const { email, password } = route.params.props

  const [requestMFACode, { loading }] = useMutation(REQUEST_MULTI_FACTOR_CODE_MUTATION)
  const [multiFactorLogin, { loading: loginLoading }] = useMutation(MULTI_FACTOR_LOGIN_MUTATION)
  const { error: codeValidationError, validate } = useValidated([OnlyNumbersValidator])
  const [input, setInput] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string | undefined | null>()
  const [multifactorMetadata, setMultifactorMetadata] = useState<MultiFactorMetadata | null>()
  const auth = useAuth()
  const insets = useSafeArea()
  const otpRef = useRef<TextEntryRef>(null)

  useLayoutEffect(() => {
    setTimeout(() => otpRef.current?.focus(), 300)
  }, [])

  useEffect(() => {
    sendCode()
  }, [])

  useEffect(() => {
    setErrorMessage(codeValidationError)
  }, [codeValidationError])

  const textChangeHandler = (changedText?: string) => {
    setInput(changedText || "")
    validate(changedText)
  }

  const onVerifyCodeClicked = async () => {
    try {
      const { data } = await multiFactorLogin({
        variables: {
          email,
          password,
          code: removeNonNumericCharacters(input) || "",
          referenceId: multifactorMetadata?.mfaReferenceId,
          type: multifactorMetadata?.mfaType,
        },
      })
      auth.handleSuccessfulAuth(data.multifactorLogin)
      AnalyticsAuth.trackLoginWithEmail()

      AnalyticsAuthShared.trackLoginUiEventClick(AuthScreen.EmailLogin, AuthScreenElement.Login, true)
      Navigation.popRootNavigator()
    } catch (error) {
      AnalyticsAuthShared.trackLoginUiEventClick(AuthScreen.EmailLogin, AuthScreenElement.Login, false)
      const { message } = GraphGQLErrorParser(error)
      setErrorMessage(message)
    }
  }

  const sendCode = async () => {
    try {
      const { data } = await requestMFACode({
        variables: {
          email,
          password,
        },
      })
      setMultifactorMetadata(data.requestMultifactorCode as MultiFactorMetadata)
    } catch (error) {
      CommonNavs.presentError({ error })
    }
  }

  const sendCodeClicked = () => {
    AnalyticsAuthShared.trackPhoneVerificationUiEventClick(
      AuthScreen.PhoneNumberInput,
      AuthScreenElement.SendCode,
      AuthScreenContext.Registration,
    )
    sendCode()
  }

  const shouldEnableButton = () => {
    return !loginLoading && !errorMessage && input && input.length > 0
  }

  if (loading) {
    return <AccountLoadingScreen />
  } else {
    return (
      <Screen safeAreaMode="top">
        <NavigationBar
          title={translate("auth.multi-factor.verify-your-profile")}
          leftItems={[getNavigationBackButton("multi-factor-auth-screen.navigation-bar")]}
          testID="multi-factor-auth-screen.navigation-bar"
        />
        <ScrollView onlyScrollsWhenNeeded={true}>
          <KeyboardAvoidanceRollawayContainer direction="column" crossAxisDistribution="center" grow={1}>
            <Flex direction="column" crossAxisDistribution="center" grow={1}>
              <Margin marginStep={4} grow={1}>
                <KeyboardAvoidanceView stackOrder={1} direction="column" shrink={0}>
                  <Stack direction="column" crossAxisDistribution="center" grow={0}>
                    <Spacer direction="column" sizeStep={6} />
                    <SVG localSVG={TwoFactorLock} tint={"primary"} />
                    <Spacer direction="column" sizeStep={6} />
                    <Text
                      textType="headline3"
                      text={translate("profile-stack.verify-phone.code-header")}
                      textAlign="center"
                    />

                    <Spacer direction="column" sizeStep={2} />
                    <Margin marginLeftStep={4} marginRightStep={4}>
                      <Text textType="primaryBody2" text={multifactorMetadata?.description} textAlign="center" />
                    </Margin>
                    <Spacer direction="column" sizeStep={8} />
                    <Input
                      ref={otpRef}
                      title={translate("profile-stack.verify-phone.code")}
                      keyboardType="number-pad"
                      error={errorMessage}
                      text={input}
                      textChangeHandler={textChangeHandler}
                      returnKeyType="done"
                    />
                    <Spacer direction="column" sizeStep={4} />
                    <Button
                      onClick={sendCodeClicked}
                      title={translate("profile-stack.verify-phone.resend")}
                      buttonSize="large"
                      buttonType="flat"
                    />
                  </Stack>
                </KeyboardAvoidanceView>
              </Margin>
            </Flex>
          </KeyboardAvoidanceRollawayContainer>
        </ScrollView>
        <KeyboardAvoidanceOverlayContainer grow={0} direction="row" absoluteBottom={insets.bottom}>
          <KeyboardAvoidanceView stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
            <Margin marginStep={4} direction="column">
              <Button
                onClick={onVerifyCodeClicked}
                title={translate("profile-stack.verify-phone.verify")}
                buttonSize="large"
                buttonType={shouldEnableButton() ? "primary" : "disabled"}
                loading={loginLoading}
              />
            </Margin>
          </KeyboardAvoidanceView>
        </KeyboardAvoidanceOverlayContainer>
      </Screen>
    )
  }
}
