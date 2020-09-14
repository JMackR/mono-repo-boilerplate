import {
  AnalyticsActionType,
  OnboardingFlowAnalyticsStep1,
  OnboardingFlowElement,
  OnboardingFlowStepOneElement,
  translate,
} from "shared-lib"
import { CameraCapture, Flex, Margin, Stack, SVG, Text, LocalSVGSource } from "uc-lib"
import React, { FC, useEffect } from "react"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler"
import { Navigation } from "../../navigation/navigation"
import { usePhotoSelection } from "../../providers/photo-selection-provider"
// import { attemptNavigationToPhotoGallery } from "../step-1/onboarding-flow-photo-selection/photo-navigation"
import { GalleryPreview } from "./gallery-preview"

interface OnboardingFlowCameraBottomControlsProps {
  onCaptureButtonClicked: () => void
}

const CaptureIcon: LocalSVGSource = {
  SVG: CameraCapture.SVG,
  size: {
    width: 56,
    height: 56,
  },
}

export const TILE_SIZE = 36

export const OnboardingFlowCameraBottomControls: FC<OnboardingFlowCameraBottomControlsProps> = ({
  onCaptureButtonClicked,
}) => {
  const { doneWithPhotos, draftSelectedPhotos, maxNumberOfPhotos } = usePhotoSelection()
  const maxNumberOfPhotosTaken = maxNumberOfPhotos > draftSelectedPhotos.length

  useEffect(() => {
    OnboardingFlowAnalyticsStep1.trackCamera(
      OnboardingFlowStepOneElement.CameraRoll,
      AnalyticsActionType.Show,
      draftSelectedPhotos.length,
    )
    OnboardingFlowAnalyticsStep1.trackCamera(
      OnboardingFlowElement.Done,
      AnalyticsActionType.Show,
      draftSelectedPhotos.length,
    )
  }, [])

  /**
   * TODO need to refactor this
   */
  const goToImagePicker = () => {
    OnboardingFlowAnalyticsStep1.trackCamera(
      OnboardingFlowStepOneElement.CameraRoll,
      AnalyticsActionType.Click,
      draftSelectedPhotos.length,
    )
    // attemptNavigationToPhotoGallery()
  }

  const doneTakingPhotos = async () => {
    OnboardingFlowAnalyticsStep1.trackCamera(
      OnboardingFlowElement.Done,
      AnalyticsActionType.Click,
      draftSelectedPhotos.length,
    )
    await doneWithPhotos()
    Navigation.popToTop()
  }

  return (
    <Stack grow={1} direction="row" crossAxisDistribution="center" axisDistribution="center">
      <Flex grow={1} crossAxisDistribution="center" axisDistribution="flex-end" touchUpInsideHandler={goToImagePicker}>
        <GalleryPreview />
      </Flex>
      <Margin grow={1} crossAxisDistribution="center" direction="column">
        <TouchableOpacity
          onPress={onCaptureButtonClicked}
          disabled={!maxNumberOfPhotosTaken}
          testID="camera.capture-button"
          accessibilityLabel="camera.capture-button"
        >
          <SVG localSVG={CaptureIcon} />
        </TouchableOpacity>
      </Margin>
      <Stack grow={1} direction="column" crossAxisDistribution="flex-start">
        <TouchableWithoutFeedback
          onPress={doneTakingPhotos}
          testID="camera.done-button"
          accessibilityLabel="camera.done-button"
        >
          <Text color="alwaysLight" textType="primaryBody1">
            {translate("camera.done-btn")}
          </Text>
        </TouchableWithoutFeedback>
      </Stack>
    </Stack>
  )
}
