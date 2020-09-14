import { List, LocalImage, Margin, Separator, Spacer, Stack, Text, Touchable, useMargin } from "uc-lib"
import React, { FC } from "react"
import { AlbumIndentifier } from "../camera-roll"

type OnSelectAlbumFN = (album: AlbumIndentifier | null) => void

interface ImagePickerAlbumListProps {
  albums: AlbumIndentifier[]
  onSelectAlbum: OnSelectAlbumFN
}

const IMAGE_SIZE_STEP = 12

interface ImagePickerAlbumListItemProps {
  album: AlbumIndentifier
  onPressAlbumItem: () => void
}

const AlbumListItem: FC<ImagePickerAlbumListItemProps> = ({ album, onPressAlbumItem }) => {
  const { baseMargin } = useMargin()
  return (
    <Touchable testID={`image-picker-album-${album.id}`} onPress={onPressAlbumItem}>
      <Margin marginLeftStep={baseMargin} marginRightStep={baseMargin} marginTopStep={4}>
        <Stack direction="column" grow={1}>
          <Stack direction="row" childSeparationStep={baseMargin}>
            <Stack crossAxisDistribution="center" axisDistribution="center" direction="column">
              <LocalImage
                height={baseMargin * IMAGE_SIZE_STEP}
                width={baseMargin * IMAGE_SIZE_STEP}
                resizeMode="cover"
                source={{ uri: album.coverPhotoUri as string }}
              />
            </Stack>
            <Stack crossAxisDistribution="flex-start" axisDistribution="flex-start" grow={1} direction="column">
              <Text textAlign="auto" textType="primaryBody1">
                {album.title}
              </Text>
              <Text textType="tertiaryBody2">{album.numberOfPhotos}</Text>
            </Stack>
          </Stack>
          <Spacer direction="column" sizeStep={4} />
          <Separator />
        </Stack>
      </Margin>
    </Touchable>
  )
}

export const ImagePickerAlbumList: FC<ImagePickerAlbumListProps> = ({ albums, onSelectAlbum }) => {
  const { baseMargin } = useMargin()
  const renderAlbum = (album: AlbumIndentifier) => {
    const albumListItemProps: ImagePickerAlbumListItemProps = {
      album,
      onPressAlbumItem: () => {
        onSelectAlbum(album)
      },
    }
    return <AlbumListItem {...albumListItemProps} />
  }
  return (
    <Margin marginTopStep={baseMargin}>
      <List renderItem={renderAlbum} data={albums} />
    </Margin>
  )
}
