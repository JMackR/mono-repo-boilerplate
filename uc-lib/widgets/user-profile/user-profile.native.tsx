import React from "react"
import { StyleSheet, View } from "react-native"
import { UserProfilePropTypes } from "./user-profile-types"
import { ActionRightChevron } from "uc-lib/assets"
import { Avatar, Text, SVG, Margin, Stack, ClickableOpacity } from "uc-lib/controls"
import { AVATAR_SIZE, MARGIN_USER_CONTENT } from "./user-profile.constants"
import { memberSince } from "./user-profile-shared"

const STYLES = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  userContent: {
    flex: 1,
  },
})

export const UserProfile: React.FC<UserProfilePropTypes> = ({ profile, onClick, testID, avatarSize }) => {
  const memberSinceText = profile.tagLine || memberSince(profile.joined)
  return (
    <ClickableOpacity onClick={onClick} testID={testID || "uc-lib.user-profile"}>
      <View style={STYLES.container}>
        <Avatar source={{ uri: profile.avatar }} size={avatarSize} testID="redibs-ucl.user-profile.avatar"></Avatar>
        <View style={STYLES.userContent}>
          <Margin marginLeftStep={MARGIN_USER_CONTENT}>
            <Stack direction="column" childSeparationStep={1}>
              <Text testID="redibs-ucl.user-profile.name">{profile.name}</Text>
              <Text textType="tertiaryBody2" color="secondary" testID="redibs-ucl.user-profile.member-since">
                {memberSinceText}
              </Text>
            </Stack>
          </Margin>
        </View>
        {onClick && <SVG tint="hint" localSVG={ActionRightChevron} />}
      </View>
    </ClickableOpacity>
  )
}

UserProfile.defaultProps = {
  avatarSize: AVATAR_SIZE,
}
