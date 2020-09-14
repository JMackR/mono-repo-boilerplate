import React from "react"
import { View, ViewProps } from "react-native"
import { useMargin } from "uc-lib/themes"
import { MarginProps } from "./margin.d"
import invariant from "invariant"
import { defaultLayoutContainerProps } from "../container-props"

const getMargin = (baseMargin: number, marginStep?: number) => {
  if (marginStep) {
    return marginStep * baseMargin
  }
  return marginStep
}

export const Margin: React.FunctionComponent<MarginProps> = (props) => {
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
    marginStep,
    marginLeftStep,
    marginRightStep,
    marginTopStep,
    marginBottomStep,
    touchUpInsideHandler,
    allowNoChildren,
  } = props

  invariant(allowNoChildren || React.Children.count(children) > 0, "Margin requires children, did you mean to use Spacer")

  const { baseMargin } = useMargin()

  const styles = React.useMemo(() => {
    return {
      margin: {
        margin: getMargin(baseMargin, marginStep),
        marginLeft: getMargin(baseMargin, marginLeftStep),
        marginRight: getMargin(baseMargin, marginRightStep),
        marginTop: getMargin(baseMargin, marginTopStep),
        marginBottom: getMargin(baseMargin, marginBottomStep),
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
    }
  }, [
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
  ])
  const viewProps: ViewProps = {
    style: styles.margin,
    onTouchEnd: touchUpInsideHandler,
  }

  return <View {...viewProps}>{children}</View>
}

Margin.defaultProps = {
  ...defaultLayoutContainerProps,
}
