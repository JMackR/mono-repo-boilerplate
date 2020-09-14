import React, { useRef } from "react"
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Text,
  View,
  Animated,
} from "react-native"
import { SVG } from "uc-lib/controls/image"
import { Margin, Overlay } from "uc-lib/controls/layout"
import { useColorTheme, useFontForTextType, useColor, TextColors } from "uc-lib/themes"
import { ExtendedLoginButtonProps } from "./login-button.props"
import { ActivityIndicator } from "../activity-indicator"
import { BackgroundPropType } from "test/react-native/__mocks__/react-native"

const ANIMATION_DURATION = 100
const TEXT_MARGIN = 2.5
const ICON_MARGIN = 0.25
const ICON_DIMENSION = 38

/*
  The default behavior is no border, a 38x38px icon with no background, light background, dark text, and granite press text.
*/
export const LoginButton = (props: ExtendedLoginButtonProps) => {
  const { onClick, testID, style, loading, isFullWidth, buttonText, icon } = props
  const pressStateAnimation = useRef(new Animated.Value(0)).current

  const colors = useColor().colors
  const mainBackgroundColor = style.mainBackgroundColor || colors.alwaysLight
  const pressedColor = style.pressedColor || colors.granite
  const { shade } = useColorTheme()
  const showBorder = style.showBorderInDarkMode === undefined || shade === "light" || style.showBorderInDarkMode
  const STYLES = StyleSheet.create({
    fullWidth: {
      width: "100%",
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
    },
    mainContainer: {
      flexDirection: "row",
      backgroundColor: mainBackgroundColor,
      borderColor: style.borderColor,
      borderWidth: style.borderColor === undefined ? 0 : 1,
    },
    iconContainer: {
      width: style.iconSize || ICON_DIMENSION,
      height: style.iconSize || ICON_DIMENSION,
      backgroundColor: style.iconBackgroundColor,
    },
    hideBorder: {
      borderWidth: 0,
    },
    containerPressed: {
      backgroundColor: pressedColor,
    },
    text: {
      color: style.textColor || colors.alwaysDark,
    },
  })

  const textStyles: object[] = [STYLES.text, useFontForTextType("primaryBody1")]
  const containerStyles: object[] = [STYLES.mainContainer, STYLES.container]
  const iconStyles: object[] = [STYLES.iconContainer, STYLES.container]
  if (isFullWidth) {
    containerStyles.push(STYLES.fullWidth)
  }
  if (!showBorder) {
    containerStyles.push(STYLES.hideBorder)
  }

  const getColorInterpolation = (from: string, to: string) => {
    return pressStateAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [from, to],
    })
  }
  const startPressStateColorAnimation = (targetEndValue: number) => {
    Animated.timing(pressStateAnimation, {
      toValue: targetEndValue,
      duration: ANIMATION_DURATION,
    }).start()
  }

  const Touchable = Platform.OS === "android" ? TouchableNativeFeedback : TouchableWithoutFeedback
  let background: BackgroundPropType | undefined
  let onPressIn = () => {}
  let onPressOut = () => {}

  if (Platform.OS === "ios") {
    onPressIn = () => {
      startPressStateColorAnimation(1)
    }
    onPressOut = () => {
      startPressStateColorAnimation(0)
    }
    containerStyles.push({
      backgroundColor: getColorInterpolation(mainBackgroundColor, pressedColor),
    })
  } else {
    background = TouchableNativeFeedback.Ripple(pressedColor)
  }

  return (
    <Touchable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onClick}
      background={background}
      testID={testID}
      accessibilityLabel={testID}
    >
      <Animated.View style={containerStyles}>
        {!loading && (
          <>
            <Overlay insetLeftStep={ICON_MARGIN}>
              <View style={iconStyles}>
                <SVG localSVG={icon} tint={(style.iconTint as keyof TextColors) || "brand"} />
              </View>
            </Overlay>
            <Margin marginStep={TEXT_MARGIN}>
              <Text style={textStyles} testID={testID + ".text"} accessibilityLabel={testID + ".text"}>
                {buttonText}
              </Text>
            </Margin>
          </>
        )}
        {loading && (
          <Margin marginStep={TEXT_MARGIN}>
            <ActivityIndicator />
          </Margin>
        )}
      </Animated.View>
    </Touchable>
  )
}
