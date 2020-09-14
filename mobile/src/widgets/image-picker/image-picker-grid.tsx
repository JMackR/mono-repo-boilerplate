import _ from "lodash"
import { Grid } from "uc-lib"
import React, { FC } from "react"
import { PhotoImageIdentifier } from "../camera-roll"
import { ImagePickerGridItem, ImagePickerGridItemPress } from "./image-picker-grid-item"
import { ImagePickerTakePhotoItem, OnTakePhotoClicked } from "./image-picker-go-to-camera-roll"

interface ImagePickerGridProp {
  photos: PhotoImageIdentifier[]
  selectedPhotos?: PhotoImageIdentifier[]
  onImagePickerItemPressed: ImagePickerGridItemPress
  loadMore: () => void
  onTakePhotoClicked?: OnTakePhotoClicked
  testID?: string
}

const NUMBER_OF_COLUMN = 3

export const ImagePickerGrid: FC<ImagePickerGridProp> = ({
  photos,
  selectedPhotos,
  onImagePickerItemPressed,
  loadMore,
  onTakePhotoClicked,
}) => {
  const renderItem: (photo: PhotoImageIdentifier, idx: number) => JSX.Element = (photo, idx) => {
    return idx === 0 ? (
      <ImagePickerTakePhotoItem onTakePhotoClicked={onTakePhotoClicked} />
    ) : (
      <ImagePickerGridItem
        photoImage={photo}
        photos={photos}
        selectedPhotos={selectedPhotos}
        onItemPress={onImagePickerItemPressed}
      />
    )
  }

  return (
    <Grid
      onEndReachedThreshold={1}
      onEndReached={loadMore}
      data={photos}
      columns={NUMBER_OF_COLUMN}
      renderItem={renderItem}
    />
  )
}
