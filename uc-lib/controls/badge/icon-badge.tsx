import { css, StyleSheet } from "aphrodite/no-important"
import { SVG } from "uc-lib"
import React from "react"
import { useColorForBackgroundColor, useFontTheme } from "../../themes"
import { IconBadgeProps } from "./icon-badge.props"

const BadgeStyles = StyleSheet.create({
  container: {
    display: "inline-block",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
})
export const IconBadge: React.FC<IconBadgeProps> = props => {
  const fontTheme = useFontTheme()
  const size = fontTheme.baseMargin * 4
  const backgroundColor = useColorForBackgroundColor("primary")
  return (
    <div className={css(BadgeStyles.container)}>
      <div
        style={{
          position: "relative",
          borderRadius: size / 2,
          width: size,
          height: size,
          overflow: "hidden",
          backgroundColor,
        }}
      >
        <SVG
          localSVG={{
            SVG: props.icon.SVG,
            size: { width: size, height: size },
          }}
        />
      </div>
    </div>
  )
}
