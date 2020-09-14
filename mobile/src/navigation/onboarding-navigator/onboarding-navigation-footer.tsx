import React from "react"
import { useOnboardingCoordination } from "../../screens/onboarding/onboarding-flow/coordinator/onboarding-coordination-provider"
import { OnboardingScreenViewModel } from "../../screens/onboarding/onboarding-flow/coordinator/onboarding-navigation-models"
import { Margin, Button, Stack, MarginProps, Background, Flex } from "uc-lib"
import { OnboardFlowStep, OnboardingFlowStepper } from "../../screens/onboarding/onboarding-flow/stepper/post-flow-stepper"
import { ButtonType } from "uc-lib/controls/button/button-props-base"
import { translate } from "shared-lib"
import { OnboardingState } from "../../screens/onboarding/onboarding-flow/coordinator/onboarding-types"
import { NavigableRoute } from "../../navigation/navigator/navigableroute"
import { useOnboardingState } from "../../screens/onboarding/onboarding-flow/coordinator/onboarding-state-provider"

const VERTICAL_MARGIN = 2
const HORIZONTAL_MARGIN = 4
const CONFIRMATION_SCREEN_INDEX = 4
const FOOTER_MARGIN: MarginProps = {
  marginBottomStep: VERTICAL_MARGIN,
  marginTopStep: VERTICAL_MARGIN,
  marginLeftStep: HORIZONTAL_MARGIN,
  marginRightStep: HORIZONTAL_MARGIN,
}

export const OnboardingNavigationFooter = () => {
  const {
    isViewingLastScreen,
    screenIndex,
    currentViewModel,
    viewModels,
    handleFooterButtonClicked,
    isPosting,
  } = useOnboardingCoordination()
  const { flowState } = useOnboardingState()

  let footerButtonType: ButtonType
  if (screenIndex === CONFIRMATION_SCREEN_INDEX) {
    footerButtonType = "flat"
  } else {
    footerButtonType = isPosting ? "disabled" : "primary"
  }
  const bottomButtonTitle = footerButtonForViewModel(currentViewModel, "kevin", flowState, isPosting)

  return (
    <Flex grow={1} direction="column">
      <Background type="primary" />
      <Margin grow={1} direction="column" {...FOOTER_MARGIN}>
        <Stack direction="column" childSeparationStep={VERTICAL_MARGIN}>
          <Button
            buttonType={footerButtonType}
            buttonSize="large"
            title={bottomButtonTitle}
            onClick={handleFooterButtonClicked}
            testID={"post-flow." + bottomButtonTitle.toLocaleLowerCase()}
          />
        </Stack>
      </Margin>
    </Flex>
  )
}

const footerButtonForViewModel = (
  viewModel: OnboardingScreenViewModel,
  pppPostTitle: string | undefined,
  flowState: OnboardingState,
  isPosting: boolean | undefined,
): string => {
  if (isPosting) {
    if (flowState.isEditing) {
      return translate("post-flow.saving")
    } else {
      return translate("post-flow.posting")
    }
  }
  if (viewModel.route === NavigableRoute.OnboardingFlowStep4 && pppPostTitle) {
    return pppPostTitle
  }

  return viewModel.bottomButtonTitle(flowState)
}
