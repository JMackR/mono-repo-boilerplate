export interface InboxRowPropsBase {
  id: string
  read: boolean
  /**
   * what this notification is referring to:
   *  todos: the discussion ID
   *  notification: events & rating, etc. context-based.
   */
  objectId?: string
  /**
   * for analytics
   */
  type?: string
  avatar?: string
  isTruyouVerified: boolean
  isAutosDealer: boolean
  title: string
  notificationText: string
  dateAdded: string | number
  secondaryImage?: string | undefined
  handleClick: (id: string, objectId: string, type: string, read: boolean) => void
  testID?: string
  visualTags?: VisualTag[]
}
