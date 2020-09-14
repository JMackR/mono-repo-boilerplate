import React from "react"
import { BackHandler } from "react-native"
import { Margin, MarginProps, Background, Flex } from "uc-lib"
import { ScrollView } from "uc-lib/controls/scroll-view"
import { Navigation } from "../../../navigation/navigation"
import { KeyboardAvoidanceRollawayContainer } from "../../../keyboardavoidance"
import { useOnboardingCoordination } from "./coordinator/onboarding-coordination-provider"
export const POSTFLOW_HORIZONTAL_MARGIN_STEP = 4

export const BASE_SCREEN_MARGINS: MarginProps = {
  marginTopStep: 8,
  marginBottomStep: 8,
  marginLeftStep: POSTFLOW_HORIZONTAL_MARGIN_STEP,
  marginRightStep: POSTFLOW_HORIZONTAL_MARGIN_STEP,
}

export const OnboardingFlowScreenContainer: React.FC = ({ children }) => {
  const { exitOnboardingFlow, isViewingLastScreen } = useOnboardingCoordination()

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (isViewingLastScreen) {
        exitOnboardingFlow()
      } else {
        Navigation.goBack()
      }
      return true
    })
    return () => backHandler.remove()
  }, [])
  return (
    <Flex direction="column" grow={1}>
      <Background type="primary" />
      <KeyboardAvoidanceRollawayContainer direction="column" grow={1} crossAxisDistribution="stretch">
        <ScrollView>
          <Margin direction="column" {...BASE_SCREEN_MARGINS}>
            {children}
          </Margin>
        </ScrollView>
      </KeyboardAvoidanceRollawayContainer>
    </Flex>
  )
}
