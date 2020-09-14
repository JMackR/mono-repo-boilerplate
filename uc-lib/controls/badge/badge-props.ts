export interface BadgeProps {
  /**
   * Amount of things to indicate with the badge.
   * 0 or less means the badge does not display
   * 1 - 99 will display that number
   * >= 100 will display '99+'
   */
  amount: number
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
