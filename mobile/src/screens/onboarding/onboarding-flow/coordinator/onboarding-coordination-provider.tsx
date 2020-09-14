import React, { useContext, useState, useEffect } from "react"
import { AppState, AppStateStatus } from "react-native"
import { OnboardingScreenViewModel } from "./onboarding-navigation-models"
import { useOnboardingNavigation } from "./onboarding-navigation-provider"
import { useOnboardingState } from "./onboarding-state-provider"
import { EDIT_FLOW_PHOTO_SAVE_DIRECTORY } from "../commons"
import { UUID } from "../../../../utilities"
import { Navigation, CommonNavs } from "../../../../navigation/navigation"
import { NavigableRoute } from "../../../../navigation/navigator/navigableroute"
import { PhotoImageIdentifier, deletePhotosAt } from "../../../../widgets"

interface OnboardingCoordinatorContextProps {
  screenIndex: number
  isViewingLastScreen: boolean
  isPosting: boolean
  viewModels: OnboardingScreenViewModel[]
  currentViewModel: OnboardingScreenViewModel
  handleFooterButtonClicked: () => void
  exitOnboardingFlow: () => void
  restartOnboardingFlow: () => void
}

const OnboardingCoordinatorContext = React.createContext<OnboardingCoordinatorContextProps>({
  screenIndex: 0,
  isViewingLastScreen: false,
  isPosting: false,
  viewModels: [],
  currentViewModel: undefined,
  handleFooterButtonClicked: () => {},
  exitOnboardingFlow: () => {},
  restartOnboardingFlow: () => {},
})

export const useOnboardingCoordination = () => {
  return useContext(OnboardingCoordinatorContext)
}

export const OnboardingCoordinatorProvider: React.FC = ({ children }) => {
  const { screenIndex, viewModels } = useOnboardingNavigation()
  const currentViewModel = viewModels[screenIndex]
  const isViewingLastScreen = screenIndex === viewModels.length - 1
  const { flowState, resetFlowState } = useOnboardingState()
  const [isPostingStarted, setIsPostingStarted] = useState(false)
  // const { startLoading, stopLoading } = useLoadingState()
  // const draftRef = React.useRef(draft)
  /*
   * The actual post action is triggered by a sideeffect gated by 3 states,
   * isPostingStarted, flowState.isUploadingListing, and flowState.isUploadingPhotos;
   * unfoturnately, the later 2 can be mutated asynchronously outside the scope of
   * the posting action, and we can't guarantee that the sideffect won't trigger multiple
   * times. This ref serves as a gate to prevent re-entering the post action until
   * the current one is complete.
   */
  const postInFlightRef = React.useRef(false)

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange)
    return () => {
      AppState.removeEventListener("change", handleAppStateChange)
    }
  }, [])

  const handleAppStateChange = (state: AppStateStatus) => {
    if (state === "inactive" && !isViewingLastScreen) {
      // saveDraftToDisk()
    }
  }

  const uploadPhotosAndGetUUIDs = async () => {
    if (!draft.coverPhoto) {
      return new Promise<void>((_resolve, reject) => {
        reject()
      })
    }

    const photos = [...(draft.photos || [])]
    if (photos.filter(p => p.uuid).length === photos.length && draft.coverPhoto.uuid !== undefined) {
      return new Promise<void>((resolve, _reject) => {
        resolve()
      })
    }

    const photoOrders = photos.map((p, index) => (p.uuid ? -1 : index)).filter(order => order !== -1)
    const photosToUpload = photos.filter(p => !p.uuid)
    let allUUIDsAcquired = false
    // await uploadPhotos(draft.coverPhoto, photosToUpload || [])
    //   .then(response => {
    //     if (response.coverPhotoUUID) {
    //       const coverPhotoSuccess: PhotoImageIdentifier = { ...draft.coverPhoto!, uuid: response.coverPhotoUUID }
    //       asyncUpdateDraft({
    //         coverPhoto: coverPhotoSuccess,
    //       })
    //       draftRef.current.coverPhoto = coverPhotoSuccess
    //     }
    //
    //     response.photoUUIDs.forEach((uuid, idx) => {
    //       photos[photoOrders[idx]].uuid = uuid
    //     })
    //     asyncUpdateDraft({
    //       photos,
    //     })
    //     draftRef.current.photos = photos
    //     allUUIDsAcquired = photos.filter(p => p.uuid).length === photos.length && response.coverPhotoUUID !== undefined
    //   })
    //   .catch(error => console.log(JSON.stringify(error, null, 2)))

    return new Promise<void>((resolve, reject) => {
      allUUIDsAcquired ? resolve() : reject()
    })
  }

  const handleStepOneNextButtonPressed = () => {
    navigateToNextScreen()
  }

  const handleStepTwoNextButtonPressed = () => {
    navigateToNextScreen()
  }

  const handleStepThreeNextButtonPressed = () => {
    navigateToNextScreen()
  }

  const uploadOnboarding = () => {
    // createOrUpdateOnboarding(draftRef.current)
    //   .then(({ Onboarding }) => {
    //
    //     setResultOnboarding(Onboarding)
    //     navigateToNextScreen(Onboarding)
    //     if (flowState.isEditing) {
    //       deletePhotosAt(EDIT_FLOW_PHOTO_SAVE_DIRECTORY)
    //     }
    //   })
    //   .catch(error => {
    //     CommonNavs.presentError({ error })
    //   })
    //   .finally(() => Navigation.performWhenAvailable(() => setIsPostingStarted(false)))
  }

  const handleStepFourNextButtonPressed = () => {
    // const { atLeastOneValidatorFailed } = runValidators()
    // if (atLeastOneValidatorFailed) {
    //   return
    // }

    setIsPostingStarted(true)
  }

  const navigateToNextScreen = () => {
    let nextScreenIndex = screenIndex + 1
    if (nextScreenIndex >= viewModels.length) {
      nextScreenIndex = viewModels.length - 1
    }
    Navigation.navigateToRoute(viewModels[nextScreenIndex].route, { flowState })
  }

  const handleFinalReviewDoneButtonPressed = () => {
    exitOnboardingFlow()
  }

  const footerActionForScreenIndex: { [key: number]: () => void } = {
    0: handleStepOneNextButtonPressed,
    1: handleStepTwoNextButtonPressed,
    2: handleStepThreeNextButtonPressed,
    // 3: handleStepFourNextButtonPressed,
    // 4: handleFinalReviewDoneButtonPressed,
  }

  const exitOnboardingFlow = () => {
    if (flowState.isEditing) {
      deletePhotosAt(EDIT_FLOW_PHOTO_SAVE_DIRECTORY)
      Navigation.popRootNavigator()
    } else {
      if (isViewingLastScreen) {
        Navigation.navigateToRoute(NavigableRoute.DashboardStack, null, { screenRefreshToken: UUID.uuid() })
      } else {
        // saveDraftToDisk()
        Navigation.popRootNavigator()
      }
    }
  }

  const restartOnboardingFlow = () => {
    resetOnboardingFlow()
    Navigation.navigateToRoute(NavigableRoute.OnboardingFlowStep1)
  }

  const resetOnboardingFlow = () => {
    // resetDraft()
    resetFlowState()
  }
  const values = {
    screenIndex,
    isViewingLastScreen,
    isPosting: isPostingStarted || flowState.isUploadingOnboarding,
    viewModels,
    currentViewModel,
    handleFooterButtonClicked: footerActionForScreenIndex[screenIndex],
    exitOnboardingFlow,
    restartOnboardingFlow,
  }

  return <OnboardingCoordinatorContext.Provider value={values}>{children}</OnboardingCoordinatorContext.Provider>
}
