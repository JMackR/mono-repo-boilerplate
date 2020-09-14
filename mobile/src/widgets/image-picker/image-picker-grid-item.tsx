import _ from "lodash"
import { Background, Border, Flex, LocalImage, Margin, Overlay, Text, MarginProps } from "uc-lib"
import React, { FC } from "react"
import { GestureResponderEvent, TouchableHighlight } from "react-native"
import { PhotoImageIdentifier } from "../camera-roll"

export interface ImagePickerGridItemProps {
  photoImage: PhotoImageIdentifier
  selectedPhotos?: PhotoImageIdentifier[]
  onItemPress: ImagePickerGridItemPress
}

export type ImagePickerGridItemPress = (photo: PhotoImageIdentifier) => void

const SELECTION_INDICATOR_CONTAINER: MarginProps = {
  marginRightStep: 1,
  marginLeftStep: 1,
}

export const ImagePickerGridItem: FC<ImagePickerGridItemProps> = ({ photoImage, onItemPress, selectedPhotos, photos }) => {
  const index = _.findIndex(selectedPhotos, p => p.id === photoImage.id)
  const Indx = _.findIndex(photos, p => p.id === photoImage.id)
  const selected = index !== -1
  const onPress: (event: GestureResponderEvent) => void = () => {
    onItemPress(photoImage)
  }
  return (
    <TouchableHighlight onPress={onPress} testID={"image-picker-photo.grid-item." + Indx}>
      <Flex>
        <LocalImage source={{ uri: photoImage.uri }} resizeMode="cover" width="100%" aspectRatio={1} />
        {selected && (
          <Overlay width="100%" height="100%" insetRightStep={0} insetTopStep={0}>
            <Border width="100%" height="100%" lineWeight="heavy">
              <Overlay insetRightStep={-1} insetTopStep={-1}>
                <Background type="brand" />
                <Margin {...SELECTION_INDICATOR_CONTAINER}>
                  <Text textType="primaryBody1" color="primaryAlt">
                    {index + 1}
                  </Text>
                </Margin>
              </Overlay>
            </Border>
          </Overlay>
        )}
      </Flex>
    </TouchableHighlight>
  )
}
