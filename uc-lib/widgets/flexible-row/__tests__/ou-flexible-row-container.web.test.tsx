import { StyleSheetTestUtils } from "aphrodite/no-important"
import { createSerializer } from "jest-aphrodite-react/no-important"
import { FlexibleRow, FlexibleRowContainer } from "uc-lib"
import React from "react"
import * as renderer from "react-test-renderer"

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

describe("FlexibleRow Snapshot Tests", () => {
  test("Render", () => {
    const tree = renderer.create(
      <FlexibleRowContainer>
        <FlexibleRow mainContent="Text" clickAction={() => {}} />
      </FlexibleRowContainer>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("Render with extended margins", () => {
    const tree = renderer.create(
      <FlexibleRowContainer extendMargin={true}>
        <FlexibleRow mainContent="Text" clickAction={() => {}} />
      </FlexibleRowContainer>,
    )
    expect(tree).toMatchSnapshot()
  })
})
