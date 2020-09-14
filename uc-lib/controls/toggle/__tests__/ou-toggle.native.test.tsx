import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import { Toggle } from "uc-lib"
import { render } from "react-native-testing-library"
import { ouMockPlatform, ouResetPlatformMock } from "uc-lib/test/react-native/utility"

describe("Toggle Functionality Tests", () => {
  let wrapper: ShallowWrapper
  const click = jest.fn()
  beforeEach(() => {
    wrapper = shallow(<Toggle state={false} onChange={click} />)
  })
  test("Click calls passed in onChange function", () => {
    wrapper.props().onValueChange(true)
    expect(click).toHaveBeenCalledTimes(1)
  })
})

describe("Toggle Snapshot Tests", () => {
  test("Toggle with on state renderer.creates properly", () => {
    const toggle = render(<Toggle state={true} onChange={jest.fn()} />)
    expect(toggle).toMatchSnapshot()
  })
  test("Toggle with off state renderer.creates properly", () => {
    const toggle = render(<Toggle state={false} onChange={jest.fn()} />)
    expect(toggle).toMatchSnapshot()
  })
  test("Toggle with disabled state renderer.creates properly", () => {
    const toggle = render(<Toggle state={false} onChange={jest.fn()} disabled={true} />)
    expect(toggle).toMatchSnapshot()
  })
  describe("Android Snapshot", () => {
    ouMockPlatform("android")
    test("Android toggle with state renderer.creates properly", () => {
      const toggle = render(<Toggle state={false} onChange={jest.fn()} />)
      expect(toggle).toMatchSnapshot()
    })
    ouResetPlatformMock()
  })
  describe("iOS Snapshot", () => {
    ouMockPlatform("ios")
    test("iOS toggle with state renderer.creates properly", () => {
      const toggle = render(<Toggle state={false} onChange={jest.fn()} />)
      expect(toggle).toMatchSnapshot()
    })
    ouResetPlatformMock()
  })
})
