import { css, StyleSheet } from "aphrodite/no-important"
import React, { useState, SyntheticEvent } from "react"
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
      borderRadius = "50%"
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
      display: "flex",
      position: "relative",
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
      borderStyle: "solid",
      borderRadius,
      borderWidth,
      borderColor,
    },
  })

  return (
    <div className={css(styles.ouborder)} onClick={touchUpInside}>
      {children}
    </div>
  )
}

Border.defaultProps = {
  ...defaultLayoutContainerProps,
}
