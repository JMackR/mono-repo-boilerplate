import React from "react"
import { Margin, Avatar, Flex, Stack, Text, IconBadge } from "uc-lib"

import { PublicProfilePropTypes } from "./public-user-profile.props"
import { AVATAR_SIZE } from "./user-profile.constants"
import { DealerBadge } from "../../assets"
import _ from "lodash"

export const PublicUserProfile: React.FC<PublicProfilePropTypes> = (props) => {
  const { avatars, isTruyouVerified, isAutosDealer, name, publicLocationName, ratingSummary, testID } = props

  const { average = 0, count = 0 } = ratingSummary || {}
  const avatarImageUri: string = _.property<any, string>("squareImage")(avatars)
  return (
    <Flex grow={1} testID={testID || "uc-lib.public-user-profile"}>
      <Flex>
        <Margin marginStep={2}>
          <Avatar source={{ uri: avatarImageUri || "" }} size={AVATAR_SIZE} testID="redibs-ucl.public-user-profile.avatar" />
        </Margin>
      </Flex>
      <Flex grow={1}>
        <Margin marginStep={2}>
          <Stack direction="column" childSeparationStep={1} crossAxisDistribution="flex-start">
            <Text testID="redibs-ucl.public-user-profile.first-name">{name}</Text>
            <Text textType="tertiaryBody2" color="secondary" testID="redibs-ucl.public-user-profile.public-location-name">
              {publicLocationName}
            </Text>
            {count > 0 && (
              <Flex direction="row">
                <Margin marginLeftStep={1}>
                  <Text textType="tertiaryBody2" color="secondary" testID="redibs-ucl.public-user-profile.rating-count">
                    ({count})
                  </Text>
                </Margin>
              </Flex>
            )}
          </Stack>
        </Margin>
      </Flex>
    </Flex>
  )
}
