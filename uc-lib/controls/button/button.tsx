import React, { SyntheticEvent } from "react"
import { StyleSheet, css } from "aphrodite/no-important"
import { useColor, useFont, FontStyle, useColorForTextColor } from "../../themes"
import { convertFontWeight, convertLineHeightToPx } from "../../themes/utility/font-conversions"
import { SVG, LocalSVGSource } from "../image"
import { ButtonPropsWeb } from "./button-props"
import { textColorForCurrentButtonType, isJSXElement, isLocalSVGSource } from "./button-shared"
// import { UCLAnalyticsController } from "shared-lib/analytics/analytics-app"
import { useScreen } from "../../hooks"
import { ActivityIndicator } from "../activity-indicator"

const TRANSPARENT = "#FFFFFF00"

const ICON_SIZE = 20

export const Button = (props: ButtonPropsWeb) => {
  const {
    onClick,
    title,
    subtitle,
    icon,
    buttonType,
    buttonSize,
    testID,
    affectedUserId,
    disabled,
    loading,
    doNotApplySidePadding,
  } = props

  const colors = useColor().colors
  const fonts = useFont().fonts
  const { screenName, screenRoute } = useScreen()

  const textColorName = textColorForCurrentButtonType(buttonType)
  const textColor = useColorForTextColor(textColorName)

  let bgColor
  let bgColorPressed
  let bgColorHover
  let textColorPressed
  let textColorHover
  let borderColor = "#00000000"
  const borderWidth = 1

  switch (buttonType) {
    default:
    case "primary":
      bgColor = colors.blurple
      bgColorPressed = colors.greenPressed
      bgColorHover = colors.greenHover

      textColorPressed = colors.crystalPressed
      textColorHover = colors.crystalHover
      break

    case "secondary":
      bgColor = colors.crystal
      bgColorPressed = colors.crystalPressed
      bgColorHover = colors.crystalHover

      textColorPressed = colors.greenPressed
      textColorHover = colors.greenHover

      borderColor = colors.green
      break

    case "tertiary":
      bgColor = colors.limestone
      bgColorPressed = colors.limestonePressed
      bgColorHover = colors.limestoneHover

      textColorPressed = colors.obsidian
      textColorHover = colors.obsidian
      break

    case "flat":
      bgColor = TRANSPARENT
      bgColorPressed = colors.crystalPressed
      bgColorHover = colors.crystalHover

      textColorPressed = colors.greenPressed
      textColorHover = colors.greenHover
      break

    case "disabled":
      bgColor = colors.disabled
      bgColorPressed = colors.disabled
      bgColorHover = colors.disabled

      textColorPressed = colors.crystal
      textColorHover = colors.crystal

      borderColor = colors.limestone
      break
  }

  let padding
  let fontStyle: FontStyle
  let height

  // set sizes, paddings
  switch (buttonSize) {
    default:
    case "large":
      fontStyle = fonts.primaryBody1
      padding = "10px"
      height = "40px"
      break
    case "small":
      fontStyle = fonts.secondaryBody1
      padding = "36px"
      height = "32px"
      break
  }

  if (doNotApplySidePadding) {
    padding = "0px"
  }

  const styles = StyleSheet.create({
    button: {
      paddingLeft: padding,
      paddingRight: padding,
      height,
      backgroundColor: bgColor,

      borderRadius: 4,
      borderStyle: "solid",
      borderColor,
      borderWidth,
      boxSizing: "border-box",

      textDecoration: "none",
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      lineHeight: convertLineHeightToPx(fontStyle.lineHeight),

      "-webkit-user-select": "none",
      "user-select": "none",

      ":hover": {
        backgroundColor: bgColorHover,
        cursor: "pointer",
        "-webkit-transition": "background-color 100ms linear",
      },
      ":active": {
        backgroundColor: bgColorPressed,
        "-webkit-transition": "background-color 100ms linear",
      },
    },
    iconContainer: {
      paddingRight: 8,
      display: "inline-flex",
      verticalAlign: "middle",
    },
    icon: {
      height: ICON_SIZE,
      width: ICON_SIZE,
    },

    textContainer: {
      display: "inline-flex",
      flexDirection: "column",

      verticalAlign: "middle",
    },
    text: {
      color: textColor,
      flex: 1,
      fontFamily: fontStyle.fontFamily,
      fontSize: fontStyle.fontSize,
      fontWeight: convertFontWeight(fontStyle.fontWeight),
      textAlign: "center",
      ":hover": {
        color: textColorHover,
        "-webkit-transition": "background-color 100ms linear",
      },
      ":active": {
        color: textColorPressed,
        "-webkit-transition": "background-color 100ms linear",
      },
    },
    subtitle: {
      flex: 1,
      color: textColor,
      textAlign: "center",
      display: "inline-block",
      ":hover": {
        color: textColorHover,
        "-webkit-transition": "background-color 100ms linear",
      },
      ":active": {
        color: textColorPressed,
        "-webkit-transition": "background-color 100ms linear",
      },
    },
  })

  const handleOnClick = (e: SyntheticEvent) => {
    if (disabled) {
      return
    }
    // UCLAnalyticsController.trackButtonEvent({
    //   screenName,
    //   screenRoute,
    //   actionType: "Click",
    //   buttonTitle: title,
    //   buttonType,
    //   buttonSize,
    //   testId: testID,
    //   affectedUserId,
    // })
    e.preventDefault()
    onClick && onClick(e)
  }

  const renderLeftIcon = () => {
    let iconJSX
    if (isJSXElement(icon)) {
      iconJSX = icon
    } else if (isLocalSVGSource(icon)) {
      const resizedSVG: LocalSVGSource = {
        SVG: icon.SVG,
        size: {
          width: ICON_SIZE,
          height: ICON_SIZE,
        },
      }
      iconJSX = <SVG localSVG={resizedSVG} tint={textColorName} />
    } else {
      return undefined
    }
    return (
      <div className={css(styles.iconContainer)}>
        <span className={css(styles.icon)}>{iconJSX}</span>
      </div>
    )
  }

  return (
    <div className={css(styles.button)} onClick={handleOnClick}>
      {(loading && <ActivityIndicator size="small" tint={textColorName} />) || (
        <>
          {renderLeftIcon()}
          <div className={css(styles.textContainer)}>
            {title && <span className={css(styles.text)}>{title}</span>}
            {subtitle && <span className={css(styles.subtitle)}>{subtitle}</span>}
          </div>
        </>
      )}
    </div>
  )
}
