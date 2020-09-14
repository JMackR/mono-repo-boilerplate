import { translate, OnboardingFlowAnalyticsStep1, OnboardingFlowStepOneElement, OnboardingFlowElement } from "shared-lib"
import { ActivityIndicator, Flex, Margin, Stack, Text, SVG, DropDownFill, Spacer, Center } from "uc-lib"
import React, { FC } from "react"
import { GestureResponderEvent } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { Navigation } from "../../navigation/navigation"
import { AlbumIndentifier, PhotoImageIdentifier } from "../camera-roll"
import { ImagePickerGridItemPress } from "./image-picker-grid-item"
import { ModalCardProps } from "../modal-card"
import { useModal } from "../modal-card/context/modal-provider"
import { ImagePickerAlbumList } from "./image-picker-album-list"
import { ImagePickerGrid } from "./image-picker-grid"
import { useImagePicker } from "./useImagePicker"
import { NavigableRoute } from "../../navigation/navigator/navigableroute"
import { OnTakePhotoClicked } from "./image-picker-go-to-camera-roll"

export interface ImagePickerProps {
  selectedPhotos?: PhotoImageIdentifier[]
  onImagePickerItemPressed: ImagePickerGridItemPress
  onCancel?: (event: GestureResponderEvent) => void
  pageSize?: number
  onTakePhotoClicked?: OnTakePhotoClicked
  onAlbumChange?: (_album?: AlbumIndentifier | null) => void
  onAlbumModalOpen?: () => void
  onAlbumModalClose?: () => void
}

const HEADER_HEIGHT = 90
const CANCEL_BTN_MARGIN_STEP = 2

export const ImagePicker: FC<ImagePickerProps> = ({
  selectedPhotos,
  onImagePickerItemPressed,
  onCancel,
  pageSize,
  onTakePhotoClicked,
  onAlbumChange,
  onAlbumModalClose,
  onAlbumModalOpen,
}) => {
  const { loading, photosFromDevice, albums, setAlbum, album: currentAlbum, loadMore } = useImagePicker(pageSize)
  const { show } = useModal()
  const onAlbumSelected = (album: AlbumIndentifier | null) => {
    onAlbumChange && onAlbumChange(album)
    setAlbum(album)
    Navigation.goBack()
  }

  const openAlbumsModal = () => {
    const modalProps: ModalCardProps = {
      title: translate("image-picker-widget.album-choose-modal-title"),
      snapPoints: [0, "90%"],
      initialSnap: 1,
      onOpenStart: onAlbumModalOpen,
      onCloseStart: onAlbumModalClose,
      content: () => <ImagePickerAlbumList albums={albums} onSelectAlbum={onAlbumSelected} />,
    }
    show(modalProps, NavigableRoute.ModalCard)
  }
  return (
    <>
      <Stack direction="row" axisDistribution="center" crossAxisDistribution="center" height={HEADER_HEIGHT}>
        <Flex grow={1} debugColor="grey">
          <Spacer sizeStep={1} direction="row" />
        </Flex>
        <Margin grow={2} axisDistribution="center">
          <Stack direction="column">
            <TouchableWithoutFeedback onPress={openAlbumsModal} testID="image-picker.camera-roll">
              <Text textAlign="center" numberOfLines={1} textType="headline3">
                {currentAlbum ? currentAlbum.title : translate("camera-roll.most-recent-album-title")}
              </Text>
              <Stack direction="row" crossAxisDistribution="center" axisDistribution="center">
                <Text textAlign="center" color="secondary" textType="tertiaryBody2">
                  {translate("image-picker-widget.more-albums-btn")}
                </Text>
                <SVG localSVG={DropDownFill} tint="secondary" />
              </Stack>
            </TouchableWithoutFeedback>
          </Stack>
        </Margin>
        <Margin shrink={0} marginStep={CANCEL_BTN_MARGIN_STEP}>
          <TouchableWithoutFeedback onPress={onCancel} testID="image-picker.cancel-button">
            <Text color="brand" textType="primaryBody1">
              {translate("image-picker-widget.cancel-btn")}
            </Text>
          </TouchableWithoutFeedback>
        </Margin>
      </Stack>
      <Flex grow={1} height="100%" crossAxisDistribution="flex-start">
        {loading ? (
          <Center>
            <ActivityIndicator size="large" />
          </Center>
        ) : (
          <ImagePickerGrid
            loadMore={loadMore}
            selectedPhotos={selectedPhotos}
            onImagePickerItemPressed={onImagePickerItemPressed}
            photos={photosFromDevice}
            onTakePhotoClicked={onTakePhotoClicked}
            testID="image-picker.grid"
          />
        )}
      </Flex>
    </>
  )
}
