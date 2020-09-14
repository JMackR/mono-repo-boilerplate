import React, { FC } from "react"
import { NotificationRowProps } from "./notification-row.props.native"
import { SwipeableAction, SwipeableRow } from "../swipeable-row/index.native"
import { Margin, Stack, SVG, Text, Spacer, RemoteImage, ClickableOpacity, Background, Flex, Button } from "../../controls"
import { translate, DateFormatter } from "shared-lib"
import { DeleteLine } from "../../assets"
import { AVATAR_SIZE } from "../user-profile"
import { AccountProfileAvatar } from "../account"
import _ from "lodash"
import invariant from "invariant"

export const NotificationRow: FC<NotificationRowProps> = React.memo<NotificationRowProps>(props => {
  const {
    read,
    avatar,
    title,
    dateAdded,
    handleClick,
    archiveNotification,
    secondaryImage,
    testId,
    id,
    actionPath,
    objectId,
    type,
  } = props

  const handleClickInternal = React.useCallback(() => {
    invariant(!!objectId, "objectId must be defined")
    invariant(!!type, "type must be defined")

    handleClick && handleClick(id, objectId, type, read, actionPath)
  }, [handleClick, objectId, type, read])

  const handleArchiveInternal = React.useCallback(() => {
    invariant(!!objectId, "objectId must be defined")
    invariant(!!type, "type must be defined")

    archiveNotification && archiveNotification(id, objectId, type)
  }, [archiveNotification, objectId, type])

  const ArchiveAction = (
    <SwipeableAction key="archive" background="error" onPress={handleArchiveInternal}>
      <Margin marginStep={4}>
        <Stack direction="column" crossAxisDistribution="center">
          <SVG tint="primaryAlt" localSVG={DeleteLine} />
          <Text textType="tertiaryBody2" color="primaryAlt" testID={(testId || "ou.alert") + ".delete"}>
            {translate("todos-screen.delete")}
          </Text>
        </Stack>
      </Margin>
    </SwipeableAction>
  )

  return (
    <SwipeableRow renderRightActions={ArchiveAction} key={id}>
      <ClickableOpacity onClick={handleClickInternal} testID={testId || "uc-lib.todos-row"}>
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
              <AccountProfileAvatar avatarUri={avatar} size={AVATAR_SIZE} />
            </Flex>
            <Spacer direction="row" sizeStep={4} />
            <Flex grow={1} axisDistribution="flex-start" crossAxisDistribution="center">
              <Stack grow={1} direction="column" crossAxisDistribution="flex-start" childSeparationStep={1}>
                <Text textType="primaryBody1" testID={(testId || "ou.alert") + ".title"}>
                  {title}
                </Text>
                <Text textType="tertiaryBody2" color="secondary">
                  {_.isNumber(dateAdded) && DateFormatter.formatEpochFromNow(dateAdded)}
                  {!_.isNumber(dateAdded) && DateFormatter.formatFromNow(dateAdded)}
                </Text>
              </Stack>
            </Flex>
            <SecondaryImage secondaryImage={secondaryImage} />
          </Stack>
          <CallToAction secondaryImage={secondaryImage} />
        </Margin>
      </ClickableOpacity>
    </SwipeableRow>
  )
})

const SecondaryImage: FC<{ secondaryImage: string | undefined }> = ({ secondaryImage }) => {
  if (secondaryImage) {
    return (
      <>
        <Spacer direction="row" sizeStep={4} />
        <RemoteImage
          width={AVATAR_SIZE}
          aspectRatio={1}
          resizeMode="cover"
          borderRadius={4}
          source={{
            uri: secondaryImage,
          }}
        />
      </>
    )
  } else {
    return null
  }
}

const CallToAction: FC<{ secondaryImage: string | undefined }> = ({ secondaryImage }) => {
  // Design wants the capability to add call to action buttons to the list down the line,
  // but we do not yet have features that support it
  if (false) {
    const onClick = () => {}

    return (
      <Margin marginTopStep={3} marginLeftStep={secondaryImage ? 16 : 0}>
        <Button title="" buttonSize="small" buttonType="secondary" onClick={onClick} />
      </Margin>
    )
  }
  return null
}
