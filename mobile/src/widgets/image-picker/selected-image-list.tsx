import { translate } from "shared-lib"
import { Border, List, LocalImage, Margin, MarginProps, Text, Touchable } from "uc-lib"
import React, { FC, forwardRef } from "react"
import { PhotoImageIdentifier } from ".."
import { usePhotoSelection } from "../../providers/photo-selection-provider"
import { ListRef } from "uc-lib"

interface ImagePickerSelectedPhotos {
  selectedPhotos: PhotoImageIdentifier[]
}

const THUMBNAIL_SIZE = 6 * 8

const THUMBNAIL_CONT_MARGIN: MarginProps = {
  marginLeftStep: 2,
  marginBottomStep: 5,
}

const BORDER_RADIUS = 4

const ThumbnailContainer: FC = ({ children }) => <Margin {...THUMBNAIL_CONT_MARGIN}>{children}</Margin>

const ThumbnailBorder: FC = ({ children }) => (
  <ThumbnailContainer>
    <Border
      borderType={"dashed"}
      cornerRadius="small"
      color="limestone"
      height={THUMBNAIL_SIZE}
      width={THUMBNAIL_SIZE}
      axisDistribution="center"
      crossAxisDistribution="center"
    >
      {children || <></>}
    </Border>
  </ThumbnailContainer>
)

export const NoPictureSelected = () => {
  return (
    <ThumbnailBorder>
      <Text textAlign="center" textType="tertiaryBody2" testID="image-picker.cover-image-label">
        {translate("image-picker.cover-image-lbl")}
      </Text>
    </ThumbnailBorder>
  )
}

export const ImagePickerSelectedPhotos = forwardRef<ListRef, ImagePickerSelectedPhotos>(({ selectedPhotos }, ref) => {
  const { maxNumberOfPhotos, showDeleteDraftPhotoActionSheet } = usePhotoSelection()
  const renderPhoto = (photo: PhotoImageIdentifier, idx: number) => {
    const hasReachedMaxPhotos = selectedPhotos.length === maxNumberOfPhotos
    const isLastItem = idx === selectedPhotos.length
    const PlaceholderAtTheEnd = () => {
      return hasReachedMaxPhotos ? <></> : <ThumbnailBorder />
    }
    const showDeleteMenu = () => showDeleteDraftPhotoActionSheet(idx)
    return isLastItem ? (
      <PlaceholderAtTheEnd />
    ) : (
      <ThumbnailContainer>
        <Touchable onPress={showDeleteMenu} testID={`onboarding-flow.image-picker.draft-photo-thumbnail-${idx}`}>
          <LocalImage
            borderRadius={BORDER_RADIUS}
            source={{ uri: photo.uri }}
            resizeMode="cover"
            width={THUMBNAIL_SIZE}
            height={THUMBNAIL_SIZE}
          />
        </Touchable>
      </ThumbnailContainer>
    )
  }

  return selectedPhotos.length > 0 ? (
    <List ref={ref} data={[...selectedPhotos, {}]} horizontal={true} renderItem={renderPhoto} />
  ) : (
    <NoPictureSelected />
  )
})
