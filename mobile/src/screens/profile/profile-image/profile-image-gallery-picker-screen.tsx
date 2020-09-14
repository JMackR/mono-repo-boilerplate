import { Margin } from "uc-lib"
import React from "react"
import { Navigation } from "../../../navigation/navigation"
import { useImageAccess } from "../../../providers/image-access-provider"
import { ImagePicker, ImagePickerGridItemPress, Screen, PhotoImageIdentifier, savePhotosFromGallery } from "../../../widgets"
import { NavigableRoute } from "../../../navigation/navigator"
import _ from "lodash"

export const ProfileImageGalleryPicker = () => {
  const { setSelectedPhotos } = useImageAccess()

  const onCancel = () => {
    setSelectedPhotos([])
    Navigation.goBack()
  }

  const onImagePickerItemPressed: ImagePickerGridItemPress = async (photo: PhotoImageIdentifier) => {
    const [savedPhoto] = await savePhotosFromGallery({
      photoIds: [_.toString(photo.id)],
      directoryPath: "profile_image",
    })
    setSelectedPhotos([savedPhoto])
    Navigation.goBack()
  }

  const onTakePhotoClicked = () => {
    Navigation.navigateToRoute(NavigableRoute.AccountProfileCameraRoll)
  }

  return (
    <Screen safeAreaMode="all">
      <Margin direction="column" crossAxisDistribution="center">
        <ImagePicker
          onImagePickerItemPressed={onImagePickerItemPressed}
          onCancel={onCancel}
          onTakePhotoClicked={onTakePhotoClicked}
        />
      </Margin>
    </Screen>
  )
}
