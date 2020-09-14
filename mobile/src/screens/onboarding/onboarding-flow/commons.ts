import React from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useOnboardingNavigation } from "./coordinator/onboarding-navigation-provider"

export interface OnboardingFlowProps {
  listingId?: string
  itemId?: number
  isSellAnotherFlow?: boolean
}

export const POST_FLOW_PHOTO_SAVE_DIRECTORY = "post_flow"
export const EDIT_FLOW_PHOTO_SAVE_DIRECTORY = "edit_flow"
export const PHOTO_GRID_PAGE_SIZE = 20

export const useDidFocusOnOnboardingStep = (postFlowStep: number) => {
  const navigation = useNavigation()
  const { setScreenIndex } = useOnboardingNavigation()
  const route = useRoute()
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setScreenIndex(postFlowStep)
    })
    return unsubscribe
  }, [navigation])
}
