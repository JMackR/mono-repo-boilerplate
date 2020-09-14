import React, { useState, memo } from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import { useColor } from "uc-lib/themes"
import { RemoteImageProps } from "./remote-image.props"
import { sanitizeAndValidateRemoteImageLayoutProps } from "./remote-image.common"
import { FC } from "react"

export const RemoteImage: FC<RemoteImageProps> = props => {
  const { width, height, aspectRatio } = sanitizeAndValidateRemoteImageLayoutProps(props)
  const { resizeMode, source, children, borderRadius, testID } = props

  const [isLoading, setIsLoading] = useState(true)

  const handleLoadEnd = () => {
    setIsLoading(false)
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width,
        height,
        aspectRatio,
      }}
      testID={testID || "uc-lib.remote-image"}
      accessibilityLabel={testID || "uc-lib.remote-image"}
    >
      <FastImage
        source={source}
        resizeMode={resizeMode}
        onLoadEnd={handleLoadEnd}
        style={{
          width,
          height,
          aspectRatio,
          borderRadius,
        }}
      >
        {children}
      </FastImage>
      {isLoading && <LoadingView />}
    </View>
  )
}

const LoadingView: FC = memo(() => {
  const { colors } = useColor()

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: colors.limestone,
      }}
      testID="redibs-ucl.remote-image.loading-view"
    />
  )
})
