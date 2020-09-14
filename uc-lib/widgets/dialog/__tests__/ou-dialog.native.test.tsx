import React from "react"
import { Dialog, Text } from "uc-lib"
import { render } from "react-native-testing-library"

describe("Dialog Snapshot tests", () => {
  test("Render content", () => {
    const testContent = () => {
      return <Text>Test Content</Text>
    }
    const tree = render(<Dialog content={testContent} />)
    expect(tree).toMatchSnapshot()
  })
})
