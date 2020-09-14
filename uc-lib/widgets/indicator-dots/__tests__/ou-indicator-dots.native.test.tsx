import React from "react"
import { render } from "react-native-testing-library"
import { useColor } from "uc-lib"
import { _LIGHT_MODE_COLOR_THEME as TEST_THEME } from "uc-lib/themes/configs/colors"
import { IndicatorDots } from "../indicator-dots.native"

jest.mock("uc-lib/themes/hooks/use-color")
useColor.mockReturnValue(TEST_THEME)

test("renders one dot with selection", () => {
  const tree = render(<IndicatorDots count={1} selectedIndex={0} />)
  expect(tree).toMatchSnapshot()
})

test("renders three dots with selection", () => {
  const tree = render(<IndicatorDots count={3} selectedIndex={1} />)
  expect(tree).toMatchSnapshot()
})
