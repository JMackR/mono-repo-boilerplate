import { PhotoImageIdentifier } from "../../../../../widgets"
import { AnalyticsElementType, OnboardingFlowAnalyticsStep1, OnboardingFlowStepOneElement, translate } from "shared-lib"
import { Button, ErrorBorder, Margin, Stack, Text, SVG, ActionEditPencil, CameraOutline, ChatPhotoSelect } from "uc-lib"
import React, { FC, useEffect } from "react"
// import { useOnboardingFlowInputValidationResult } from "../../coordinator/onboarding-flow-input-validation-provider"
// import { useOnboardingDraft } from "../../coordinator/onboarding-flow-state-provider"
// import { usePhotoSelection } from "../../photo-selection-provider"
import { AddPhoto } from "./add-photo"
import { CoverPhoto } from "./cover-photo"
import { OnboardingSelectedPhotos } from "./selected-photos"
import { attemptNavigationToCamera, attemptNavigationToPhotoGallery } from "./photo-navigation"

const NoPhotoSelected = () => {
  useEffect(() => {
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionShowEvent(
      AnalyticsElementType.Button,
      OnboardingFlowStepOneElement.TakePhoto,
    )
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionShowEvent(
      AnalyticsElementType.Button,
      OnboardingFlowStepOneElement.SelectPhoto,
    )
  }, [])

  const { validationErrorText } = useOnboardingFlowInputValidationResult("photos")

  const onTakePhotoClick = async () => {
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionClickEvent(
      AnalyticsElementType.Button,
      OnboardingFlowStepOneElement.TakePhoto,
    )
    attemptNavigationToCamera()
  }

  const onSelectPhotoClick = async () => {
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionClickEvent(
      AnalyticsElementType.Button,
      OnboardingFlowStepOneElement.SelectPhoto,
    )
    attemptNavigationToPhotoGallery()
  }
  return (
    <Stack grow={1} direction="column" childSeparationStep={4} crossAxisDistribution="stretch">
      <ErrorBorder grow={1} direction="column" errorText={validationErrorText} testID="onboarding-flow.take-select">
        <Stack grow={1} direction="column" childSeparationStep={4} crossAxisDistribution="stretch">
          <Button
            icon={CameraOutline}
            title={translate("onboarding-flow.take-photo")}
            buttonType="secondary"
            buttonSize="large"
            onClick={onTakePhotoClick}
            testID="onboarding-flow.take-photo"
          />
          <Button
            icon={ChatPhotoSelect}
            title={translate("onboarding-flow.select-photo")}
            buttonType="secondary"
            buttonSize="large"
            onClick={onSelectPhotoClick}
            testID="onboarding-flow.select-photo"
          />
        </Stack>
      </ErrorBorder>
      <Text textType="secondaryBody2" textAlign="center" testID="onboarding-flow.add-cover-photo-instruction">
        {translate("onboarding-flow.add-cover-photo-instruction")}
      </Text>
    </Stack>
  )
}
interface PhotoSelectionWithPhotos {
  selectedPhotos: PhotoImageIdentifier[]
  maxNumberOfPhotos: number
}

const PENCIL_ICON_SIZE = {
  width: 12,
  height: 12,
}

const PhotoInstructionRow: React.FC = ({ children }) => {
  return (
    <Stack direction="row" crossAxisDistribution="center" childSeparationStep={1}>
      <SVG
        localSVG={{
          SVG: ActionEditPencil.SVG,
          size: PENCIL_ICON_SIZE,
        }}
        tint="primary"
      />
      <Text textType="secondaryBody2">{children}</Text>
    </Stack>
  )
}

const PhotoSelectionWithPhotos: FC<PhotoSelectionWithPhotos> = ({ selectedPhotos, maxNumberOfPhotos }) => {
  return (
    <Stack grow={1} direction="column" crossAxisDistribution="stretch" childSeparationStep={6}>
      <Stack axisDistribution="center" direction="row" childSeparationStep={4}>
        <CoverPhoto />
        {maxNumberOfPhotos > selectedPhotos.length && <AddPhoto />}
      </Stack>
      <OnboardingSelectedPhotos selectedPhotos={selectedPhotos} />
      <Stack direction="column" childSeparationStep={1}>
        <PhotoInstructionRow>{translate("onboarding-flow.tap-to-edit")}</PhotoInstructionRow>
        <PhotoInstructionRow>{translate("onboarding-flow.photo-rearrange")}</PhotoInstructionRow>
      </Stack>
    </Stack>
  )
}

export const OnboardingPhotoSelection = () => {
  const { selectedPhotos, maxNumberOfPhotos } = usePhotoSelection()
  const { draft } = useOnboardingDraft()
  return (
    <Margin marginTopStep={8} crossAxisDistribution="stretch">
      {selectedPhotos.length > 0 && draft.coverPhoto ? (
        <PhotoSelectionWithPhotos maxNumberOfPhotos={maxNumberOfPhotos} selectedPhotos={selectedPhotos} />
      ) : (
        <NoPhotoSelected />
      )}
    </Margin>
  )
}
