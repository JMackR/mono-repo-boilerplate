import React, { useState } from "react"
import { Stack, Input, Button, Margin, SpacerFlex, Spacer, NavigationBar } from "uc-lib"
import { NavigableRoute } from "mobile/src/navigation/navigator/navigableroute"
import { ScreenRoute } from "mobile/src/navigation/route"
import { AuthParamList } from "mobile/src/navigation/auth-navigator"
import { Screen } from "mobile/src/widgets"
import { Navigation } from "mobile/src/navigation/navigation"
import { translate, AuthScreen, AuthScreenElement } from "shared-lib"
import _ from "lodash"
// import { AnalyticsAuthShared } from "shared-lib/analytics/account/analytics-auth-shared"
import { getNavigationCancelButton, getNavigationBackButton } from "../../navigation/common"

const SPACE_STEP = 4
const LARGE_SPACE_STEP = 4
const MIN_NAME_CHARACTERS = 3

export const GetUserEmailScreen: React.FC<ScreenRoute<AuthParamList, NavigableRoute.AuthGetUserEmail>> = ({ route }) => {
  const { code, onUserInfoEntered } = route.params.props
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const onNameChangedHandler = (text?: string) => {
    setName(text || "")
  }
  const nameValidationError = () => {
    if (name == null || name.trim() === "" || name.trim().length < MIN_NAME_CHARACTERS) {
      setNameError(translate("get-user-email-screen.invalid-name-error"))
      return true
    }
    setNameError("")
    return false
  }
  const onEmailChangedHandler = (text?: string) => {
    setEmail(text || "")
  }
  const emailValidationError = () => {
    if (email == null || email.trim() === "") {
      setEmailError(translate("get-user-email-screen.invalid-email-error"))
      return true
    }
    setEmailError("")
    return false
  }

  const onSavePressed = () => {
    // AnalyticsAuthShared.trackEmailVerificationUiEventClick(AuthScreen.EmailVerifyPrompt, AuthScreenElement.Save)
    if (!emailValidationError() && !nameValidationError()) {
      onUserInfoEntered(code, name, email)
      Navigation.goBack()
    }
  }

  const backButton = getNavigationBackButton("get-user-email-screen.back")
  const cancelButton = getNavigationCancelButton("get-user-email-screen.cancel")

  return (
    <Screen safeAreaMode="all" screenName={AuthScreen.EmailVerifyPrompt}>
      <NavigationBar
        title={translate("get-user-email-screen.welcome-to-mobile")}
        leftItems={[backButton]}
        rightItems={[cancelButton]}
      />
      <Margin
        direction="column"
        marginTopStep={LARGE_SPACE_STEP + SPACE_STEP}
        marginLeftStep={SPACE_STEP}
        marginRightStep={SPACE_STEP}
        axisDistribution="center"
        grow={1}
      >
        <Stack direction="column" childSeparationStep={SPACE_STEP}>
          <Input
            title={translate("get-user-email-screen.email-prompt")}
            hint={translate("auth.email-address-hint")}
            textAlign="left"
            textType="primaryBody2"
            keyboardType="email-address"
            error={emailError}
            textChangeHandler={onEmailChangedHandler}
            testID="get-user-email-screen.email-address-field"
          />
          <Input
            title={translate("get-user-email-screen.username-prompt")}
            textAlign="left"
            textType="primaryBody2"
            error={nameError}
            textChangeHandler={onNameChangedHandler}
            testID="get-user-email-screen.name-address-field"
          />
        </Stack>
        <SpacerFlex />
        <Button
          title={translate("get-user-email-screen.save-button")}
          buttonSize="large"
          buttonType="primary"
          onClick={onSavePressed}
          testID="get-user-email-screen.create-account-button"
        />
      </Margin>
    </Screen>
  )
}
