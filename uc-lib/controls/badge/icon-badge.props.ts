import { LocalSVGSource } from "../image"

export interface IconBadgeProps {
  /**
   * Badge SVG icon
   */
  icon: LocalSVGSource
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
