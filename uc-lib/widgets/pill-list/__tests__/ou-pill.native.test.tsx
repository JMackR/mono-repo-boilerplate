import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import { render } from "react-native-testing-library"
import { ouMockPlatform, ouResetPlatformMock } from "uc-lib/test/react-native/utility"
import { Pill } from "../pill"
import { PillDataProps } from "../pill-list.d"

describe("<Pill />", () => {
  const createComponent = ({ data }: { data: PillDataProps }) => <Pill data={data} />
  const createWrapper = ({ data }: { data: PillDataProps }) => shallow(<Pill data={data} />)
  let wrapper: ShallowWrapper, data: PillDataProps
  beforeEach(() => {
    data = {
      text: "Test",
      onClick: jest.fn(),
    }
  })
  afterEach(() => {
    ouResetPlatformMock()
  })
  it("should contain relavant component", () => {
    wrapper = createWrapper({ data })
    expect(wrapper.find("Text").props().children).toBe(data.text)
  })
  describe("Snapshot", () => {
    it("Android should render properly ", () => {
      ouMockPlatform("android")
      const tree = render(createComponent({ data }))
      expect(tree).toMatchSnapshot()
    })
    it("iOS should render properly ", () => {
      ouMockPlatform("ios")
      const tree = render(createComponent({ data }))
      expect(tree).toMatchSnapshot()
    })
  })
})
