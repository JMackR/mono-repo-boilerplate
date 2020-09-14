import { SyntheticEvent } from "react"
import { ButtonPropsBase } from "./button-props-base"

export interface ButtonPropsWeb extends ButtonPropsBase {
  /**
   * Handler to be called when the user taps the button
   */
  onClick?: (event: SyntheticEvent) => void
}
