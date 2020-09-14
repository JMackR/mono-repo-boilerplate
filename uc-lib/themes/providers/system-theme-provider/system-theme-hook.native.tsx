import { useColorScheme } from "react-native-appearance"
import {
  SystemColorTheme,
  SystemThemeHook,
  colorThemeIdFromSystemColorTheme,
  SystemFontTheme,
  fontThemeIdFromSystemFontTheme,
} from "./system-theme-common"

export const useSystemTheme: SystemThemeHook = () => {
  const colorScheme = useColorScheme()

  const systemColorTheme = colorScheme === "dark" ? SystemColorTheme.Dark : SystemColorTheme.Light
  const systemDrivenColorThemeId = colorThemeIdFromSystemColorTheme(systemColorTheme)

  const systemFontTheme = SystemFontTheme.Mobile
  const systemDrivenFontThemeId = fontThemeIdFromSystemFontTheme(systemFontTheme)

  return {
    systemColorTheme,
    systemDrivenColorThemeId,
    systemFontTheme,
    systemDrivenFontThemeId,
  }
}

export const resetCSSCache = () => {
  /* Intentionally do nothing, resetting css cache is a web requirement */
}
