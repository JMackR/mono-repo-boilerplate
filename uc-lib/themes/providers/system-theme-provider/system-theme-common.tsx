import { _LIGHT_MODE_COLOR_THEME, _DARK_MODE_COLOR_THEME, _MOBILE_FONT_THEME, _WEB_FONT_THEME } from "../../configs"

export type SystemThemeHook = () => {
  systemColorTheme: SystemColorTheme | null
  systemDrivenColorThemeId: string
  systemFontTheme: SystemFontTheme | null
  systemDrivenFontThemeId: string
}

export enum SystemColorTheme {
  Light,
  Dark,
}

export const _MATCH_SYSTEM_COLOR_THEME_ID = "_MATCH_SYSTEM_COLOR_THEME"

export const colorThemeIdFromSystemColorTheme = (systemColorTheme: SystemColorTheme) => {
  if (systemColorTheme === SystemColorTheme.Light) {
    return _LIGHT_MODE_COLOR_THEME.identifier
  } else {
    return _DARK_MODE_COLOR_THEME.identifier
  }
}

export enum SystemFontTheme {
  Mobile,
  Desktop,
}

export const fontThemeIdFromSystemFontTheme = (systemFontTheme: SystemFontTheme) => {
  if (systemFontTheme === SystemFontTheme.Mobile) {
    return _MOBILE_FONT_THEME.identifier
  } else {
    return _WEB_FONT_THEME.identifier
  }
}
