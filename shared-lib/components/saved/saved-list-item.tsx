import React, { FC, useEffect } from "react"
import { SavedListItemProps } from "./saved-list-item-props"
import {
  Text,
  Margin,
  Stack,
  RemoteImage,
  Separator,
  Flex,
  SVG,
  ActionRightChevron,
  Touchable,
  QuickSaveListIcon,
  SavedListIcon,
} from "uc-lib"
import { translate } from "../../utilities"
import pluralize from "pluralize"

const SPACER_STEP = 4
const LISTING_ICON_SIZE = 64
const PLACEHOLDER_ICON_SIZE = 40
const LIST_ICON_BORDER_RADIUS = 4

export const SavedListItem: FC<SavedListItemProps> = ({
  name,
  isQuickSave,
  itemCount,
  photo,
  tapHandler,
  handleDeleteClick,
  handleOnShow,
}) => {
  useEffect(() => {
    handleOnShow && handleOnShow()
  }, [])

  const onPress = () => {
    tapHandler && tapHandler()
  }

  const onDeletePress = () => {
    handleDeleteClick && handleDeleteClick()
  }

  const placeHolderIcon = isQuickSave ? QuickSaveListIcon : SavedListIcon
  const itemCountText = pluralize(translate("saved-items.list-item-count"), itemCount || 0, true)

  return (
    <Touchable onPress={onPress}>
      <Stack direction="column" grow={1}>
        <Flex direction={"column"}>
          <Margin marginStep={SPACER_STEP}>
            <Stack direction="row" childSeparationStep={1} axisDistribution="center" grow={1}>
              <Flex
                direction="row"
                crossAxisDistribution="center"
                width={LISTING_ICON_SIZE}
                height={LISTING_ICON_SIZE}
                axisDistribution="center"
              >
                {photo && (
                  <RemoteImage
                    height={LISTING_ICON_SIZE}
                    aspectRatio={1}
                    borderRadius={LIST_ICON_BORDER_RADIUS}
                    resizeMode="cover"
                    source={{ uri: photo }}
                  />
                )}
                {!photo && (
                  <SVG
                    localSVG={{
                      ...placeHolderIcon,
                      size: {
                        width: PLACEHOLDER_ICON_SIZE,
                        height: PLACEHOLDER_ICON_SIZE,
                      },
                    }}
                  />
                )}
              </Flex>
              <Margin marginLeftStep={1} grow={1}>
                <Stack direction="column" grow={1} childSeparationStep={1} axisDistribution="center">
                  <Text textType={"primaryBody2"}>{name}</Text>
                  <Text textType={"tertiaryBody2"} color="secondary">
                    {itemCountText}
                  </Text>
                  {!isQuickSave && (
                    <Margin marginTopStep={1}>
                      <Touchable onPress={onDeletePress}>
                        <Text textType="secondaryBody2" color="brand">
                          {translate("common-actions.delete")}
                        </Text>
                      </Touchable>
                    </Margin>
                  )}
                </Stack>
              </Margin>
              <Flex direction="row" crossAxisDistribution="center">
                <SVG tint="secondary" localSVG={ActionRightChevron} />
              </Flex>
            </Stack>
          </Margin>
          <Margin marginLeftStep={SPACER_STEP}>
            <Separator />
          </Margin>
        </Flex>
      </Stack>
    </Touchable>
  )
}
