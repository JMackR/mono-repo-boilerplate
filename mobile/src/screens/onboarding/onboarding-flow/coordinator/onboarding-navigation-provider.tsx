import React from "react"
import { OnboardingScreenViewModel, getOnboardingBaseScreenViewModels } from "./onboarding-navigation-models"

const STARTING_SCREEN_INDEX = 0

interface OnboardingNavigationContextProps {
  screenIndex: number
  setScreenIndex: (_screenIndex: number) => void
  viewModels: OnboardingScreenViewModel[]
}

const OnboardingNavigationContext = React.createContext<OnboardingNavigationContextProps>({
  screenIndex: STARTING_SCREEN_INDEX,
  setScreenIndex: (_screenIndex: number) => {},
  viewModels: [],
})

export const useOnboardingNavigation = () => {
  return React.useContext(OnboardingNavigationContext)
}

export const OnboardingFlowNavigationProvider: React.FC = ({ children }) => {
  const [screenIndex, setScreenIndex] = React.useState(STARTING_SCREEN_INDEX)
  const [viewModels] = React.useState(getOnboardingBaseScreenViewModels())
  return (
    <OnboardingNavigationContext.Provider value={{ screenIndex, setScreenIndex, viewModels }}>
      {children}
    </OnboardingNavigationContext.Provider>
  )
}
