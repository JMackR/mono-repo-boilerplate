import React, { useState, useContext } from "react"
import { OnboardingState } from "./onboarding-types"
import { useAsyncUpdate } from "shared-lib"

interface OnboardingStateContext {
  flowState: OnboardingState
  updateFlowState: (partialFlowState: Partial<OnboardingState>) => void
  asyncUpdateFlowState: (newPartialObj: Partial<OnboardingState>) => void
  resetFlowState: () => void
}

const OnboardingStateContext = React.createContext<OnboardingStateContext>({
  flowState: {},
  updateFlowState: (_partialFlowState: Partial<OnboardingState>) => {},
  asyncUpdateFlowState: (_newPartialObj: Partial<OnboardingState>) => {},
  resetFlowState: () => {},
})

export const useOnboardingState = () => {
  return useContext(OnboardingStateContext)
}

export const OnboardingStateProvider: React.FC = props => {
  const { children } = props

  const [flowState, setFlowState] = useState<OnboardingState>({})
  const updateFlowState = (partialFlowState: Partial<OnboardingState>) => {
    setFlowState({ ...flowState, ...partialFlowState })
  }

  const asyncUpdateFlowState = useAsyncUpdate(flowState, setFlowState)

  const resetFlowState = () => {
    setFlowState({})
  }

  return (
    <OnboardingStateContext.Provider
      value={{
        flowState,
        updateFlowState,
        asyncUpdateFlowState,
        resetFlowState,
      }}
    >
      {children}
    </OnboardingStateContext.Provider>
  )
}
