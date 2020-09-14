import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import { Toggle } from "uc-lib"
import * as renderer from "react-test-renderer"
import { StyleSheetTestUtils } from "aphrodite/no-important"
import { createSerializer } from "jest-aphrodite-react/no-important"
import Switch from "react-switch"

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

describe("Toggle Functionality Tests", () => {
  let wrapper: ShallowWrapper
  const click = jest.fn()
  beforeEach(() => {
    wrapper = shallow(<Toggle state={false} onChange={click} />)
  })
  test("Click calls passed in onChange function", () => {
    wrapper
      .find(Switch)
      .props()
      .onChange(true, {} as MouseEvent, "test")
    expect(click).toHaveBeenCalledTimes(1)
  })
})

describe("Toggle Snapshot Tests", () => {
  test("Toggle with on state renderer.creates properly", () => {
    const toggle = renderer.create(<Toggle state={true} onChange={jest.fn()} />)
    expect(toggle).toMatchSnapshot()
  })
  test("Toggle with off state renderer.creates properly", () => {
    const toggle = renderer.create(<Toggle state={false} onChange={jest.fn()} />)
    expect(toggle).toMatchSnapshot()
  })
  test("Toggle with off state renderer.creates properly", () => {
    const toggle = renderer.create(<Toggle state={false} onChange={jest.fn()} disabled={true} />)
    expect(toggle).toMatchSnapshot()
  })
})
