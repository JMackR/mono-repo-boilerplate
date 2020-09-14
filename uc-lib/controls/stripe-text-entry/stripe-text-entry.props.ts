import { TextTypes, TextColors } from "../../themes"

export interface StripeTextEntryProps {
  text?: string

  textType?: keyof TextTypes

  textColor?: keyof TextColors

  hintColor?: keyof TextColors

  /**
   * Sets the color of the cursor and selection when the text box is in focus.
   */
  tintColor?: keyof TextColors

  /**
   * Text displayed when no content has been entered in the text box.
   */
  hint?: string

  /**
   * Used to provide Stripe element text input
   */
  stripeInputType?: "card-number" | "card-exp" | "card-cvc"
}
