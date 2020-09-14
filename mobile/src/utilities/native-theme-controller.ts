import { useEffect } from "react"
import { NativeModules } from "react-native"
import { useTheme } from "uc-lib/themes/hooks"

export const nativeThemeChange = (colorTheme: string) => {
  let themeStyle: "light" | "dark" | "system"

  switch (colorTheme) {
    case "light_mode":
      themeStyle = "light"
      break
    case "dark_mode":
      themeStyle = "dark"
      break
    default:
      themeStyle = "system"
  }
  NativeModules.ColorThemeOverride.updateDeviceTheme(themeStyle)
}

export const useNativeThemeChangeOnce = () => {
  const { colorThemeId } = useTheme()

  useEffect(() => {
    nativeThemeChange(colorThemeId)
  }, [])
}
