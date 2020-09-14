import React, { useState, useRef, useEffect } from "react"
import { Animated, Easing, StyleSheet } from "react-native"
import {
  useKeyboardAvoidance,
  KeyboardAvoidanceContainerContextProvider,
  KeyboardAvoidanceMeasureView,
  KeyboardAvoidanceAnimateForShown,
  KeyboardAvoidanceAnimateForHidden,
  KeyboardAvoidancePostAnimatingMeasurementsDictionary,
} from "uc-lib/controls/layout/keyboard-avoidance"
import { useMargin } from "uc-lib/themes"
import { defaultLayoutContainerProps } from "uc-lib/controls/layout"
import { KeyboardAvoidanceOverlayContainerProps } from "./keyboard-avoidance-overlay-container.d"

const getInset = (baseMargin: number, insetStep?: number) => {
  if (insetStep) {
    return insetStep * baseMargin
  }
  return insetStep
}

export const KeyboardAvoidanceOverlayContainer: React.FC<KeyboardAvoidanceOverlayContainerProps> = (props) => {
  const {
    absoluteBottom,
    children,
    insetLeftStep,
    insetBottomStep,
    insetRightStep,
    insetTopStep,
    debugColor,
    width,
    height,
    axisDistribution,
    crossAxisDistribution,
    basis,
    grow,
    shrink,
    direction,
    testID,
  } = props
  const { addKeyboardAvoidingContainer, removeKeyboardAvoidingContainer } = useKeyboardAvoidance()
  const [containerId, setContainerId] = useState<string>()
  const keyboardOffset = useRef(new Animated.Value(0)).current
  const measurementOffset = useRef(0)
  const isAnimatingRef = useRef(false)
  const postAnimatingOffset = useRef<number>()
  const postAnimatingMeasurements = useRef<KeyboardAvoidancePostAnimatingMeasurementsDictionary>({})
  const { baseMargin } = useMargin()

  const styles = StyleSheet.create({
    keyboard_avoidance_overlay: {
      top: getInset(baseMargin, insetTopStep),
      bottom: absoluteBottom !== undefined ? absoluteBottom : getInset(baseMargin, insetBottomStep),
      left: getInset(baseMargin, insetLeftStep),
      right: getInset(baseMargin, insetRightStep),
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      flexDirection: direction,
      alignItems: crossAxisDistribution,
      justifyContent: axisDistribution,
      backgroundColor: debugColor,
      height,
      width,
    },
  })

  const consumeOnboardingAnimating = () => {
    if (postAnimatingOffset.current !== undefined) {
      keyboardOffset.setValue(-postAnimatingOffset.current)
      measurementOffset.current = postAnimatingOffset.current
      postAnimatingOffset.current = undefined
    }
    Object.entries(postAnimatingMeasurements.current).forEach(([k, v]) => measureView(k, v.attribs, v.callback))
    postAnimatingMeasurements.current = {}
  }

  const measureView: KeyboardAvoidanceMeasureView = (viewId, attribs, callback) => {
    if (isAnimatingRef.current) {
      postAnimatingMeasurements.current[viewId] = { attribs, callback }
      return
    }
    attribs.getLayout((measuredLayout) => {
      if (measuredLayout === undefined) {
        callback()
        return
      }
      callback({
        x: measuredLayout.x,
        y: measuredLayout.y + measurementOffset.current,
        width: measuredLayout.width,
        height: measuredLayout.height,
        containerId: attribs.containerId,
      })
    })
  }

  const animateForShown: KeyboardAvoidanceAnimateForShown = (layout, keyboardY, duration) => {
    const targetOffset = Math.max(0, layout.y - keyboardY + layout.height)

    if (isAnimatingRef.current) {
      postAnimatingOffset.current = targetOffset
    } else {
      isAnimatingRef.current = true
      Animated.timing(keyboardOffset, {
        toValue: -targetOffset,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        measurementOffset.current = targetOffset
        consumeOnboardingAnimating()
        isAnimatingRef.current = false
      })
    }
  }

  const animateForHidden: KeyboardAvoidanceAnimateForHidden = (duration) => {
    if (isAnimatingRef.current) {
      postAnimatingOffset.current = 0
    } else {
      isAnimatingRef.current = true
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        measurementOffset.current = 0
        consumeOnboardingAnimating()
        isAnimatingRef.current = false
      })
    }
  }

  const addAndRemoveContainer = () => {
    const id = addKeyboardAvoidingContainer({ measureView, animateForHidden, animateForShown })
    setContainerId(id)
    return () => {
      removeKeyboardAvoidingContainer(id)
    }
  }

  useEffect(addAndRemoveContainer, [])

  return (
    <KeyboardAvoidanceContainerContextProvider containerId={containerId}>
      <Animated.View
        style={{ ...styles.keyboard_avoidance_overlay, transform: [{ translateY: keyboardOffset }] }}
        testID={testID}
        accessibilityLabel={testID}
      >
        {children}
      </Animated.View>
    </KeyboardAvoidanceContainerContextProvider>
  )
}

KeyboardAvoidanceOverlayContainer.defaultProps = {
  ...defaultLayoutContainerProps,
}
