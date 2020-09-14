import { DefaultColorTheme } from "../color-theme-constants"
import { colorThemeForThemeId } from "../color-theme-context-provider"
import { _LIGHT_MODE_COLOR_THEME, _DARK_MODE_COLOR_THEME } from "../../configs/colors"

describe("useColorTheme returns correct values", () => {
  test("colorThemeForThemeId returns light mode design-theme", () => {
    expect(colorThemeForThemeId("light_mode")).toStrictEqual(_LIGHT_MODE_COLOR_THEME)
  })
  test("colorThemeForThemeId returns dark mode design-theme", () => {
    expect(colorThemeForThemeId("dark_mode")).toStrictEqual(_DARK_MODE_COLOR_THEME)
  })
  test("colorThemeForThemeId returns default design-theme", () => {
    expect(colorThemeForThemeId("bananas")).toStrictEqual(DefaultColorTheme)
  })
})
