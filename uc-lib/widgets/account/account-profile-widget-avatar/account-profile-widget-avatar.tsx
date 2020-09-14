import { translate } from "shared-lib"
import { Avatar, Overlay, OverlayAnchor, SVG } from "uc-lib"
import { BadgeVerifiedProSellerIcon, DealerBadge, BHPHDealerBadge } from "uc-lib/assets/image-catalog"
import React from "react"
import { Center, Flex, Margin, Text } from "../../../controls"
import { AVATAR_SIZE_LARGE } from "../../user-profile/user-profile.constants"
import { AccountProfileAvatarProps } from "./account-profile-widget-avatar.d"

export const AccountProfileAvatar: React.FC<AccountProfileAvatarProps> = ({
  avatarUri,
  size,
  isTruyouVerified,
  isAutosDealer,
  isMerchant,
  isSubPrimeAutosDealer,
}) => {
  return (
    <OverlayAnchor>
      <Flex direction="column">
        <Avatar size={size || AVATAR_SIZE_LARGE} source={{ uri: avatarUri }} />
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
          <Overlay insetRightStep={0} insetBottomStep={0}>
            <SVG localSVG={{ SVG: BadgeVerifiedProSellerIcon.SVG }} />
          </Overlay>
        )}
      </Flex>
    </OverlayAnchor>
  )
}
