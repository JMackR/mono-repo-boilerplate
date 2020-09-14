import { ColorTheme } from "../type-defs"
import { _LIGHT_MODE_COLOR_THEME, _DARK_MODE_COLOR_THEME } from "../configs/colors"

export const DefaultColorTheme = _LIGHT_MODE_COLOR_THEME

const hardCodedColorThemes = [_LIGHT_MODE_COLOR_THEME, _DARK_MODE_COLOR_THEME]

export const colorThemes: { [key: string]: ColorTheme } = {}
hardCodedColorThemes.forEach(theme => {
  colorThemes[theme.identifier] = theme
})
