import { LocalSVGSource } from "../image"
import { TextEntryProps } from "../text-entry"

export interface InputProps extends TextEntryProps {
  /**
   * Text to describe the purpose of the text field.
   */
  title?: string

  /**
   * Text to show inside the input field before the user input, not editable by the user
   */
  prefixText?: string

  /**
   * Text to describe usage of the text field.
   * This is displayed below the field and usually explains its usage.
   */
  leftHelperText?: string

  /**
   * Text to describe usage of the text field.
   * This is displayed below the field and is often used for character count.
   */
  rightHelperText?: string

  /**
   * Text to describe errrors present in the field.
   * This is displayed below the field and any helper texts, and will display in the error design-theme.
   * It will also set the component to error design-theme when applied if the design-theme is not overridden.
   */
  error?: string | null | undefined

  /**
   * Allow an error state to change the outline color, but don't show the text area. Used so custom
   * error presentation can happen outside the control.
   */
  suppressErrorText?: boolean

  /**
   * Icon to display at the end of the text.
   */
  toolTipIcon?: LocalSVGSource

  /**
   * Text to display when the toolip is clicked.
   */
  toolTipText?: string

  /**
   * Icon to display at the start of the text.
   */
  leadingIcon?: LocalSVGSource

  /**
   * Icon to display at the end of the text.
   */
  trailingIcon?: LocalSVGSource

  /**
   * Indicates if the field should show a loading spinner.
   * When active, replaces the trailing icon.
   */
  loading?: boolean

  /**
   * Overrides the state of the field.
   * By default, enters focused state when the user selects the field and error state when the error text is present.
   */
  focusState?: "unfocused" | "focused" | "error"

  /**
   * Used to provide Stripe element text input
   */
  stripeInputType?: "card-number" | "card-exp" | "card-cvc"

  /**
   * Optional callback when it is passed clear icon shows in the right side of the input.
   * On click event of the icon will trigger this callback.
   */
  onClear?: () => void
}
