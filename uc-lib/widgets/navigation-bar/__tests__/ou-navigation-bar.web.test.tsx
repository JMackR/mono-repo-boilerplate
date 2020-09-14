import React from "react"
import * as renderer from "react-test-renderer"
import { NavigationBar } from "uc-lib"
import { NavigationBarProps, NavigationBarItem } from "../navigation-bar-props"
import { LocationPinFill } from "uc-lib/assets"

describe("<NavigationBar />", () => {
  const createComponent = (props: NavigationBarProps) => <NavigationBar {...props} />
  const createItem = (title: string): NavigationBarItem => {
    return { title: title, pressHandler: () => {} }
  }
  const iconItem = { icon: LocationPinFill, pressHandler: () => {} }

  describe("Snapshot", () => {
    it("should render only a title", () => {
      const tree = renderer.create(createComponent({ title: "Page title" }))
      expect(tree).toMatchSnapshot()
    })
    it("should render one left item", () => {
      const tree = renderer.create(
        createComponent({
          title: "Page title",
          leftItems: [createItem("Left1")],
        }),
      )
      expect(tree).toMatchSnapshot()
    })
    it("should render multiple left items", () => {
      const tree = renderer.create(
        createComponent({
          title: "Page title",
          leftItems: [createItem("Left1"), createItem("Left2")],
        }),
      )
      expect(tree).toMatchSnapshot()
    })
    it("should render multiple left items with icon", () => {
      const tree = renderer.create(
        createComponent({
          title: "Page title",
          leftItems: [createItem("Left1"), iconItem],
        }),
      )
      expect(tree).toMatchSnapshot()
    })
    it("should render one right item", () => {
      const tree = renderer.create(
        createComponent({
          title: "Page title",
          rightItems: [createItem("Right1")],
        }),
      )
      expect(tree).toMatchSnapshot()
    })
    it("should render multiple right items", () => {
      const tree = renderer.create(
        createComponent({
          title: "Page title",
          rightItems: [createItem("Right1"), createItem("Right2")],
        }),
      )
      expect(tree).toMatchSnapshot()
    })
    it("should render multiple right items with icons", () => {
      const tree = renderer.create(
        createComponent({
          title: "Page title",
          rightItems: [createItem("Right1"), iconItem],
        }),
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
