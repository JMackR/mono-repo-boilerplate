import React, { FC } from "react"
import { Flex, Touchable, Background, Margin, Stack, AVATAR_SIZE, Text, Border, RemoteImage, Separator } from "uc-lib"
import _ from "lodash"
import { AccountProfileAvatar } from "uc-lib/widgets/account"
import { DateFormatter } from "shared-lib/utilities"
import { InboxRowProps } from "./inbox-row.props"
import { useSelectable } from "../../hooks"
import { CheckBoxSelected, CheckBoxUnselected } from "../../assets"
import { SVG } from "../../controls"
import invariant from "invariant"

const TITLE_TEXT_MAX_LINES = 1
const BODY_TEXT_MAX_LINES = 2

export const InboxRow: FC<InboxRowProps> = props => {
  const {
    id,
    objectId,
    type,
    read,
    avatar,
    isTruyouVerified,
    isAutosDealer,
    title,
    notificationText,
    dateAdded,
    secondaryImage,
    handleClick,
    editing,
    selectId,
    testID,
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
      handleClick && handleClick(id, objectId, type, read)
    }
  }, [handleClick, alert, editing, selectId])

  const SecondaryImage: FC = () => {
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

  return (
    <Touchable onPress={handleClickInternal} testID={testID || "uc-lib.todos-row"}>
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
                <AccountProfileAvatar
                  avatarUri={avatar}
                  size={AVATAR_SIZE}
                  isTruyouVerified={isTruyouVerified || false}
                  isAutosDealer={isAutosDealer || false}
                />
              )}
            </Flex>
            <Stack direction="column" grow={1} crossAxisDistribution="flex-start" childSeparationStep={1}>
              <Text textType="primaryBody1" numberOfLines={TITLE_TEXT_MAX_LINES}>
                {title}
              </Text>
              <Text textType="secondaryBody2" numberOfLines={BODY_TEXT_MAX_LINES}>
                {notificationText}
              </Text>
              <Text textType="tertiaryBody2" color="secondary">
                {DateFormatter.formatFromNow(dateAdded.toString())}
              </Text>
            </Stack>
            <SecondaryImage />
          </Stack>
        </Margin>
      </Flex>
      <Separator direction="column" />
    </Touchable>
  )
}
