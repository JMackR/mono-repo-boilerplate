import React from "react"
import * as renderer from "react-test-renderer"
import { ThemeProvider } from "../theme-provider"
import { useTheme } from "../../hooks"
import * as UseColorThemeLoading from "../use-color-theme-loading"
import { _LIGHT_MODE_COLOR_THEME } from "../../configs"

describe("ThemeProvider Snapshot Tests", () => {
  let mockUseThemeLoading: any
  beforeEach(() => {
    const testResponse = {
      hasLoadedTheme: true,
      colorThemeId: _LIGHT_MODE_COLOR_THEME.identifier,
      setColorThemeId: () => {},
      isUsingSystemProvidedTheme: true,
    }
    mockUseThemeLoading = jest.spyOn(UseColorThemeLoading, "useColorThemeLoading").mockImplementation(() => testResponse)
  })

  afterEach(() => {
    mockUseThemeLoading.mockRestore()
  })

  test("ThemeProvider renders properly", () => {
    const ThemeReporter = () => {
      const { colorThemeId, fontThemeId } = useTheme()
      return <p>{colorThemeId + " " + fontThemeId}</p>
    }
    const tree = renderer.create(
      <ThemeProvider>
        <ThemeReporter />
      </ThemeProvider>,
    )
    expect(tree).toMatchSnapshot()
  })
})
