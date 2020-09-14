import { LayoutContainerProps } from "uc-lib/controls/layout"

export interface KeyboardAvoidanceViewProps extends LayoutContainerProps {
  groupId?: string
  activeInGroups?: string[]
  stackOrder?: number
  viewInfo?: any
}
