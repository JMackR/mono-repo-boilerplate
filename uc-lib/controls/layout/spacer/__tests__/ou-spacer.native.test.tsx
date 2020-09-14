import React from "react"
import { render } from "react-native-testing-library"
import { View } from "react-native"
import { Spacer, Text } from "uc-lib"

describe("Spacer Snapshot Tests", () => {
  test("Spacer renders horizontal space correctly", () => {
    const tree = render(
      <View style={{ flexDirection: "row" }}>
        <Text>Example String 1</Text>
        <Spacer sizeStep={2} direction="row" />
        <Text>Example String 2</Text>
      </View>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("Spacer renders vertical space correctly", () => {
    const tree = render(
      <View style={{ flexDirection: "column" }}>
        <Text>Example String 1</Text>
        <Spacer sizeStep={2} direction="column" />
        <Text>Example String 2</Text>
      </View>,
    )
    expect(tree).toMatchSnapshot()
  })
})
