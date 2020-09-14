import React, { createContext, useContext, useState, FC, useEffect } from "react"
import { PhotoImageIdentifier, savePhotosFromGallery, saveToCameraRoll, useActionSheet } from "../../widgets"
import { autoSquareCrop } from "../../widgets/photo-edit/utils"
import { useLoadingState } from "uc-lib"
import { translate } from "shared-lib"
import { Navigation } from "../../navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator"

const MAX_NUMBER_OF_PHOTOS_TO_SELECT = 12

interface PhotoSelectionContextType {
  draftSelectedPhotos: PhotoImageIdentifier[]
  setDraftSelectedPhotos: (_imgs: PhotoImageIdentifier[]) => void
}

const PhotoSelectionContext = createContext<PhotoSelectionContextType>({
  draftSelectedPhotos: [],
  setDraftSelectedPhotos: (_uris: PhotoImageIdentifier[]) => {},
})

export const PhotoSelectionProvider: FC = ({ children }) => {
  const [draftSelectedPhotos, setDraftSelectedPhotos] = useState<PhotoImageIdentifier[]>([])
  // const { draft } = useOnboardingDraft()

  // useEffect(() => {
  //   setDraftSelectedPhotos(draft.photos || [])
  // }, [draft.photos])

  return (
    <PhotoSelectionContext.Provider
      value={{
        draftSelectedPhotos,
        setDraftSelectedPhotos,
      }}
    >
      {children}
    </PhotoSelectionContext.Provider>
  )
}

export const usePhotoSelection = () => {
  const { draftSelectedPhotos, setDraftSelectedPhotos } = useContext(PhotoSelectionContext)
  // const { draft, asyncUpdateDraft } = useOnboardingDraft()
  // const { flowState } = useOnboardingState()
  const { startLoading, stopLoading } = useLoadingState()
  const { show: showActionSheet } = useActionSheet()

  // const directoryPath = flowState.isEditing ? EDIT_FLOW_PHOTO_SAVE_DIRECTORY : POST_FLOW_PHOTO_SAVE_DIRECTORY
  //
  // const setSelectedPhotos = (photos: PhotoImageIdentifier[]) => {
  //   asyncUpdateDraft({ photos })
  // }

  const showDeleteDraftPhotoActionSheet = (indexOfPhoto: number) => {
    showActionSheet(
      {
        options: [
          translate("common-actions.preview"),
          translate("common-actions.delete"),
          translate("common-actions.cancel"),
        ],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
      },
      (actionIndex: number) => {
        switch (actionIndex) {
          case 0:
            const photo = draftSelectedPhotos.find((_, idx) => idx === indexOfPhoto)
            Navigation.performWhenAvailable(() => {
              Navigation.navigateToRoute(NavigableRoute.OnboardingFlowPhotoPreview, { photo })
            })

            return
          case 1:
            setDraftSelectedPhotos(draftSelectedPhotos.filter((_, idx) => idx !== indexOfPhoto))
            return
          default:
        }
      },
    )
  }

  const updatePhoto = async (photoId: string, partialChange: Partial<PhotoImageIdentifier>) => {
    // if (draft.photos) {
    //   const updatedPhotoList = draft.photos.map(p => {
    //     if (photoId === p.id) {
    //       return { ...p, ...partialChange }
    //     }
    //     return p
    //   })
    //   setSelectedPhotos(updatedPhotoList)
    // }
  }

  const setPhotoAsCoverPhoto = async (photo: PhotoImageIdentifier) => {
    // if (draft.photos) {
    //   const copiedPhotos = [...draft.photos]
    //   const idx = copiedPhotos.findIndex(p => p.id === photo.id)
    //   copiedPhotos.splice(idx, 1)
    //   copiedPhotos.unshift(photo)
    //   const coverPhoto = await autoSquareCrop(photo, directoryPath)
    //   asyncUpdateDraft({ coverPhoto })
    //   setSelectedPhotos(copiedPhotos)
    // }
  }

  const removePhoto = async (photoId: string) => {
    // if (draft.photos) {
    //   const copiedPhotos = [...draft.photos]
    //   const idx = copiedPhotos.findIndex(p => p.id === photoId)
    //   copiedPhotos.splice(idx, 1)
    //   const partialChange: Partial<OnboardingDraftData> = {}
    //   partialChange.photos = copiedPhotos
    //   if (idx === 0) {
    //     if (copiedPhotos.length > 0) {
    //       partialChange.coverPhoto = await autoSquareCrop(copiedPhotos[0], directoryPath)
    //     } else {
    //       partialChange.coverPhoto = undefined
    //     }
    //   }
    //   asyncUpdateDraft(partialChange)
    // }
  }

  const savePhotosToLocalSandBox = async (photos: PhotoImageIdentifier[], directoryPathToSave: string) => {
    const photoIdsToSaveFromGallery = photos.filter(p => !p.isStored && p.id).map(p => p.id)
    let finalPhotos: PhotoImageIdentifier[] = [...photos]
    if (photoIdsToSaveFromGallery.length > 0) {
      const photosSavedFromGallery = await savePhotosFromGallery({
        photoIds: photoIdsToSaveFromGallery,
        directoryPath: directoryPathToSave,
      })
      // Now put them back in the order they were.
      finalPhotos = finalPhotos.map(p => {
        const photoSavedFromGallery = photosSavedFromGallery.find(sp => sp.id === p.id)
        return photoSavedFromGallery ? photoSavedFromGallery : p
      })
    }
    // Now find the ones that taken from camera, save them, and put them back in the order they were
    for (let idx = 0; idx < finalPhotos.length; idx++) {
      const photo = finalPhotos[idx]
      if (!photo.isStored && !photo.id) {
        const photoSavedFromCamera = await saveToCameraRoll({
          uri: photo.uri,
          directoryPath,
        })
        finalPhotos[idx] = photoSavedFromCamera
      }
    }
    return finalPhotos
  }

  const doneWithPhotos = async () => {
    // startLoading()
    // try {
    //   const finalPhotos = await savePhotosToLocalSandBox(draftSelectedPhotos, directoryPath)
    //   // finally set the selected photos
    //   const coverPhoto = await autoSquareCrop(finalPhotos[0], directoryPath)
    //   asyncUpdateDraft({ coverPhoto })
    //   setSelectedPhotos(finalPhotos)
    // } catch (error) {
    //   // tslint:disable-next-line: no-console
    //   console.log(error)
    // } finally {
    //   stopLoading()
    // }
  }

  return {
    // selectedPhotos: draft.photos || [],
    updatePhoto,
    removePhoto,
    setPhotoAsCoverPhoto,
    // setSelectedPhotos,
    // draftSelectedPhotos,
    // setDraftSelectedPhotos,
    // doneWithPhotos,
    // directoryPath,
    maxNumberOfPhotos: MAX_NUMBER_OF_PHOTOS_TO_SELECT,
    showDeleteDraftPhotoActionSheet,
    savePhotosToLocalSandBox,
  }
}
