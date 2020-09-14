import React from "react"
import { render } from "react-native-testing-library"
import { Stack, Text } from "uc-lib"

describe("Stack Snapshot Tests", () => {
  test("horizontal renders correctly", () => {
    const tree = render(
      <Stack orientation="row" childSeparationStep={2}>
        <Text>Example String 1</Text>
        <Text>Example String 2</Text>
        <Text>Example String 3</Text>
        <Text>Example String 4</Text>
      </Stack>,
    )
    expect(tree).toMatchSnapshot()
  })
  test("vertical renders correctly", () => {
    const tree = render(
      <Stack orientation="column" childSeparationStep={2}>
        <Text>Example String 1</Text>
        <Text>Example String 2</Text>
        <Text>Example String 3</Text>
        <Text>Example String 4</Text>
      </Stack>,
    )
    expect(tree).toMatchSnapshot()
  })
})
