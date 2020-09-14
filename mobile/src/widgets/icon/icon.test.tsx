/** @jest-environment jsdom  */
import * as React from "react"
import { mount } from "enzyme"
import { Icon } from "./icon"
import { Image } from "react-native"

describe("create", () => {
  it("adds icon properly", () => {
    const wrapper = mount(<Icon name="checkbox-square-on" size="medium" />)
    expect(wrapper.find(Image)).toExist()
  })
})
