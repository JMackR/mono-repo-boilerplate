export interface ColorTheme {
  identifier: string
  displayName: string
  shade: ThemeShade
  colors: Colors
  fontColors: TextColors
  backgroundColors: BackgroundColors
}

export type ThemeShade = "light" | "dark"

export interface Colors {
  // Colors
  blurple: string
  grey: string
  black: string
  green: string
  greenHover: string
  greenPressed: string
  greenHighlight: string
  larchYellow: string
  larchYellowHover: string
  larchYellowPressed: string
  glacialBlue: string
  paintbrushRed: string

  // Grayscale

  obsidian: string
  basalt: string
  granite: string
  limestone: string
  limestoneHover: string
  limestonePressed: string
  quartz: string
  crystal: string
  crystalHover: string
  crystalPressed: string

  // Special
  clear: string
  disabled: string
  alwaysDark: string
  alwaysLight: string
  overlay: string
}

export interface TextColors {
  primary: keyof Colors
  primaryAlt: keyof Colors
  secondary: keyof Colors
  hint: keyof Colors
  brand: keyof Colors
  error: keyof Colors
  alwaysLight: keyof Colors
  alwaysDark: keyof Colors
}

export interface BackgroundColors {
  transparent: keyof Colors
  primary: keyof Colors
  secondary: keyof Colors
  tertiary: keyof Colors
  overlay: keyof Colors
  alwaysLight: keyof Colors
  alwaysDark: keyof Colors
  error: keyof Colors
  highlight: keyof Colors
  brand: keyof Colors
  unread: keyof Colors
  trust: keyof Colors
}
