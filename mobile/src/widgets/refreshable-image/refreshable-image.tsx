import { Flex, LocalImage } from "uc-lib"
import React, { FC } from "react"
import { Platform } from "react-native"
import { RefreshableImageProps } from "./refreshable-image-props"

export const RefreshableImage: FC<RefreshableImageProps> = ({ refreshToken, source, ...rest }) => {
  const _uri = Platform.select({
    ios: source.uri,
    // Android doesn't update the cache of the image if the uri doesn't change.
    // Only way to reload the image is to add unique queryParam to the uri of image so that it reloads it from device.
    android: `${source.uri}?refreshToken=${refreshToken}`,
  })
  return (
    <Flex key={refreshToken}>
      <LocalImage {...rest} source={{ ...source, uri: _uri }} />
    </Flex>
  )
}
