import { translate } from "shared-lib"
import { Text, useLoadingState } from "uc-lib"
import React, { FC, useEffect, useRef, useState } from "react"
import { Animated, Dimensions, LayoutRectangle } from "react-native"
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  PinchGestureHandler,
  PinchGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler"
import { getImageSizeReact } from "../camera-roll"
import { scaleRectangle } from "./utils"

const WINDOW_WIDTH = Dimensions.get("window").width

const MAX_SCALE = 3

interface PanAndZoomableImageProps {
  imageUri: string
  width?: number
  height?: number
  aspect?: number
  maxScale?: number
}

export const PanAndZoomableImage: FC<PanAndZoomableImageProps> = ({
  imageUri,
  width,
  height,
  aspect: initialAspect = 1,
  maxScale = MAX_SCALE,
}) => {
  const [loadError, setError] = useState()
  const [aspect, setAspect] = useState(initialAspect)
  const { startLoading, stopLoading } = useLoadingState()
  const extracImageSize = async () => {
    if (!width || !height) {
      startLoading()
      const size = await getImageSizeReact(imageUri)
      setAspect(size[0] / size[1])
      stopLoading()
    }
  }

  const baseWidth = WINDOW_WIDTH
  const baseHeight = WINDOW_WIDTH / aspect
  useEffect(() => extracImageSize, [])

  const baseRect: LayoutRectangle = { x: 0, y: 0, width: baseWidth, height: baseHeight }
  const baseScaleAnimated = useRef(new Animated.Value(1)).current

  const useAnimatable = (initialValue: number): [React.MutableRefObject<number>, Animated.Value, (v: number) => void] => {
    const jsValRef = useRef(initialValue)
    const animatedVal = useRef(new Animated.Value(initialValue)).current

    const setValue = (val: number) => {
      jsValRef.current = val
      animatedVal.setValue(val)
    }

    return [jsValRef, animatedVal, setValue]
  }

  const [scaleRef, scaleAnimated, setScale] = useAnimatable(1)
  const [xTRef, xTAnimated, setXT] = useAnimatable(0)
  const [yTRef, yTAnimated, setYT] = useAnimatable(0)

  const pinchScaleAnimated = useRef(new Animated.Value(1)).current

  const clampedScaleAnimated = useRef(
    Animated.multiply(Animated.multiply(pinchScaleAnimated, scaleAnimated), baseScaleAnimated),
  ).current.interpolate({
    inputRange: [1, MAX_SCALE],
    outputRange: [1, MAX_SCALE],
    extrapolate: "clamp",
  })
  const panXAnimated = useRef(new Animated.Value(0)).current
  const panYAnimated = useRef(new Animated.Value(0)).current
  const finalXAnimated = useRef(Animated.add(xTAnimated, panXAnimated)).current
  const finalYAnimated = useRef(Animated.add(yTAnimated, panYAnimated)).current

  const pinchGestureRef = useRef(null)
  const panGestureRef = useRef(null)

  const [panEnabled, setPanEnabled] = useState(false)

  const onPinchGestureEventRef = useRef(
    Animated.event([{ nativeEvent: { scale: pinchScaleAnimated } }], { useNativeDriver: true }),
  )
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

  const getTransformedRectangle = (r: LayoutRectangle, scale: number): LayoutRectangle => {
    return scaleRectangle(r, scale)
  }

  const getTxBase = () => {
    return getTransformedRectangle(baseRect, scaleRef.current)
  }

  const updateCurrentTranslations = (tx: number, ty: number) => {
    const transformedBase = getTxBase()

    const minTx = transformedBase.x
    const maxTx = -transformedBase.x
    const clampedX = Math.min(maxTx, Math.max(minTx, tx + xTRef.current))
    setXT(clampedX)

    const minTy = transformedBase.y
    const maxTy = -transformedBase.y
    const clampedY = Math.min(maxTy, Math.max(minTy, ty + yTRef.current))
    setYT(clampedY)
  }

  const onImagePinchZoom = (event: PinchGestureHandlerStateChangeEvent) => {
    const { state, scale } = event.nativeEvent
    if (state === State.END || state === State.CANCELLED) {
      const clampedScale = Math.max(1, Math.min(MAX_SCALE, scale * scaleRef.current))
      setScale(clampedScale)
      pinchScaleAnimated.setValue(1)
      updateCurrentTranslations(0, 0)
      setPanEnabled(clampedScale !== 1)
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

  if (loadError) {
    return (
      <Text textType="primaryBody2" color="error" testID="onboarding.photo-edit.error-image-load">
        {translate("property.photo-edit.error-image-load")}
      </Text>
    )
  }

  return (
    <PanGestureHandler
      ref={panGestureRef}
      simultaneousHandlers={pinchGestureRef}
      onGestureEvent={onPanGestureEventRef.current}
      onHandlerStateChange={onImageDrag}
      enabled={panEnabled}
      avgTouches={true}
    >
      <Animated.View style={{ flex: 1 }}>
        <PinchGestureHandler
          ref={pinchGestureRef}
          simultaneousHandlers={panGestureRef}
          onGestureEvent={onPinchGestureEventRef.current}
          onHandlerStateChange={onImagePinchZoom}
        >
          <Animated.View collapsable={false} style={{ flex: 1, justifyContent: "center" }}>
            <Animated.View style={{ transform: [{ translateX: finalXAnimated }, { translateY: finalYAnimated }] }}>
              <Animated.Image
                style={{
                  transform: [{ scale: clampedScaleAnimated }],
                  width: baseWidth,
                  height: baseHeight,
                }}
                resizeMode="contain"
                source={{ uri: imageUri }}
              />
            </Animated.View>
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  )
}
