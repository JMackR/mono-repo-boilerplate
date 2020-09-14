import React, { useState, useContext } from "react"
import { ThemeProviderProps } from "./theme-provider.props"
import { useSystemTheme, fontThemeIdFromSystemFontTheme, resetCSSCache } from "./system-theme-provider"
import { DefaultFontTheme, fontThemes } from "./font-theme-constants"
import { FontTheme } from "../type-defs"

export const useFontTheme = () => {
  const { currentFontTheme } = useContext(FontThemeContext)
  return currentFontTheme
}

export const fontThemeForThemeId = (fontThemeId: string) => {
  let fontTheme = fontThemes[fontThemeId]
  if (!fontTheme) {
    fontTheme = DefaultFontTheme
  }
  return fontTheme
}

export interface FontThemeContextProps {
  currentFontTheme: FontTheme
  fontThemeId: string
  setFontThemeId: (themeId: string) => void
}

export const FontThemeContext = React.createContext<FontThemeContextProps>({
  currentFontTheme: DefaultFontTheme,
  fontThemeId: DefaultFontTheme.identifier,
  setFontThemeId: (_themeId: string) => {},
})

export const FontThemeContextProvider = (props: ThemeProviderProps) => {
  const { children } = props
  const [fontThemeId, setFontThemeIdInternal] = useState(DefaultFontTheme.identifier)

  const setFontThemeId = (themeId: string) => {
    resetCSSCache()
    setFontThemeIdInternal(themeId)
  }

  const { systemFontTheme } = useSystemTheme()
  React.useEffect(() => {
    if (systemFontTheme === null) {
      return
    }

    const newFontThemeId = fontThemeIdFromSystemFontTheme(systemFontTheme)
    if (fontThemeId !== newFontThemeId) {
      setFontThemeId(newFontThemeId)
    }
  }, [systemFontTheme])

  const providerValue: FontThemeContextProps = {
    currentFontTheme: fontThemeForThemeId(fontThemeId),
    fontThemeId,
    setFontThemeId,
  }

  return <FontThemeContext.Provider value={providerValue}>{children}</FontThemeContext.Provider>
}
