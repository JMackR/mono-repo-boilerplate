import { translate, OnboardingFlowAnalyticsStep1, OnboardingFlowElement } from "shared-lib"
import { Background, Center, Flex, Margin, Stack, Text, SVG, PhotoRotateIcon, Overlay } from "uc-lib"
import React, { FC, useEffect, useRef, useState } from "react"
import { Animated, LayoutChangeEvent, LayoutRectangle, View } from "react-native"
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  PinchGestureHandler,
  PinchGestureHandlerStateChangeEvent,
  State,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler"
import { ScreenRoute } from "../../navigation/route"
import { Navigation } from "../../navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator"
import { cropPhoto, Screen, getImageSize } from ".."
// import { useListingDraft } from "../draft"
import { usePhotoSelection } from "../../providers/photo-selection-provider"
import { Cropper } from "./cropper"
import { usePhotoEdit } from "./usePhotoEdit"
import { scaleRectangle } from ".."

// tslint:disable: no-magic-numbers

// Clickable can't be used with the gesture handlers
// tslint:disable: jsx-ban-elements

const RECTANGLE_ZERO: LayoutRectangle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}
const CROPPER_MARGIN_SIZE = 20
const MAX_SCALE = 2
const ROTATION_STEP_DEGREES = 90
const ROTATION_THRESHOLD_DEGREES = 360

const getCenterOfRectangle = (r: LayoutRectangle) => {
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
}

const getOffsetRectangle = (r: LayoutRectangle, dx: number, dy: number): LayoutRectangle => {
  return { x: r.x + dx, y: r.y + dy, width: r.width, height: r.height }
}

const getRotatedRectangle = (r: LayoutRectangle, degrees: number): LayoutRectangle => {
  let width = r.width
  let height = r.height
  if (Math.floor(degrees / ROTATION_STEP_DEGREES) % 2 !== 0) {
    width = r.height
    height = r.width
  }
  const tOrigin = { x: -width / 2, y: -height / 2, width, height }
  const rCenter = getCenterOfRectangle(r)
  return getOffsetRectangle(tOrigin, rCenter.x, rCenter.y)
}

const getTransformedRectangle = (r: LayoutRectangle, scale: number, degreesRotation: number): LayoutRectangle => {
  const rotated = getRotatedRectangle(r, degreesRotation)
  return scaleRectangle(rotated, scale)
}

const useAnimatable = (initialValue: number): [React.MutableRefObject<number>, Animated.Value, (v: number) => void] => {
  const jsValRef = useRef(initialValue)
  const animatedVal = useRef(new Animated.Value(initialValue)).current

  const setValue = (val: number) => {
    jsValRef.current = val
    animatedVal.setValue(val)
  }

  return [jsValRef, animatedVal, setValue]
}

export const OnboardingFlowCoverPhotoEdit: FC<ScreenRoute<
  OnboardingModalNavigatorParamList,
  NavigableRoute.OnboardingFlowCoverPhotoEdit
>> = ({ route }) => {
  const { photo, edits } = route.params.props
  const { updateDraft } = useListingDraft()
  const { uri, freeRotate, reset } = usePhotoEdit(photo)
  const { directoryPath, updatePhoto } = usePhotoSelection()

  const [originalUri, setOriginalUri] = useState<string>()
  const [showReset, setShowReset] = useState(false)
  const [errorLoadingImage, setErrorLoadingImage] = useState<Error | null>(null)

  const [cropperRectangle, setCropperRectangle] = useState(RECTANGLE_ZERO)
  const [baseScale, setBaseScale] = useState(1)
  const [baseRect, setBaseRect] = useState(RECTANGLE_ZERO)
  const baseScaleAnimated = useRef(new Animated.Value(1)).current

  const [rotationRef, rotationAnimated, setRotation] = useAnimatable(0)
  const [scaleRef, scaleAnimated, setScale] = useAnimatable(1)
  const [xTRef, xTAnimated, setXT] = useAnimatable(0)
  const [yTRef, yTAnimated, setYT] = useAnimatable(0)

  // Gesture related variables
  const pinchScaleAnimated = useRef(new Animated.Value(1)).current
  const maxScale = baseScale * MAX_SCALE
  const clampedScaleAnimated = useRef(
    Animated.multiply(Animated.multiply(pinchScaleAnimated, scaleAnimated), baseScaleAnimated),
  ).current.interpolate({
    inputRange: [baseScale, maxScale],
    outputRange: [baseScale, maxScale],
    extrapolate: "clamp",
  })
  const onPinchGestureEventRef = useRef(
    Animated.event([{ nativeEvent: { scale: pinchScaleAnimated } }], { useNativeDriver: true }),
  )
  const panXAnimated = useRef(new Animated.Value(0)).current
  const panYAnimated = useRef(new Animated.Value(0)).current
  const finalXAnimated = useRef(Animated.add(xTAnimated, panXAnimated)).current
  const finalYAnimated = useRef(Animated.add(yTAnimated, panYAnimated)).current
  const pinchGestureRef = useRef(null)
  const panGestureRef = useRef(null)
  const imageSizeRef = useRef({ width: 0, height: 0 })
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  const onPanGestureEventRef = useRef(
    Animated.event(
      [
        {
          nativeEvent: {
            translationX: panXAnimated,
            translationY: panYAnimated,
          },
        },
      ],
      { useNativeDriver: true },
    ),
  )

  const getCropperRectangle: (container: LayoutRectangle) => LayoutRectangle = (imageContainer: LayoutRectangle) => {
    const imageContainerWidth = imageContainer.width
    const imageContainerHeight = imageContainer.height
    const cropperWidth = imageContainerWidth - CROPPER_MARGIN_SIZE * 2
    return {
      width: cropperWidth,
      height: cropperWidth,
      x: CROPPER_MARGIN_SIZE,
      y: (imageContainerHeight - cropperWidth) / 2,
    }
  }

  const setBaseRectangle = (container: LayoutRectangle, imageWidth: number, imageHeight: number) => {
    const cropperRect = getCropperRectangle(container)
    if (cropperRect.height < 0 || cropperRect.width < 0) {
      return
    }

    const containedWidthRatio = container.width / imageWidth
    const containedHeightRatio = container.height / imageHeight
    const containedScale = Math.min(containedHeightRatio, containedWidthRatio)
    const containedWidth = imageWidth * containedScale
    const containedHeight = imageHeight * containedScale
    const heightRatio = cropperRect.height / containedHeight
    const widthRatio = cropperRect.width / containedWidth
    const scale = Math.max(heightRatio, widthRatio)

    let imageRectangle = RECTANGLE_ZERO
    imageRectangle.width = containedWidth * scale
    imageRectangle.height = containedHeight * scale
    const imgCenter = getCenterOfRectangle(imageRectangle)
    const cropperCenter = getCenterOfRectangle(cropperRect)
    imageRectangle = getOffsetRectangle(imageRectangle, cropperCenter.x - imgCenter.x, cropperCenter.y - imgCenter.y)

    setBaseScale(scale)
    baseScaleAnimated.setValue(scale)
    setBaseRect(imageRectangle)
  }

  const getTxBase = () => {
    return getTransformedRectangle(baseRect, scaleRef.current, rotationRef.current)
  }

  const updateShowReset = () => {
    setShowReset(xTRef.current !== 0 || yTRef.current !== 0 || rotationRef.current !== 0 || scaleRef.current !== 1)
  }

  const resetScaleAndTranslation = () => {
    setXT(0)
    setYT(0)
    panXAnimated.setValue(0)
    panYAnimated.setValue(0)
    setScale(1)
    pinchScaleAnimated.setValue(1)
    updateShowReset()
  }

  const updateCurrentTranslations = (tx: number, ty: number) => {
    const transformedBase = getTxBase()
    const maxTx = cropperRectangle.x - transformedBase.x
    const minTx = cropperRectangle.x + cropperRectangle.width - (transformedBase.x + transformedBase.width)
    const clampedX = Math.min(maxTx, Math.max(minTx, tx + xTRef.current))
    setXT(clampedX)

    const maxTy = cropperRectangle.y - transformedBase.y
    const minTy = cropperRectangle.y + cropperRectangle.height - (transformedBase.y + transformedBase.height)
    const clampedY = Math.min(maxTy, Math.max(minTy, ty + yTRef.current))
    setYT(clampedY)
    updateShowReset()
  }

  const onImagePinchZoom = (event: PinchGestureHandlerStateChangeEvent) => {
    const { state, scale } = event.nativeEvent
    if (state === State.END || state === State.CANCELLED) {
      const clampedScale = Math.max(1, Math.min(MAX_SCALE, scale * scaleRef.current))
      setScale(clampedScale)
      pinchScaleAnimated.setValue(1)
      updateCurrentTranslations(0, 0)
    }
  }

  const onImageDrag = (event: PanGestureHandlerStateChangeEvent) => {
    const { state, translationX, translationY } = event.nativeEvent
    if (state === State.END || state === State.CANCELLED) {
      updateCurrentTranslations(translationX, translationY)

      panXAnimated.setValue(0)
      panYAnimated.setValue(0)
    }
  }

  const onImageLayout = async (event: LayoutChangeEvent) => {
    if (!originalUri) {
      return
    }
    const imageContainerRect = event.nativeEvent.layout
    const cropperRect = getCropperRectangle(imageContainerRect)
    setCropperRectangle(cropperRect)
    try {
      const [imageWidth, imageHeight] = await getImageSize(originalUri)
      imageSizeRef.current = { width: imageWidth, height: imageHeight }
      setBaseRectangle(imageContainerRect, imageWidth, imageHeight)
      setIsLayoutReady(true)
    } catch (error) {
      setErrorLoadingImage(error)
    }
  }

  const onReset = () => {
    setRotation(0)
    resetScaleAndTranslation()
    reset()
  }

  const onRotate = () => {
    let targetRotation = rotationRef.current + ROTATION_STEP_DEGREES
    if (targetRotation >= ROTATION_THRESHOLD_DEGREES) {
      targetRotation = 0
    }

    resetScaleAndTranslation()
    setRotation(targetRotation)
    updateShowReset()
  }

  const goBack = () => {
    // OnboardingFlowAnalyticsStep1.trackPhotoEdit(OnboardingFlowElement.Cancel)
    Navigation.popToTop()
  }

  const donePhotoEdit = async () => {
    if (!originalUri) {
      return
    }

    // OnboardingFlowAnalyticsStep1.trackPhotoEdit(OnboardingFlowElement.Done)
    // ratio for how much pixel on screen is equal to how much pixel on actual photo.
    const rotatedImgBounds = getRotatedRectangle(
      { x: 0, y: 0, width: imageSizeRef.current.width, height: imageSizeRef.current.height },
      rotationRef.current,
    )
    const transformedBase = getTxBase()
    const ratio = rotatedImgBounds.width / transformedBase.width
    const rotatedPhotoUri = await freeRotate(rotationRef.current)
    const param = {
      uri: rotatedPhotoUri,
      directoryPath,
      x: -1 * (xTRef.current + transformedBase.x - cropperRectangle.x) * ratio,
      y: -1 * (yTRef.current + transformedBase.y - cropperRectangle.y) * ratio,
      width: cropperRectangle.width * ratio,
      height: cropperRectangle.height * ratio,
      id: photo.id,
    }
    // final uri after crop which will be used fro 1x1 cover photo.
    const coverPhoto = await cropPhoto(param)

    updateDraft({
      coverPhoto: { ...coverPhoto, uuid: undefined },
      coverPhotoEdits: {
        rotation: rotationRef.current,
        offset: { x: xTRef.current, y: yTRef.current },
        scale: scaleRef.current,
        uri: originalUri,
      },
    })

    // Update original photos rotation which is used in listing-detail
    updatePhoto(photo.id, {
      uri: rotatedPhotoUri,
      uuid: undefined,
    })
    Navigation.popToTop()
  }

  useEffect(() => {
    if (originalUri === undefined) {
      setOriginalUri(uri)
      if (edits && edits.uri === uri) {
        setXT(edits.offset.x)
        setYT(edits.offset.y)
        setRotation(edits.rotation)
        setScale(edits.scale)
        updateShowReset()
      }
    }
  }, [uri])

  return (
    <Screen safeAreaMode="top">
      <Background type="alwaysDark" />
      <Stack direction="column" height="100%" width="100%">
        <Margin marginStep={4}>
          <Stack grow={1} direction="row">
            <Flex axisDistribution="flex-start">
              <TouchableWithoutFeedback onPress={goBack} testID="onboarding-flow.photo-edit.cancel-button">
                <Text color="alwaysLight" textType="primaryBody2">
                  {translate("onboarding-flow.photo-edit.cancel")}
                </Text>
              </TouchableWithoutFeedback>
            </Flex>
            <Flex grow={1} axisDistribution="flex-end">
              {showReset && (
                <TouchableWithoutFeedback onPress={onReset} testID="onboarding-flow.photo-edit.reset-button">
                  <Text color="alwaysLight" textType="primaryBody2">
                    {translate("onboarding-flow.photo-edit.reset")}
                  </Text>
                </TouchableWithoutFeedback>
              )}
            </Flex>
          </Stack>
        </Margin>
        <Flex grow={1}>
          {errorLoadingImage ? (
            <Center>
              <Text textType="primaryBody2" color="error" testID="onboarding-flow.photo-edit.error-image-load">
                {translate("onboarding-flow.photo-edit.error-image-load")}
              </Text>
            </Center>
          ) : (
            <View style={{ flex: 1, overflow: "hidden" }}>
              <PanGestureHandler
                ref={panGestureRef}
                simultaneousHandlers={pinchGestureRef}
                onGestureEvent={onPanGestureEventRef.current}
                onHandlerStateChange={onImageDrag}
                avgTouches={true}
              >
                <Animated.View style={{ flex: 1 }}>
                  <PinchGestureHandler
                    ref={pinchGestureRef}
                    simultaneousHandlers={panGestureRef}
                    onGestureEvent={onPinchGestureEventRef.current}
                    onHandlerStateChange={onImagePinchZoom}
                  >
                    <Animated.View collapsable={false} style={{ flex: 1 }}>
                      <Animated.View style={{ transform: [{ translateX: finalXAnimated }, { translateY: finalYAnimated }] }}>
                        <Animated.Image
                          onLayout={onImageLayout}
                          style={{
                            transform: [
                              { scale: clampedScaleAnimated },
                              {
                                rotate: rotationAnimated.interpolate({
                                  inputRange: [0, 360],
                                  outputRange: ["0deg", "360deg"],
                                }),
                              },
                            ],
                            width: "100%",
                            height: "100%",
                          }}
                          resizeMode="contain"
                          source={{ uri: originalUri }}
                        />
                      </Animated.View>
                      {isLayoutReady && <Cropper cropperRectangle={cropperRectangle} />}
                      <Overlay insetBottomStep={1} insetRightStep={12} insetLeftStep={12}>
                        <Text textType="primaryBody1" color="alwaysLight" textAlign="center">
                          {translate("onboarding-flow.cover-photo-warning-text")}
                        </Text>
                      </Overlay>
                    </Animated.View>
                  </PinchGestureHandler>
                </Animated.View>
              </PanGestureHandler>
            </View>
          )}
        </Flex>
        <Margin marginTopStep={8} marginLeftStep={4} marginRightStep={4} marginBottomStep={12}>
          <Stack direction="row" grow={1} crossAxisDistribution="center">
            <Flex grow={1} axisDistribution="flex-start">
              <TouchableWithoutFeedback onPress={onRotate} testID="onboarding-flow.photo-edit.rotate-button">
                <Stack direction="column" crossAxisDistribution="center" childSeparationStep={2}>
                  <SVG localSVG={PhotoRotateIcon} tint="alwaysLight" />
                  <Text color="alwaysLight" textType="primaryBody2">
                    {translate("onboarding-flow.photo-edit.rotate")}
                  </Text>
                </Stack>
              </TouchableWithoutFeedback>
            </Flex>
            <Flex grow={1} axisDistribution="flex-end">
              <TouchableWithoutFeedback onPress={donePhotoEdit} testID="onboarding-flow.photo-edit.done-button">
                <Text color="alwaysLight" textType="primaryBody1">
                  {translate("onboarding-flow.photo-edit.done")}
                </Text>
              </TouchableWithoutFeedback>
            </Flex>
          </Stack>
        </Margin>
      </Stack>
    </Screen>
  )
}
