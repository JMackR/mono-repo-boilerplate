import React from "react"
import { View } from "react-native"
import { Background } from "../background"
import { SVG } from "../../controls/image/svg"
import { useFontTheme } from "../../themes"
import { IconBadgeProps } from "./icon-badge.props"

export const IconBadge: React.FC<IconBadgeProps> = props => {
  const { icon, testID } = props
  const fontTheme = useFontTheme()
  const size = fontTheme.baseMargin * 4
  return (
    <View
      style={{ position: "absolute", right: 0, bottom: 0 }}
      testID={testID || "uc-lib.icon-badge"}
      accessibilityLabel={testID || "uc-lib.icon-badge"}
    >
      <View style={{ borderRadius: 8, overflow: "hidden" }}>
        <Background />
        <SVG localSVG={{ SVG: icon.SVG, size: { width: size, height: size } }} />
      </View>
    </View>
  )
}
