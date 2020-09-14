import React from "react"
import { render } from "react-native-testing-library"
import { Margin, Text } from "uc-lib"

describe("Margin Snapshot Tests", () => {
  test("marginStep renders correctly", () => {
    const tree = render(
      <Margin marginStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginTopStep renders correctly", () => {
    const tree = render(
      <Margin marginTopStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginLeftStep renders correctly", () => {
    const tree = render(
      <Margin marginLeftStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginBottomStep renders correctly", () => {
    const tree = render(
      <Margin marginBottomStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginRightStep renders correctly", () => {
    const tree = render(
      <Margin marginRightStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginTopStep renders correctly over marginStep", () => {
    const tree = render(
      <Margin marginStep={1} marginTopStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginLeftStep renders correctly over marginStep", () => {
    const tree = render(
      <Margin marginStep={1} marginLeftStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginBottomStep renders correctly over marginStep", () => {
    const tree = render(
      <Margin marginStep={1} marginBottomStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("marginRightStep renders correctly over marginStep", () => {
    const tree = render(
      <Margin marginStep={1} marginRightStep={2}>
        <Text>Example String</Text>
      </Margin>,
    )
    expect(tree).toMatchSnapshot()
  })
})
