import { translate } from "shared-lib"
import {
  Background,
  CameraCapture,
  CameraFlashLightAuto,
  CameraFlashLightOff,
  CameraFlashLightOn,
  CameraFlip,
  Flex,
  Margin,
  Stack,
  SVG,
  Text,
} from "uc-lib"
import React, { FC, useRef, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { RNCamera } from "react-native-camera"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { Navigation } from "../../../navigation/navigation"
import { NavigableRoute } from "../../../navigation/navigator"
import { useImageAccess } from "../../../providers/image-access-provider"
import { Screen } from "../../../widgets"
import { flashLightModes } from "../../../widgets/camera/top-bar"

const CAMERA_OPTIONS = {
  quality: 0.7,
  base64: true,
}

export const ProfileImageCameraRoll: FC = () => {
  const camera = useRef<RNCamera>(null)
  const [flashLightMode, setFlashLightMode] = useState(flashLightModes[0])
  const [isBackCamera, setIsBackCamera] = useState(false)
  const { setSelectedPhotos } = useImageAccess()
  const onFlashLightChange = () => {
    const currentFlashLightMode = flashLightModes.findIndex(f => f === flashLightMode)
    setFlashLightMode(flashLightModes[(currentFlashLightMode + 1) % flashLightModes.length])
  }
  const flashLightIcons = {
    [RNCamera.Constants.FlashMode.auto]: (
      <SVG onPress={onFlashLightChange} localSVG={CameraFlashLightAuto} tint="alwaysLight" />
    ),
    [RNCamera.Constants.FlashMode.on]: <SVG onPress={onFlashLightChange} localSVG={CameraFlashLightOn} />,
    [RNCamera.Constants.FlashMode.off]: (
      <SVG onPress={onFlashLightChange} localSVG={CameraFlashLightOff} tint="alwaysLight" />
    ),
  }
  const takePicture = async () => {
    if (camera.current) {
      try {
        const { uri, height, width } = await camera.current.takePictureAsync(CAMERA_OPTIONS)
        setSelectedPhotos([
          {
            filename: "test",
            id: Date.now() + "",
            uri,
            height,
            width,
          },
        ])
        Navigation.navigateToRoute(NavigableRoute.ProfileImageSelect)
      } catch (error) {
        // tslint:disable-next-line: no-console
      }
    }
  }
  const goBack = () => Navigation.goBack()
  const toggleCameraType = () => setIsBackCamera(!isBackCamera)

  return (
    <Screen safeAreaMode="top">
      <Background type="alwaysDark" />
      <Stack height="100%" direction="column">
        <Margin direction="row" marginStep={4} crossAxisDistribution="center">
          {flashLightIcons[flashLightMode]}
        </Margin>
        <Flex grow={1}>
          <RNCamera
            ref={camera}
            captureAudio={false}
            style={{ flexGrow: 1 }}
            type={isBackCamera ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
            flashMode={flashLightMode}
          />
        </Flex>
        <Margin direction="row" axisDistribution="center" crossAxisDistribution="center" marginStep={4}>
          <View style={{ position: "absolute", left: 0, zIndex: 2 }}>
            <TouchableWithoutFeedback onPress={goBack} testID="take-photo.cancel" accessibilityLabel="take-photo.cancel">
              <Text color="alwaysLight" textType="primaryBody1">
                {translate("camera.cancel-btn")}
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <Flex direction="column" grow={1} axisDistribution="center" crossAxisDistribution="center">
            <TouchableOpacity
              onPress={takePicture}
              testID="take-photo.capture-button"
              accessibilityLabel="take-photo.capture-button"
            >
              <SVG localSVG={CameraCapture} />
            </TouchableOpacity>
          </Flex>
          <View style={{ position: "absolute", right: 0, zIndex: 2 }}>
            <TouchableWithoutFeedback
              onPress={toggleCameraType}
              testID="take-photo.switch-camera"
              accessibilityLabel="take-photo.switch-camera"
            >
              <SVG localSVG={CameraFlip} tint={isBackCamera ? "alwaysLight" : "brand"} />
            </TouchableWithoutFeedback>
          </View>
        </Margin>
      </Stack>
    </Screen>
  )
}
