import { ActivityIndicator, Background, Center, Flex, Margin, Overlay, Stack, ListRef, Text, useMargin } from "uc-lib"
import React, { FC, useRef, useState, useEffect } from "react"
import { RNCamera } from "react-native-camera"
import { Screen } from ".."
import { PhotoImageIdentifier } from ".."
import { usePhotoSelection } from "../../providers/photo-selection-provider"
import { OnboardingFlowCameraBottomControls } from "./bottom-controls"
import { DraftPhotoList } from "./draft-photo-list"
import { flashLightModes, OnboardingFlowCameraTopBar } from "./top-bar"
import { View, LayoutRectangle, LayoutChangeEvent } from "react-native"
import { OnboardingFlowAnalyticsStep1, OnboardingFlowStepOneElement, AnalyticsActionType } from "shared-lib"
import { Cropper } from "../photo-edit/cropper"

const CAMERA_OPTIONS = {
  quality: 1,
  base64: true,
}

const RECTANGLE_ZERO: LayoutRectangle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}

export const OnboardingFlowCameraRoll: FC = () => {
  const camera = useRef<RNCamera>(null)
  const { draftSelectedPhotos, setDraftSelectedPhotos } = usePhotoSelection()
  const [isBackCamera, setIsBackCamera] = useState(true)
  const [flashLightMode, setFlashLightMode] = useState(flashLightModes[0])
  const [photoCaptureLoading, setPhotoCaptureLoading] = useState(false)
  const photoListRef = useRef<ListRef>(null)
  const [cropperRectangle, setCropperRectangle] = useState(RECTANGLE_ZERO)
  const { baseMargin } = useMargin()
  const paddingHorizontal = baseMargin * 5

  useEffect(() => {
    OnboardingFlowAnalyticsStep1.trackCamera(OnboardingFlowStepOneElement.TakePhoto, AnalyticsActionType.Show)
  }, [])

  const takePicture = async () => {
    OnboardingFlowAnalyticsStep1.trackCamera(OnboardingFlowStepOneElement.TakePhoto, AnalyticsActionType.Click)
    if (camera.current) {
      setPhotoCaptureLoading(true)
      const { uri } = await camera.current.takePictureAsync(CAMERA_OPTIONS)
      const draftPhotoTakenFromCamera = {
        uri,
        isStored: false,
      } as PhotoImageIdentifier
      setDraftSelectedPhotos([...draftSelectedPhotos, draftPhotoTakenFromCamera])
      setPhotoCaptureLoading(false)
    }
    if (photoListRef.current) {
      photoListRef.current.scrollToEnd()
    }
  }

  const onCameraContainerLayout = (event: LayoutChangeEvent) => {
    const imageContainerRect = event.nativeEvent.layout
    const cropperRect = getCropperRectangle(imageContainerRect)
    setCropperRectangle(cropperRect)
  }

  const onThumbnailLayout = (event: LayoutChangeEvent) => {
    const thumbnailContainerLayout = event.nativeEvent.layout
    setCropperRectangle((cropperRect) => ({
      ...cropperRect,
      y: cropperRect.y - thumbnailContainerLayout.height / 2,
    }))
  }

  const getCropperRectangle: (container: LayoutRectangle) => LayoutRectangle = (imageContainer: LayoutRectangle) => {
    const imageContainerWidth = imageContainer.width
    const imageContainerHeight = imageContainer.height
    const cropperWidth = imageContainerWidth - paddingHorizontal * 2
    return {
      width: cropperWidth,
      height: cropperWidth,
      x: paddingHorizontal,
      y: (imageContainerHeight - cropperWidth) / 2,
    }
  }

  const isTakingCoverPhoto = draftSelectedPhotos.length === 0
  return (
    <Screen safeAreaMode="all">
      <Background type="alwaysDark" />
      <Stack height="100%" direction="column">
        <OnboardingFlowCameraTopBar
          isBackCamera={isBackCamera}
          setIsBackCamera={setIsBackCamera}
          flashLightMode={flashLightMode}
          setFlashLightMode={setFlashLightMode}
        />

        <Flex grow={1}>
          <View style={{ width: "100%", height: "100%", overflow: "hidden" }} onLayout={onCameraContainerLayout}>
            <RNCamera
              ref={camera}
              captureAudio={false}
              style={{ flexGrow: 1 }}
              type={isBackCamera ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
              flashMode={flashLightMode}
            />
          </View>
          {isTakingCoverPhoto && <Cropper cropperRectangle={cropperRectangle} withGrid={false} />}
          {photoCaptureLoading && (
            <Overlay width="100%" height="100%">
              <Background type="overlay" />
              <Center>
                <ActivityIndicator size="large" />
              </Center>
            </Overlay>
          )}
          <Overlay insetBottomStep={0} insetLeftStep={0} insetRightStep={0}>
            <View onLayout={onThumbnailLayout} style={{ flex: 1 }}>
              <Background type="overlay" />
              <Margin marginTopStep={2} marginBottomStep={0}>
                <DraftPhotoList ref={photoListRef} photos={draftSelectedPhotos} photoIsBeingCaptured={photoCaptureLoading} />
              </Margin>
            </View>
          </Overlay>
        </Flex>
        <Margin marginTopStep={2} marginBottomStep={2}>
          <OnboardingFlowCameraBottomControls onCaptureButtonClicked={takePicture} />
        </Margin>
      </Stack>
    </Screen>
  )
}
