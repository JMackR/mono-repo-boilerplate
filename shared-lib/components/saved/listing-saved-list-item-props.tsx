export interface ListingSavedListItemProps {
  id: string
  name: string
  itemSaved: boolean
  isQuickSave: boolean
  photo: string
  savedList: SavedList
  tapHandler: (itemSaved: boolean, savedList: SavedList) => void
  handleOnShow?: (savedList: SavedList) => void
}
