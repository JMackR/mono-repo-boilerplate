import React from "react"
import { useTheme } from "../use-theme"
import { ColorThemeContext, FontThemeContext } from "../../providers"
import { StorageController } from "shared-lib/utilities/storage"
jest.mock("shared-lib/utilities/storage")

const MockedColorContext = {
  colorThemeId: "123",
  setColorThemeId: jest.fn(),
}
const MockedFontContext = {
  fontThemeId: "456",
  setFontThemeId: (themeId: string) => {},
}

describe("useTheme returns useContext values for colors and fonts", () => {
  let realUseContext: any
  const mock_StorageController_setItem = jest.fn()

  beforeEach(() => {
    realUseContext = React.useContext
    React.useContext = jest.fn().mockImplementation((arg: React.Context<any>) => {
      if (arg === ColorThemeContext) {
        return MockedColorContext
      } else if (arg === FontThemeContext) {
        return MockedFontContext
      } else {
        return null
      }
    })

    StorageController.mockImplementation(() => {
      return {
        setItem: mock_StorageController_setItem,
      }
    })
  })

  // Cleanup mock
  afterEach(() => {
    React.useContext = realUseContext
  })

  test("useTheme returns colorThemeId", () => {
    expect(useTheme().colorThemeId).toStrictEqual(MockedColorContext.colorThemeId)
  })

  test("useTheme returns setColorThemeId", () => {
    useTheme().setColorThemeId("test_value")
    expect(MockedColorContext.setColorThemeId).toBeCalledWith("test_value")
  })

  test("useTheme returns fontThemeId", () => {
    expect(useTheme().fontThemeId).toStrictEqual(MockedFontContext.fontThemeId)
  })

  test("useTheme returns setFontThemeId", () => {
    expect(useTheme().setFontThemeId).toStrictEqual(MockedFontContext.setFontThemeId)
  })
})
