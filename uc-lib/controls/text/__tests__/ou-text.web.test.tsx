import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import { Text } from "uc-lib"
import * as renderer from "react-test-renderer"
import { StyleSheetTestUtils } from "aphrodite/no-important"

import { createSerializer } from "jest-aphrodite-react/no-important"
expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

describe("Text Functionality Tests", () => {
  let wrapper: ShallowWrapper,
    click = jest.fn()
  beforeEach(() => {
    wrapper = shallow(
      <Text textType="headline1" color="primary" textAlign="center" onPress={click}>
        Test text
      </Text>,
    )
  })
  test("Click calls passed in onClick function", () => {
    ;(wrapper.props() as any).onClick({ preventDefault: jest.fn() })
    expect(click).toHaveBeenCalledTimes(1)
  })
})

describe("Button Snapshot Tests", () => {
  test("Primary large button renders properly", () => {
    const tree = renderer.create(<Text>Default text</Text>)

    expect(tree).toMatchSnapshot()
  })
  test("Tertiary large button renders properly", () => {
    const tree = renderer.create(
      <Text textType="headline1" color="primary" textAlign="center" onPress={jest.fn()}>
        First text
      </Text>,
    )

    expect(tree).toMatchSnapshot()
  })
  test("Secondary large button renders properly", () => {
    const tree = renderer.create(
      <Text textType="secondaryBody1" color="secondary" textAlign="center" onPress={jest.fn()}>
        Second text
      </Text>,
    )
    expect(tree).toMatchSnapshot()
  })

  test("Tertiary text renders properly", () => {
    const tree = renderer.create(
      <Text textType="tertiaryBody1" color="error" textAlign="left">
        Second text
      </Text>,
    )
    expect(tree).toMatchSnapshot()
  })

  test("Multiple texts render properly", () => {
    const tree = renderer.create(
      <Text>
        <Text textType="primaryBody1" color="primary">
          First text
        </Text>
        <Text textType="secondaryBody1" color="secondary">
          Second text
        </Text>
        <Text textType="tertiaryBody1" color="error">
          Third text
        </Text>
      </Text>,
    )
    expect(tree).toMatchSnapshot()
  })
})
