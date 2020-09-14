/** @jest-environment jsdom */
import * as React from "react"
import { mount } from "enzyme"
import { BackButton, headers } from "./headers"
import { ReactElement } from "react"
import { Button } from "../components"
import { TestContainer } from "../../test/container"
import { GestureResponderEvent } from "react-native"

const container = TestContainer()

describe("BackButton", () => {
  describe("actions", () => {
    test("onPress exists", () => {
      const onPress = jest.fn()
      const wrapper = mount(<BackButton onPress={onPress} />, {
        wrappingComponent: container.Wrapper,
      })
      wrapper.find(Button).prop("onPress")!({} as GestureResponderEvent)
      expect(onPress).toHaveBeenCalled()
    })
    test("goBack", () => {
      jest.spyOn(container.navigation, "canGoBack").mockReturnValue(true)
      const goBack = jest.spyOn(container.navigation, "goBack").mockImplementation()
      const wrapper = mount(<BackButton />, {
        wrappingComponent: container.Wrapper,
      })
      wrapper.find(Button).prop("onPress")!({} as GestureResponderEvent)
      expect(goBack).toHaveBeenCalled()
    })
    test("canGoBack false", () => {
      jest.spyOn(container.navigation, "canGoBack").mockReturnValue(false)
      const goBack = jest.spyOn(container.navigation, "goBack").mockImplementation()
      const wrapper = mount(<BackButton />, {
        wrappingComponent: container.Wrapper,
      })
      wrapper.find(Button).prop("onPress")!({} as GestureResponderEvent)
      expect(goBack).not.toHaveBeenCalled()
    })
  })
})

describe("primary", () => {
  it("creates", () => {
    const headerBackImage = headers.primary.headerBackImage
    const wrapper = mount(headerBackImage!({ tintColor: "black" }) as ReactElement, {
      wrappingComponent: container.Wrapper,
    })
    expect(wrapper.find(Button).prop("icon")).toEqual("arrow-left")
  })
})

describe("secondary", () => {
  it("creates", () => {
    const headerBackImage = headers.secondary.headerBackImage
    const wrapper = mount(headerBackImage!({ tintColor: "black" }) as ReactElement, {
      wrappingComponent: container.Wrapper,
    })
    expect(wrapper.find(Button).prop("icon")).toEqual("arrow-left")
  })
})

describe("soft", () => {
  it("creates", () => {
    const headerBackImage = headers.secondary.headerBackImage
    const wrapper = mount(headerBackImage!({ tintColor: "light" }) as ReactElement, {
      wrappingComponent: container.Wrapper,
    })
    expect(wrapper.find(Button).prop("icon")).toEqual("arrow-left")
  })
})

describe("secondaryClose", () => {
  it("creates with headerLeft", () => {
    const headerBackImage = headers.secondaryClose.headerLeft
    const wrapper = mount(headerBackImage!({ tintColor: "black" }) as ReactElement, {
      wrappingComponent: container.Wrapper,
    })
    expect(wrapper.find(Button).prop("icon")).toEqual("x")
  })
})

describe("darkClose", () => {
  it("creates with headerLeft", () => {
    const headerBackImage = headers.secondaryClose.headerLeft
    const wrapper = mount(headerBackImage!({ tintColor: "black" }) as ReactElement, {
      wrappingComponent: container.Wrapper,
    })
    expect(wrapper.find(Button).prop("icon")).toEqual("x")
  })
})

test("transparentClose", () => {
  const close = headers.transparentClose.headerLeft
  const wrapper = mount(close!({ tintColor: "light" }) as ReactElement, {
    wrappingComponent: container.Wrapper,
  })
  const button = wrapper.find(Button)
  expect(button.prop("icon")).toEqual("x")
  expect(button.prop("preset")).toEqual("roundLightSmall")
})
