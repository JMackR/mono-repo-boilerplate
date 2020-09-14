export interface SliderProps {
  initialIndex?: number
  options: string[]
  onIndexChanged?: (index: number) => void
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
