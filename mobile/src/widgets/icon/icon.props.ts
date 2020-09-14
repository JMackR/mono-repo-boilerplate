import { ViewStyle } from "react-native"
import { IconSize, IconTypes } from "./icons"

export interface IconProps {
  /** The name of the icon, required */
  name: IconTypes
  /** The icon size, required */
  size: IconSize
  /** Style overrides for container */
  style?: ViewStyle
  /** The name to tint, defaults to untinted (white) */
  color?: string
}
