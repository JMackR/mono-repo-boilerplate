import { translate } from "shared-lib"
import { Avatar, Center, Flex, Overlay, Spacer, Stack, SVG, Text, useColor } from "uc-lib"
import { DealerBadge, BadgeVerifiedProSellerIcon, BHPHDealerBadge } from "uc-lib/assets/image-catalog"
import React from "react"
import { View } from "react-native"
import { AVATAR_SIZE_LARGE } from "../../user-profile/user-profile.constants"
import { AccountProfileAvatarProps } from "./account-profile-widget-avatar.d"

const TRUY_BADGE_SIZE = 24

export const AccountProfileAvatar: React.FC<AccountProfileAvatarProps> = ({
  avatarUri,
  size,
  isTruyouVerified,
  isAutosDealer,
  isMerchant,
  isSubPrimeAutosDealer,
  testID,
}) => {
  const { colors } = useColor()

  return (
    <Stack direction="column">
      <Flex testID={(testID || "uc-lib-profile-avatar") + ".image"}>
        <View
          style={{
            borderWidth: 2,
            borderColor: colors.crystal,
            borderRadius: AVATAR_SIZE_LARGE,
          }}
        >
          <Avatar size={size || AVATAR_SIZE_LARGE} source={{ uri: avatarUri }} />
        </View>
        {isSubPrimeAutosDealer ? (
          <Overlay insetRightStep={0} insetBottomStep={0}>
            <SVG localSVG={{ SVG: BHPHDealerBadge.SVG }} />
          </Overlay>
        ) : isAutosDealer ? (
          <Overlay insetRightStep={1} insetBottomStep={-2}>
            <SVG localSVG={{ SVG: DealerBadge.SVG }} />
          </Overlay>
        ) : null}
        {isMerchant && (
          <Overlay insetRightStep={1} insetBottomStep={-2}>
            <SVG localSVG={{ SVG: BadgeVerifiedProSellerIcon.SVG }} />
          </Overlay>
        )}
      </Flex>
    </Stack>
  )
}
