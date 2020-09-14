import { FontTheme } from "../../type-defs"

export const _WEB_FONT_THEME: FontTheme = {
  identifier: "web",
  displayName: "Web",
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
      fontSize: 54,
      lineHeight: 64,
      fontWeight: "900",
    },
    headline2: {
      fontFamily: "Lato",
      fontSize: 36,
      lineHeight: 48,
      fontWeight: "900",
    },
    headline3: {
      fontFamily: "Lato",
      fontSize: 24,
      lineHeight: 32,
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
