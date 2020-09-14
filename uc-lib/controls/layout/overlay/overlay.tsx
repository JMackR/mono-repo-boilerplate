import React from "react"
import { useMargin } from "uc-lib/themes"
import { OverlayProps } from "./overlay-props"
import invariant from "invariant"
import { defaultLayoutContainerProps } from "../container-props"
import { StyleSheet, css } from "aphrodite/no-important"

const getInset = (baseMargin: number, insetStep?: number) => {
  if (insetStep) {
    return insetStep * baseMargin
  }
  return insetStep
}

export const Overlay: React.FC<OverlayProps> = (props) => {
  const {
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
    touchUpInsideHandler,
    zIndex = 1,
  } = props
  invariant(React.Children.count(children) > 0, "Overlay requires children")
  const { baseMargin } = useMargin()

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          display: "flex",
          position: "absolute",
          top: getInset(baseMargin, insetTopStep),
          bottom: getInset(baseMargin, insetBottomStep),
          left: getInset(baseMargin, insetLeftStep),
          right: getInset(baseMargin, insetRightStep),
          flexBasis: basis,
          flexGrow: grow,
          flexShrink: shrink,
          flexDirection: direction,
          alignItems: crossAxisDistribution,
          justifyContent: axisDistribution,
          backgroundColor: debugColor,
          zIndex,
          height,
          width,
        },
      }),
    [
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
    ],
  )

  return (
    <div className={css(styles.overlay)} onClick={touchUpInsideHandler}>
      {children}
    </div>
  )
}

Overlay.defaultProps = {
  ...defaultLayoutContainerProps,
}
