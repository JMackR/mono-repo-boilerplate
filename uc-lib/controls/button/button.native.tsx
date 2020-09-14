import React, { useRef } from "react"
import {
  Animated,
  ImageStyle,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native"
import { useColor, useFont, useMargin, useColorForTextColor } from "../../themes"
import { ButtonPropsNative } from "./button-props.native"
import { textColorForCurrentButtonType, isJSXElement, isLocalSVGSource } from "./button-shared"
import invariant from "invariant"
import { SVG } from "../image"
import { shadow } from "../../design-theme/styles/shadow"
// import { UCLAnalyticsController } from "shared-lib/analytics/analytics-app"
import { useScreen } from "../../hooks"
import _ from "lodash"
import { ActivityIndicator } from "../activity-indicator"
const TRANSPARENT = "#FFFFFF00"
const ANIMATION_DURATION = 100

export const Button = (props: ButtonPropsNative) => {
  const {
    onClick,
    onLongClick,
    title,
    subtitle,
    nextFocusDown,
    nextFocusForward,
    nextFocusLeft,
    nextFocusRight,
    nextFocusUp,
    disabled,
    testID,
    icon,
    buttonType,
    buttonSize,
    onLayout,
    affectedUserId,
    loading,
    doNotApplySidePadding,
  } = props

  invariant(buttonType !== undefined, "Must have button type")
  invariant(title !== undefined, "Must have button title")

  const fonts = useFont().fonts
  const colors = useColor().colors
  const margin = useMargin().baseMargin
  const { screenName, screenRoute } = useScreen()

  const backgroundColorAnimation = useRef(new Animated.Value(0)).current

  const buttonStyles: StyleProp<ViewStyle> = [styles.button]
  const textStyles: StyleProp<TextStyle> = [styles.text]
  const subtitleStyles: StyleProp<TextStyle> = [styles.subtitle]
  const iconStyles: StyleProp<ImageStyle> = [styles.icon]

  const getBackgroundInterpolation = (from: string, to: string) => {
    return backgroundColorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [from, to],
    })
  }
  const applyBorderStyles = () => {
    switch (buttonType) {
      case "secondary":
        buttonStyles.push(shadow.shadow)
        textStyles.push({ color: colors.blurple })
        subtitleStyles.push({ color: colors.blurple })
        break
      case "disabled":
        buttonStyles.push({ borderWidth: 1, borderColor: colors.limestone })
        break
      default:
        break
    }
  }

  const applyBackgroundColorToStyles = () => {
    let bgColor
    switch (buttonType) {
      default:
      case "primary":
        bgColor = getBackgroundInterpolation(colors.blurple, colors.blurple)
        break
      case "secondary":
        bgColor = getBackgroundInterpolation(colors.crystal, colors.crystalPressed)
        break
      case "tertiary":
        bgColor = getBackgroundInterpolation(colors.limestone, colors.limestonePressed)
        break
      case "flat":
        bgColor = getBackgroundInterpolation(TRANSPARENT, colors.crystalPressed)
        break
      case "disabled":
        bgColor = getBackgroundInterpolation(colors.disabled, colors.disabled)
        break
    }
    buttonStyles.push({ backgroundColor: bgColor })
  }

  const textColorName = textColorForCurrentButtonType(buttonType)
  const textColor = useColorForTextColor(textColorName)

  const applyTextColorStyles = () => {
    textStyles.push({ color: textColor })
    subtitleStyles.push({ color: textColor })
  }

  const applyTextDimensionStyles = () => {
    switch (buttonSize) {
      default:
      case "large":
        textStyles.push(fonts.primaryBody1)
        break
      case "small":
        textStyles.push(fonts.secondaryBody1)
        break
    }
  }

  const applyButtonDimensionStyles = () => {
    let buttonDimensions

    switch (buttonSize) {
      default:
      case "large":
        buttonDimensions = { paddingHorizontal: margin * 2, height: 40 }
        break
      case "small":
        buttonDimensions = { paddingHorizontal: margin * 2, height: 32 }
        break
    }

    if (doNotApplySidePadding) {
      buttonDimensions = { ...buttonDimensions, paddingHorizontal: 0 }
    }

    buttonStyles.push(buttonDimensions)
  }

  const startBackgroundColorAnimation = (targetEndValue: number) => {
    requestAnimationFrame(() => {
      Animated.timing(backgroundColorAnimation, {
        toValue: targetEndValue,
        duration: ANIMATION_DURATION,
      }).start()
    })
  }

  applyBackgroundColorToStyles()
  applyTextDimensionStyles()
  applyTextColorStyles()
  applyBorderStyles()
  applyButtonDimensionStyles()

  const renderLeftIcon = () => {
    let iconJSX
    if (isJSXElement(icon)) {
      iconJSX = icon
    } else if (isLocalSVGSource(icon)) {
      iconJSX = <SVG localSVG={icon} tint={textColorName} />
    } else {
      return undefined
    }

    return <View style={title || subtitle ? iconStyles : {}}>{iconJSX}</View>
  }

  const clickHandler = () => {
    // UCLAnalyticsController.trackButtonEvent({
    //   screenName,
    //   screenRoute,
    //   actionType: "Click",
    //   buttonTitle: title,
    //   buttonType,
    //   buttonSize,
    //   testId: testID,
    //   affectedUserId,
    // })
    requestAnimationFrame(() => {
      if (onClick) {
        onClick()
      }
    })
  }

  const onPressIn = () => {
    startBackgroundColorAnimation(1)
  }

  const onPressOut = () => {
    startBackgroundColorAnimation(0)
  }

  const Touchable = Platform.OS === "android" ? TouchableNativeFeedback : TouchableWithoutFeedback

  return (
    <Touchable
      accessibilityRole="button"
      nextFocusForward={nextFocusForward}
      nextFocusLeft={nextFocusLeft}
      nextFocusRight={nextFocusRight}
      nextFocusUp={nextFocusUp}
      nextFocusDown={nextFocusDown}
      testID={testID || "uc-lib.button"}
      accessibilityLabel={testID || "uc-lib.button"}
      disabled={disabled || loading}
      onPress={clickHandler}
      onLongPress={onLongClick}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      touchSoundDisabled={false}
    >
      <Animated.View style={buttonStyles} onLayout={onLayout}>
        {(loading && <ActivityIndicator size="small" tint={textColorName} />) || (
          <>
            {renderLeftIcon()}
            <View style={styles.textContainer}>
              {!_.isEmpty(title) && (
                <Text style={textStyles} testID="redibs-ucl.button.title" accessibilityLabel="redibs-ucl.button.title">
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text
                  style={subtitleStyles}
                  testID="redibs-ucl.button.subtitle"
                  accessibilityLabel="redibs-ucl.button.subtitle"
                >
                  {subtitle}
                </Text>
              )}
            </View>
          </>
        )}
      </Animated.View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 0,
    borderRadius: 4,

    flexDirection: "row",
    flexWrap: "nowrap",

    justifyContent: "center",
    alignItems: "center",
    alignContent: "stretch",
  },
  icon: {
    marginRight: 8,
  },
  textContainer: {
    alignSelf: "auto",
    flex: 0,
    flexDirection: "column",
  },
  text: {
    textAlign: "center",
    alignContent: "center",
  },
  subtitle: {
    textAlign: "center",
  },
})
