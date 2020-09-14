import * as React from "react"
import { View, Image, ViewStyle } from "react-native"
import { IconProps } from "./icon.props"
import { icons } from "./icons"
import { size } from "./spacing"
import { mergeStyles } from "../../utils/styles"

const containerBaseStyle = {
  width: size(4),
  height: size(4),
  justifyContent: "center",
  alignItems: "center",
} as ViewStyle

const SIZE_STYLES = {
  regular: {
    height: size(2),
    width: size(2),
  } as ViewStyle,
  large: {
    height: size(5),
    width: size(5),
  } as ViewStyle,
}

export const Icon = ({ name, size, style, color }: IconProps) => {
  const containerStyle = mergeStyles(containerBaseStyle, SIZE_STYLES[size], style)
  const icon = icons[name][size]
  const imageStyle = { tintColor: color }
  return (
    <View style={containerStyle}>
      <Image style={imageStyle} source={icon} />
    </View>
  )
}
