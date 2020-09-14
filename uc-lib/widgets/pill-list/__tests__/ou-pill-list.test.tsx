import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import { PillList } from "../pill-list"
import { PillListProps } from "../pill-list"

describe("<PillList />", () => {
  const createComponent = (props: PillListProps) => <PillList {...props} />
  const createWrapper = (props: PillListProps) => shallow(<PillList {...props} />)
  let wrapper: ShallowWrapper, props: PillListProps, data
  beforeEach(() => {
    data = [
      {
        text: "All Categories",
        onClick: jest.fn(),
      },
      {
        text: "Vehicles",
        onClick: jest.fn(),
      },
    ]
    props = {
      data,
    }
    wrapper = createWrapper(props)
  })
  it("should contain relavant component", () => {
    expect(wrapper.find("List").props().horizontal).toBeTruthy()
    expect(wrapper.find("List").props().data).toEqual(data)
  })
})
