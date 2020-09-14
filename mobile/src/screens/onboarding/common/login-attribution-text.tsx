import { AuthScreen, translate } from "shared-lib"
import { Text, Flex } from "uc-lib"
import React, { FC } from "react"
import { openPrivacyPolicy, openTerms } from "./login-common"
import { useSettingsWebViewLinks } from "../../../providers/settings-provider"

export interface LoginAttributionTextProps {
  screen: AuthScreen
}

export const LoginAttributionText: FC<LoginAttributionTextProps> = ({ screen }) => {
  const webViewLinks = useSettingsWebViewLinks()

  const onPressTos = () => {
    openTerms(screen, webViewLinks)
  }
  const onPressPolicy = () => {
    openPrivacyPolicy(screen, webViewLinks)
  }
  const firstStatementOfScreen = () => {
    switch (screen) {
      case AuthScreen.CreateAccount:
        return translate("auth.signup-welcome-attribution-text-part-1")
      case AuthScreen.EmailLogin:
        return translate("auth.login-welcome-attribution-text-part-1")
      default:
        return translate("auth.authlanding-welcome-attribution-text-part-1")
    }
  }
  const secondStatementOfScreen = () => {
    switch (screen) {
      case AuthScreen.CreateAccount:
        return translate("auth.signup-welcome-attribution-text-part-2-tos")
      case AuthScreen.EmailLogin:
        return translate("auth.login-welcome-attribution-text-part-2-tos")
      default:
        return translate("auth.authlanding-welcome-attribution-text-part-2-tos")
    }
  }
  const thirdStatementOfScreen = () => {
    switch (screen) {
      case AuthScreen.CreateAccount:
        return translate("auth.signup-welcome-attribution-text-part-4-policy")
      case AuthScreen.EmailLogin:
        return translate("auth.login-welcome-attribution-text-part-4-policy")
      default:
        return translate("auth.authlanding-welcome-attribution-text-part-4-policy")
    }
  }

  return (
    <Flex width="100%" direction="row" wrap="wrap" axisDistribution="center">
      <Text
        textAlign="center"
        color="secondary"
        text={firstStatementOfScreen()}
        textType="secondaryBody2"
        testID="login-attribution-text.part-1"
      />

      <Text
        textAlign="center"
        color="brand"
        textType="secondaryBody2"
        text={secondStatementOfScreen()}
        onPress={onPressTos}
        testID="login-attribution-text.part-2-tos"
      />

      <Text
        textAlign="center"
        color="secondary"
        text={translate("auth.login-welcome-attribution-text-part-3")}
        textType="secondaryBody2"
        testID="login-attribution-text.part-3"
      />

      <Text
        textAlign="center"
        color="brand"
        text={thirdStatementOfScreen()}
        textType="secondaryBody2"
        onPress={onPressPolicy}
        testID="login-attribution-text.part-4-policy"
      />
    </Flex>
  )
}
