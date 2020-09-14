import { Flex, Margin, Text, BackgroundContainer } from "uc-lib"
import { ProfileGroupFillIcon } from "uc-lib/assets"
import React from "react"
import { Stack, SVG, Spacer } from "uc-lib/controls"

const INVITE_FRIENDS_BANNER_HEIGHT = 35

export const AccountInviteFriendsBanner = ({ text }: { text: string }) => {
  return (
    <BackgroundContainer type="primary">
      <Margin marginStep={4}>
        <Flex crossAxisDistribution="center">
          <Stack
            height={INVITE_FRIENDS_BANNER_HEIGHT}
            direction="row"
            crossAxisDistribution="center"
            axisDistribution="center"
            width="100%"
          >
            <SVG localSVG={ProfileGroupFillIcon} />
            <Spacer direction="row" sizeStep={4} />
            <Text color="brand" textType="primaryBody1" textAlign="center">
              {text}
            </Text>
          </Stack>
        </Flex>
      </Margin>
    </BackgroundContainer>
  )
}
