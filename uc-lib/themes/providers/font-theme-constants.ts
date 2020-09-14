import { FontTheme } from "../type-defs"
import { _MOBILE_FONT_THEME, _WEB_FONT_THEME } from "../configs/fonts"

export const DefaultFontTheme = _MOBILE_FONT_THEME

const hardCodedFontThemes = [_MOBILE_FONT_THEME, _WEB_FONT_THEME]

export const fontThemes: { [key: string]: FontTheme } = {}
hardCodedFontThemes.forEach(theme => {
  fontThemes[theme.identifier] = theme
})
