import { LocalSVGSource } from "../image"

export interface InputHelpIconProps {
  /**
   * Icon to display at the end of the text.
   */

  toolTipIcon: LocalSVGSource

  /**
   * Text to display when the toolip is clicked.
   */

  toolTipText?: string
}
