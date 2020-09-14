export interface SavedListItemProps {
  name: string
  itemCount: number
  photo?: string
  isQuickSave: boolean
  tapHandler: () => void
  handleDeleteClick: () => void
  handleOnShow?: () => void
}
