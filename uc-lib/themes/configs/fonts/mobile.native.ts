import { FontTheme, FontWeight, FontStyle } from "../../type-defs"
import { Platform } from "react-native"

const font900 = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: "Mulish-Bold",
    fontWeight: Platform.select<FontWeight>({
      ios: "900",
      android: "normal",
    }),
  }
}

const fontBold = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: "Mulish-Bold",
    fontWeight: Platform.select<FontWeight>({
      ios: "bold",
      android: "normal",
    }),
  }
}

const fontRegular = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: "Mulish-Regular",
    fontWeight: "normal",
  }
}

export const _MOBILE_FONT_THEME: FontTheme = {
  identifier: "standard",
  displayName: "Standard",
  baseMargin: 4,
  baseBorder: {
    cornerRadius: { small: 4, large: 8 },
    lineWeight: { light: 1, heavy: 4 },
  },
  fonts: {
    price: font900({
      fontSize: 40,
      lineHeight: 48,
    }),
    headline1: fontBold({
      fontSize: 26,
      lineHeight: 32,
    }),
    headline2: font900({
      fontSize: 24,
      lineHeight: 28,
    }),
    headline3: font900({
      fontSize: 20,
      lineHeight: 24,
    }),
    headline4: fontRegular({
      fontSize: 24,
      lineHeight: 21,
    }),
    primaryBody1: fontBold({
      fontSize: 16,
      lineHeight: 20,
    }),
    primaryBody2: fontRegular({
      fontSize: 16,
      lineHeight: 20,
    }),
    secondaryBody1: fontBold({
      fontSize: 14,
      lineHeight: 20,
    }),
    secondaryBody2: fontRegular({
      fontSize: 14,
      lineHeight: 21,
    }),
    tertiaryBody1: fontBold({
      fontSize: 12,
      lineHeight: 14,
    }),
    tertiaryBody2: fontRegular({
      fontSize: 12,
      lineHeight: 22,
    }),
    smallBody1: fontBold({
      fontSize: 10,
      lineHeight: 22,
    }),
    smallBody2: fontRegular({
      fontSize: 10,
      lineHeight: 22,
    }),
  },
}
