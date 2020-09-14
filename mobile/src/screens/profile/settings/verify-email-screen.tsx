import {
  KeyboardAvoidanceOverlayContainer,
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceView,
} from "mobile/src/keyboardavoidance"
import { getNavigationCancelButton } from "mobile/src/navigation/common"
import { ScreenRouteAndStackNavigation } from "mobile/src/navigation/route"
import { NavigableRoute, NavigatorParamList } from "mobile/src/navigation/navigator"
import { Screen } from "mobile/src/widgets"
// import { AccountAnalyticsController } from "shared-lib/analytics/account/analytics-account"
import { AccountScreenNames, AccountSettingsScreenElement } from "shared-lib/analytics/constants/profile-constants"
import {
  Button,
  Flex,
  Margin,
  NavigationBar,
  ScrollView,
  Stack,
  Text,
  TextEntryRef,
  RequiredValidator,
  EmailValidator,
} from "uc-lib"
import React, { useLayoutEffect, useRef, useState, useContext } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  translate,
  CHANGE_EMAIL_MUTATION,
  GraphGQLErrorParser,
  AUTH_ERROR_CODE,
  AuthScreenContext,
  MultifactorHeaderInfo,
  // AnalyticsAuthShared,
  AuthScreenElement,
  AuthScreen,
  AccountDataContext,
  ValidatedForm,
  ValidatedFormInput,
  ValidatedFormButton,
} from "shared-lib"
import { useMutation } from "@apollo/react-hooks"
import { Navigation } from "../../../navigation/navigation"
import { AffirmRejectDialogScreenProps } from "../../dialog"
import { AccountMultifactorProps } from "./account-multifactor/account-multifactor-props"

export const VerifyEmailScreen: React.FC<ScreenRouteAndStackNavigation<NavigatorParamList, NavigableRoute.VerifyEmail>> = ({
  route,
}) => {
  const { email: originalEmail } = route.params.props
  const [changeEmailMutation, { loading }] = useMutation(CHANGE_EMAIL_MUTATION)
  const [email, setEmail] = useState<string>(originalEmail)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const insets = useSafeAreaInsets()
  const emailRef = useRef<TextEntryRef>(null)

  useLayoutEffect(() => {
    setTimeout(() => emailRef.current?.focus(), 300)
  }, [])

  const { data: me } = useContext(AccountDataContext)

  const onCancelButtonPressed = () => {
    // AccountAnalyticsController.trackUserVerifiedEmailElementClick(AccountSettingsScreenElement.Cancel)
  }

  const textChangeHandler = (changedText?: string) => {
    setErrorMessage(undefined)
    setEmail(changedText || "")
  }

  const handleUpdateEmailClick = async () => {
    setErrorMessage(undefined)

    const userId = me?.id
    try {
      await changeEmailMutation({
        variables: {
          userId,
          email,
        },
      })
      setErrorMessage(undefined)
      showConfirmationDialog()
    } catch (error) {
      const { code, message } = GraphGQLErrorParser(error)
      if (code === AUTH_ERROR_CODE.OTP_CHALLENGE) {
        const mfaRequiredTask = async (multifactorHeaderInfo: MultifactorHeaderInfo) => {
          await changeEmailMutation({
            variables: {
              userId: multifactorHeaderInfo.userId,
              email,
              multifactorHeaderInfo,
            },
          })
        }
        const onCompleted = () => {
          Navigation.performWhenAvailable(showConfirmationDialog)
        }
        const accountMultifactorProps: AccountMultifactorProps = {
          mfaRequiredTask,
          onCompleted,
          context: AuthScreenContext.EmailUpdate,
        }
        Navigation.navigateToRoute(NavigableRoute.OTPChallenge, accountMultifactorProps)
      } else {
        setErrorMessage(message)
      }
    }
  }

  const showConfirmationDialog = () => {
    // AnalyticsAuthShared.trackEmailVerificationUiEventShow(AuthScreen.ConfirmationSent, AuthScreenElement.Done)
    const props: AffirmRejectDialogScreenProps = {
      onAffirm: () => {
        // AnalyticsAuthShared.trackEmailVerificationUiEventClick(AuthScreen.ConfirmationSent, AuthScreenElement.Done)
        Navigation.performWhenAvailable(() => {
          Navigation.popRootNavigator()
        })
      },
      dismissOnReject: true,
      affirmText: translate("auth.reset-password.got-it"),
      title: translate("profile-stack.verify-email.confirmation-sent-title"),
      body: translate("profile-stack.verify-email.confirmation-sent-body"),
    }
    Navigation.navigateToRoute(NavigableRoute.AffirmRejectDialog, props)
  }

  return (
    <Screen safeAreaMode="top" screenName={AccountScreenNames.EnterEmail}>
      <NavigationBar
        title={translate("profile-stack.verify-email.title")}
        rightItems={[getNavigationCancelButton("verify-email-screen.navigation.bar", onCancelButtonPressed)]}
        testID="verify-email-screen.navigation.bar"
      />
      <ValidatedForm
        validators={{
          email: [EmailValidator, RequiredValidator],
        }}
      >
        <ScrollView onlyScrollsWhenNeeded={true}>
          <KeyboardAvoidanceRollawayContainer direction="column" crossAxisDistribution="center" grow={1}>
            <Flex direction="column" crossAxisDistribution="center" grow={1}>
              <Margin marginStep={4} grow={1}>
                <KeyboardAvoidanceView stackOrder={1} direction="column" shrink={0}>
                  <Stack direction="column" childSeparationStep={3} crossAxisDistribution="center" grow={0}>
                    <Margin marginLeftStep={12} marginRightStep={12}>
                      <Text textType="primaryBody2" textAlign="center">
                        {translate("profile-stack.verify-email.subheader")}
                      </Text>
                    </Margin>
                    <ValidatedFormInput
                      role="email"
                      ref={emailRef}
                      title={translate("profile-stack.verify-email.email-address")}
                      text={email}
                      keyboardType="email-address"
                      textChangeHandler={textChangeHandler}
                      error={errorMessage}
                      returnKeyType="done"
                      testID="verify-email-screen"
                    />
                  </Stack>
                </KeyboardAvoidanceView>
              </Margin>
            </Flex>
          </KeyboardAvoidanceRollawayContainer>
        </ScrollView>
        <KeyboardAvoidanceOverlayContainer grow={0} direction="row" absoluteBottom={insets.bottom}>
          <KeyboardAvoidanceView stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
            <Margin marginStep={4} direction="column" grow={1}>
              <Stack direction="column" childSeparationStep={4}>
                <ValidatedFormButton
                  onClick={handleUpdateEmailClick}
                  title={translate("profile-stack.verify-email.button")}
                  buttonSize="large"
                  buttonType={loading ? "disabled" : "primary"}
                  testID="verify-email-screen.send"
                  disabled={errorMessage !== undefined}
                />
              </Stack>
            </Margin>
          </KeyboardAvoidanceView>
        </KeyboardAvoidanceOverlayContainer>
      </ValidatedForm>
    </Screen>
  )
}
