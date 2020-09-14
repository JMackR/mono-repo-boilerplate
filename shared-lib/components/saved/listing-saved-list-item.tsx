import React, { FC, useEffect } from "react"
import { ListingSavedListItemProps } from "./listing-saved-list-item-props"
import {
  Text,
  Margin,
  Stack,
  RemoteImage,
  SVG,
  CheckIcon,
  Touchable,
  SavedListIcon,
  QuickSaveListIcon,
  Flex,
} from "uc-lib"

const SPACER_STEP = 2
const LISTING_ICON_SIZE = 24
const LIST_ICON_BORDER_RADIUS = 2

export const ListingSavedListItem: FC<ListingSavedListItemProps> = ({
  savedList,
  name,
  photo,
  isQuickSave,
  itemSaved,
  tapHandler,
  handleOnShow,
}) => {
  useEffect(() => {
    handleOnShow && handleOnShow(savedList)
  }, [])

  const onPress = () => {
    tapHandler && tapHandler(itemSaved, savedList)
  }

  const placeHolderIcon = isQuickSave ? QuickSaveListIcon : SavedListIcon
  const photoExists = photo != null && photo.length > 0

  return (
    <Touchable onPress={onPress}>
      <Margin marginStep={4}>
        <Stack direction="row" childSeparationStep={SPACER_STEP} grow={1} crossAxisDistribution="center">
          <Flex>
            {photoExists && (
              <RemoteImage
                height={LISTING_ICON_SIZE}
                width={LISTING_ICON_SIZE}
                borderRadius={LIST_ICON_BORDER_RADIUS}
                resizeMode="cover"
                source={{ uri: photo }}
              />
            )}
            {!photoExists && (
              <SVG
                localSVG={{
                  ...placeHolderIcon,
                  size: { width: LISTING_ICON_SIZE, height: LISTING_ICON_SIZE },
                }}
              />
            )}
          </Flex>
          <Margin marginStep={1} grow={1}>
            <Text textType={"primaryBody2"}>{name}</Text>
          </Margin>
          {itemSaved && (
            <Margin marginStep={1}>
              <SVG tint="brand" localSVG={CheckIcon} />
            </Margin>
          )}
        </Stack>
      </Margin>
    </Touchable>
  )
}
