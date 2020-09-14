import { useFontTheme } from "../../providers"
import { useFont, useFontForTextType } from "../use-font"

const MockFontTheme = {
  fonts: {
    font1: {
      fontFamily: "hype",
      fontSize: 42,
      lineHeight: 44,
      fontWeight: "300",
    },
  },
}

jest.mock("uc-lib/themes/providers/font-design-theme-context-provider")
useFontTheme.mockReturnValue(MockFontTheme)

describe("useFont hook returns correct values", () => {
  test("useFont returns fonts dictionary", () => {
    expect(useFont().fonts).toStrictEqual(MockFontTheme.fonts)
  })
})

describe("useFontForTextType returns correct values", () => {
  test("useFontForTextType returns font data", () => {
    expect(useFontForTextType("font1")).toStrictEqual(MockFontTheme.fonts.font1)
  })
  test("useFontForTextType returns undefined for font that doesn't exist", () => {
    expect(useFontForTextType("thisFontDoesNotExist")).toBeUndefined()
  })
})
