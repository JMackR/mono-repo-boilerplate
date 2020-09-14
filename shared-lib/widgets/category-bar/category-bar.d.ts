import { MouseEvent } from "react"
import { NativeTouchEvent } from "react-native"

export interface CategoryBarProps {
  onPressAllCategories?(event: NativeTouchEvent | MouseEvent): void
  onPressCategory?(cid: string): void
  allCategoriesHref?: string
  getCategoryHref?(cid: string): string
  paddingLeft?: number
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
