import { UCLAnalyticsProps } from "shared-lib"

export interface TouchableCommonProps extends UCLAnalyticsProps {
  children: React.ReactNode
  disabled?: boolean
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
