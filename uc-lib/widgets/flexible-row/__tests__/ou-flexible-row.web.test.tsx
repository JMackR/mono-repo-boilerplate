import { StyleSheetTestUtils } from "aphrodite/no-important"
import { createSerializer } from "jest-aphrodite-react/no-important"
import { FlexibleRow, HeartLine } from "uc-lib"
import React from "react"
import * as renderer from "react-test-renderer"

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

describe("FlexibleRow Snapshot Tests", () => {
  test("render with text", () => {
    const tree = renderer.create(<FlexibleRow mainContent="Text" />)
    expect(tree).toMatchSnapshot()
  })
  test("render with text and no margins", () => {
    const tree = renderer.create(<FlexibleRow mainContent="Text" doNotApplyHorizontalPadding />)
    expect(tree).toMatchSnapshot()
  })
  test("render with text and click", () => {
    const tree = renderer.create(<FlexibleRow mainContent="Text" clickAction={() => {}} />)
    expect(tree).toMatchSnapshot()
  })
  test("render with two rows and help on first row and switch", () => {
    const tree = renderer.create(
      <FlexibleRow
        mainContent={{ mainText: "Text" }}
        subContent="Text"
        rightAction={{
          type: "switch",
          props: { state: false, onChange: () => {} },
        }}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
  test("render with two rows, hidden arrow, click action, right icon, and right notification", () => {
    const tree = renderer.create(
      <FlexibleRow
        mainContent={[{ mainText: "Text" }]}
        rightArrowHidden={true}
        clickAction={() => {}}
        rightIcon={HeartLine}
        rightNotification="1 pending shipment"
      />,
    )
    expect(tree).toMatchSnapshot()
  })
  test("Render with mainText, subtext, and clickable subtext", () => {
    const tree = renderer.create(
      <FlexibleRow
        mainContent={[{ mainText: "Text" }]}
        subContent={{
          subText: "SubText",
          clickableSubText: "clickable subtext",
          clickableSubTextClickAction: () => {},
        }}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
  test("Render with mainText and clickable subtext only", () => {
    const tree = renderer.create(
      <FlexibleRow
        mainContent={[{ mainText: "Text" }]}
        subContent={{
          clickableSubText: "clickable subtext",
          clickableSubTextClickAction: () => {},
        }}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
  test("render with linktext action", () => {
    const tree = renderer.create(
      <FlexibleRow
        mainContent="Text"
        rightAction={{ type: "brandtext", props: "Edit" }}
        clickAction={() => {}}
        rightArrowHidden={true}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
})
