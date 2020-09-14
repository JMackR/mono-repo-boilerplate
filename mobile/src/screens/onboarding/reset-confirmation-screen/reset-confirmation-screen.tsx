import { AuthParamList } from "mobile/src/navigation/auth-navigator"
import { ValidatedForm, ValidatedFormButton, ValidatedFormInput, RESET_PASSWORD_MUTATION, translate } from "shared-lib"
import { AuthScreen } from "shared-lib/analytics"
import { useMutation } from "@apollo/react-hooks"
import { RequiredValidator, EmailValidator, Margin, SpacerFlex, Stack, Text, Spacer, Flex, Button } from "uc-lib"
import React, { FC, useState, useEffect } from "react"
import { useSafeArea } from "react-native-safe-area-context"
import {
  KeyboardAvoidanceOverlayContainer,
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceView,
} from "../../../keyboardavoidance"
import { ScreenRouteAndStackNavigation } from "../../../navigation/route"
import { Navigation, CommonNavs } from "../../../navigation/navigation"
import { NavigableRoute } from "../../../navigation/navigator/navigableroute"
import { Screen } from "../../../widgets"
import { AffirmRejectDialogScreenProps } from "../dialog"
import { LoginHeader } from "../common/login-header"
import { Image } from "react-native"
// import { AnalyticsAuthShared } from "shared-lib/analytics/account/analytics-auth-shared"
const confirmation = require("../images/confirmation.png")

export const ResetConfirmationScreen: FC<ScreenRouteAndStackNavigation<AuthParamList, NavigableRoute.PasswordReset>> = ({
  route,
}) => {
  const insets = useSafeArea()

  const onConfirmClick = async () => {
    // AnalyticsAuthShared.trackAccountResetPasswordCheckyourEmailDialogShow()
    Navigation.navigateToRoute(NavigableRoute.AuthLogin, { originPayload: route.params?.props?.originPayload })
  }

  return (
    <Screen safeAreaMode="all" screenName={AuthScreen.ResetPasswordThroughEmail} dismissKeyboardOnTap={true}>
      <ValidatedForm
        validators={{
          email: [RequiredValidator, EmailValidator],
        }}
      >
        <KeyboardAvoidanceRollawayContainer direction="row" grow={1}>
          <Stack direction="column" childSeparationStep={12} grow={1}>
            <LoginHeader
              image={confirmation}
              colorTint={"transparent"}
              noCancelButton={true}
              // title={translate("auth.reset-password.title")}
              screen={AuthScreen.ConfirmationSent}
              testID="confirmation-screen"
            />
            <Spacer direction="column" sizeStep={4} />
            <Margin marginStep={4} grow={1} direction="column">
              <KeyboardAvoidanceView stackOrder={1} direction="column" shrink={0}>
                <Stack childSeparationStep={8} direction="column">
                  <Margin marginStep={4} direction="column" grow={1}>
                    <Stack childSeparationStep={10} direction="column" crossAxisDistribution={"center"}>
                      <Text textType="headline2" text={translate("auth.reset-password.thanks")} />
                    </Stack>
                  </Margin>
                  <Text textType="primaryBody2" text={translate("auth.reset-password.thanks-note")} />
                </Stack>
              </KeyboardAvoidanceView>
            </Margin>
            <SpacerFlex />
          </Stack>
        </KeyboardAvoidanceRollawayContainer>
        <KeyboardAvoidanceOverlayContainer absoluteBottom={insets.bottom} grow={0} direction="row">
          <KeyboardAvoidanceView stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
            <Margin marginStep={4} direction="column" grow={1}>
              <Stack direction="column" childSeparationStep={4}>
                <Button
                  buttonType={"primary"}
                  buttonSize="large"
                  onClick={onConfirmClick}
                  testID="create-account-screen.have-account-link"
                  title={translate("auth.login-button")}
                />
              </Stack>
            </Margin>
          </KeyboardAvoidanceView>
        </KeyboardAvoidanceOverlayContainer>
      </ValidatedForm>
    </Screen>
  )
}
