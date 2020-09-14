import { useContext } from "react"
import { ColorThemeContext, FontThemeContext } from "../providers"

export const useTheme = () => {
  const { colorThemeId, setColorThemeId, isUsingSystemProvidedTheme } = useContext(ColorThemeContext)
  const { fontThemeId, setFontThemeId } = useContext(FontThemeContext)

  return {
    colorThemeId,
    setColorThemeId,
    fontThemeId,
    setFontThemeId,
    isUsingSystemProvidedTheme,
  }
}
