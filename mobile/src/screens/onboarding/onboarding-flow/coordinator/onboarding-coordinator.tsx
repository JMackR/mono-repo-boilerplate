import React from "react"
import { OnboardingFlowNavigationProvider } from "./onboarding-navigation-provider"
import { OnboardingCoordinatorProvider } from "./onboarding-coordination-provider"
import { OnboardingFlowProps } from "../commons"
import { OnboardingStateProvider } from "./onboarding-state-provider"
// import { PhotoSelectionProvider } from "../photo-selection-provider"

export const OnboardingCoordinator: React.FC<OnboardingFlowProps> = props => {
  const { children } = props
  return (
    <OnboardingStateProvider>
      <OnboardingFlowNavigationProvider>
        <OnboardingCoordinatorProvider>
          {/* <PhotoSelectionProvider>*/}
          {children}
          {/*</PhotoSelectionProvider>*/}
        </OnboardingCoordinatorProvider>
      </OnboardingFlowNavigationProvider>
    </OnboardingStateProvider>
  )
}
