import { useState, useEffect } from "react"
import { useSystemTheme } from "./system-theme-provider/system-theme-hook"
import { DefaultColorTheme, colorThemes } from "./color-theme-constants"
import { StorageController, PREFERRED_COLOR_THEME_STORAGE_KEY } from "shared-lib/utilities/storage"
import { _MATCH_SYSTEM_COLOR_THEME_ID } from "./system-theme-provider/system-theme-common"

export const useColorThemeLoading = () => {
  const { systemColorTheme, systemDrivenColorThemeId } = useSystemTheme()
  const [userPreferredColorThemeId, setUserPreferredColorThemeId] = useState<string | null>(null)
  const [isUsingSystemProvidedTheme, setIsUsingSystemProvidedTheme] = useState(true)
  const [colorThemeId, setColorThemeId] = useState(DefaultColorTheme.identifier)
  const [hasLoadedTheme, setHasLoadedTheme] = useState(false)

  const storageController = StorageController<string>(PREFERRED_COLOR_THEME_STORAGE_KEY)

  const updateColorTheme = (newColorThemeId: string) => {
    storageController.setItem(newColorThemeId)
    setUserPreferredColorThemeId(newColorThemeId)

    if (colorThemes[newColorThemeId]) {
      setColorThemeId(newColorThemeId)
      setIsUsingSystemProvidedTheme(false)
    } else {
      setColorThemeId(systemDrivenColorThemeId)
      setIsUsingSystemProvidedTheme(true)
    }
  }

  const loadPreferredColorThemeFromDiskOnLaunch = () => {
    storageController
      .getItem()
      .then(preferredTheme => {
        if (preferredTheme && colorThemes[preferredTheme]) {
          setUserPreferredColorThemeId(preferredTheme)
        } else {
          setUserPreferredColorThemeId(_MATCH_SYSTEM_COLOR_THEME_ID)
        }
      })
      .catch(() => {})
  }
  useEffect(loadPreferredColorThemeFromDiskOnLaunch, [])

  useEffect(() => {
    if (systemColorTheme !== null && userPreferredColorThemeId !== null) {
      updateColorTheme(userPreferredColorThemeId)
      setHasLoadedTheme(true)
    }
  }, [systemColorTheme, userPreferredColorThemeId])

  return {
    hasLoadedTheme,
    colorThemeId,
    setColorThemeId: setUserPreferredColorThemeId,
    isUsingSystemProvidedTheme,
  }
}
