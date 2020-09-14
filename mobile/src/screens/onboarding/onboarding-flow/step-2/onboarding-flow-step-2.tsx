import React, { useRef } from "react"
import { getNavigationBackButton, getNavigationCancelButton } from "../../../../navigation/common"
import { OnboardingFlowScreenContainer } from "../onboarding-flow-container"
import { Spacer, Text } from "uc-lib/controls"
import { useDidFocusOnOnboardingStep } from "../commons"
import { OnboardingFlowStep } from "shared-lib/analytics"

export const OnboardingFlowStep2 = () => {
  const cancelButton = getNavigationCancelButton("onboarding-flow-step-1.cancel")
  const backButton = getNavigationBackButton("onboarding-flow-step-1.back")

  useDidFocusOnOnboardingStep(OnboardingFlowStep.Step2)
  console.log("what is this", OnboardingFlowStep.Step2)
  return (
    <OnboardingFlowScreenContainer>
      <Spacer direction="column" sizeStep={12} />
      <Text text={"hello 2"} />
    </OnboardingFlowScreenContainer>
  )
}
