import React, { useContext } from "react"
import { ThemeProviderProps } from "./theme-provider.props"
import { useColorThemeLoading } from "./use-color-theme-loading"
import { DefaultColorTheme, colorThemes } from "./color-theme-constants"
import { ColorTheme } from "../type-defs/color-theme"

export const useColorTheme = () => {
  const { currentColorTheme } = useContext(ColorThemeContext)
  return currentColorTheme
}

export const colorThemeForThemeId = (colorThemeId: string) => {
  let colorTheme = colorThemes[colorThemeId]
  if (!colorTheme) {
    colorTheme = DefaultColorTheme
  }
  return colorTheme
}

export interface ColorThemeContextProps {
  currentColorTheme: ColorTheme
  colorThemeId: string
  setColorThemeId: (themeId: string) => void
  isUsingSystemProvidedTheme: boolean
}

export const ColorThemeContext = React.createContext<ColorThemeContextProps>({
  currentColorTheme: DefaultColorTheme,
  colorThemeId: DefaultColorTheme.identifier,
  setColorThemeId: (_themeId: string) => {},
  isUsingSystemProvidedTheme: true,
})

export const ColorThemeContextProvider = (props: ThemeProviderProps) => {
  const { children } = props
  const { hasLoadedTheme, colorThemeId, setColorThemeId, isUsingSystemProvidedTheme } = useColorThemeLoading()

  if (!hasLoadedTheme) {
    return <></>
  }

  const providerValue: ColorThemeContextProps = {
    currentColorTheme: colorThemeForThemeId(colorThemeId),
    colorThemeId,
    setColorThemeId,
    isUsingSystemProvidedTheme,
  }

  return <ColorThemeContext.Provider value={providerValue}>{children}</ColorThemeContext.Provider>
}
