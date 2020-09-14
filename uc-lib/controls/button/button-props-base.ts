import { LocalSVGSource } from "uc-lib/controls/image"
import { UCLAnalyticsProps } from "shared-lib"

export type ButtonType = "primary" | "secondary" | "tertiary" | "buynow" | "flat" | "disabled"
export type ButtonSize = "large" | "small"

export interface ButtonPropsBase extends UCLAnalyticsProps {
  /**
   * Text to display inside the button
   */
  title: string

  /**
   * Optional subtitle to display below the button text
   */
  subtitle?: string

  buttonType: ButtonType

  buttonSize: ButtonSize

  /*
   * Removes left and right padding to the button
   */
  doNotApplySidePadding?: boolean

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string | undefined

  icon?: JSX.Element | LocalSVGSource

  /**
   * If true, disable all interactions for this component.
   */
  disabled?: boolean | undefined

  /**
   * TV next focus down (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusDown?: number | undefined

  /**
   * TV next focus forward (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusForward?: number | undefined

  /**
   * TV next focus left (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusLeft?: number | undefined

  /**
   * TV next focus right (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusRight?: number | undefined

  /**
   * TV next focus up (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusUp?: number | undefined

  /**
   * Text to display for blindness accessibility features
   */
  accessibilityLabel?: string | undefined

  loading?: boolean
}
