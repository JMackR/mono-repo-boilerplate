import {
  AnalyticsElementType,
  OnboardingFlowAnalyticsStep1,
  OnboardingFlowElement,
  OnboardingFlowStepOneElement,
  translate,
} from "shared-lib"
import { ActionTrashCircleFill, Background, Flex, Overlay, SVG, Text, useLoadingState, ClickableOpacity } from "uc-lib"
import React, { useEffect } from "react"
import { Navigation, CommonNavs } from "../../../../../navigation/navigation"
import { NavigableRoute } from "../../../../../navigation/navigator/navigableroute"
import { RefreshableImage } from "../../../../../widgets/refreshable-image"
import { useOnboardingDraft } from "../../coordinator/onboarding-flow-state-provider"
import { usePhotoSelection } from "../../photo-selection-provider"
import { downloadRemotePhoto } from "../../../../../widgets"

const COVER_PHOTO_SIZE = 144
const COVER_PHOTO_LABEL_HEIGHT = 20

const DeletePhotoIcon = () => {
  const { selectedPhotos, removePhoto } = usePhotoSelection()
  const deleteCoverPhoto = () => {
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionClickEvent(
      AnalyticsElementType.Button,
      OnboardingFlowStepOneElement.CoverPhotoDelete,
    )
    const copied = [...selectedPhotos]
    removePhoto(copied[0].id)
  }
  return (
    <ClickableOpacity onClick={deleteCoverPhoto} testID="onboarding-flow.cover.delete-icon">
      <Flex width={40} height={40} crossAxisDistribution={"center"} axisDistribution={"center"}>
        <SVG localSVG={{ SVG: ActionTrashCircleFill.SVG, size: { width: 26, height: 26 } }} tint="alwaysLight" />
      </Flex>
    </ClickableOpacity>
  )
}

export const CoverPhoto = () => {
  const { selectedPhotos } = usePhotoSelection()
  const { draft } = useOnboardingDraft()
  const coverPhotoCropped = draft.coverPhoto!
  const coverPhotoOriginal = selectedPhotos[0]
  const { directoryPath } = usePhotoSelection()
  const { startLoading, stopLoading } = useLoadingState()
  const goToCoverPhotoEdit = async () => {
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionClickEvent(AnalyticsElementType.Image, OnboardingFlowElement.Edit)
    if (coverPhotoOriginal.uuid) {
      try {
        startLoading()
        const downloadedPhoto = await downloadRemotePhoto({
          urlToDownload: coverPhotoOriginal.uri,
          directoryPath,
        })
        Navigation.navigateToRoute(NavigableRoute.OnboardingFlowCoverPhotoEdit, {
          photo: { ...coverPhotoOriginal, ...downloadedPhoto },
          edits: draft.coverPhotoEdits,
        })
      } catch (error) {
        CommonNavs.presentError({ error })
      } finally {
        stopLoading()
      }
    } else {
      Navigation.navigateToRoute(NavigableRoute.OnboardingFlowCoverPhotoEdit, {
        photo: coverPhotoOriginal,
        edits: draft.coverPhotoEdits,
      })
    }
  }

  useEffect(() => {
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionShowEvent(AnalyticsElementType.Image, OnboardingFlowElement.Edit)
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionShowEvent(
      AnalyticsElementType.Button,
      OnboardingFlowStepOneElement.CoverPhotoDelete,
    )
  }, [])

  return (
    <Flex>
      <ClickableOpacity onClick={goToCoverPhotoEdit} testID="onboarding-flow.cover-photo">
        <RefreshableImage
          refreshToken={coverPhotoCropped.changeToken}
          borderRadius={4}
          source={{ uri: coverPhotoCropped.uri }}
          height={COVER_PHOTO_SIZE}
          width={COVER_PHOTO_SIZE}
          resizeMode="contain"
        />
      </ClickableOpacity>
      <Overlay insetRightStep={-5} insetTopStep={-5}>
        <DeletePhotoIcon />
      </Overlay>
      <Overlay insetLeftStep={2} insetRightStep={2} insetBottomStep={2}>
        <Flex width="100%" height={COVER_PHOTO_LABEL_HEIGHT} axisDistribution="center" crossAxisDistribution="center">
          <Background type="overlay" />
          <Text textType="tertiaryBody2" color="primaryAlt" textAlign="center" testID="onboarding-flow.cover.photo-text">
            {translate("onboarding-flow.cover-photo")}
          </Text>
        </Flex>
      </Overlay>
    </Flex>
  )
}
