import { InboxRowPropsBase } from "./inbox-row.props.base"

export interface InboxRowProps extends InboxRowPropsBase {
  archiveMessage?: (id: string, objectId: string, type: string) => void
  allowSwipeActions: boolean
}
