import { LayoutContainerProps } from "uc-lib/controls/layout"
import { defaultLayoutContainerProps } from "uc-lib/controls/layout/container-props"
import {
  KeyboardAvoidanceAnimateForHidden,
  KeyboardAvoidanceAnimateForShown,
  KeyboardAvoidanceContainerContextProvider,
  KeyboardAvoidanceMeasureView,
  KeyboardAvoidancePostAnimatingMeasurementsDictionary,
  useKeyboardAvoidance,
} from "uc-lib/controls/layout/keyboard-avoidance"
import React, { useEffect, useRef, useState } from "react"
import { Animated, Easing, StyleSheet, View } from "react-native"
export const KeyboardAvoidanceRollawayContainer: React.FC<LayoutContainerProps> = (props) => {
  const {
    debugColor,
    width,
    height,
    axisDistribution,
    crossAxisDistribution,
    basis,
    grow,
    shrink,
    direction,
    children,
    testID,
  } = props
  const { addKeyboardAvoidingContainer, removeKeyboardAvoidingContainer } = useKeyboardAvoidance()
  const [containerId, setContainerId] = useState<string>()
  const translateY = useRef(new Animated.Value(0)).current
  const isAnimatingRef = useRef(false)
  const postAnimatingOffset = useRef<number>()
  const postAnimatingMeasurements = useRef<KeyboardAvoidancePostAnimatingMeasurementsDictionary>({})
  const measurementOffset = useRef(0)

  const styles = StyleSheet.create({
    keyboardavoidancerollawaycontainer: {
      overflow: "hidden",
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

  const consumePostAnimating = () => {
    if (postAnimatingOffset.current !== undefined) {
      translateY.setValue(-postAnimatingOffset.current)
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
      Animated.timing(translateY, {
        toValue: -targetOffset,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        measurementOffset.current = targetOffset
        consumePostAnimating()
        isAnimatingRef.current = false
      })
    }
  }

  const animateForHidden: KeyboardAvoidanceAnimateForHidden = (duration) => {
    if (isAnimatingRef.current) {
      postAnimatingOffset.current = 0
    } else {
      isAnimatingRef.current = true
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        measurementOffset.current = 0
        consumePostAnimating()
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
      <View style={styles.keyboardavoidancerollawaycontainer} testID={testID} accessibilityLabel={testID}>
        <Animated.View style={{ flex: 1, transform: [{ translateY }] }}>{children}</Animated.View>
      </View>
    </KeyboardAvoidanceContainerContextProvider>
  )
}

KeyboardAvoidanceRollawayContainer.defaultProps = {
  ...defaultLayoutContainerProps,
}
