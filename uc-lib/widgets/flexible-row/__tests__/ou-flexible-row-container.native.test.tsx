import { FlexibleRow, FlexibleRowContainer } from "uc-lib"
import React from "react"
import { render } from "react-native-testing-library"

describe("FlexibleRow Snapshot Tests", () => {
  test("Render", () => {
    const tree = render(
      <FlexibleRowContainer>
        <FlexibleRow mainContent="Text" clickAction={() => {}} />
      </FlexibleRowContainer>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("Render with extended margins", () => {
    const tree = render(
      <FlexibleRowContainer extendMargin={true}>
        <FlexibleRow mainContent="Text" clickAction={() => {}} />
      </FlexibleRowContainer>,
    )
    expect(tree).toMatchSnapshot()
  })
})
