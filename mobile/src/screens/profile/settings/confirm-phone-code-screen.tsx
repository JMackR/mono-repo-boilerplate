import { ScreenRouteAndStackNavigation } from "../../../navigation/route"
import { NavigableRoute } from "mobile/src/navigation/navigator"
import {
  VERIFY_PHONE_NUMBER_MUTATION,
  VERIFY_PHONE_CODE_MUTATION,
  translate,
  removeNonNumericCharacters,
  GraphGQLErrorParser,
  AuthScreen,
  AuthScreenElement,
  AccountDataContext,
} from "shared-lib"
import { useMutation } from "@apollo/react-hooks"
import {
  NavigationBar,
  Flex,
  Margin,
  Stack,
  Spacer,
  SVG,
  TwoFactorLock,
  Text,
  Button,
  Input,
  ScrollView,
  OnlyNumbersValidator,
  useValidated,
} from "uc-lib"
import React, { useEffect, useState, useContext } from "react"
import { Screen } from "../../../widgets"
import { getNavigationBackButton } from "../../../navigation/common"
import { PhoneValidationNavigatorParamList } from "../../../navigation/phone-validation-navigator/phone-validation-navigator"
import { Navigation } from "../../../navigation/navigation"
import { handleSuccessfulLogin } from "../../onboarding"
import {
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceView,
  KeyboardAvoidanceOverlayContainer,
} from "../../../keyboardavoidance"
import { useSafeAreaInsets } from "react-native-safe-area-context"
// import { AnalyticsAuthShared } from "shared-lib/analytics/account/analytics-auth-shared"
import { toString } from "lodash"

const LAST_FR_SLICE_VALUE = -4

export const ConfirmPhoneCodeScreen: React.FC<ScreenRouteAndStackNavigation<
  PhoneValidationNavigatorParamList,
  NavigableRoute.ConfirmPhoneCode
>> = ({ route }) => {
  const screenName = AuthScreen.PinCodeInput
  const { phoneNumber, originPayload, context, channel } = route.params.props
  const { refetch: refetchAccount, loading: accountLoading } = useContext(AccountDataContext)
  const [updatePhone, { loading }] = useMutation(VERIFY_PHONE_NUMBER_MUTATION)
  const [verifyCode, { loading: verifyingCode }] = useMutation(VERIFY_PHONE_CODE_MUTATION)
  const { error: codeValidationError, validate } = useValidated([OnlyNumbersValidator])
  const [input, setInput] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string | undefined | null>()
  const insets = useSafeAreaInsets()

  useEffect(() => {
    // AnalyticsAuthShared.trackPhoneVerificationUiEventShow(screenName, AuthScreenElement.Back, context)
    // AnalyticsAuthShared.trackPhoneVerificationUiEventShow(screenName, AuthScreenElement.WhatIsThis, context)
    // AnalyticsAuthShared.trackPhoneVerificationUiEventShow(screenName, AuthScreenElement.SendCode, context)
    // AnalyticsAuthShared.trackPhoneVerificationUiEventShow(screenName, AuthScreenElement.WhatIsThis, context)
  }, [])

  useEffect(() => {
    setErrorMessage(codeValidationError)
  }, [codeValidationError])

  const textChangeHandler = (changedText?: string) => {
    setInput(changedText || "")
    validate(changedText)
  }

  const onVerifyCodeClicked = async () => {
    const code = parseInt(removeNonNumericCharacters(input) || "")
    try {
      await verifyCode({
        variables: {
          code,
        },
      })

      // AnalyticsAuthShared.trackPhoneVerifiedEventSuccess(context, channel)
      // AnalyticsAuthShared.trackAccountChallengeEventSuccess(context)
      // AnalyticsAuthShared.trackPhoneVerificationUiEventClick(screenName, AuthScreenElement.SendCode, context, true)

      try {
        await refetchAccount()
      } finally {
        if (originPayload) {
          handleSuccessfulLogin(originPayload)
        } else {
          Navigation.popRootNavigator()
        }
      }
    } catch (error) {
      // AnalyticsAuthShared.trackPhoneVerificationUiEventClick(screenName, AuthScreenElement.SendCode, context, false)
      setErrorMessageFromError(error)
    }
  }

  const sendCode = async () => {
    // AnalyticsAuthShared.trackPhoneVerificationUiEventClick(screenName, AuthScreenElement.Resend, context)

    try {
      let sanitizedPhone = removeNonNumericCharacters(toString(phoneNumber))
      if (sanitizedPhone && sanitizedPhone.length > 10) {
        sanitizedPhone = sanitizedPhone.substr(sanitizedPhone.length - 10)
      }
      await updatePhone({
        variables: {
          countryCode: 1,
          phoneStr: sanitizedPhone || "",
        },
      })
    } catch (error) {
      setErrorMessageFromError(error)
    }
  }

  const setErrorMessageFromError = error => {
    const { message } = GraphGQLErrorParser(error)
    setErrorMessage(message)
  }

  const onBackPressed = () => {
    // AnalyticsAuthShared.trackPhoneVerificationUiEventClick(screenName, AuthScreenElement.Back, context)
  }

  const shouldEnableButton = () => {
    return !loading && !accountLoading && !verifyingCode && !codeValidationError && input && input.length > 0
  }

  return (
    <Screen safeAreaMode="top" screenName={screenName}>
      <NavigationBar
        title={translate("profile-stack.verify-phone.title")}
        leftItems={[getNavigationBackButton("confirm-phone-screen.navigation-bar", onBackPressed)]}
        testID="confirm-phone-screen.navigation-bar"
      />
      <ScrollView onlyScrollsWhenNeeded={true} disableFlexGrowContentWhenNotScrolling={true}>
        <KeyboardAvoidanceRollawayContainer direction="column" crossAxisDistribution="center" grow={1}>
          <KeyboardAvoidanceView stackOrder={1} direction="column" shrink={0}>
            <Flex direction="column" crossAxisDistribution="center" grow={0}>
              <Margin marginStep={4}>
                <Stack direction="column" crossAxisDistribution="center" grow={0}>
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
                        last_four_digits: ("" + phoneNumber).slice(LAST_FR_SLICE_VALUE),
                      })}
                    </Text>
                  </Margin>
                  <Spacer direction="column" sizeStep={8} />
                  <Input
                    title={translate("profile-stack.verify-phone.code")}
                    keyboardType="number-pad"
                    error={errorMessage}
                    text={input}
                    textChangeHandler={textChangeHandler}
                  />
                  <Spacer direction="column" sizeStep={4} />
                  <Button
                    onClick={sendCode}
                    title={translate("profile-stack.verify-phone.resend")}
                    buttonSize="large"
                    buttonType="flat"
                  />
                </Stack>
              </Margin>
            </Flex>
          </KeyboardAvoidanceView>
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
              loading={loading || accountLoading || verifyingCode}
              testID="confirm-phone-screen.verify-button"
            />
          </Margin>
        </KeyboardAvoidanceView>
      </KeyboardAvoidanceOverlayContainer>
    </Screen>
  )
}
