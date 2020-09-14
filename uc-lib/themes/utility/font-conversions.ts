import { FontStyle } from "../type-defs"

import { StyleSheet, CSSPropertiesComplete } from "aphrodite/no-important"
/**
 * Converts the FontStyle to an aphrodite StyleSheet object
 * @param font
 */
export const covertFontToWebStyleSheet = (
  font: FontStyle,
  color?: string,
  display: CSSPropertiesComplete["display"] = "inline",
) => {
  const fontStyles = StyleSheet.create({
    text: {
      color,
      fontSize: font.fontSize,
      fontWeight: convertFontWeight(font.fontWeight),
      fontFamily: font.fontFamily + ", sans-serif",
      display,
    },
  })
  return fontStyles
}

/**
 * Convert a font weight for use with aphrodite for web
 * @param weight
 */
// tslint:disable: no-magic-numbers
export const convertFontWeight = (
  weight: string,
):
  | "initial"
  | "inherit"
  | "unset"
  | "normal"
  | "bold"
  | "bolder"
  | "lighter"
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | undefined => {
  switch (weight) {
    case "100":
      return 100
    case "200":
      return 200
    case "300":
      return 300
    case "400":
      return 400
    case "500":
      return 500
    case "600":
      return 600
    case "700":
      return 700
    case "800":
      return 800
    case "900":
      return 900
    case "initial":
      return "initial"
    case "inherit":
      return "inherit"
    case "unset":
      return "unset"
    case "normal":
      return "normal"
    case "bold":
      return "bold"
    case "bolder":
      return "bolder"
    case "lighter":
      return "lighter"
    default:
      return undefined
  }
}

/**
 * Converts an FontTheme line height for use with web.
 * @param lineHeight line height from an FontTheme.
 */
export const convertLineHeightToPx = (lineHeight: number): string => {
  return lineHeight + "px"
}
