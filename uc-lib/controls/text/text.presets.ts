import { Platform, TextStyle } from "react-native"
import { color, fontFamily, typography, weight } from "../../design-theme"
import { moderateScale as ms } from "../../utils/scaling"
/**
 * All the variations of text styling within the app
 * Do NOT define custom styles in preview-components, consolidate here
 * If styles are not found here, confirm with design team and sign off a new font in style guide
 */

export const presets = {
  /** Default (DO NOT USE) font size, highlighted color to warn you */
  default: {
    fontFamily: fontFamily(typography.primary, weight.bold),
    fontSize: ms(16),
    color: color.developer,
  } as TextStyle,
  /** Style guide presets */
  titleXL: {
    fontFamily: fontFamily(typography.primary, weight.bold),
    fontSize: ms(32),
    lineHeight: Platform.select({ ios: 48, android: 55 }),
  } as TextStyle,
  title1: {
    fontFamily: fontFamily(typography.brand, weight.bold),
    fontSize: ms(16),
  } as TextStyle,
  title2: {
    fontFamily: fontFamily(typography.primary, weight.regular),
    fontSize: ms(24),
    lineHeight: Platform.select({ ios: 36, android: 40.7 }),
  } as TextStyle,
  subheader: {
    fontFamily: fontFamily(typography.primary, weight.bold),
    fontSize: ms(14),
    letterSpacing: 0.16,
  } as TextStyle,
  subheader2: {
    fontFamily: fontFamily(typography.primary, weight.bold),
    fontSize: ms(16),
    letterSpacing: 0.15,
    textDecorationLine: "underline",
    textDecorationColor: "#7CE2CB",
    lineHeight: Platform.select({ ios: 25, android: 25 }),
  } as TextStyle,
  button: {
    fontFamily: fontFamily(typography.primary, weight.semibold),
    fontSize: ms(16),
    letterSpacing: 0.16,
  } as TextStyle,
  buttonUtility: {
    fontFamily: fontFamily(typography.primary, weight.semibold),
    fontSize: ms(16),
    letterSpacing: 0.17,
    textTransform: "lowercase",
  } as TextStyle,
  body1: {
    fontFamily: fontFamily(typography.primary, weight.light),
    fontSize: ms(16),
    letterSpacing: 0.13,
    lineHeight: Platform.select({ ios: 25, android: 25 }),
  } as TextStyle,
  body2: {
    fontFamily: fontFamily(typography.primary, weight.light),
    fontSize: ms(12),
    letterSpacing: 0.15,
    lineHeight: Platform.select({ ios: 24, android: 24 }),
  } as TextStyle,
  body3: {
    fontFamily: fontFamily(typography.primary, weight.medium),
    fontSize: ms(12),
    letterSpacing: 0.13,
    lineHeight: Platform.select({ ios: 23, android: 24 }),
  } as TextStyle,
  body4: {
    fontFamily: fontFamily(typography.primary, weight.bold),
    fontSize: ms(14),
    letterSpacing: 0.13,
    lineHeight: Platform.select({ ios: 25, android: 25 }),
  } as TextStyle,
  caption: {
    fontFamily: fontFamily(typography.primary, weight.light),
    fontSize: ms(10),
    letterSpacing: 0.13,
    lineHeight: Platform.select({ ios: 21, android: 24 }),
  } as TextStyle,
  timestamp: {
    fontFamily: fontFamily(typography.primary, weight.bold),
    fontSize: ms(10),
    letterSpacing: Platform.select({ ios: 0.4 }),
    textTransform: "uppercase",
  } as TextStyle,
  message: {
    fontFamily: fontFamily(typography.primary, weight.medium),
    fontSize: ms(16),
    letterSpacing: 0.17,
    lineHeight: Platform.select({ android: 19.8 }),
  } as TextStyle,
  brand1: {
    fontFamily: fontFamily(typography.brand, weight.boldItalic),
    textTransform: "uppercase",
    fontSize: ms(16),
  } as TextStyle,
  link1: {
    fontFamily: fontFamily(typography.primary, weight.bold),
    fontSize: ms(16),
    letterSpacing: Platform.select({ ios: 0.65, android: 0.4 }),
    textTransform: "uppercase",
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresetNames = keyof typeof presets
