import { LayoutChangeEvent } from "react-native"
import { ButtonPropsBase } from "./button-props-base"

export interface ButtonPropsNative extends ButtonPropsBase {
  onLayout?: (event: LayoutChangeEvent) => void

  /**
   * Handler to be called when the user taps the button
   */
  onClick: () => void

  onLongClick?: () => void
}
