import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import { Button } from "uc-lib"
import * as renderer from "react-test-renderer"
import { StyleSheetTestUtils } from "aphrodite/no-important"

import { createSerializer } from "jest-aphrodite-react/no-important"
import { LocationPinFill } from "uc-lib/assets"
expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

describe("Button Functionality Tests", () => {
  let wrapper: ShallowWrapper,
    click = jest.fn()
  beforeEach(() => {
    wrapper = shallow(<Button title="test" buttonSize="large" buttonType="primary" onClick={click} />)
  })
  test("Click calls passed in onClick function", () => {
    ;(wrapper.props() as any).onClick({ preventDefault: jest.fn() })
    expect(click).toHaveBeenCalledTimes(1)
  })
})

describe("Button Snapshot Tests", () => {
  test("Primary large button renderer.creates properly", () => {
    const tree = renderer.create(<Button title="test" buttonSize="large" buttonType="primary" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test("Secondary large button renderer.creates properly", () => {
    const tree = renderer.create(
      <Button title="testingsecondary" buttonSize="large" buttonType="secondary" onClick={jest.fn()} />,
    )
    expect(tree).toMatchSnapshot()
  })
  test("Tertiary large button renderer.creates properly", () => {
    const tree = renderer.create(<Button title="tert" buttonSize="large" buttonType="tertiary" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test("Buy Now large button renderer.creates properly", () => {
    const tree = renderer.create(<Button title="buynow" buttonSize="large" buttonType="buynow" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test("Flat large button renderer.creates properly", () => {
    const tree = renderer.create(<Button title="flat" buttonSize="large" buttonType="flat" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test("Disabled large button renderer.creates properly", () => {
    const tree = renderer.create(<Button title="disabled" buttonSize="large" buttonType="disabled" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test("Primary small button renderer.creates properly", () => {
    const tree = renderer.create(<Button title="test" buttonSize="small" buttonType="primary" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test("Secondary small button renderer.creates properly", () => {
    const tree = renderer.create(
      <Button title="testingsecondary" buttonSize="small" buttonType="secondary" onClick={jest.fn()} />,
    )
    expect(tree).toMatchSnapshot()
  })
  test("Tertiary small button renderer.creates properly", () => {
    const tree = renderer.create(<Button title="tert" buttonSize="small" buttonType="tertiary" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test("Buy Now small button renderer.creates properly", () => {
    const tree = renderer.create(<Button title="buynow" buttonSize="large" buttonType="buynow" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test("Flat large small renderer.creates properly", () => {
    const tree = renderer.create(<Button title="flat" buttonSize="small" buttonType="flat" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test("Disabled small button renderer.creates properly", () => {
    const tree = renderer.create(<Button title="disabled" buttonSize="small" buttonType="disabled" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test("Primary large button with icon as LocalSVGSource renderer.creates properly", () => {
    const tree = renderer.create(
      <Button title="has svg" buttonSize="large" buttonType="primary" icon={LocationPinFill} onClick={jest.fn()} />,
    )

    expect(tree).toMatchSnapshot()
  })
  test("Primary small button with icon as LocalSVGSource renderer.creates properly", () => {
    const tree = renderer.create(
      <Button title="has svg" buttonSize="small" buttonType="primary" icon={LocationPinFill} onClick={jest.fn()} />,
    )

    expect(tree).toMatchSnapshot()
  })
})
