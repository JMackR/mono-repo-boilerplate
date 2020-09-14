import { fontThemeForThemeId } from "../font-theme-context-provider"
import { _MOBILE_FONT_THEME, _WEB_FONT_THEME } from "../../configs/fonts"
import { DefaultFontTheme } from "../font-theme-constants"

describe("useColorTheme returns correct values", () => {
  test("fontThemeForThemeId returns mobile font design-theme", () => {
    expect(fontThemeForThemeId("standard")).toStrictEqual(_MOBILE_FONT_THEME)
  })
  test("fontThemeForThemeId returns web font design-theme", () => {
    expect(fontThemeForThemeId("web")).toStrictEqual(_WEB_FONT_THEME)
  })
  test("fontThemeForThemeId returns default design-theme", () => {
    expect(fontThemeForThemeId("bananas")).toStrictEqual(DefaultFontTheme)
  })
})
