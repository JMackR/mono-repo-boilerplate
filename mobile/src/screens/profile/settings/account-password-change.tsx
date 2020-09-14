import { property, toString, isEmpty } from "lodash"
import { KeyboardAvoidanceRollawayContainer, KeyboardAvoidanceView } from "mobile/src/keyboardavoidance"
import {
  ACCNT_SETTINGS_QUERY,
  CHANGE_PASSWORD_MUTATION,
  GraphGQLErrorParser,
  ValidatedForm,
  ValidatedFormButton,
  ValidatedFormInput,
  translate,
  AuthScreenElement,
  PASSWORD_ERROR_CODE,
} from "shared-lib"
import { AuthScreen } from "shared-lib/analytics"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { RequiredValidator, PasswordComplexityValidator } from "uc-lib"
import {
  NAVIGATION_BAR_HEIGHT,
  Flex,
  Margin,
  NavigationBar,
  ScrollView,
  SpacerFlex,
  Stack,
  Text,
  TextEntryRef,
} from "uc-lib"
import React, { FC, useState, useRef, useEffect } from "react"
import { getNavigationCancelButton } from "../../../navigation/common"
import { Screen } from "../../../widgets"
import { openForgotPassword } from "../../onboarding"
// import { AnalyticsAuthShared } from "shared-lib/analytics/account/analytics-auth-shared"
import { AffirmRejectDialogScreenProps } from "../../onboarding/dialog"
import { Navigation, CommonNavs } from "../../../navigation/navigation"
import { NavigableRoute } from "../../../navigation/navigator"

export const AccountPasswordChangeScreen: FC = () => {
  const newPw1Ref = useRef<TextEntryRef>(null)
  const newPw2Ref = useRef<TextEntryRef>(null)
  const [currentPassword, setCurrentPassword] = useState<string | undefined>()
  const [newPassword, setNewPassword] = useState<string | undefined>()
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPasswordError, setCurrentPasswordError] = useState<string | undefined>()
  const [newPasswordError, setNewPasswordError] = useState<string | undefined>()
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>()
  const [changePassword] = useMutation(CHANGE_PASSWORD_MUTATION)
  const { data: user } = useQuery(ACCNT_SETTINGS_QUERY)
  const email = property<any, string>("me.profile.email")(user)

  useEffect(() => {
    // AnalyticsAuthShared.trackChangePasswordEventShow(AuthScreenElement.Back)
    // AnalyticsAuthShared.trackChangePasswordEventShow(AuthScreenElement.ForgotPassword)
    // AnalyticsAuthShared.trackChangePasswordEventShow(AuthScreenElement.Submit)
  }, [])

  const onChangePassword = async () => {
    setCurrentPasswordError(undefined)
    setConfirmPasswordError(undefined)

    if (confirmPassword !== newPassword) {
      setConfirmPasswordError(translate("profile-stack.change-password.not-match-error"))
      return
    }

    setLoading(true)
    try {
      await changePassword({
        variables: {
          newPassword,
          oldPassword: currentPassword,
          userId: toString(property("me.id")(user)),
        },
      })

      // AnalyticsAuthShared.trackChangePasswordEventClick(AuthScreenElement.Submit, true)
      showConfirmationDialog()
    } catch (e) {
      const ouException = GraphGQLErrorParser(e)
      const { code } = ouException

      if (code === PASSWORD_ERROR_CODE.INVALID_CURRENT_PASSWORD) {
        setCurrentPasswordError(translate("profile-stack.change-password.incorrect-current-password-error"))
      } else {
        CommonNavs.presentError({ ouException })
      }

      // AnalyticsAuthShared.trackChangePasswordEventClick(AuthScreenElement.Submit, false)
    }

    setLoading(false)
  }

  const showConfirmationDialog = () => {
    const props: AffirmRejectDialogScreenProps = {
      onAffirm: () => {
        Navigation.performWhenAvailable(() => {
          Navigation.popRootNavigator()
        })
      },
      dismissOnReject: true,
      affirmText: translate("profile-stack.change-password.success"),
      title: translate("profile-stack.change-password.success-dialog-title"),
      body: translate("profile-stack.change-password.success-dialog-body"),
    }
    Navigation.navigateToRoute(NavigableRoute.AffirmRejectDialog, props)
  }

  const onForgotPasswordPressed = () => {
    // AnalyticsAuthShared.trackChangePasswordEventClick(AuthScreenElement.ForgotPassword)
    openForgotPassword(AuthScreen.ChangePassword, email)
  }

  const focusPw1 = () => {
    newPw1Ref.current?.focus()
  }

  const focusPw2 = () => {
    newPw2Ref.current?.focus()
  }

  const onGoBack = () => {
    // AnalyticsAuthShared.trackChangePasswordEventClick(AuthScreenElement.Back)
  }

  // Submit is visually, but not funcationally, disabled until the user enters something in each required field. Below works upon
  // screen entry with how isSubmitDisabled  is initially, but will be overridden by it after errors appear
  const isSubmitVisuallyDisabled = isEmpty(currentPassword) || isEmpty(newPassword) || isEmpty(confirmPassword)

  // Disable the Submit button if there is any error text displayed
  const isSubmitDisabled =
    loading || !isEmpty(currentPasswordError) || !isEmpty(newPasswordError) || !isEmpty(confirmPasswordError)

  const onOldPasswordChanged = (changedText?: string) => {
    setCurrentPassword(changedText)
    setCurrentPasswordError(undefined)
  }

  const onConfirmPasswordChanged = (changedText?: string) => {
    setConfirmPassword(changedText)
    setConfirmPasswordError(undefined)
  }

  // Error text is displayed by the lower validated field, but store it here for use in disabling the Submit button
  const handleComplexityError = (error?: string) => {
    setNewPasswordError(error)
  }

  return (
    <Screen safeAreaMode="all" screenName={AuthScreen.ChangePassword}>
      <Flex direction="column" grow={0} height={NAVIGATION_BAR_HEIGHT}>
        <NavigationBar
          title={translate("profile-stack.change-password.title")}
          rightItems={[getNavigationCancelButton("change-password.navigation-bar", onGoBack)]}
          testID="change-password.navigation-bar"
        />
      </Flex>

      <ScrollView onlyScrollsWhenNeeded={true} disableFlexGrowContentWhenNotScrolling={true}>
        <ValidatedForm
          validators={{
            oldPassword: [RequiredValidator],
            newPassword: [RequiredValidator, PasswordComplexityValidator],
            confirmPassword: [RequiredValidator],
          }}
        >
          <Margin marginStep={4} direction="column" grow={1}>
            <KeyboardAvoidanceRollawayContainer direction="row" crossAxisDistribution="center" grow={1}>
              <Stack direction="column" childSeparationStep={6} grow={1}>
                <Stack childSeparationStep={4} direction="column" grow={0}>
                  <KeyboardAvoidanceView direction="column" grow={1} groupId="currentPw" activeInGroups={["currentPw"]}>
                    <Stack direction="column" childSeparationStep={1}>
                      <ValidatedFormInput
                        role="oldPassword"
                        text={currentPassword}
                        secureTextEntry={true}
                        title={translate("profile-stack.change-password.old-password")}
                        textChangeHandler={onOldPasswordChanged}
                        returnKeyType={"next"}
                        onSubmitEditing={focusPw1}
                        error={currentPasswordError}
                      />
                      <Text color="brand" textAlign="left" textType="secondaryBody2" onPress={onForgotPasswordPressed}>
                        {translate("auth.forgot-your-password")}
                      </Text>
                    </Stack>
                  </KeyboardAvoidanceView>
                  <KeyboardAvoidanceView groupId="newPw1" activeInGroups={["newPw1"]} direction="column" grow={1}>
                    <ValidatedFormInput
                      ref={newPw1Ref}
                      role="newPassword"
                      text={newPassword}
                      secureTextEntry={true}
                      validateOnChange={true}
                      validatedOnChangeAction={handleComplexityError}
                      title={translate("profile-stack.change-password.new-password")}
                      textChangeHandler={setNewPassword}
                      returnKeyType={"next"}
                      onSubmitEditing={focusPw2}
                    />
                  </KeyboardAvoidanceView>
                  <KeyboardAvoidanceView groupId="newPw2" activeInGroups={["newPw2"]} direction="column" grow={1}>
                    <ValidatedFormInput
                      ref={newPw2Ref}
                      role="confirmPassword"
                      text={confirmPassword}
                      secureTextEntry={true}
                      title={translate("profile-stack.change-password.new-password-confirm")}
                      textChangeHandler={onConfirmPasswordChanged}
                      returnKeyType={"done"}
                      onSubmitEditing={onChangePassword}
                      error={confirmPasswordError}
                    />
                  </KeyboardAvoidanceView>
                </Stack>
                <SpacerFlex />
                <ValidatedFormButton
                  title={translate("profile-stack.change-password.submit")}
                  buttonSize="large"
                  buttonType={isSubmitVisuallyDisabled ? "disabled" : "primary"}
                  onClick={onChangePassword}
                  disabled={isSubmitDisabled}
                />
              </Stack>
            </KeyboardAvoidanceRollawayContainer>
          </Margin>
        </ValidatedForm>
      </ScrollView>
    </Screen>
  )
}
