import { NotificationRowPropsBase } from "./notification-row.props.base"

export interface NotificationRowProps extends NotificationRowPropsBase {
  archiveNotification: (id: string, objectId: string, type: string) => void
}
