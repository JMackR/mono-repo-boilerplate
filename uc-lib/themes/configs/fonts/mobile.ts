import { FontTheme } from "../../type-defs"

export const _MOBILE_FONT_THEME: FontTheme = {
  identifier: "standard",
  displayName: "Standard",
  baseMargin: 4,
  baseBorder: {
    cornerRadius: { small: 4, large: 8 },
    lineWeight: { light: 1, heavy: 4 },
  },
  fonts: {
    price: {
      fontFamily: "Lato",
      fontSize: 40,
      lineHeight: 48,
      fontWeight: "900",
    },
    headline1: {
      fontFamily: "Lato",
      fontSize: 48,
      lineHeight: 54,
      fontWeight: "900",
    },
    headline2: {
      fontFamily: "Lato",
      fontSize: 32,
      lineHeight: 36,
      fontWeight: "900",
    },
    headline3: {
      fontFamily: "Lato",
      fontSize: 20,
      lineHeight: 24,
      fontWeight: "900",
    },
    primaryBody1: {
      fontFamily: "Lato",
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "bold",
    },
    primaryBody2: {
      fontFamily: "Lato",
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "normal",
    },
    secondaryBody1: {
      fontFamily: "Lato",
      fontSize: 14,
      lineHeight: 24,
      fontWeight: "bold",
    },
    secondaryBody2: {
      fontFamily: "Lato",
      fontSize: 14,
      lineHeight: 24,
      fontWeight: "normal",
    },
    tertiaryBody1: {
      fontFamily: "Lato",
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "bold",
    },
    tertiaryBody2: {
      fontFamily: "Lato",
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "normal",
    },
  },
}
