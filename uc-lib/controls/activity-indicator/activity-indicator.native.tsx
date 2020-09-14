import React from "react"
import { ActivityIndicator as RNActivityIndicator, View } from "react-native"
import { ActivityIndicatorProps } from "./activity-indicator.props"
import { useColorForTextColor } from "uc-lib/themes"

export const ActivityIndicator = (props: ActivityIndicatorProps) => {
  const { enabled, size, tint, testID } = props
  const tintColor = useColorForTextColor(tint || "brand")

  return (
    <View>
      <RNActivityIndicator
        size={size}
        color={tintColor}
        animating={enabled}
        pointerEvents="none"
        testID={testID || "uc-lib.activity-indicator"}
        accessibilityLabel={testID || "uc-lib.activity-indicator"}
      />
    </View>
  )
}
