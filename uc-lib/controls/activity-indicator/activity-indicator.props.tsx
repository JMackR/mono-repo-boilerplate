import { TextColors } from "../../themes"

export interface ActivityIndicatorProps {
  enabled?: boolean
  size?: number | "small" | "large"
  /**
   * The color to apply to the activity indicator. Defaults to 'link'
   */
  tint?: keyof TextColors
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
