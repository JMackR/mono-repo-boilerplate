import {
  AuthScreen,
  AuthScreenElement,
  GENERATE_OTP_CHALLENGE,
  GraphGQLErrorParser,
  MultifactorGeneratedResponse,
  MultifactorHeaderInfo,
  Mutation,
  removeNonNumericCharacters,
  translate,
  GET_MULTIFACTOR_OPTIONS,
  AccountDataContext,
  MultiFactorOption,
} from "shared-lib"
import { useMutation, useQuery } from "@apollo/react-hooks"
// import { AnalyticsAuthShared } from "shared-lib/analytics/account/analytics-auth-shared"
import {
  Button,
  Flex,
  Input,
  Margin,
  NavigationBar,
  ScrollView,
  Spacer,
  Stack,
  SVG,
  Text,
  TextEntryRef,
  TwoFactorLock,
  Center,
  EmptyState,
  ErrorBearFailure,
  useValidated,
  OnlyNumbersValidator,
} from "uc-lib"
import React, { useEffect, useLayoutEffect, useRef, useState, useContext, FC } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  KeyboardAvoidanceOverlayContainer,
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceView,
} from "../../../../keyboardavoidance"
import { getNavigationBackButton } from "../../../../navigation/common"
import { ScreenRouteAndStackNavigation } from "../../../../navigation/route"
import { Navigation } from "../../../../navigation/navigation"
import { NavigableRoute } from "../../../../navigation/navigator"
import { Screen } from "../../../../widgets"
import { AccountMFANavigatorParamList } from "../../../../navigation/account-mfa-navigator/acount-mfa-navigator"
import { AccountLoadingScreen } from "uc-lib/widgets/account"
import { AccountMultifactorProps } from "./account-multifactor-props"

const LAST_FR_SLICE_VALUE = -4

export const OTPChallengeScreen: FC<ScreenRouteAndStackNavigation<
  AccountMFANavigatorParamList,
  NavigableRoute.OTPChallenge
>> = ({ route }) => {
  const { data: me, loading: meLoading } = useContext(AccountDataContext)
  const { mfaRequiredTask, onCompleted, context } = route.params.props
  const [generateOTPChallenge, { data: challengeData, loading: loadingChallenge, error: challengeError }] = useMutation<
    Mutation
  >(GENERATE_OTP_CHALLENGE)
  const {
    loading: multifactorOptionsLoading,
    error: multifactorOptionsError,
    refetch: refetchMultifactorOptions,
  } = useQuery(GET_MULTIFACTOR_OPTIONS, {
    variables: { userId: me?.id },
    onCompleted: response => {
      const options = (response.multifactorOptions as MultiFactorOption[]).filter(option => {
        return option.type === "PHONE"
      })

      if (options && options.length > 0) {
        setMfaOption(options[0])
      }
    },
  })
  const { error: codeValidationError, validate } = useValidated([OnlyNumbersValidator])
  const [input, setInput] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string | undefined | null>()
  const [mfaOption, setMfaOption] = useState<MultiFactorOption>()
  const [handlingCallback, setHandlingCallback] = useState<boolean>(false)
  const insets = useSafeAreaInsets()
  const otpRef = useRef<TextEntryRef>(null)
  const screenName = AuthScreen.PinCodeInput

  useLayoutEffect(() => {
    setTimeout(() => otpRef.current?.focus(), 300)
  }, [])

  useEffect(() => {
    // AnalyticsAuthShared.trackOTPUiEventShow(screenName, AuthScreenElement.Back, context)
    // AnalyticsAuthShared.trackOTPUiEventShow(screenName, AuthScreenElement.VerifyPinCode, context)
    // AnalyticsAuthShared.trackOTPUiEventShow(screenName, AuthScreenElement.WhatIsThis, context)
    // AnalyticsAuthShared.trackOTPUiEventShow(screenName, AuthScreenElement.Resend, context)
    // AnalyticsAuthShared.trackOTPUiEventShow(screenName, AuthScreenElement.NoPhone, context)
  }, [])

  useEffect(() => {
    setErrorMessage(codeValidationError)
  }, [codeValidationError])

  useEffect(() => {
    if (mfaOption) {
      sendChallenge()
    }
  }, [mfaOption])

  const sendChallenge = async () => {
    try {
      const path = mfaOption?.challengeGenerationUrl
      const response = await generateOTPChallenge({
        variables: {
          path,
        },
      })
    } catch (error) {
      setErrorMessageFromErrorResponse(error)
    }
  }

  const textChangeHandler = (changedText?: string) => {
    setInput(changedText || "")
    validate(changedText)
  }

  const onVerifyCodeClicked = async () => {
    const multifactorResponse = challengeData?.generateMultifactorChallenge as MultifactorGeneratedResponse
    const multifactorHeaderInfo: MultifactorHeaderInfo = {
      otp: removeNonNumericCharacters(input) || "",
      mfaType: multifactorResponse.mfaType,
      mfaReferenceId: multifactorResponse.mfaReferenceId,
      userId: multifactorResponse.userId,
    }
    setHandlingCallback(true)
    try {
      await mfaRequiredTask(multifactorHeaderInfo)
      // AnalyticsAuthShared.trackAccountChallengeEventSuccess(context)
      // AnalyticsAuthShared.trackOTPUiEventClick(screenName, AuthScreenElement.VerifyPinCode, context, true)
      Navigation.popRootNavigator()
      onCompleted()
    } catch (err) {
      // AnalyticsAuthShared.trackOTPUiEventClick(screenName, AuthScreenElement.VerifyPinCode, context, false)
      setErrorMessageFromErrorResponse(err)
    }
    setHandlingCallback(false)
  }

  const onResendPressed = () => {
    // AnalyticsAuthShared.trackOTPUiEventClick(screenName, AuthScreenElement.Resend, context)
    sendChallenge()
  }

  const onDontHavePhonePressed = () => {
    // AnalyticsAuthShared.trackOTPUiEventClick(screenName, AuthScreenElement.NoPhone, context)
    Navigation.navigateToRoute(NavigableRoute.EmailChallengeInfo, route.params.props)
  }

  const setErrorMessageFromErrorResponse = error => {
    const { message } = GraphGQLErrorParser(error)
    setErrorMessage(message)
  }

  const shouldEnableButton = () => {
    return !loadingChallenge && !challengeError && !codeValidationError && input && input.length > 0 && !handlingCallback
  }

  const onBackPressed = () => {
    // AnalyticsAuthShared.trackPhoneVerificationUiEventClick(screenName, AuthScreenElement.Back, context)
  }

  if (multifactorOptionsLoading || meLoading) {
    return (
      <Screen safeAreaMode="all" screenName={screenName}>
        <NavigationBar
          title={translate("auth.multi-factor.verify-your-profile")}
          leftItems={[getNavigationBackButton("otp-challenge-screen.navigation-bar", onBackPressed)]}
          testID="otp-challenge-screen.navigation-bar"
        />
        <AccountLoadingScreen />
      </Screen>
    )
  } else if (multifactorOptionsError) {
    const { title, message } = GraphGQLErrorParser(multifactorOptionsError)
    return (
      <Screen safeAreaMode="all" screenName={screenName}>
        <NavigationBar
          title={translate("auth.multi-factor.verify-your-profile")}
          leftItems={[getNavigationBackButton("otp-challenge-screen.navigation-bar", onBackPressed)]}
          testID="otp-challenge-screen.navigation-bar"
        />
        <Center>
          <EmptyState
            icon={ErrorBearFailure}
            title={title}
            subtitle={message}
            buttonTitle={translate("common-errors.server-error.button-title")}
            buttonHandler={refetchMultifactorOptions}
            testID="inbox-screen.error-state"
          />
        </Center>
      </Screen>
    )
  } else {
    return (
      <Screen safeAreaMode="all" screenName={screenName}>
        <NavigationBar
          title={translate("auth.multi-factor.verify-your-profile")}
          leftItems={[getNavigationBackButton("otp-challenge-screen.navigation-bar", onBackPressed)]}
          testID="otp-challenge-screen.navigation-bar"
        />
        <ScrollView onlyScrollsWhenNeeded={true}>
          <KeyboardAvoidanceRollawayContainer direction="column" crossAxisDistribution="center" grow={1}>
            <Flex direction="column" crossAxisDistribution="center" grow={1}>
              <Margin marginStep={4}>
                <KeyboardAvoidanceView stackOrder={1} direction="column" shrink={0}>
                  <Stack direction="column" crossAxisDistribution="center" grow={1}>
                    <Spacer direction="column" sizeStep={6} />
                    <SVG localSVG={TwoFactorLock} tint={"primary"} />
                    <Spacer direction="column" sizeStep={6} />
                    <Text textType="headline3" textAlign="center">
                      {translate("profile-stack.verify-phone.code-header")}
                    </Text>
                    <Spacer direction="column" sizeStep={2} />
                    <Margin marginLeftStep={4} marginRightStep={4}>
                      <Text textType="primaryBody2" textAlign="center">
                        {translate("profile-stack.verify-phone.code-subheader", {
                          last_four_digits: ("" + mfaOption?.phoneNumber).slice(LAST_FR_SLICE_VALUE),
                        })}
                      </Text>
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
                      onClick={onDontHavePhonePressed}
                      title={translate("profile-stack.verify-phone.dont-have-phone")}
                      buttonSize="large"
                      buttonType="flat"
                    />
                    <Button
                      onClick={onResendPressed}
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
                disabled={!shouldEnableButton()}
                loading={loadingChallenge || handlingCallback || loadingChallenge}
              />
            </Margin>
          </KeyboardAvoidanceView>
        </KeyboardAvoidanceOverlayContainer>
      </Screen>
    )
  }
}
