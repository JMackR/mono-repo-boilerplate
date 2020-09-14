import { useNavigation, useRoute } from "@react-navigation/native"
import { AnalyticsApp } from "shared-lib"
import {
  KeyboardAvoidanceContextProvider,
  ScreenProvider,
  SCREEN_PROVIDER_DEFAULT_SCREEN_NAME,
  ClickableOpacity,
} from "uc-lib"
import { useColor, useColorForBackgroundColor } from "uc-lib/themes/hooks/use-color"
import React, { useEffect, useMemo } from "react"
import { Platform, StatusBar, StyleSheet, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenProps } from "./screen-props"
import { Keyboard } from "../../utilities/keyboard/keyboard"

export const Screen: React.FC<ScreenProps> = props => {
  const {
    children,
    safeAreaMode,
    backgroundColor,
    forceStatusBarTint,
    testID,
    screenName,
    dismissKeyboardOnTap,
    androidSoftInputMode = "adjustPan",
    onBlur,
    onFocus,
    hidden,
  } = props

  const insets = useSafeAreaInsets()
  const { shade } = useColor()
  const navigation = useNavigation()
  const route = useRoute()

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      // screenName && AnalyticsApp.trackScreenView(screenName, route.name)
      setAndroidSoftInputMode()
      if (onFocus) {
        onFocus()
      }
    })

    const blurListener = navigation.addListener("blur", () => {
      if (onBlur) {
        onBlur()
      }
    })

    return () => {
      navigation.removeListener("focus", focusListener)
      navigation.removeListener("blur", blurListener)
    }
  }, [])

  useEffect(() => {
    StatusBar.setBarStyle(getStatusBarStyle())
  }, [shade])

  const setAndroidSoftInputMode = () => {
    switch (androidSoftInputMode) {
      case "adjustNothing":
        Keyboard.setAdjustNothing()
        break
      case "adjustResize":
        Keyboard.setAdjustResize()
        break
      case "adjustPan":
      default:
        Keyboard.setAdjustPan()
        break
    }
  }

  const getStatusBarStyle = () => {
    if (Platform.OS === "ios") {
      if (forceStatusBarTint === "light") {
        return "light-content"
      } else if (forceStatusBarTint === "dark") {
        return "dark-content"
      }
    }
    if (shade === "dark") {
      return "light-content"
    } else {
      return "dark-content"
    }
  }

  const backgroundColorValue = useColorForBackgroundColor(backgroundColor || "primary")

  const styles = StyleSheet.create({
    screenStyle: {
      backgroundColor: backgroundColorValue,
      flex: 1,
    },
  })

  const safeAreaStyle: ViewStyle = useMemo(() => {
    const style: ViewStyle = {}
    switch (safeAreaMode) {
      case "bottom":
        style.paddingBottom = insets.bottom
        break
      case "none":
        break
      case "top":
        style.paddingTop = insets.top
        break
      case "all":

      default:
        style.paddingTop = insets.top
        style.paddingBottom = insets.bottom
        style.paddingLeft = insets.left
        style.paddingRight = insets.right
        break
    }
    return style
  }, [insets, safeAreaMode])

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }
  return (
    <ScreenProvider screenName={screenName}>
      <KeyboardAvoidanceContextProvider debug={props.debugScreen}>
        <View style={[safeAreaStyle, styles.screenStyle]} testID={testID} accessibilityLabel={testID}>
          <StatusBar
            hidden={hidden}
            animated={true}
            translucent={false}
            backgroundColor={backgroundColorValue}
            barStyle={getStatusBarStyle()}
          />
          {dismissKeyboardOnTap ? (
            <View activeOpacity={1} onClick={dismissKeyboard} style={{ flexDirection: "column", flexGrow: 1 }}>
              {children}
            </View>
          ) : (
            children
          )}
        </View>
      </KeyboardAvoidanceContextProvider>
    </ScreenProvider>
  )
}

Screen.defaultProps = {
  screenName: SCREEN_PROVIDER_DEFAULT_SCREEN_NAME,
  screenRoute: "native",
}
