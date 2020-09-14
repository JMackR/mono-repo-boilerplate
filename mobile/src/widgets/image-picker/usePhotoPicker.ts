import { usePhotoSelection } from "../../providers/photo-selection-provider"
import { PhotoImageIdentifier } from ".."
import _ from "lodash"

export const usePhotoPicker = () => {
  const {
    setSelectedPhotos,
    selectedPhotos: initialSelectedPhotos,
    maxNumberOfPhotos,
    draftSelectedPhotos,
    setDraftSelectedPhotos,
    doneWithPhotos,
    selectedPhotos,
  } = usePhotoSelection()

  const selectOrDeselectPhoto = (photo: PhotoImageIdentifier) => {
    const index = _.findIndex(draftSelectedPhotos, p => p.id === photo.id)
    const selected = index !== -1
    const temp = [...draftSelectedPhotos]
    if (selected) {
      temp.splice(index, 1)
    } else if (temp.length < maxNumberOfPhotos) {
      temp.push(photo)
    }
    setDraftSelectedPhotos(temp)
  }

  const resetDraftSelectedPhotos = () => {
    setDraftSelectedPhotos(selectedPhotos)
  }

  return {
    initialSelectedPhotos,
    setSelectedPhotos,
    draftSelectedPhotos,
    selectOrDeselectPhoto,
    doneWithPhotos,
    resetDraftSelectedPhotos,
  }
}
