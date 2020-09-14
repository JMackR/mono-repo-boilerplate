import React from "react"
import { ActivityIndicatorProps } from "./activity-indicator.props"
import { StyleSheet, css } from "aphrodite/no-important"
import { SVG } from "../image"
import { LoadingSpinnerIcon } from "uc-lib/assets"

export const ActivityIndicator = (props: ActivityIndicatorProps) => {
  const { enabled, size, tint } = props

  const largeSize = 48
  const smallSize = 16
  const rotationAnimationDuration = "0.8s"
  const fillAnimationDuration = "1s"

  const rotate = {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  }

  const fill = {
    "0%": {
      "clip-path": "polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 0% 0%)",
    },
    "50%": {
      "clip-path": "polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 100% 0%, 100% 0%, 0% 0%)",
    },
    "100%": {
      "clip-path": "polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 100% 100%, 100% 0%, 0% 0%)",
    },
  }

  let spinnerSize: number

  switch (size) {
    case "large":
      spinnerSize = largeSize
      break
    case "small":
    default:
      spinnerSize = smallSize
      break
  }

  const styles = StyleSheet.create({
    spinner: {
      width: spinnerSize,
      height: spinnerSize,
    },
    hidden: {
      visibility: "hidden",
    },
    rotateAnimation: {
      animationName: rotate,
      animationDuration: rotationAnimationDuration,
      animationIterationCount: "infinite",
      animationDirection: "normal",
      animationPlayState: "running",
      animationTimingFunction: "linear",
    },
    fillAnimation: {
      animationName: fill,
      animationDuration: fillAnimationDuration,
      animationIterationCount: "infinite",
      animationDirection: "alternate",
      animationPlayState: "running",
      animationTimingFunction: "linear",
    },
  })
  let className = css(styles.spinner, styles.rotateAnimation, styles.fillAnimation)
  if (enabled === false) {
    className = css(styles.spinner, styles.hidden)
  }
  return (
    <div>
      <SVG localSVG={LoadingSpinnerIcon} tint={tint || "brand"} className={className} />
    </div>
  )
}
