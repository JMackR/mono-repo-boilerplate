import { NavigationPayload } from "../navigation"
import { NavigableRoute } from "../navigator"
import { createStackNavigator } from "@react-navigation/stack"
import { VerifyPhoneScreen } from "../../screens/profile/settings/verify-phone-screen"
import { VerifyPhonePromptModal } from "../../screens/profile/settings/verify-phone-prompt-modal"
import { ConfirmPhoneCodeScreen } from "../../screens/profile/settings/confirm-phone-code-screen"
import React from "react"
import { FullScreenModalOptions, ModalCardOverlayOption, ModalDialogOverlayOptions } from "../common"
import { AuthScreenContext, AuthChannel } from "shared-lib/analytics/constants"

// tslint:disable-next-line: interface-over-type-literal
export type PhoneValidationNavigatorParamList = {
  [NavigableRoute.VerifyPhone]: NavigationPayload<{
    skippable: boolean
    context?: AuthScreenContext
    originPayload?: NavigationPayload<any>
  }>
  [NavigableRoute.VerifyPhonePrompt]: NavigationPayload<any>
  [NavigableRoute.ConfirmPhoneCode]: NavigationPayload<{
    phoneNumber: string
    context: AuthScreenContext
    channel: AuthChannel
    originPayload?: NavigationPayload<any>
  }>
}

const PhoneValidationStack = createStackNavigator<PhoneValidationNavigatorParamList>()

export const PhoneValidationNavigator = () => {
  return (
    <PhoneValidationStack.Navigator initialRouteName={NavigableRoute.VerifyPhone} headerMode="none">
      <PhoneValidationStack.Screen
        name={NavigableRoute.VerifyPhone}
        component={VerifyPhoneScreen}
        options={FullScreenModalOptions}
      />
      <PhoneValidationStack.Screen
        name={NavigableRoute.VerifyPhonePrompt}
        component={VerifyPhonePromptModal}
        options={ModalDialogOverlayOptions}
      />
      <PhoneValidationStack.Screen
        name={NavigableRoute.ConfirmPhoneCode}
        component={ConfirmPhoneCodeScreen}
        options={FullScreenModalOptions}
      />
    </PhoneValidationStack.Navigator>
  )
}
