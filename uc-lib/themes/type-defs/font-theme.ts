export interface FontTheme {
  identifier: string
  displayName: string
  baseMargin: number
  fonts: TextTypes
  baseBorder: {
    cornerRadius: { small: number; large: number }
    lineWeight: { light: number; heavy: number }
  }
}

export interface TextTypes {
  price: FontStyle
  headline1: FontStyle
  headline2: FontStyle
  headline3: FontStyle
  headline4: FontStyle
  primaryBody1: FontStyle
  primaryBody2: FontStyle
  secondaryBody1: FontStyle
  secondaryBody2: FontStyle
  tertiaryBody1: FontStyle
  tertiaryBody2: FontStyle
  smallBody1: FontStyle
  smallBody2: FontStyle
}

export type FontWeight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"

export interface FontStyle {
  fontFamily: string
  fontSize: number
  lineHeight: number
  fontWeight: FontWeight
}
