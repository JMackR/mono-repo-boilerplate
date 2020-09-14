import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import renderer from "react-test-renderer"
import { UserProfile } from "../user-profile"
import { UserProfilePropTypes } from "../user-profile-types"

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
    expect(wrapper.html()).toEqual(expect.stringContaining("Member since Aug 2015"))
  })
  it("should trigger event if clicking", () => {
    wrapper.simulate("click")
    expect(props.onClick).toHaveBeenCalled()
  })
  describe("Snapshot", () => {
    it("should render properly", () => {
      const tree = renderer.create(createComponent(props))
      expect(tree).toMatchSnapshot()
    })
  })
})
