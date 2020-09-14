import { AnalyticsElementType, OnboardingFlowAnalyticsStep1, OnboardingFlowStepOneElement, translate } from "shared-lib"
import { ActionClose, Background, Border, Margin, SelectPhotoIcon as RNSelectPhotoIcon, Stack, SVG, Text } from "uc-lib"
import React, { useEffect } from "react"
import { View } from "react-native"
import { usePhotoSelection } from "../../photo-selection-provider"
import { attemptNavigationToPhotoGallery } from "./photo-navigation"

const ADD_PHOTO_TILE_SIZE = 144

const SelectPhotoIcon = () => (
  <SVG
    localSVG={{
      ...RNSelectPhotoIcon,
      size: {
        width: 16,
        height: 16,
      },
    }}
    tint="brand"
  />
)

// THIS IS HACK until UX gives plus icon. :D
const PlusIcon = () => (
  <View style={{ transform: [{ rotate: "45deg" }] }}>
    <SVG
      localSVG={{
        ...ActionClose,
        size: {
          width: 44,
          height: 44,
        },
      }}
      tint="brand"
    />
  </View>
)

export const AddPhoto = () => {
  const { selectedPhotos, maxNumberOfPhotos } = usePhotoSelection()

  useEffect(() => {
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionShowEvent(
      AnalyticsElementType.Button,
      OnboardingFlowStepOneElement.AddPhoto,
    )
  }, [])

  const goToImagePicker = () => {
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionClickEvent(
      AnalyticsElementType.Button,
      OnboardingFlowStepOneElement.AddPhoto,
    )
    attemptNavigationToPhotoGallery()
  }

  return (
    <Border
      touchUpInsideHandler={goToImagePicker}
      cornerRadius="small"
      color="granite"
      width={ADD_PHOTO_TILE_SIZE}
      height={ADD_PHOTO_TILE_SIZE}
    >
      <Background type="secondary" />
      <Stack width="100%" direction="column" crossAxisDistribution="center">
        <Margin marginTopStep={6}>
          <PlusIcon />
        </Margin>
        <Margin marginTopStep={6} marginBottomStep={2} crossAxisDistribution="center">
          <Margin marginRightStep={1}>
            <SelectPhotoIcon />
          </Margin>
          <Text
            textType="primaryBody2"
            color="brand"
            testID="onboarding-flow.add-photo"
            text={translate("onboarding-flow.add-photo")}
          />
        </Margin>
        <Text
          textType="tertiaryBody2"
          testID="onboarding-flow.added-photo.count"
          text={translate("onboarding-flow.photo-selection-limit", {
            selectedPhotoCount: selectedPhotos.length,
            maxNumberOfPhotos,
          })}
        />
      </Stack>
    </Border>
  )
}
