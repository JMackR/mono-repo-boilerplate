export interface NotificationRowPropsBase {
  read: boolean
  avatar?: string
  title: string
  dateAdded: string | number
  handleClick: (id: string, objectId: string, type: string, read: boolean, actionPath?: string) => void
  secondaryImage?: string
  testId?: string
  id: string
  objectId: string
  type: string
  actionPath?: string
}
