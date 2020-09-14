import React from "react"
import { AvatarProps } from "./avatar.props"
import { RemoteImage } from "../remote-image"
import { Flex } from "../../layout"
import { AvatarIcon } from "../../../assets"
import { SVG } from "../svg"

export const Avatar = (props: AvatarProps) => {
  const { size, source, children, testID } = props
  const SIZE_TO_RADIUS_RATIO = 2
  const borderRadius = size / SIZE_TO_RADIUS_RATIO

  return (
    <Flex direction="column" width={size} height={size}>
      {source?.uri && source.uri !== "" ? (
        <RemoteImage
          source={source}
          width={size}
          height={size}
          borderRadius={borderRadius}
          aspectRatio={1}
          resizeMode="cover"
          testID={testID || "uc-lib.avatar-image"}
        />
      ) : (
        <SVG
          localSVG={{
            SVG: AvatarIcon.SVG,
            size: { width: size, height: size },
          }}
        />
      )}
      {children}
    </Flex>
  )
}
