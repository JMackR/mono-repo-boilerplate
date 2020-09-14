import React, { useState, useEffect } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { toString } from "lodash"
import {
  // AnalyticsAuthShared,
  AuthScreenElement,
  AuthScreen,
  AuthChannel,
} from "shared-lib/analytics"
import { ValidatedForm, ValidatedFormButton } from "shared-lib/controllers"
import { GraphGQLErrorParser } from "shared-lib/network"
import { useMutation } from "@apollo/react-hooks"
import { translate, removeNonNumericCharacters } from "shared-lib/utilities"
import { TwoFactorLock } from "uc-lib/assets"
import { Stack, Text, Margin, SVG, Spacer, Flex, ScrollView } from "uc-lib/controls"
import { NavigationBar, NavigationBarItem } from "uc-lib/widgets"
import { RequiredValidator, PhoneValidator } from "uc-lib/validators"
import { ScreenRouteAndStackNavigation } from "../../../navigation/route"
import { NavigableRoute } from "../../../navigation/navigator"
import { PhoneValidationNavigatorParamList } from "../../../navigation/phone-validation-navigator/phone-validation-navigator"
import { Screen } from "../../../widgets"
import { Navigation } from "../../../navigation/navigation"
import { getNavigationBackButton, getNavigationCancelButton } from "../../../navigation/common"
import { handleSuccessfulLogin } from "../../onboarding"
import {
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceView,
  KeyboardAvoidanceOverlayContainer,
} from "../../../keyboardavoidance"
import { CommonNavs } from "../../../navigation/navigation"
import { ValidatedMaskedInput } from "shared-lib/controllers/form/validated-masked-input"
import { useSettingsWebViewLinks } from "../../../providers/settings-provider"

export const VerifyPhoneScreen: React.FC<ScreenRouteAndStackNavigation<
  PhoneValidationNavigatorParamList,
  NavigableRoute.VerifyPhone
>> = ({ route }) => {
  const { skippable, context, originPayload } = route.params.props
  const [updatePhone, { loading }] = useMutation(VERIFY_PHONE_NUMBER_MUTATION)
  const [input, setInput] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const insets = useSafeAreaInsets()
  const screenName = AuthScreen.PhoneNumberInput
  const channel = AuthChannel.Phone
  const webViewLinks = useSettingsWebViewLinks()

  useEffect(() => {
    // AnalyticsAuthShared.trackPhoneVerificationUiEventShow(screenName, AuthScreenElement.SendCode, context)
    // AnalyticsAuthShared.trackPhoneVerificationUiEventShow(screenName, AuthScreenElement.WhatIsThis, context)
  }, [])

  const textChangeHandler = (changedText?: string) => {
    setErrorMessage(undefined)
    setInput(changedText || "")
  }

  const skipButton: NavigationBarItem = {
    title: translate("common-actions.skip"),
    testID: "verify-phone-screen.navigation-bar.skip",
    pressHandler: () => {
      if (originPayload) {
        handleSuccessfulLogin(originPayload)
      } else {
        Navigation.performWhenAvailable(() => {
          Navigation.popRootNavigator()
        })
      }
    },
  }

  const onSendCodeClicked = async () => {
    setErrorMessage(undefined)

    const phoneStr = removeNonNumericCharacters(toString(input)) || ""
    try {
      await updatePhone({
        variables: {
          countryCode: 1,
          phoneStr,
        },
      })
      // AnalyticsAuthShared.trackPhoneVerificationUiEventClick(screenName, AuthScreenElement.SendCode, context, true)
      setErrorMessage(undefined)
      Navigation.navigateToRoute(NavigableRoute.ConfirmPhoneCode, { phoneNumber: phoneStr, context, channel, originPayload })
    } catch (error) {
      // AnalyticsAuthShared.trackPhoneVerificationUiEventClick(screenName, AuthScreenElement.SendCode, context, false)
      const { message } = GraphGQLErrorParser(error)
      setErrorMessage(message)
    }
  }

  const onLearnMoreClicked = () => {
    // AnalyticsAuthShared.trackPhoneVerificationUiEventClick(screenName, AuthScreenElement.WhatIsThis, context)
    CommonNavs.presentWebView(webViewLinks.VerifyPhoneWhatsThis)
  }

  return (
    <Screen safeAreaMode="top">
      <NavigationBar
        title={translate("profile-stack.verify-phone.title")}
        rightItems={skippable ? [skipButton] : [getNavigationCancelButton("verify-phone-screen.navigation-bar")]}
        testID="verify-phone-screen.navigation-bar"
      />
      <ValidatedForm
        validators={{
          phoneNumber: [PhoneValidator, RequiredValidator],
        }}
      >
        <ScrollView onlyScrollsWhenNeeded={true} disableFlexGrowContentWhenNotScrolling={true}>
          <KeyboardAvoidanceRollawayContainer direction="column" crossAxisDistribution="center" grow={1}>
            <KeyboardAvoidanceView stackOrder={1} direction="column" shrink={0}>
              <Flex direction="column" crossAxisDistribution="center" grow={0}>
                <Margin marginStep={4}>
                  <Stack direction="column" crossAxisDistribution="center" grow={0}>
                    <Spacer direction="column" sizeStep={6} />
                    <SVG localSVG={TwoFactorLock} tint={"primary"} />
                    <Spacer direction="column" sizeStep={6} />
                    <Text textType="headline3" textAlign="center" testID="verify-phone-screen.text.1">
                      {translate("profile-stack.verify-phone.phone-verification")}
                    </Text>
                    <Spacer direction="column" sizeStep={2} />
                    <Margin marginLeftStep={4} marginRightStep={4}>
                      <Text textAlign="center">
                        <Text textType="primaryBody2" testID="verify-phone-screen.text.2">
                          {translate("profile-stack.verify-phone.verify-subheader")}
                        </Text>
                        <Text textType="primaryBody2" color="brand" onPress={onLearnMoreClicked}>
                          {translate("common-actions.learn-more-button")}
                        </Text>
                      </Text>
                    </Margin>
                    <Spacer direction="column" sizeStep={8} />
                    <ValidatedMaskedInput
                      mask="(000) 000-0000"
                      role="phoneNumber"
                      title={translate("profile-stack.verify-phone.mobile")}
                      leftHelperText={translate("profile-stack.verify-phone.verify-input-description")}
                      hint={translate("profile-stack.verify-phone.phone-hint")}
                      keyboardType="number-pad"
                      error={errorMessage}
                      text={input}
                      textChangeHandler={textChangeHandler}
                      returnKeyType="done"
                      testID="verify-phone-screen.phone-input"
                    />
                    <Spacer direction="column" sizeStep={4} />
                  </Stack>
                </Margin>
              </Flex>
            </KeyboardAvoidanceView>
          </KeyboardAvoidanceRollawayContainer>
        </ScrollView>

        <KeyboardAvoidanceOverlayContainer grow={0} direction="row" absoluteBottom={insets.bottom}>
          <KeyboardAvoidanceView stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
            <Margin marginStep={4} direction="column">
              <ValidatedFormButton
                onClick={onSendCodeClicked}
                title={translate("profile-stack.verify-phone.send-code")}
                buttonSize="large"
                buttonType={loading ? "disabled" : "primary"}
                testID="verify-phone-screen.send"
                disabled={errorMessage !== undefined}
              />
            </Margin>
          </KeyboardAvoidanceView>
        </KeyboardAvoidanceOverlayContainer>
      </ValidatedForm>
    </Screen>
  )
}
