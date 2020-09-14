import { Avatar, Flex, Margin, Stack, Text, Center } from "uc-lib"
import React from "react"
import { PublicProfilePropTypes } from "./public-user-profile.props"
import { AVATAR_SIZE } from "./user-profile.constants"

const SMALL_MARGIN = 0.5

export const PublicUserProfile: React.FC<PublicProfilePropTypes> = (props) => {
  const { avatars, name, publicLocationName, ratingSummary, testID, showLocation, showRating } = props
  const { average = 0, count = 0 } = ratingSummary || {}
  const showLocationSection = showLocation || showLocation === undefined ? true : false
  const showRatingSection = (showRating || showRating === undefined) && count > 0 ? true : false
  return (
    <Flex grow={1} testID={testID || "uc-lib.public-user-profile"}>
      <Flex>
        <Margin marginStep={2}>
          <Avatar
            source={{ uri: avatars?.squareImage || "" }}
            size={AVATAR_SIZE}
            testID="redibs-ucl.public-user-profile.avatar"
          />
        </Margin>
      </Flex>
      <Flex grow={1}>
        <Margin marginStep={2}>
          <Center>
            <Stack direction="column" childSeparationStep={1} crossAxisDistribution="flex-start">
              <Text testID="redibs-ucl.public-user-profile.first-name">{name}</Text>
              {showLocationSection && (
                <Text
                  textType="tertiaryBody2"
                  color="secondary"
                  testID="redibs-ucl.public-user-profile.public-location-name"
                >
                  {publicLocationName}
                </Text>
              )}
              {showRatingSection && (
                <Flex direction="row">
                  <Margin marginTopStep={SMALL_MARGIN}>
                    <StarRating rating={average} disabled={true} testID="redibs-ucl.public-user-profile.star-rating" />
                    <Margin marginLeftStep={1}>
                      <Text textType="tertiaryBody2" color="secondary" testID="redibs-ucl.public-user-profile.rating-count">
                        ({count})
                      </Text>
                    </Margin>
                  </Margin>
                </Flex>
              )}
            </Stack>
          </Center>
        </Margin>
      </Flex>
    </Flex>
  )
}
