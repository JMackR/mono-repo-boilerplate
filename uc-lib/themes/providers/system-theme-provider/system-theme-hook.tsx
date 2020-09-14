import { useEffect, useState } from "react"
import { reset } from "aphrodite"
import {
  SystemColorTheme,
  SystemThemeHook,
  colorThemeIdFromSystemColorTheme,
  SystemFontTheme,
  fontThemeIdFromSystemFontTheme,
} from "./system-theme-common"
import { Media, MediaName } from "../../../utilities/media-query"

const DARK_MODE_QUERY = "(prefers-color-scheme: dark)"

const getCurrentSystemColorTheme = (): SystemColorTheme => {
  if (window.matchMedia && window.matchMedia(DARK_MODE_QUERY).matches) {
    return SystemColorTheme.Dark
  } else {
    return SystemColorTheme.Light
  }
}

const getCurrentSystemFontTheme = (): SystemFontTheme => {
  if (window.matchMedia && window.matchMedia(Media[MediaName.Desktop]).matches) {
    return SystemFontTheme.Desktop
  } else {
    return SystemFontTheme.Mobile
  }
}

export const useSystemTheme: SystemThemeHook = () => {
  const [systemColorTheme, setSystemColorTheme] = useState<SystemColorTheme | null>(null)
  const [systemFontTheme, setSystemFontTheme] = useState<SystemFontTheme | null>(null)

  useEffect(() => {
    setSystemColorTheme(getCurrentSystemColorTheme())

    if (window.matchMedia) {
      const mql = window.matchMedia(DARK_MODE_QUERY)
      // This is deprecated but Safari doesn't support the new `addEventListener` method.
      mql.addListener(() => {
        setSystemColorTheme(getCurrentSystemColorTheme())
      })
    }
  }, [])

  const systemDrivenColorThemeId = colorThemeIdFromSystemColorTheme(systemColorTheme || SystemColorTheme.Light)

  useEffect(() => {
    setSystemFontTheme(getCurrentSystemFontTheme())

    if (window.matchMedia) {
      const mql = window.matchMedia(Media[MediaName.Desktop])
      // This is deprecated but Safari doesn't support the new `addEventListener` method.
      mql.addListener(() => {
        setSystemFontTheme(getCurrentSystemFontTheme())
      })
    }
  }, [])

  const systemDrivenFontThemeId = fontThemeIdFromSystemFontTheme(systemFontTheme || SystemFontTheme.Mobile)

  return {
    systemColorTheme,
    systemDrivenColorThemeId,
    systemFontTheme,
    systemDrivenFontThemeId,
  }
}

export const resetCSSCache = () => {
  reset()
}
