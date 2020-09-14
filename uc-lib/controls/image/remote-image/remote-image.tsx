import React, { useState, useEffect, memo } from "react"
import { useColor } from "uc-lib/themes"
import { RemoteImageProps } from "./remote-image.props"
import { sanitizeAndValidateRemoteImageLayoutProps } from "./remote-image.common"
import { StyleSheet, css } from "aphrodite/no-important"
import _ from "lodash"
export const RemoteImage = memo((props: RemoteImageProps) => {
  const { width, height, aspectRatio } = sanitizeAndValidateRemoteImageLayoutProps(props)
  const aspectRatioToPercentageMultiplier = 100
  const paddingTopToMaintainAspectRatio =
    (aspectRatio && aspectRatioToPercentageMultiplier / aspectRatio + "%") ||
    `${(_.toNumber(width) / _.toNumber(height)) * 100}%`

  const { resizeMode, source, children, borderRadius } = props
  const objectFit = objectFitForResizeMode(resizeMode)

  const [isLoading, setIsLoading] = useState(true)
  const { colors } = useColor()
  let isMounted = false
  useEffect(() => {
    isMounted = true
  }, [])
  const handleLoadEnd = () => {
    setIsLoading(false)
  }
  const STYLES = StyleSheet.create({
    loading: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: colors.limestone,
    },
    container: {
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      display: "block",
      width,
      height: 0,
      borderRadius,
      paddingTop: paddingTopToMaintainAspectRatio,
      overflow: "hidden",
      minWidth: width,
    },
    image: {
      position: "absolute",
      maxWidth: "100%",
      top: 0,
      bottom: 0,
      height: "100%",
      width: "100%",
      objectFit,
      display: "block",
    },
    children: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2,
    },
  })

  const getLoadingView = () => {
    return <div className={css(STYLES.loading)} />
  }

  return (
    <picture className={css(STYLES.container)}>
      <source srcSet={source.uri} />
      <img src={source.uri} onLoad={handleLoadEnd} className={css(STYLES.image)} />
      <div className={css(STYLES.children)}>{children}</div>
      {isMounted && isLoading && getLoadingView()}
    </picture>
  )
})

const objectFitForResizeMode = (resizeMode: string) => {
  let objectFit: "cover" | "contain" | "none" = "none"
  if (resizeMode === "cover") {
    objectFit = "cover"
  } else if (resizeMode === "contain") {
    objectFit = "contain"
  }
  return objectFit
}
