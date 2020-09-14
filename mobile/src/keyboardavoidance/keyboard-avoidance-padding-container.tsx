import { defaultLayoutContainerProps, LayoutContainerProps } from "uc-lib/controls/layout"
import {
  KeyboardAvoidanceAnimateForHidden,
  KeyboardAvoidanceAnimateForShown,
  KeyboardAvoidanceContainerContextProvider,
  KeyboardAvoidanceMeasureView,
  useKeyboardAvoidance,
} from "uc-lib/controls/layout/keyboard-avoidance"
import React, { useEffect, useState } from "react"
import { KeyboardEvent, LayoutAnimation, LayoutAnimationConfig, Platform, StyleSheet, View } from "react-native"
import { KeyboardAvoidanceView } from "./keyboard-avoidance-view"
import { useIsFocused } from "@react-navigation/native"

// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const defaultAnimation: LayoutAnimationConfig = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200,
  },
}

export const KeyboardAvoidancePaddingContainer: React.FC<LayoutContainerProps> = props => {
  const {
    children,
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
  const [currentY, setCurrentY] = useState<number>(0)

  const focused = useIsFocused()

  useEffect(() => {
    if (!focused) {
      setCurrentY(0)
    }
  }, [focused])

  const styles = StyleSheet.create({
    keyboard_avoidance_overlay: {
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

  const measureView: KeyboardAvoidanceMeasureView = (_viewId, view, callback) => {
    view.getLayout(measuredLayout => {
      if (measuredLayout === undefined) {
        callback()
        return
      }
      callback({
        x: measuredLayout.x,
        y: measuredLayout.y,
        width: measuredLayout.width,
        height: measuredLayout.height,
        containerId: view.containerId,
      })
    })
  }

  const animateForShown: KeyboardAvoidanceAnimateForShown = (layout, keyboardY, duration, event) => {
    const targetOffset = layout.y - keyboardY + layout.height

    if (targetOffset <= 0) {
      return
    }
    let animationConfig = defaultAnimation

    if (Platform.OS === "ios" && event) {
      const ev = event as KeyboardEvent
      animationConfig = LayoutAnimation.create(
        event?.duration || duration,
        LayoutAnimation.Types[ev.easing],
        LayoutAnimation.Properties.opacity,
      )
    }
    LayoutAnimation.configureNext(animationConfig)
    setCurrentY(targetOffset)
  }

  const animateForHidden: KeyboardAvoidanceAnimateForHidden = (duration, event) => {
    let animationConfig = defaultAnimation
    if (Platform.OS === "ios" && event) {
      const ev = event as KeyboardEvent
      animationConfig = LayoutAnimation.create(
        event?.duration || duration,
        LayoutAnimation.Types[ev.easing],
        LayoutAnimation.Properties.opacity,
      )
    }
    LayoutAnimation.configureNext(animationConfig)
    setCurrentY(0)
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
      <KeyboardAvoidanceView stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
        <View
          style={{ ...styles.keyboard_avoidance_overlay, paddingBottom: currentY }}
          testID={testID}
          accessibilityLabel={testID}
        >
          {children}
        </View>
      </KeyboardAvoidanceView>
    </KeyboardAvoidanceContainerContextProvider>
  )
}

KeyboardAvoidancePaddingContainer.defaultProps = {
  ...defaultLayoutContainerProps,
}
