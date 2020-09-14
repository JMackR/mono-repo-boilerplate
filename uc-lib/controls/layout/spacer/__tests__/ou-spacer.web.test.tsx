import React from "react"
import * as renderer from "react-test-renderer"
import { Spacer, Text } from "uc-lib"

describe("Spacer Snapshot Tests", () => {
  test("Spacer renders horizontal space correctly", () => {
    const tree = renderer.create(
      <div style={{ flexDirection: "row" }}>
        <Text>Example String 1</Text>
        <Spacer sizeStep={2} direction="row" />
        <Text>Example String 2</Text>
      </div>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("Spacer renders vertical space correctly", () => {
    const tree = renderer.create(
      <div style={{ flexDirection: "column" }}>
        <Text>Example String 1</Text>
        <Spacer sizeStep={2} direction="column" />
        <Text>Example String 2</Text>
      </div>,
    )
    expect(tree).toMatchSnapshot()
  })
})
