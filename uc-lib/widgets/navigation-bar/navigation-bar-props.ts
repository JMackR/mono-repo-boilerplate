import { LocalSVGSource } from "uc-lib/controls"
import { TextColors } from "../../themes"

export interface NavigationBarItem {
  title?: string
  image?: object
  colorTint?: string
  icon?: LocalSVGSource
  pressHandler: () => void
  /**
   * A color tint that takes precedence over the navigation bar's `barItemsTint` prop.
   * @default 'brand'
   */
  tint?: keyof TextColors
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}

/**
 * TODO bring back in the required colorTint prop
 */
export interface NavigationBarProps {
  title?: string
  image?: object
  colorTint?: string
  backgroundColor?: string
  leftItems?: NavigationBarItem[]
  rightItems?: NavigationBarItem[]
  isRootNavBar?: boolean
  /**
   * A color tint that applies to all navigation bar items.
   * @default 'brand'
   */
  barItemsTint?: keyof TextColors
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
