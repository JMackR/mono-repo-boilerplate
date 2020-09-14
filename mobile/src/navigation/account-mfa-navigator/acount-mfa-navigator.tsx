import React from "react"
import { NavigableRoute } from "../navigator/navigableroute"
import {
  EmailChallengeScreen,
  EmailChallengeScreenProps,
} from "../../screens/profile/settings/account-multifactor/email-challenge-screen"
import { NavigationPayload } from "../navigation"
import { OTPChallengeScreen } from "../../screens/profile/settings/account-multifactor/otp-challenge-screen"
import { createStackNavigator } from "@react-navigation/stack"
import { FullScreenModalOptions, PushPopStackAnimationOptions } from "../common"
import { EmailChallengeInfoScreen } from "../../screens/profile/settings/account-multifactor/email-challenge-info-screen"
import { AccountPhontNumberScreen } from "../../screens/profile/settings/account-multifactor/account-phone-number-screen"
import { AccountMultifactorProps } from "../../screens/profile/settings/account-multifactor/account-multifactor-props"

// tslint:disable-next-line: interface-over-type-literal
export type AccountMFANavigatorParamList = {
  [NavigableRoute.OTPChallenge]: NavigationPayload<AccountMultifactorProps>
  [NavigableRoute.EmailChallengeInfo]: NavigationPayload<AccountMultifactorProps>
  [NavigableRoute.AccountPhoneNumber]: NavigationPayload<AccountMultifactorProps>
  [NavigableRoute.EmailChallenge]: NavigationPayload<EmailChallengeScreenProps>
}

const AccountMFAStack = createStackNavigator<AccountMFANavigatorParamList>()

export const AccountMFANavigator = () => {
  return (
    <AccountMFAStack.Navigator
      initialRouteName={NavigableRoute.OTPChallenge}
      headerMode="none"
      screenOptions={FullScreenModalOptions}
    >
      <AccountMFAStack.Screen name={NavigableRoute.OTPChallenge} component={OTPChallengeScreen} />
      <AccountMFAStack.Screen name={NavigableRoute.EmailChallengeInfo} component={EmailChallengeInfoScreen} />
      <AccountMFAStack.Screen name={NavigableRoute.AccountPhoneNumber} component={AccountPhontNumberScreen} />
      <AccountMFAStack.Screen name={NavigableRoute.EmailChallenge} component={EmailChallengeScreen} />
    </AccountMFAStack.Navigator>
  )
}
