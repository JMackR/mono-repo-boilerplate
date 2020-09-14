import React, { FC, useState, useRef, useEffect, useContext } from "react"
import { AccountMFANavigatorParamList } from "../../../../navigation/account-mfa-navigator/acount-mfa-navigator"
import { NavigableRoute, Navigator } from "../../../../navigation/navigator"
import { ScreenRouteAndStackNavigation } from "../../../../navigation/route"
import {
  TextEntryRef,
  NavigationBar,
  Margin,
  ScrollView,
  Stack,
  Spacer,
  SVG,
  TwoFactorLock,
  Text,
  Input,
  Button,
  OnlyNumbersValidator,
  useValidated,
} from "uc-lib"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Screen } from "../../../../widgets"
import {
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceView,
  KeyboardAvoidanceOverlayContainer,
} from "../../../../keyboardavoidance"
import {
  translate,
  MultifactorHeaderInfo,
  removeNonNumericCharacters,
  MultifactorGeneratedResponse,
  GraphGQLErrorParser,
  GENERATE_EMAIL_MFA_CHALLENGE,
  AccountDataContext,
  // AuthScreen,
  // AnalyticsAuthShared,
  AuthScreenElement,
} from "shared-lib"
import { useMutation } from "@apollo/react-hooks"
import { getNavigationBackButton } from "../../../../navigation/common"
import { Navigation } from "../../../../navigation/navigation"
import { AccountMultifactorProps } from "./account-multifactor-props"

export interface EmailChallengeScreenProps extends AccountMultifactorProps {
  mfaResponse: MultifactorGeneratedResponse
  phoneNumber: string
}

export const EmailChallengeScreen: FC<ScreenRouteAndStackNavigation<
  AccountMFANavigatorParamList,
  NavigableRoute.EmailChallenge
>> = ({ route }) => {
  const { mfaRequiredTask, onCompleted, context, mfaResponse: mfaResponseProp, phoneNumber } = route.params.props
  const [generateEmailMultifactorChallenge] = useMutation(GENERATE_EMAIL_MFA_CHALLENGE, {
    onCompleted: response => {
      // AnalyticsAuthShared.trackOTPUiEventClick(screenName, AuthScreenElement.Resend, context, true)
      const newMfaResponse = response.data?.generateEmailMultifactorChallenge
      newMfaResponse && setMfaResponse(newMfaResponse)
    },
  })
  const [mfaResponse, setMfaResponse] = useState<MultifactorGeneratedResponse>(mfaResponseProp)
  const [input, setInput] = useState<string>()
  const [handlingCallback, setHandlingCallback] = useState<boolean>(false)
  const { error: codeValidationError, validate } = useValidated([OnlyNumbersValidator])
  const [errorMessage, setErrorMessage] = useState<string | undefined | null>()
  const { data: me, loading: meLoading, error: meError } = useContext(AccountDataContext)
  const inputRef = useRef<TextEntryRef>(null)
  const insets = useSafeAreaInsets()
  const screenName = AuthScreen.CodeInputThroughEmail

  useEffect(() => {
    // AnalyticsAuthShared.trackOTPUiEventShow(screenName, AuthScreenElement.Back, context)
    // AnalyticsAuthShared.trackOTPUiEventShow(screenName, AuthScreenElement.SendCode, context)
    // AnalyticsAuthShared.trackOTPUiEventShow(screenName, AuthScreenElement.Resend, context)
  }, [])

  useEffect(() => {
    setErrorMessage(codeValidationError)
  }, [codeValidationError])

  const textChangeHandler = (changedText?: string) => {
    setInput(changedText || "")
    validate(changedText)
  }

  const onContinueClick = async () => {
    const multifactorHeaderInfo: MultifactorHeaderInfo = {
      otp: removeNonNumericCharacters(input) || "",
      mfaType: mfaResponse.mfaType,
      mfaReferenceId: mfaResponse.mfaReferenceId,
      userId: mfaResponse.userId,
    }
    setHandlingCallback(true)
    try {
      await mfaRequiredTask(multifactorHeaderInfo)
      // AnalyticsAuthShared.trackOTPUiEventClick(screenName, AuthScreenElement.VerifyPinCode, context, true)
      // AnalyticsAuthShared.trackAccountChallengeEventSuccess(context)
      Navigation.popRootNavigator()
      onCompleted()
    } catch (err) {
      // AnalyticsAuthShared.trackOTPUiEventClick(screenName, AuthScreenElement.VerifyPinCode, context, false)
      const { message } = GraphGQLErrorParser(err)
      setErrorMessage(message)
    }
    setHandlingCallback(false)
  }

  const onResendPressed = () => {
    try {
      generateEmailMultifactorChallenge({
        variables: {
          userId: mfaResponse.userId,
          countryCode: "1",
          phoneNumber,
          type: "OTP",
        },
      })
    } catch (err) {
      // AnalyticsAuthShared.trackOTPUiEventClick(screenName, AuthScreenElement.Resend, context, true)
      const { message } = GraphGQLErrorParser(err)
      setErrorMessage(message)
    }
  }

  const shouldEnableButton = () => {
    return !codeValidationError && !handlingCallback
  }

  const getBodyString = () => {
    if (meLoading || meError || !me?.account?.email) {
      return translate("profile-stack.profile-multifactor.enter-email-code-error-body")
    }
    const deconstructedEmail = (me?.account?.email).split("@")
    const emailName = deconstructedEmail[0]
    const domain = deconstructedEmail[1]
    const firstFourLetters = emailName.substring(0, 4)
    const obfuscatedEmail = firstFourLetters + "•••••@" + domain
    return translate("profile-stack.profile-multifactor.enter-email-code-body", { obfuscatedEmail })
  }

  const onBackPressed = () => {
    // AnalyticsAuthShared.trackPhoneVerificationUiEventClick(screenName, AuthScreenElement.Back, context)
  }

  return (
    <Screen safeAreaMode="all" screenName={screenName}>
      <NavigationBar
        title={translate("auth.multi-factor.verify-your-profile")}
        leftItems={[getNavigationBackButton("email-challenge-screen.navigation-bar", onBackPressed)]}
      />
      <Margin marginLeftStep={4} marginRightStep={4} direction="column" crossAxisDistribution="center" grow={1}>
        <ScrollView onlyScrollsWhenNeeded={true}>
          <KeyboardAvoidanceRollawayContainer direction="column" crossAxisDistribution="center" grow={1}>
            <Stack direction="column" crossAxisDistribution="center" grow={1}>
              <KeyboardAvoidanceView stackOrder={1} direction="column" shrink={0} crossAxisDistribution="center">
                <Spacer direction="column" sizeStep={10} />
                <SVG localSVG={TwoFactorLock} tint={"primary"} />
                <Spacer direction="column" sizeStep={6} />
                <Margin marginLeftStep={4} marginRightStep={4} direction="column" crossAxisDistribution="center">
                  <Text textType="headline3" textAlign="center">
                    {translate("profile-stack.profile-multifactor.enter-email-code")}
                  </Text>
                  <Spacer direction="column" sizeStep={6} />
                  <Text textType="primaryBody2" textAlign="center">
                    {getBodyString()}
                  </Text>
                </Margin>
                <Spacer direction="column" sizeStep={8} />
                <Input
                  ref={inputRef}
                  title={translate("profile-stack.profile-multifactor.code")}
                  keyboardType="number-pad"
                  error={errorMessage}
                  text={input}
                  textChangeHandler={textChangeHandler}
                  returnKeyType="done"
                />
                <Spacer sizeStep={4} direction="column" />
                <Button
                  onClick={onResendPressed}
                  title={translate("profile-stack.verify-phone.resend")}
                  buttonSize="large"
                  buttonType="flat"
                />
              </KeyboardAvoidanceView>
            </Stack>
          </KeyboardAvoidanceRollawayContainer>
        </ScrollView>
        <KeyboardAvoidanceOverlayContainer grow={0} direction="row" absoluteBottom={insets.bottom}>
          <KeyboardAvoidanceView stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
            <Button
              onClick={onContinueClick}
              title={translate("common-actions.verify")}
              buttonSize="large"
              buttonType={shouldEnableButton() ? "primary" : "disabled"}
              disabled={!shouldEnableButton()}
              loading={handlingCallback}
            />
          </KeyboardAvoidanceView>
        </KeyboardAvoidanceOverlayContainer>
      </Margin>
    </Screen>
  )
}
