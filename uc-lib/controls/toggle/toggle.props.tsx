export interface ToggleProps {
  disabled?: boolean
  onChange: (state: boolean) => void
  state: boolean
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
