import React from "react"
import { UserProfilePropTypes } from "./user-profile-types"
import { ActionRightChevron } from "uc-lib/assets"
import { Avatar, Text, SVG, Margin, Stack } from "uc-lib/controls"

import { StyleSheet, css } from "aphrodite"
import { AVATAR_SIZE, MARGIN_USER_CONTENT, MARGIN_STAR_RATING_CONTAINER } from "./user-profile.constants"
import { memberSince } from "./user-profile-shared"

const STYLES = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    ":hover": {
      cursor: "pointer",
    },
  },
  userContent: {
    flexGrow: 1,
    whiteSpace: "nowrap",
  },
})

export const UserProfile: React.FC<UserProfilePropTypes> = ({ profile, onClick }) => {
  const memberSinceText = profile.tagLine || memberSince(profile.joined)
  return (
    <div className={css(STYLES.container)} onClick={onClick}>
      <Avatar source={{ uri: profile.avatar }} size={AVATAR_SIZE} />
      <div className={css(STYLES.userContent)}>
        <Margin marginLeftStep={MARGIN_USER_CONTENT}>
          <Stack direction="column">
            <Text>{profile.name}</Text>
            <Text textType="tertiaryBody2" color="secondary">
              {memberSinceText}
            </Text>
          </Stack>
        </Margin>
      </div>
      <SVG tint="hint" localSVG={ActionRightChevron} />
    </div>
  )
}
