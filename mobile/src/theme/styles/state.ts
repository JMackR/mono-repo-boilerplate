import { opacity } from "../color"
import { ViewStyle } from "react-native"

export const state = {
  /** Reduces opacity when disabled */
  disabled: {
    opacity: opacity.disabled,
  } as ViewStyle,
  /** Sets opacity to 0 */
  invisible: {
    opacity: 0,
  } as ViewStyle,
  /** Sets overflow to visible */
  overflowVisible: {
    overflow: "visible",
  } as ViewStyle,
  /** Sets overflow to hidden */
  overflowHidden: {
    overflow: "hidden",
  } as ViewStyle,
}
