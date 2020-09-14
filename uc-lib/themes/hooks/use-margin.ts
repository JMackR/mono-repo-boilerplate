import { useFontTheme } from "../providers"

export const useMargin = () => {
  const fontTheme = useFontTheme()
  return {
    baseMargin: fontTheme.baseMargin,
  }
}
