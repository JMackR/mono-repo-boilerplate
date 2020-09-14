import { InboxRowPropsBase } from "./inbox-row.props.base"

export interface InboxRowProps extends InboxRowPropsBase {
  editing?: boolean
  selectId?: string
}
