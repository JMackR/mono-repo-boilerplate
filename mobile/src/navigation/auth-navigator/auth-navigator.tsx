import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { LoginScreen } from "../../screens/onboarding/login-screen"
import { SignupScreen } from "../../screens/onboarding/signup-screen"
import { AuthLandingScreen } from "../../screens/onboarding"
import { MultiFactorAuthScreen } from "../../screens/onboarding/multi-factor-auth/multi-factor-auth"
import { PasswordResetScreen } from "../../screens/onboarding/password-reset-screen"
import { FullScreenModalOptions, PushPopStackAnimationOptions } from "../common"
import { PhoneValidationNavigator } from "../phone-validation-navigator/phone-validation-navigator"
import { NavigationPayload } from "../navigation"
import { NavigableRoute } from "../navigator/navigableroute"
import { ResetConfirmationScreen } from "../../screens/onboarding/reset-confirmation-screen"
// import { OnboardingNavigator } from "../onboarding-navigator/onboarding-navigator"
// import { OnboardingFlowStep1 } from "../../screens/onboarding/onboarding-flow/step-1/onboarding-flow-step-1"
// import { OnboardingFlowStep2 } from "../../screens/onboarding/onboarding-flow/step-2/onboarding-flow-step-2"
// import { OnboardingFlowStep3 } from "../../screens/onboarding/onboarding-flow/step-3/onboarding-flow-step-3"
// import { OnboardingFlowStep4 } from "../../screens/onboarding/onboarding-flow/step-4/onboarding-flow-step-4"
// import { OnboardingFlowStep5 } from "../../screens/onboarding/onboarding-flow/step-5/onboarding-flow-step-5"

// tslint:disable-next-line: interface-over-type-literal
export type AuthParamList = {
  [NavigableRoute.AuthLogin]: NavigationPayload<{ originPayload?: NavigationPayload<any> }>
  [NavigableRoute.AuthSignup]: NavigationPayload<{ originPayload?: NavigationPayload<any> }>
  [NavigableRoute.AuthLanding]: NavigationPayload<undefined>
  [NavigableRoute.AuthEmailLanding]: NavigationPayload<{
    originPayload?: NavigationPayload<any>
  }>
  [NavigableRoute.AuthGetUserEmail]: NavigationPayload<{
    code: string
    onUserInfoEntered(authCode: string, name: string, email: string): void
  }>
  [NavigableRoute.AuthMultifactor]: NavigationPayload<{ email: string; password: string }>
  [NavigableRoute.PasswordReset]: NavigationPayload<{ email?: string }>
  [NavigableRoute.ResetConfirm]: NavigationPayload<undefined>
  [NavigableRoute.VerifyPhoneStack]: NavigationPayload<undefined>
  [NavigableRoute.OnboardingStack]: NavigationPayload<undefined>
  // [NavigableRoute.OnboardingFlowStep1]: NavigationPayload<undefined>
  // [NavigableRoute.OnboardingFlowStep2]: NavigationPayload<undefined>
  // [NavigableRoute.OnboardingFlowStep3]: NavigationPayload<undefined>
  // [NavigableRoute.OnboardingFlowStep4]: NavigationPayload<undefined>
  // [NavigableRoute.OnboardingFlowStep5]: NavigationPayload<undefined>
}

const Stack = createStackNavigator<AuthParamList>()
export const AuthStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={NavigableRoute.AuthLanding} headerMode="none">
      <Stack.Screen name={NavigableRoute.AuthLanding} component={AuthLandingScreen} options={FullScreenModalOptions} />
      <Stack.Screen name={NavigableRoute.AuthLogin} component={LoginScreen} options={PushPopStackAnimationOptions} />
      <Stack.Screen name={NavigableRoute.AuthSignup} component={SignupScreen} options={PushPopStackAnimationOptions} />
      <Stack.Screen
        name={NavigableRoute.AuthMultifactor}
        component={MultiFactorAuthScreen}
        options={FullScreenModalOptions}
      />
      <Stack.Screen name={NavigableRoute.PasswordReset} component={PasswordResetScreen} options={FullScreenModalOptions} />
      <Stack.Screen
        name={NavigableRoute.ResetConfirm}
        component={ResetConfirmationScreen}
        options={FullScreenModalOptions}
      />
      <Stack.Screen
        name={NavigableRoute.VerifyPhoneStack}
        component={PhoneValidationNavigator}
        options={FullScreenModalOptions}
      />
      {/*<Stack.Screen
        name={NavigableRoute.OnboardingFlowStep1}
        component={OnboardingFlowStep1}
        options={FullScreenModalOptions}
      />
      <Stack.Screen
        name={NavigableRoute.OnboardingFlowStep2}
        component={OnboardingFlowStep2}
        options={FullScreenModalOptions}
      />
      <Stack.Screen
        name={NavigableRoute.OnboardingFlowStep3}
        component={OnboardingFlowStep3}
        options={FullScreenModalOptions}
      />
      <Stack.Screen
        name={NavigableRoute.OnboardingFlowStep4}
        component={OnboardingFlowStep4}
        options={FullScreenModalOptions}
      />
      <Stack.Screen
        name={NavigableRoute.OnboardingFlowStep5}
        component={OnboardingFlowStep5}
        options={FullScreenModalOptions}
      />*/}
      {/* <Stack.Screen name={NavigableRoute.OnboardingStack} component={OnboardingNavigator} options={FullScreenModalOptions} />*/}
    </Stack.Navigator>
  )
}
