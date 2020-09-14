import { FlexibleRowProps } from "../flexible-row"

export interface SelectableRowProps extends FlexibleRowProps {
  selectId: string
  onWillSelect?: (selectId: string) => void
  onDidSelect?: (selectId: string) => void
  onWillDeselect?: (selectId: string) => void
  onDidDeselect?: (selectId: string) => void
  overrideSelected?: boolean
  disabled?: boolean
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
