import React from "react"
import { Animated, Platform, StatusBar } from "react-native"
import { StackHeaderProps } from "@react-navigation/stack/lib/typescript/src/types"
import {
  NavigationBar,
  NAVIGATION_BAR_HEIGHT,
  NavigationBarItem,
  Flex,
  ActionClose,
  Stack,
  MarginProps,
  Margin,
} from "uc-lib"
import { Navigation } from "../navigation"
import { useOnboardingCoordination } from "../../screens/onboarding/onboarding-flow/coordinator/onboarding-coordination-provider"
import { useOnboardingState } from "../../screens/onboarding/onboarding-flow/coordinator/onboarding-state-provider"
import { translate } from "shared-lib"
import { NavigableRoute } from "../navigator/navigableroute"
import { getNavigationBackButton } from "../common"
import { OnboardingScreenViewModel } from "../../screens/onboarding/onboarding-flow/coordinator/onboarding-navigation-models"
import { OnboardingState } from "../../screens/onboarding/onboarding-flow/coordinator/onboarding-types"
import { OnboardFlowStep, OnboardingFlowStepper } from "../../screens/onboarding/onboarding-flow/stepper/post-flow-stepper"
import { ButtonType } from "uc-lib/controls/button/button-props-base"
import { Screen } from "../../widgets/screen"

const VERTICAL_MARGIN = 2
const HORIZONTAL_MARGIN = 4
const CONFIRMATION_SCREEN_INDEX = 4
const HEADER_MARGIN: MarginProps = {
  marginBottomStep: VERTICAL_MARGIN,
  marginTopStep: VERTICAL_MARGIN,
  marginLeftStep: HORIZONTAL_MARGIN,
  marginRightStep: HORIZONTAL_MARGIN,
}

export const OnboardingNavigationHeader: React.FC<StackHeaderProps> = ({ scene, previous }) => {
  const {
    isViewingLastScreen,
    screenIndex,
    currentViewModel,
    viewModels,
    handleFooterButtonClicked,
    isPosting,
    exitOnboardingFlow,
  } = useOnboardingCoordination()
  const headerOpacity = scene.progress.current

  const { flowState } = useOnboardingState()

  const routeName = scene.route.name
  const thisHeadersScreenIndex = viewModels.findIndex(model => model.route === routeName)
  const isLastScreen = thisHeadersScreenIndex === viewModels.length - 1

  const backButton: NavigationBarItem[] = []
  if (previous && scene.descriptor.options.headerLeftContainewrStyle !== null) {
    backButton.push(getNavigationBackButton("onboarding-flow.navigation-bar"))
  }

  const skipButton: NavigationBarItem[] = []
  skipButton.push({
    icon: ActionClose,
    testID: "onboarding-flow.navigation-bar.skip",
    pressHandler: () => {
      exitOnboardingFlow()
    },
  })

  let footerButtonType: ButtonType
  if (screenIndex === CONFIRMATION_SCREEN_INDEX) {
    footerButtonType = "flat"
  } else {
    footerButtonType = isPosting ? "disabled" : "primary"
  }
  const title = viewModels[thisHeadersScreenIndex].navBarTitle(flowState)

  const steps = onboardingStepperSteps(viewModels)

  return (
    <Animated.View style={{ opacity: headerOpacity }}>
      <Flex direction="column" grow={1} height={NAVIGATION_BAR_HEIGHT}>
        <NavigationBar
          title={title}
          leftItems={backButton}
          barItemsTint={"primaryAlt"}
          backgroundColor={"brand"}
          testID="onboarding-flow.navigation-bar"
        />
      </Flex>
      <Flex direction="column" grow={1} height={NAVIGATION_BAR_HEIGHT}>
        <Margin grow={1} direction="column" {...HEADER_MARGIN}>
          {!isViewingLastScreen && <OnboardingFlowStepper steps={steps} progress={screenIndex} />}
        </Margin>
      </Flex>
    </Animated.View>
  )
}

const onboardingStepperSteps = (viewModels: OnboardingScreenViewModel[]): OnboardFlowStep[] => {
  const steps = viewModels.map<OnboardFlowStep>((viewModel, index) => {
    return {
      text: index + 1 + ". " + viewModel.pageIndicatorTitle,
    }
  })
  // The last screen shouldn't be displayed in the stepper.
  steps.pop()
  return steps
}
