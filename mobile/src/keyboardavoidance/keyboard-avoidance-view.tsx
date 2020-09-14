import React, { useRef, useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import {
  useKeyboardAvoidance,
  KeyboardAvoidanceFocusContextProvider,
  useKeyboardAvoidanceContainer,
  KeyboardAvoidanceGetLayout,
} from "uc-lib/controls/layout/keyboard-avoidance"
import { KeyboardAvoidanceViewProps } from "./keyboard-avoidance-view.d"
import { defaultLayoutContainerProps } from "uc-lib/controls/layout/container-props"

export const KeyboardAvoidanceView: React.FC<KeyboardAvoidanceViewProps> = (props) => {
  const {
    groupId,
    activeInGroups,
    stackOrder,
    viewInfo,
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
  const { addKeyboardAvoidingView, removeKeyboardAvoidingView, keyboardAvoidingViewDidChangeLayout } = useKeyboardAvoidance()
  const { containerId } = useKeyboardAvoidanceContainer()
  const [viewId, setViewId] = useState<string>()
  const viewRef = useRef<View>(null)
  const styles = StyleSheet.create({
    keyboardavoidanceview: {
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

  const getLayout: KeyboardAvoidanceGetLayout = (callback) => {
    if (viewRef.current === undefined || viewRef.current === null || !containerId) {
      callback()
      return
    }

    viewRef.current.measureInWindow((x, y, w, h) => {
      callback({ x, y, width: w, height: h })
    })
  }

  const onLayout = () => {
    if (viewId === undefined) {
      return
    }

    keyboardAvoidingViewDidChangeLayout(viewId)
  }

  const addAndRemoveView = () => {
    if (containerId === undefined || !viewRef.current) {
      return
    }

    const id = addKeyboardAvoidingView({ containerId, activeInGroups, stackOrder, viewInfo, getLayout })
    setViewId(id)
    return () => {
      removeKeyboardAvoidingView(id)
    }
  }

  useEffect(addAndRemoveView, [containerId, viewRef.current])

  return (
    <View
      ref={viewRef}
      style={styles.keyboardavoidanceview}
      testID={testID}
      accessibilityLabel={testID}
      collapsable={false}
      onLayout={onLayout}
    >
      <KeyboardAvoidanceFocusContextProvider viewId={viewId} groupId={groupId}>
        {children}
      </KeyboardAvoidanceFocusContextProvider>
    </View>
  )
}

KeyboardAvoidanceView.defaultProps = {
  ...defaultLayoutContainerProps,
}
