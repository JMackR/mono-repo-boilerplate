import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationPayload } from "../navigation"
import { NavigableRoute } from "../navigator/navigableroute"
import { ScreenRoute } from "../route"
import { NavigatorParamList } from "../navigator"
import { ModalCardOverlayOption, FullScreenModalOptions, PushPopStackAnimationOptions } from "../common"
import { Screen } from "../../widgets/screen"
import { Background, Flex } from "uc-lib/controls"
import { KeyboardAvoidanceOverlayContainer, KeyboardAvoidanceView } from "../../keyboardavoidance"
import { OnboardingNavigationFooter } from "./onboarding-navigation-footer"
import { OnboardingNavigationHeader } from "./onboarding-navigation-header"
import { useOnboardingNavigation } from "../../screens/onboarding/onboarding-flow/coordinator/onboarding-navigation-provider"
import { OnboardingCoordinator } from "../../screens/onboarding/onboarding-flow/coordinator/onboarding-coordinator"

export const OnboardingNavigator: React.FC<ScreenRoute<NavigatorParamList, NavigableRoute.OnboardingStack>> = ({
  route,
}) => {
  return (
    <OnboardingCoordinator>
      <OnboardingModalNavigator />
    </OnboardingCoordinator>
  )
}

// tslint:disable-next-line: interface-over-type-literal
export type OnboardingModalNavigatorParamList = {
  [NavigableRoute.OnboardingStack]: NavigationPayload<undefined>
}

const OnboardingModals = createStackNavigator<OnboardingModalNavigatorParamList>()

const OnboardingModalNavigator = () => {
  return (
    <OnboardingModals.Navigator
      initialRouteName={NavigableRoute.OnboardingStack}
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <OnboardingModals.Screen name={NavigableRoute.OnboardingStack} component={OnboardingStepsNavigationContainer} />
    </OnboardingModals.Navigator>
  )
}

const OnboardingStepsNavigationContainer = () => {
  return (
    <Screen safeAreaMode="all" backgroundColor={"brand"}>
      <Flex grow={1} direction="column" crossAxisDistribution="stretch">
        <Background type="primary" />
        <OnboardingStepsNavigator />
      </Flex>
      <KeyboardAvoidanceOverlayContainer absoluteBottom={0}>
        <KeyboardAvoidanceView grow={1} direction="column" stackOrder={0} activeInGroups={[]}>
          <OnboardingNavigationFooter />
        </KeyboardAvoidanceView>
      </KeyboardAvoidanceOverlayContainer>
    </Screen>
  )
}

// tslint:disable-next-line: interface-over-type-literal
export type OnboardingFlowStackNavigatorParamList = {
  [NavigableRoute.OnboardingFlowStep1]: NavigationPayload<undefined>
  [NavigableRoute.OnboardingFlowStep2]: NavigationPayload<undefined>
  [NavigableRoute.OnboardingFlowStep3]: NavigationPayload<undefined>
  [NavigableRoute.OnboardingFlowStep4]: NavigationPayload<undefined>
  [NavigableRoute.OnboardingFlowStep5]: NavigationPayload<undefined>
  [NavigableRoute.HomeTabs]: NavigationPayload<undefined>
}
const OnboardingStepsStack = createStackNavigator<OnboardingFlowStackNavigatorParamList>()
const OnboardingStepsNavigator = () => {
  const { viewModels } = useOnboardingNavigation()

  return (
    <OnboardingStepsStack.Navigator
      initialRouteName={NavigableRoute.OnboardingFlowStep1}
      screenOptions={{ header: props => <OnboardingNavigationHeader {...props} />, ...PushPopStackAnimationOptions }}
    >
      {viewModels.map(viewModel => {
        return (
          <OnboardingStepsStack.Screen
            key={viewModel.route}
            name={viewModel.route}
            component={viewModel.component}
            options={{
              headerLeftContainerStyle: viewModel.shouldHideBackButton ? null : undefined,
              gestureEnabled: viewModel.navGestureEnabled,
            }}
          />
        )
      })}
    </OnboardingStepsStack.Navigator>
  )
}
