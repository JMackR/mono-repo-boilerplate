import { FlexibleRow, HeartLine } from "uc-lib"
import React from "react"
import { render } from "react-native-testing-library"

describe("FlexibleRow Snapshot Tests", () => {
  test("Render with text", () => {
    const tree = render(<FlexibleRow mainContent="Text" />)
    expect(tree).toMatchSnapshot()
  })
  test("Render with text and no margins", () => {
    const tree = render(<FlexibleRow mainContent="Text" doNotApplyHorizontalPadding />)
    expect(tree).toMatchSnapshot()
  })
  test("Render with text and click", () => {
    const tree = render(<FlexibleRow mainContent="Text" clickAction={() => {}} />)
    expect(tree).toMatchSnapshot()
  })
  test("Render with two rows and help on first row and switch", () => {
    const tree = render(
      <FlexibleRow
        mainContent={{ mainText: "Text" }}
        subContent="Text"
        rightAction={{ type: "switch", props: { title: "test" } }}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
  test("Render with two rows, hidden arrow, click action, right icon, and right notification", () => {
    const tree = render(
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
    const tree = render(
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
    const tree = render(
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
  test("Render with linktext action", () => {
    const tree = render(
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
