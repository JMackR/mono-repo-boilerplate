import { useFontTheme } from "../providers"

export const useBorder = () => {
  const fontTheme = useFontTheme()
  return {
    baseBorder: fontTheme.baseBorder,
  }
}
