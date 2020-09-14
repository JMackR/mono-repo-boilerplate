import { useColorTheme } from "../../providers"
import { useColor, useColorForTextColor, useColorForBackgroundColor } from "../use-color"

const MockColorTheme = {
  shade: "hype",
  colors: {
    testColor1: "#121212",
    testColor2: "#FFFFFF",
  },
  fontColors: {
    thisTextColorExists: "testColor1",
    thisTextColorDoesNotExist: "notAColor1",
  },
  backgroundColors: {
    thisBGColorExists: "testColor2",
    thisBGColorDoesNotExist: "notAColor2",
  },
}

jest.mock("uc-lib/themes/providers/color-design-theme-context-provider")
useColorTheme.mockReturnValue(MockColorTheme)

describe("useColor hook returns correct values", () => {
  test('useColor returns "shade"', () => {
    expect(useColor().shade).toStrictEqual(MockColorTheme.shade)
  })
  test('useColor returns "colors"', () => {
    expect(useColor().colors).toStrictEqual(MockColorTheme.colors)
  })
})

describe("useColorForTextColor returns correct values", () => {
  test("useColorForTextColor returns hex for text color", () => {
    expect(useColorForTextColor("thisTextColorExists")).toStrictEqual(MockColorTheme.colors.testColor1)
  })
  test("useColorForTextColor returns undefined for text color that doesn't map to color palette", () => {
    expect(useColorForTextColor("thisTextColorDoesNotExist")).toBeUndefined()
  })
  test("useColorForTextColor returns undefined for text color that doesn't exist", () => {
    expect(useColorForTextColor("garbageValue1")).toBeUndefined()
  })
})

describe("useColorForBackgroundColor returns correct values", () => {
  test("useColorForBackgroundColor returns hex for text color", () => {
    expect(useColorForBackgroundColor("thisBGColorExists")).toStrictEqual(MockColorTheme.colors.testColor2)
  })
  test("useColorForBackgroundColor returns undefined for text color that doesn't map to color palette", () => {
    expect(useColorForBackgroundColor("thisBGColorDoesNotExist")).toBeUndefined()
  })
  test("useColorForBackgroundColor returns undefined for text color that doesn't exist", () => {
    expect(useColorForBackgroundColor("garbageValue2")).toBeUndefined()
  })
})
