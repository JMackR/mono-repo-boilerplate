import React from "react"
import { StyleSheet, css } from "aphrodite/no-important"
import { SVG } from "uc-lib/controls/image"
import { Margin, Overlay } from "uc-lib/controls/layout"
import { useFontForTextType, useColor } from "uc-lib/themes"
import { covertFontToWebStyleSheet } from "uc-lib/themes/utility/font-conversions"
import { ExtendedLoginButtonProps } from "./login-button.props"
import { ActivityIndicator } from "../activity-indicator"

const TEXT_MARGIN = 2.5
const ICON_DIMENSION = 38
const ICON_MARGIN = 0.5

/*
  The default behavior is no border, a 38x38px icon with no background, light background, dark text, and granite press text.
*/
export const LoginButton = (props: ExtendedLoginButtonProps) => {
  const { buttonText, onClick, isFullWidth, loading, style, icon, showBorder } = props

  const colors = useColor().colors
  const mainBackgroundColor = style.mainBackgroundColor || colors.crystal
  const pressedColor = style.pressedColor || colors.crystalPressed
  const hoverColor = style.hoverColor || colors.crystalHover
  const STYLES = StyleSheet.create({
    fullWidth: {
      width: "100%",
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4px",
      borderWidth: 1,
      padding: 0,
      ":hover": {
        cursor: "pointer",
        backgroundColor: hoverColor,
      },
      ":active": {
        backgroundColor: pressedColor,
      },
    },
    mainContainer: {
      flexDirection: "row",
      backgroundColor: mainBackgroundColor,
      borderColor: style.borderColor,
      borderWidth: style.borderColor === undefined ? 0 : 1,
    },
    iconContainer: {
      width: style.iconSize || ICON_DIMENSION,
      height: style.iconSize || ICON_DIMENSION,
      backgroundColor: style.iconBackgroundColor,
    },
    hideBorder: {
      borderWidth: 0,
    },
    icon: {
      verticalAlign: "middle",
    },
    text: {
      color: style.textColor || colors.alwaysDark,
      verticalAlign: "middle",
      display: "inline-block",
    },
  })

  const font = useFontForTextType("primaryBody1")
  const fontStyles = covertFontToWebStyleSheet(font)
  const textStyles: object[] = [fontStyles.text, STYLES.text]
  const containerStyles: object[] = [STYLES.mainContainer, STYLES.container]
  const iconStyles: object[] = [STYLES.iconContainer, STYLES.container]
  if (isFullWidth) {
    containerStyles.push(STYLES.fullWidth)
  }
  if (!showBorder) {
    containerStyles.push(STYLES.hideBorder)
  }

  return (
    <button className={css(containerStyles)} onClick={onClick}>
      {(!loading && (
        <>
          <Overlay insetLeftStep={ICON_MARGIN}>
            <div className={css(iconStyles)}>
              <SVG localSVG={icon} tint={style.iconTint || "brand"} />
            </div>
          </Overlay>
          <Margin marginStep={TEXT_MARGIN}>
            <div className={css(textStyles)}>{buttonText}</div>
          </Margin>
        </>
      )) || <ActivityIndicator />}
    </button>
  )
}
