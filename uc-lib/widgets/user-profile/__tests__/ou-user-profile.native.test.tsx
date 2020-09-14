import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import { render } from "react-native-testing-library"
import { Text } from "uc-lib"
import { UserProfile } from "../user-profile"
import { UserProfilePropTypes } from "../user-profile-types"
import { ouMockPlatform, ouResetPlatformMock } from "uc-lib/test/react-native/utility"

describe("<UserProfile />", () => {
  const createComponent = (props: UserProfilePropTypes) => <UserProfile {...props} />
  const createWrapper = (props: UserProfilePropTypes) => shallow(<UserProfile {...props} />)
  let wrapper: ShallowWrapper, props: UserProfilePropTypes
  beforeEach(() => {
    const profile = {
      name: "Terrence",
      avatar: "https://static.redibs-stg.com/images/default_bg.png",
      joined: "2015-08-01T00:00:00+0000",
      rating: {
        count: 22,
        average: 3.4,
      },
    }
    props = {
      profile,
      onClick: jest.fn(),
    }
    wrapper = createWrapper(props)
  })

  it("should contain relavant component", () => {
    expect(wrapper.find("StarRating").props().rating).toBe(props.profile.rating.average)
    expect(wrapper.find("StarRating").props().disabled).toBeTruthy()
    expect(wrapper.containsMatchingElement(<Text>{"Member since Aug 2015"}</Text>)).toBeTruthy()
  })
  it("should trigger event if pressing", () => {
    wrapper.simulate("click")
    expect(props.onClick).toHaveBeenCalled()
  })
  describe("Snapshot", () => {
    afterEach(() => {
      ouResetPlatformMock()
    })
    it("Android should render properly ", () => {
      ouMockPlatform("android")
      const tree = render(createComponent(props))
      expect(tree).toMatchSnapshot()
    })
    it("iOS should render properly ", () => {
      ouMockPlatform("ios")
      const tree = render(createComponent(props))
      expect(tree).toMatchSnapshot()
    })
  })
})
