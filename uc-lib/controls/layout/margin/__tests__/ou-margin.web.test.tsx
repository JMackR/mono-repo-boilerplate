import React from "react"
import * as renderer from "react-test-renderer"
import { Margin, Text } from "uc-lib"

describe("Margin Snapshot Tests", () => {
  test("marginStep renders correctly", () => {
    const tree = renderer.create(
      <Margin marginStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginTopStep renders correctly", () => {
    const tree = renderer.create(
      <Margin marginTopStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginLeftStep renders correctly", () => {
    const tree = renderer.create(
      <Margin marginLeftStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginBottomStep renders correctly", () => {
    const tree = renderer.create(
      <Margin marginBottomStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginRightStep renders correctly", () => {
    const tree = renderer.create(
      <Margin marginRightStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginTopStep renders correctly over marginStep", () => {
    const tree = renderer.create(
      <Margin marginStep={1} marginTopStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginLeftStep renders correctly over marginStep", () => {
    const tree = renderer.create(
      <Margin marginStep={1} marginLeftStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginBottomStep renders correctly over marginStep", () => {
    const tree = renderer.create(
      <Margin marginStep={1} marginBottomStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginRightStep renders correctly over marginStep", () => {
    const tree = renderer.create(
      <Margin marginStep={1} marginRightStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
})
