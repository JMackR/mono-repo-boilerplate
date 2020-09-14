import React from "react"
import { View, StyleSheet } from "react-native"
import { FlexProps } from "./flex.d"
import { defaultLayoutContainerProps } from "../container-props"

export const Flex: React.FunctionComponent<FlexProps> = (props) => {
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
    touchUpInsideHandler,
    wrap,
    overflow,
  } = props

  const styles = StyleSheet.create({
    flex: {
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      flexDirection: direction,
      flexWrap: wrap,
      alignItems: crossAxisDistribution,
      justifyContent: axisDistribution,
      backgroundColor: debugColor,
      height,
      width,
      overflow,
    },
  })

  return (
    <View style={styles.flex} onTouchEnd={touchUpInsideHandler} testID={testID} accessibilityLabel={testID}>
      {children}
    </View>
  )
}

Flex.defaultProps = {
  ...defaultLayoutContainerProps,
}
