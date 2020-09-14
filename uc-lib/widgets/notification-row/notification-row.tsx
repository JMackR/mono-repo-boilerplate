import React, { FC } from "react"
import { NotificationRowProps } from "./notification-row.props"
import { useSelectable } from "../../hooks"
import {
  Touchable,
  Flex,
  Background,
  Margin,
  Stack,
  SVG,
  Text,
  Separator,
  Spacer,
  RemoteImage,
  Border,
} from "../../controls"
import { AVATAR_SIZE } from "../user-profile"
import { CheckBoxSelected, CheckBoxUnselected } from "../../assets"
import { AccountProfileAvatar } from "../account"
import { DateFormatter } from "shared-lib"
import _ from "lodash"
import invariant from "invariant"

export const NotificationRow: FC<NotificationRowProps> = React.memo<NotificationRowProps>(props => {
  const {
    read,
    avatar,
    title,
    dateAdded,
    handleClick,
    secondaryImage,
    testId,
    id,
    actionPath,
    objectId,
    type,
    editing,
    selectId,
  } = props

  const { isSelected, select, deselect } = useSelectable()

  const selectIdInternal = selectId || ""
  const selected = isSelected(selectIdInternal)

  const handleClickInternal = React.useCallback(() => {
    invariant(!!objectId, "objectId must be defined")
    invariant(!!type, "type must be defined")

    if (editing) {
      if (selected) {
        deselect(selectIdInternal)
      } else {
        select(selectIdInternal)
      }
    } else {
      handleClick && handleClick(id, objectId, type, read, actionPath)
    }
  }, [handleClick, objectId, type, read, editing])

  return (
    <Touchable onPress={handleClickInternal} testID={testId || "uc-lib.todos-row"}>
      <Flex direction="column">
        <Background type={read ? "primary" : "unread"} />
        <Margin direction="row" marginStep={4}>
          <Stack direction="row" grow={1} childSeparationStep={4} crossAxisDistribution="center">
            <Flex
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              direction="column"
              shrink={0}
              grow={0}
              axisDistribution="center"
              crossAxisDistribution="center"
            >
              {editing ? (
                <SVG localSVG={selected ? CheckBoxSelected : CheckBoxUnselected} />
              ) : (
                <AccountProfileAvatar avatarUri={avatar} size={AVATAR_SIZE} />
              )}
            </Flex>
            <Stack direction="column" grow={1} crossAxisDistribution="flex-start">
              <Text textType="primaryBody1">{title}</Text>
              <Spacer direction="column" sizeStep={1} />
              <Text textType="tertiaryBody2" color="secondary">
                {_.isNumber(dateAdded) && DateFormatter.formatEpochFromNow(dateAdded)}
                {!_.isNumber(dateAdded) && DateFormatter.formatFromNow(dateAdded)}
              </Text>
            </Stack>
          </Stack>
          <SecondaryImage secondaryImage={secondaryImage} />
        </Margin>
      </Flex>
      <Separator direction="column" />
    </Touchable>
  )
})

const SecondaryImage: FC<{ secondaryImage: string | undefined }> = ({ secondaryImage }) => {
  if (secondaryImage) {
    return (
      <Flex shrink={0}>
        <Border cornerRadius="small" lineWeight="none">
          <RemoteImage
            width={AVATAR_SIZE}
            aspectRatio={1}
            resizeMode="cover"
            source={{
              uri: secondaryImage,
            }}
          />
        </Border>
      </Flex>
    )
  } else {
    return null
  }
}
