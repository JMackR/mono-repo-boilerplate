import React, { FC, useState, useRef, useEffect, useContext } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenRouteAndStackNavigation } from "../../../../navigation/route"
import {
  translate,
  GENERATE_EMAIL_MFA_CHALLENGE,
  removeNonNumericCharacters,
  AccountDataContext,
  GraphGQLErrorParser,

  // AnalyticsAuthShared,
  AuthScreenElement,
} from "shared-lib"
import { AuthScreen } from "shared-lib/analytics"
import { useMutation } from "@apollo/react-hooks"
import { AccountMFANavigatorParamList } from "../../../../navigation/account-mfa-navigator/acount-mfa-navigator"
import { Screen } from "../../../../widgets"
import {
  NavigationBar,
  ScrollView,
  Margin,
  Spacer,
  TwoFactorLock,
  SVG,
  Text,
  Stack,
  Button,
  TextEntryRef,
  MaskedInput,
  PhoneValidator,
  useValidated,
} from "uc-lib"
import { getNavigationBackButton } from "../../../../navigation/common"
import { NavigableRoute } from "../../../../navigation/navigator"
import {
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceView,
  KeyboardAvoidanceOverlayContainer,
} from "../../../../keyboardavoidance"
import { Navigation, CommonNavs } from "../../../../navigation/navigation"
import { EmailChallengeScreenProps } from "./email-challenge-screen"
import { useSettingsWebViewLinks } from "../../../../providers/settings-provider"

export const AccountPhontNumberScreen: FC<ScreenRouteAndStackNavigation<
  AccountMFANavigatorParamList,
  NavigableRoute.AccountPhoneNumber
>> = ({ route }) => {
  const { mfaRequiredTask, onCompleted, context } = route.params.props

  const [
    generateEmailMultifactorChallenge,
    { loading: loadingMultifactorChallenge, error: challengeGenerationError },
  ] = useMutation(GENERATE_EMAIL_MFA_CHALLENGE)
  const [input, setInput] = useState<string>()
  const { error: phoneValidationError, validate } = useValidated([PhoneValidator])
  const [errorMessage, setErrorMessage] = useState<string | undefined | null>()
  const { data: me, loading: meLoading } = useContext(AccountDataContext)
  const inputRef = useRef<TextEntryRef>(null)
  const insets = useSafeAreaInsets()
  const screenName = AuthScreen.PhoneVerifyThroughEmail
  const webViewLinks = useSettingsWebViewLinks()

  useEffect(() => {
    // AnalyticsAuthShared.trackOTPUiEventShow(screenName, AuthScreenElement.Back, context)
    // AnalyticsAuthShared.trackOTPUiEventShow(screenName, AuthScreenElement.SendCode, context)
  }, [])

  useEffect(() => {
    setErrorMessage(phoneValidationError)
  }, [phoneValidationError])

  const textChangeHandler = (changedText?: string) => {
    setInput(changedText || "")
    validate(changedText)
  }

  const onContinueClick = async () => {
    const phoneNumber = removeNonNumericCharacters(input) || ""
    const userId = me?.id
    try {
      const response = await generateEmailMultifactorChallenge({
        variables: {
          userId,
          countryCode: "1",
          phoneNumber,
          type: "OTP",
        },
      })
      // AnalyticsAuthShared.trackOTPUiEventClick(screenName, AuthScreenElement.SendCode, context, true)
      const emailChallengeProps: EmailChallengeScreenProps = {
        mfaRequiredTask,
        onCompleted,
        context,
        mfaResponse: response.data?.generateEmailMultifactorChallenge,
        phoneNumber,
      }
      Navigation.navigateToRoute(NavigableRoute.EmailChallenge, emailChallengeProps)
    } catch (err) {
      // AnalyticsAuthShared.trackOTPUiEventClick(screenName, AuthScreenElement.SendCode, context, true)
      const parsedError = GraphGQLErrorParser(err)
      setErrorMessage(parsedError.message)
    }
  }

  const shouldEnableButton = () => {
    return (
      !meLoading &&
      !loadingMultifactorChallenge &&
      input &&
      input.length > 0 &&
      !phoneValidationError &&
      !challengeGenerationError
    )
  }

  const onBackPressed = () => {
    // AnalyticsAuthShared.trackOTPUiEventClick(screenName, AuthScreenElement.Back, context)
  }

  const onLearnMorePressed = () => {
    // AnalyticsAuthShared.trackOTPUiEventClick(screenName, AuthScreenElement.LearnMore, context)
    CommonNavs.presentWebView(webViewLinks.VerifyPhoneWhatsThis)
  }

  return (
    <Screen safeAreaMode="all" screenName={screenName}>
      <NavigationBar
        title={translate("auth.multi-factor.verify-your-profile")}
        leftItems={[getNavigationBackButton("profile-phone-number-screen.navigation.bar", onBackPressed)]}
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
                    {translate("profile-stack.profile-multifactor.profile-phone-number")}
                  </Text>
                  <Spacer direction="column" sizeStep={6} />
                  <Text textAlign="center">
                    <Text textType="primaryBody2">
                      {translate("profile-stack.profile-multifactor.profile-phone-number-body")}
                    </Text>
                    <Text textType="primaryBody2" color="brand" onPress={onLearnMorePressed}>
                      {translate("common-actions.learn-more-button")}
                    </Text>
                  </Text>
                </Margin>
                <Spacer direction="column" sizeStep={8} />
                <MaskedInput
                  mask="(000) 000-0000"
                  ref={inputRef}
                  title={translate("profile-stack.profile-multifactor.mobile-number")}
                  keyboardType="number-pad"
                  error={errorMessage}
                  hint={translate("profile-stack.verify-phone.phone-hint")}
                  text={input}
                  textChangeHandler={textChangeHandler}
                  returnKeyType="done"
                />
              </KeyboardAvoidanceView>
            </Stack>
          </KeyboardAvoidanceRollawayContainer>
        </ScrollView>
        <KeyboardAvoidanceOverlayContainer grow={0} direction="row" absoluteBottom={insets.bottom}>
          <KeyboardAvoidanceView stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
            <Button
              onClick={onContinueClick}
              title={translate("profile-stack.profile-multifactor.email-me-the-code")}
              buttonSize="large"
              buttonType={shouldEnableButton() ? "primary" : "disabled"}
              disabled={!shouldEnableButton()}
              loading={loadingMultifactorChallenge}
            />
          </KeyboardAvoidanceView>
        </KeyboardAvoidanceOverlayContainer>
      </Margin>
    </Screen>
  )
}
