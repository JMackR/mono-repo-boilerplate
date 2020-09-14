import { translate } from "shared-lib"
import {
  ListRef,
  ActivityIndicator,
  Border,
  List,
  LocalImage,
  Margin,
  MarginProps,
  Text,
  Touchable,
  Flex,
  Stack,
} from "uc-lib"
import React, { FC, forwardRef } from "react"
import { PhotoImageIdentifier } from ".."
import { usePhotoSelection } from "../../providers/photo-selection-provider"

interface DraftPhotoListProps {
  photos: PhotoImageIdentifier[]
  photoIsBeingCaptured: boolean
}

const THUMBNAIL_SIZE = 6 * 8

const THUMBNAIL_CONT_MARGIN: MarginProps = {
  marginLeftStep: 2,
  marginBottomStep: 2,
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
    <Stack childSeparationStep={2} direction="row">
      <ThumbnailBorder>
        <Text textAlign="center" color="alwaysLight" textType="tertiaryBody2" testID="image-picker.cover-image-label">
          {translate("image-picker.cover-image-lbl")}
        </Text>
      </ThumbnailBorder>
      <Margin marginRightStep={2}>
        <Text color="alwaysLight" textType="primaryBody2" textAlign="center">
          {translate("camera.cover-photo-intruction")}
        </Text>
      </Margin>
    </Stack>
  )
}

export const DraftPhotoList = forwardRef<ListRef, DraftPhotoListProps>(({ photos, photoIsBeingCaptured }, ref) => {
  const { maxNumberOfPhotos, showDeleteDraftPhotoActionSheet } = usePhotoSelection()
  const renderPhoto = (photo: PhotoImageIdentifier, idx: number) => {
    const hasReachedMaxPhotos = photos.length === maxNumberOfPhotos
    const isLastItem = idx === photos.length
    const PlaceholderAtTheEnd = () => {
      return hasReachedMaxPhotos ? <></> : <ThumbnailBorder>{photoIsBeingCaptured && <ActivityIndicator />}</ThumbnailBorder>
    }
    const showDeleteMenu = () => showDeleteDraftPhotoActionSheet(idx)
    return isLastItem ? (
      <PlaceholderAtTheEnd />
    ) : (
      <ThumbnailContainer>
        <Touchable onPress={showDeleteMenu} testID={`onboarding-flow.camera.draft-photo-thumbnail-${idx}`}>
          <LocalImage
            borderRadius={BORDER_RADIUS}
            source={{ uri: photo.uri }}
            resizeMode="cover"
            width={THUMBNAIL_SIZE}
            height={THUMBNAIL_SIZE}
            testID="image-picker.thumbnail-container"
          />
        </Touchable>
      </ThumbnailContainer>
    )
  }

  return photos.length > 0 ? (
    <List ref={ref} data={[...photos, {}]} horizontal={true} renderItem={renderPhoto} />
  ) : (
    <NoPictureSelected />
  )
})
