import { LocalSVGSource } from "../../controls"
import { FlexibleRowActionType, FlexibleRowActionProps } from "./types"
import { TextColors, TextTypes } from "../../themes"

/**
 * Multiple rows of this
 */
export interface FlexibleMainContentRow {
  /**
   * Main text to render
   */
  mainText: string

  /**
   * Include to render a help icon, this will be called when the user clicks on it
   */
  mainTextHelpTooltipClickAction?: () => void

  /**
   * Text to render on the right side
   */
  rightText?: string

  // tslint:disable-next-line: no-any
  helperIconRef?: React.Ref<any>
}

export interface FlexibleSubContentRow {
  /**
   * sub text shows up under mainContent
   */
  subText?: string

  /**
   * Clickable text that shows up under subText
   */
  clickableSubText?: string

  /**
   * Clickable text that shows up under subText
   */
  clickableSubTextClickAction?: () => void
}

export interface FlexibleRowProps {
  /**
   * optional left svg icon
   */
  leftIcon?: LocalSVGSource

  /**
   * Specify whether to align the left icon vertically at the top. Default center.
   */
  leftAlignIconTop?: boolean

  /**
   * optional right svg icon
   */
  rightIcon?: LocalSVGSource

  /**
   * optional tint for right and left icon
   */
  iconTint?: keyof TextColors

  /**
   * optional tint for the main text
   */
  mainContentTint?: keyof TextColors

  /**
   * optional text type for the main text
   */
  mainContentTextType?: keyof TextTypes

  /**
   * the main text. can be a simple string, a complex FlexibleMainContentRow or an array of complex rows
   */
  mainContent: string | FlexibleMainContentRow[] | FlexibleMainContentRow

  /**
   * optional text that is appended to the end of the main text. Will be styled differently.
   */
  additionalMainText?: string

  /**
   * the sub text. can be a simple string, or a complex FlexibleSubContentRow
   */
  subContent?: string | FlexibleSubContentRow

  /**
   * makes the whole container clickable
   */
  clickAction?: () => void

  /**
   * Shows up when the container is clickable. Override to hide
   */
  rightArrowHidden?: boolean

  /**
   * optional notification text related to the right icon
   */
  rightNotification?: string

  /**
   * left action type, make sure to include leftActionProps with a matching prop type!
   */
  leftAction?: FlexibleAction

  /**
   * right action type, make sure to include rightActionProps with a matching prop type!
   */
  rightAction?: FlexibleAction

  /**
   * Force the row to a specific height
   */
  height?: number

  /**
   * Set to true to not apply horizontal padding to the row
   */
  doNotApplyHorizontalPadding?: boolean

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}

export interface FlexibleAction {
  /**
   * left action type, make sure to include leftActionProps with a matching prop type!
   */
  type: FlexibleRowActionType

  /**
   * left action props, if it's a switch then these will be of type ToggleProps, etc
   */
  props: FlexibleRowActionProps
}
