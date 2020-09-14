import { useFontTheme } from "../providers"
import { TextTypes } from "../type-defs"

export const useFont = () => {
  const fontTheme = useFontTheme()
  return { fonts: fontTheme.fonts }
}

export const useFontForTextType = (textType: keyof TextTypes) => {
  const fontTheme = useFontTheme()
  return fontTheme.fonts[textType]
}
