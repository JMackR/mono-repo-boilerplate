import React from "react"
import { TextColors, TextTypes } from "uc-lib/themes"

export interface TextPropsBase {
  /**
   * Style to be used for the text's display
   */
  textType?: keyof TextTypes

  /**
   * Color of the text to be used
   */
  color?: keyof TextColors

  /**
   * The text to be displayed
   * Can also render multiple Text children if needed, such as for links that are displayed inline.
   */
  children?: React.ReactNode

  /**
   * The text to be displayed
   * Can also render multiple Text children if needed, such as for links that are displayed inline.
   */
  text: React.ReactNode
  /**
   * The ID to use for this text field for testing
   */
  testID?: string | undefined

  /**
   * The alignment of this text within its parent.  Defaults to left.
   */
  textAlign?: "auto" | "left" | "right" | "center" | "justify"

  textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through"

  /**
   * Indicates the max number of lines.  If text goes beyond the maximum size, it ellipsizes.
   */
  numberOfLines?: number

  /**
   * allows users to select and copy text
   */
  selectable?: boolean
}
