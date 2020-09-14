import React from "react"
import { useMargin } from "uc-lib/themes"
import { StyleSheet, css } from "aphrodite/no-important"
import { MarginProps } from "./margin.d"
import invariant from "invariant"
import { defaultLayoutContainerProps } from "../container-props"

const getMargin = (baseMargin: number, marginStep?: number) => {
  if (marginStep) {
    return marginStep * baseMargin
  }
  return marginStep
}

export const Margin: React.FunctionComponent<MarginProps> = props => {
  const {
    debugColor,
    width,
    height,
    maxWidth,
    axisDistribution,
    crossAxisDistribution,
    basis,
    grow,
    shrink,
    direction,
    children,
    marginStep,
    marginLeftStep,
    marginRightStep,
    marginTopStep,
    marginBottomStep,
    allowNoChildren,
  } = props

  invariant(allowNoChildren || React.Children.count(children) > 0, "Margin requires children, did you mean to use Spacer")

  const { baseMargin } = useMargin()

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        oumargin: {
          margin: getMargin(baseMargin, marginStep),
          marginLeft: getMargin(baseMargin, marginLeftStep),
          marginRight: getMargin(baseMargin, marginRightStep),
          marginTop: getMargin(baseMargin, marginTopStep),
          marginBottom: getMargin(baseMargin, marginBottomStep),
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
          maxWidth,
          width,
        },
      }),
    [
      width,
      height,
      basis,
      grow,
      shrink,
      direction,
      crossAxisDistribution,
      axisDistribution,
      debugColor,
      marginStep,
      marginLeftStep,
      marginRightStep,
      marginTopStep,
      marginBottomStep,
      baseMargin,
    ],
  )

  return <div className={css(styles.oumargin)}>{children}</div>
}

Margin.defaultProps = {
  ...defaultLayoutContainerProps,
}
