import React from "React"
import { shallow, ShallowWrapper } from "enzyme"
import { render } from "react-native-testing-library"
import { SocialAppleIcon } from "uc-lib"
import { ouMockPlatform, ouResetPlatformMock } from "uc-lib/test/react-native/utility"
import { LoginButton } from "../login-button"

const BUTTON_TEXT = "This is a login button"
const STYLE = {
  mainBackgroundColor: "#010101",
  borderColor: "#121212",
  pressedColor: "#343434",
  textColor: "#454545",
}
const ICON = SocialAppleIcon

describe("<LoginButton />", () => {
  const createComponent = (props) => <LoginButton {...props} />
  const createWrapper = (props) => shallow(<LoginButton {...props} />)
  let wrapper: ShallowWrapper
  it('should contain "This is a login button" text', () => {
    wrapper = createWrapper({
      buttonText: BUTTON_TEXT,
      style: STYLE,
      icon: ICON,
      onClick: () => {},
    })
    expect(wrapper.find("Text").props().children).toBe(BUTTON_TEXT)
  })
  describe("Android Snapshot", () => {
    ouMockPlatform("android")
    it("should render properly with default width", () => {
      const tree = render(
        createComponent({
          buttonText: BUTTON_TEXT,
          style: STYLE,
          icon: ICON,
          onClick: () => {},
        }),
      )
      expect(tree).toMatchSnapshot()
    })
    it("should render properly with enabling full width", () => {
      const tree = render(
        createComponent({
          buttonText: BUTTON_TEXT,
          style: STYLE,
          icon: ICON,
          onClick: () => {},
          isFullWidth: true,
        }),
      )
      expect(tree).toMatchSnapshot()
    })
    ouResetPlatformMock()
  })
  describe("iOS Snapshot", () => {
    ouMockPlatform("ios")
    it("should render properly with default width", () => {
      const tree = render(
        createComponent({
          buttonText: BUTTON_TEXT,
          style: STYLE,
          icon: ICON,
          onClick: () => {},
        }),
      )
      expect(tree).toMatchSnapshot()
    })
    it("should render properly with enabling full width", () => {
      const tree = render(
        createComponent({
          buttonText: BUTTON_TEXT,
          style: STYLE,
          icon: ICON,
          onClick: () => {},
          isFullWidth: true,
        }),
      )
      expect(tree).toMatchSnapshot()
    })
    ouResetPlatformMock()
  })
})
