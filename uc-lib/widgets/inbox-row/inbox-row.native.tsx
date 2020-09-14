import React, { FC } from "react"
import { InboxRowProps } from "./inbox-row.props.native"
import { SwipeableAction, SwipeableRow } from "../swipeable-row/index.native"
import { Margin, Stack, SVG, Text, Spacer, Button, Background, Flex, RemoteImage, ClickableOpacity } from "../../controls"
import { DeleteLine } from "../../assets"
import { translate, DateFormatter } from "shared-lib"
import { AVATAR_SIZE } from "../user-profile"
import { AccountProfileAvatar } from "../account"
import _ from "lodash"
import invariant from "invariant"

const TITLE_TEXT_MAX_LINES = 1
const BODY_TEXT_MAX_LINES = 2

export const InboxRow: FC<InboxRowProps> = React.memo<InboxRowProps>(props => {
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
    archiveMessage,
    handleClick,
    visualTags,
    testID,
    allowSwipeActions,
  } = props

  const handleClickInternal = React.useCallback(() => {
    invariant(!!objectId, "objectId must be defined")
    invariant(!!type, "type must be defined")

    handleClick && handleClick(id, objectId, type, read)
  }, [handleClick, objectId, type, read])

  const handleArchiveInternal = React.useCallback(() => {
    invariant(!!objectId, "objectId must be defined")
    invariant(!!type, "type must be defined")

    archiveMessage && archiveMessage(id, objectId, type)
  }, [archiveMessage, objectId, type])

  const ArchiveAction = (
    <SwipeableAction key="archive" background="error" onPress={handleArchiveInternal}>
      <Margin marginStep={4}>
        <Stack direction="column" crossAxisDistribution="center">
          <SVG tint="primaryAlt" localSVG={DeleteLine} />
          <Text textType="tertiaryBody2" color="primaryAlt" testID={(testID || "alert") + ".delete"}>
            {translate("todos-screen.delete")}
          </Text>
        </Stack>
      </Margin>
    </SwipeableAction>
  )

  const RowContent: FC = () => {
    return (
      <ClickableOpacity onClick={handleClickInternal} testID={testID || "uc-lib.todos-row"}>
        <Background type={read ? "primary" : "unread"} />
        <Margin direction="column" marginStep={4}>
          <Stack direction="row" crossAxisDistribution="center">
            <Flex
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              direction="column"
              shrink={0}
              grow={0}
              axisDistribution="center"
              crossAxisDistribution="flex-start"
            >
              <AccountProfileAvatar
                avatarUri={avatar}
                size={AVATAR_SIZE}
                isTruyouVerified={isTruyouVerified}
                isAutosDealer={isAutosDealer}
              />
            </Flex>
            <Spacer direction="row" sizeStep={4} />
            <Flex grow={1} axisDistribution="flex-start" crossAxisDistribution="center">
              <Stack grow={1} direction="column" crossAxisDistribution="flex-start" childSeparationStep={1}>
                <Text textType="primaryBody1" numberOfLines={TITLE_TEXT_MAX_LINES} testID={(testID || "alert") + ".title"}>
                  {title}
                </Text>
                <Text textType="secondaryBody2" numberOfLines={BODY_TEXT_MAX_LINES} testID={(testID || "alert") + ".body"}>
                  {notificationText}
                </Text>
                <Text textType="tertiaryBody2" color="secondary">
                  {_.isNumber(dateAdded) && DateFormatter.formatEpochFromNow(dateAdded)}
                  {!_.isNumber(dateAdded) && DateFormatter.formatFromNow(dateAdded)}
                </Text>
              </Stack>
            </Flex>
            <Spacer direction="row" sizeStep={4} />
            {!!secondaryImage && (
              <RemoteImage
                width={AVATAR_SIZE}
                aspectRatio={1}
                resizeMode="cover"
                borderRadius={4}
                source={{
                  uri: secondaryImage,
                }}
              />
            )}
          </Stack>
          {visualTags && visualTags?.length > 0 && (
            <>
              <Spacer direction="column" sizeStep={2} />
              <Stack direction="row">
                <Flex width={AVATAR_SIZE} shrink={0} grow={0} />
                <Spacer direction="row" sizeStep={4} />
              </Stack>
            </>
          )}
          <CallToAction secondaryImage={secondaryImage} />
        </Margin>
      </ClickableOpacity>
    )
  }

  if (allowSwipeActions) {
    return (
      <SwipeableRow renderRightActions={ArchiveAction}>
        <RowContent />
      </SwipeableRow>
    )
  } else {
    return <RowContent />
  }
})

const CallToAction: FC<{ secondaryImage?: string }> = ({ secondaryImage }) => {
  // Design wants the capability to add call to action buttons to the list down the line,
  // but we do not yet have features that support it
  if (false) {
    const onClick = () => {}

    return (
      <Margin marginTopStep={3} marginLeftStep={16} marginRightStep={secondaryImage ? 16 : 0}>
        <Button title="" buttonSize="small" buttonType="secondary" onClick={onClick} />
      </Margin>
    )
  }
  return null
}
