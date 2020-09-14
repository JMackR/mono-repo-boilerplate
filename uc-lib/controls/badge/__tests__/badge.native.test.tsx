import React from "react"
import { render } from "react-native-testing-library"
import { BadgeProps } from "../badge-props"
import { Badge } from "../badge"
import { useColor, useFont } from "uc-lib"
import { _LIGHT_MODE_COLOR_THEME as TEST_THEME } from "uc-lib/themes/configs/colors"
import { _MOBILE_FONT_THEME as TEST_FONTS } from "uc-lib/themes/configs/fonts"

const renderWithProperties = (props: BadgeProps) => {
  return render(<Badge amount={props.amount} top={props.top} start={props.start} />)
}

jest.mock("uc-lib/themes/hooks/use-color")
useColor.mockReturnValue(TEST_THEME)

jest.mock("uc-lib/themes/hooks/use-font")
useFont.mockReturnValue(TEST_FONTS)

test("does not render for amount = zero", () => {
  const tree = renderWithProperties({ amount: 0 })
  expect(tree.queryByText("0")).toBeFalsy()
})

test("renders 1 for amount = 1", () => {
  const tree = renderWithProperties({ amount: 1 })
  expect(tree.queryByText("1")).toBeTruthy()
})

test("renders 10 for amount = 10", () => {
  const tree = renderWithProperties({ amount: 10 })
  expect(tree.queryByText("10")).toBeTruthy()
})

test("renders 99 for amount = 99", () => {
  const tree = renderWithProperties({ amount: 99 })
  expect(tree.queryByText("99")).toBeTruthy()
})

test("renders 99+ for amount = 100", () => {
  const tree = renderWithProperties({ amount: 100 })
  expect(tree.queryByText("99+")).toBeTruthy()
})
