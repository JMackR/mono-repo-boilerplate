import {
  translate,
  OnboardingFlowAnalyticsStep1,
  OnboardingFlowStepOneElement,
  OnboardingFlowElement,
  AnalyticsActionType,
} from "shared-lib"
import { CameraFlashLightAuto, CameraFlashLightOff, CameraFlashLightOn, CameraFlip, NavigationBar } from "uc-lib"
import React, { FC, useEffect } from "react"
import { RNCamera, FlashMode } from "react-native-camera"
import { Navigation } from "../../navigation/navigation"
import { usePhotoSelection } from "../../providers/photo-selection-provider"

export const flashLightModes = [
  RNCamera.Constants.FlashMode.auto,
  RNCamera.Constants.FlashMode.on,
  RNCamera.Constants.FlashMode.off,
]

interface OnboardingFlowCameraTopBar {
  isBackCamera: boolean
  setIsBackCamera: (_flag: boolean) => void
  flashLightMode: keyof FlashMode
  setFlashLightMode: (_mode: FlashMode) => void
}

export const OnboardingFlowCameraTopBar: FC<OnboardingFlowCameraTopBar> = ({
  isBackCamera,
  setIsBackCamera,
  flashLightMode,
  setFlashLightMode,
}) => {
  const { setDraftSelectedPhotos, selectedPhotos } = usePhotoSelection()
  const isFlashOff = flashLightMode === RNCamera.Constants.FlashMode.off

  useEffect(() => {
    OnboardingFlowAnalyticsStep1.trackCamera(
      isFlashOff ? OnboardingFlowStepOneElement.FlashOff : OnboardingFlowStepOneElement.FlashOn,
      AnalyticsActionType.Show,
    )
    OnboardingFlowAnalyticsStep1.trackCamera(OnboardingFlowElement.Cancel, AnalyticsActionType.Show)
  }, [])

  const onFlashLightChange = () => {
    const currentFlashLightModeIndex = flashLightModes.findIndex((f) => f === flashLightMode)
    const nextFlashLightMode = flashLightModes[(currentFlashLightModeIndex + 1) % flashLightModes.length]
    setFlashLightMode(nextFlashLightMode)
    OnboardingFlowAnalyticsStep1.trackCamera(
      isFlashOff ? OnboardingFlowStepOneElement.FlashOff : OnboardingFlowStepOneElement.FlashOn,
      AnalyticsActionType.Click,
    )
  }

  const flashLightIcons = {
    [RNCamera.Constants.FlashMode.auto]: CameraFlashLightAuto,
    [RNCamera.Constants.FlashMode.on]: CameraFlashLightOn,
    [RNCamera.Constants.FlashMode.off]: CameraFlashLightOff,
  }

  const toggleCameraType = () => setIsBackCamera(!isBackCamera)

  const onCancel = () => {
    OnboardingFlowAnalyticsStep1.trackCamera(OnboardingFlowElement.Cancel, AnalyticsActionType.Click)
    setDraftSelectedPhotos(selectedPhotos)
    Navigation.popToTop()
  }

  return (
    <NavigationBar
      title=""
      leftItems={[{ pressHandler: onCancel, title: translate("camera.cancel-btn"), testID: "camera.cancel-btn" }]}
      rightItems={[
        { pressHandler: toggleCameraType, icon: CameraFlip, testID: "camera.flip" },
        {
          pressHandler: onFlashLightChange,
          icon: flashLightIcons[flashLightMode],
          testID: "camera.camera-flash" + flashLightMode,
        },
      ]}
      barItemsTint="alwaysLight"
    />
  )
}
