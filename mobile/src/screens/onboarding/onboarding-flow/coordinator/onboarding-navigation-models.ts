import { OnboardingStepsStackNavigatorParamList } from "../../../../navigation/onboarding-navigator/onboarding-navigator"
import { NavigableRoute } from "../../../../navigation/navigator/navigableroute"
import { OnboardingFlowStep1 } from "../step-1/onboarding-flow-step-1"
import { OnboardingFlowStep2 } from "../step-2/onboarding-flow-step-2"
import { OnboardingFlowStep3 } from "../step-3/onboarding-flow-step-3"
import { OnboardingFlowStep4 } from "../step-4/onboarding-flow-step-4"
// import { OnboardingFlowStep5 } from "../step-5/onboarding-flow-step-5"
import { translate } from "shared-lib"
import { OnboardingState } from "./onboarding-types"

export interface OnboardingScreenViewModel {
  route: keyof OnboardingStepsStackNavigatorParamList
  // tslint:disable-next-line: no-any
  component: React.FC<any>
  bottomButtonTitle: (flowState: OnboardingState) => string
  navBarTitle: (flowState: OnboardingState) => string
  pageIndicatorTitle: string
  shouldHideBackButton?: boolean
  // validationKeys: OnboardingFlowValidationKey[]
  navGestureEnabled?: boolean
}

export const getOnboardingBaseScreenViewModels = () => {
  const viewModels: OnboardingScreenViewModel[] = [
    {
      route: NavigableRoute.OnboardingFlowStep1,
      component: OnboardingFlowStep1,
      bottomButtonTitle: () => translate("common-actions.next"),
      navBarTitle: (flowState: OnboardingState) => {
        return translate("onboarding-flow.step1-header-title")
      },
      pageIndicatorTitle: translate("onboarding-flow.step1-indicator-title"),
    },
    {
      route: NavigableRoute.OnboardingFlowStep2,
      component: OnboardingFlowStep2,
      bottomButtonTitle: () => translate("common-actions.next"),
      navBarTitle: () => translate("onboarding-flow.step2-header-title"),
      pageIndicatorTitle: translate("onboarding-flow.step2-indicator-title"),
    },
    {
      route: NavigableRoute.OnboardingFlowStep3,
      component: OnboardingFlowStep3,
      bottomButtonTitle: () => translate("common-actions.next"),
      navBarTitle: () => translate("onboarding-flow.step3-header-title"),
      pageIndicatorTitle: translate("onboarding-flow.step2-indicator-title"),
    },
    {
      route: NavigableRoute.OnboardingFlowStep4,
      component: OnboardingFlowStep4,
      bottomButtonTitle: (flowState: OnboardingState) => {
        if (flowState.isEditing) {
          return translate("onboarding-flow.save-action")
        } else {
          return translate("onboarding-flow.post-action")
        }
      },
      navBarTitle: (flowState: OnboardingState) => {
        return translate("onboarding-flow.delivery-page-title")
      },
      pageIndicatorTitle: translate("onboarding-flow.delivery-page-title"),
    },
    // {
    //   route: NavigableRoute.OnboardingFlowStep5,
    //   component: OnboardingFlowStep5,
    //   bottomButtonTitle: () => translate("common-actions.done"),
    //   navBarTitle: () => translate("onboarding-flow.confirmation-page-title"),
    //   pageIndicatorTitle: translate("onboarding-flow.confirmation-page-title"),
    //   // validationKeys: [],
    //   shouldHideBackButton: true,
    //   navGestureEnabled: false,
    // },
  ]
  return viewModels
}
