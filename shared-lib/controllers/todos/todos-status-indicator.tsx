import _ from "lodash"
import {
  Circle,
  Flex,
  MessageRowProps,
  MessageSentSuccess,
  RemoteImage,
  SVG,
  POST_FIRST_MESSAGE_TYPE,
  Spacer,
  isValidUserId,
} from "uc-lib"
import React, { FC } from "react"
import { useQuery } from "@apollo/react-hooks"

export const RecieverProfile: FC<{ userId?: string | null }> = ({ userId }) => {
  const { data } = useQuery<Query>(PUBLIC_PROFILE_QUERY, {
    variables: {
      userId: _.toNumber(userId),
    },
    skip: !isValidUserId(userId),
  })
  const uri = data?.publicProfile?.avatars?.squareImage || null
  if (!uri) {
    return null
  }
  return <RemoteImage source={{ uri }} resizeMode="contain" width={"100%"} height={"100%"} />
}

export const recieverReadDate = (readStatus: DiscussionReadStatus[], myId: string) => {
  return _.find(readStatus, ({ userId }) => userId !== myId)
}

export const isSystemMessage = (message: Message): boolean => {
  return message.metadataType === POST_FIRST_MESSAGE_TYPE.SYSTEM
}

export const TodosStatusIndicator: FC<MessageRowProps> = props => {
  const { readStatus, recipientId: recieverId, testID } = props

  const sent = readStatus?.readStatusType === "sent"
  const seen = readStatus?.readStatusType === "seen"

  if (!sent && !seen) {
    return <Spacer direction="row" sizeStep={4} />
  }
  return (
    <Flex
      direction="column"
      crossAxisDistribution="flex-end"
      axisDistribution="flex-end"
      testID={(testID || "todos-status-indicator") + ".circle"}
    >
      <Circle size={16}>
        {sent && <SVG tint="brand" localSVG={MessageSentSuccess} />}
        {seen && <RecieverProfile userId={_.toString(recieverId)} />}
      </Circle>
    </Flex>
  )
}
