import { ProfileImageSelectorProps } from "./account-profile-image-selector.props"
import { useColorForBackgroundColor, useMargin } from "../../themes"
import { TouchableOpacity, View } from "react-native"
import { Margin, SVG } from "../../controls"
import React, { FC } from "react"
import { TabBarPostFill } from "../../assets"
import { AVATAR_SIZE_LARGE } from "../user-profile/user-profile.constants"

export const AccountProfileImageSelector: FC<ProfileImageSelectorProps> = props => {
  const { children, onClick, testID } = props
  const backgroundColor = useColorForBackgroundColor("overlay")
  const { baseMargin } = useMargin()
  return (
    <TouchableOpacity
      style={{
        height: AVATAR_SIZE_LARGE,
        width: AVATAR_SIZE_LARGE,
        borderRadius: AVATAR_SIZE_LARGE / 2,
        overflow: "hidden",
      }}
      onPress={onClick}
      testID={testID || "uc-lib.profile-image-selector"}
      accessibilityLabel={testID || "uc-lib.profile-image-selector"}
    >
      {children}
      <View
        style={{
          backgroundColor,
          width: AVATAR_SIZE_LARGE,
          position: "absolute",
          alignItems: "center",
          bottom: 0,
        }}
      >
        <Margin marginStep={1}>
          <SVG
            localSVG={{
              SVG: TabBarPostFill.SVG,
              size: {
                height: baseMargin * 5,
                width: baseMargin * 5,
              },
            }}
            tint="primaryAlt"
          />
        </Margin>
      </View>
    </TouchableOpacity>
  )
}
