import React, { useState } from "react"
import { View, TouchableWithoutFeedback, StyleSheet, LayoutChangeEvent } from "react-native"
import { useBorder, useColor } from "../../../themes"
import { BorderProps } from "./border.d"
import invariant from "invariant"
import { defaultLayoutContainerProps } from "../container-props"

export const Border: React.FunctionComponent<BorderProps> = props => {
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
    color,
    cornerRadius,
    lineWeight,
    hidden,
    borderType,
    touchUpInsideHandler: touchUpInside,
  } = props

  invariant(React.Children.count(children) > 0, "Border requires children")

  const [size, setSize] = useState({ height: 0, width: 0 })
  const { baseBorder } = useBorder()
  let borderRadius
  switch (cornerRadius) {
    case "small":
      borderRadius = baseBorder.cornerRadius.small
      break
    case "large":
      borderRadius = baseBorder.cornerRadius.large
      break
    case "circle":
      // tslint:disable-next-line: no-magic-numbers
      borderRadius = Math.min(size.height, size.width) / 2
      break

    default:
      borderRadius = 0
  }
  let borderWidth
  switch (lineWeight) {
    case "heavy":
      borderWidth = baseBorder.lineWeight.heavy
      break
    case "none":
      borderWidth = 0
      break

    default:
      borderWidth = baseBorder.lineWeight.light
  }

  const { colors } = useColor()

  let borderColor
  if (hidden) {
    borderColor = "transparent"
  } else if (color !== undefined) {
    borderColor = colors[color]
  } else {
    borderColor = colors.green
  }

  const styles = StyleSheet.create({
    ouborder: {
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      flexDirection: direction,
      alignItems: crossAxisDistribution,
      justifyContent: axisDistribution,
      backgroundColor: debugColor,
      height,
      width,
      overflow: "hidden",
      borderStyle: borderType,
      borderRadius,
      borderWidth,
      borderColor,
    },
  })

  const wrapChildren = () => {
    if (touchUpInside) {
      return (
        <TouchableWithoutFeedback onPressOut={touchUpInside}>
          <View style={{ flex: 1 }}>
            <>{children}</>
          </View>
        </TouchableWithoutFeedback>
      )
    } else {
      return children
    }
  }

  const onLayout = (e: LayoutChangeEvent) => {
    setSize({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    })
  }

  return (
    <View style={styles.ouborder} onLayout={onLayout}>
      {wrapChildren()}
    </View>
  )
}

Border.defaultProps = {
  ...defaultLayoutContainerProps,
  borderType: "solid",
}
