import { Background, CameraFill, Flex, Margin, Stack, SVG, Text } from "uc-lib"
import React, { FC } from "react"
import { translate } from "shared-lib"

export interface ImagePickerTakePhotoItemProps {
  onTakePhotoClicked?: OnTakePhotoClicked
}

export type OnTakePhotoClicked = () => void

export const ImagePickerTakePhotoItem: FC<ImagePickerTakePhotoItemProps> = ({ onTakePhotoClicked }) => {
  return (
    <Margin grow={1} touchUpInsideHandler={onTakePhotoClicked}>
      <Flex>
        <Background type="secondary" />
        <Stack width="100%" axisDistribution="center" direction="column" crossAxisDistribution="center">
          <SVG
            localSVG={{
              SVG: CameraFill.SVG,
              size: {
                width: 44,
                height: 44,
              },
            }}
            tint="brand"
          />
          <Text color="brand" textType="primaryBody1" testID="image-picker-widget.take-photo-button">
            {translate("image-picker-widget.take-photo-btn")}
          </Text>
        </Stack>
      </Flex>
    </Margin>
  )
}
