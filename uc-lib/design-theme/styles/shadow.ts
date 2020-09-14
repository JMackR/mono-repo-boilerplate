import { color } from "../color"
import { ViewStyle } from "react-native"

export const shadow = {
  /** Adds the standard drop shadow style */
  shadow: {
    elevation: 2,
    shadowColor: color.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
  } as ViewStyle,
}
