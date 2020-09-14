/** @jest-environment jsdom */
import * as React from "react"
import { mount } from "enzyme"
import { Text } from "./text"
import { Text as ReactNativeText, TextStyle } from "react-native"
import { color } from "../../design-theme"

describe("children", () => {
  test("are used as content", () => {
    const wrapper = mount(<Text preset="body1">Hello World</Text>)
    expect(wrapper.text()).toEqual("Hello World")
  })
})
// describe("text", () => {
//   test("is used as content", () => {
//     const wrapper = mount(<Text preset="body1" text="Hello World" />)
//     expect(wrapper.text()).toEqual("Hello World")
//   })
//   test("overrides children", () => {
//     const wrapper = mount(
//       <Text preset="body1" text="Text Override">
//         Hello World
//       </Text>,
//     )
//     expect(wrapper.text()).toEqual("Text Override")
//   })
// })
// describe("style", () => {
//   test("appends to the preset", () => {
//     const style = { textAlign: "right" } as TextStyle
//     const wrapper = mount(<Text preset="body1" style={style} />)
//     const native = wrapper.find(ReactNativeText)
//     expect(native.prop("style")).toEqual(expect.objectContaining(style))
//   })
//   test("overrides preset keys", () => {
//     const style = { fontSize: 666 } as TextStyle
//     const wrapper = mount(<Text preset="body1" style={style} />)
//     const native = wrapper.find(ReactNativeText)
//     expect(native.prop("style")).toEqual(expect.objectContaining(style))
//   })
// })
// describe("color", () => {
//   test("defaults to take color from style", () => {
//     const wrapper = mount(<Text preset="body1" />)
//     const native = wrapper.find(ReactNativeText)
//     expect(native.prop("style")).not.toHaveProperty("color")
//   })
//   test("overrides with color prop if given", () => {
//     const wrapper = mount(<Text preset="body1" color={color.notification} />)
//     const native = wrapper.find(ReactNativeText)
//     expect(native.prop("style")).toEqual(expect.objectContaining({ color: color.notification }))
//   })
// })
// describe("numberOfLines", () => {
//   test("forces the line height to be auto (undefined) at default", () => {
//     const wrapper = mount(<Text preset="body1" />)
//     const native = wrapper.find(ReactNativeText)
//     expect(native.prop("style")).toEqual(expect.objectContaining({ lineHeight: undefined }))
//   })
//   test("forces the line height to be auto (undefined) at 1", () => {
//     const wrapper = mount(<Text preset="body1" />)
//     const native = wrapper.find(ReactNativeText)
//     expect(native.prop("style")).toEqual(expect.objectContaining({ lineHeight: undefined }))
//   })
//   test("uses text preset line height at 0", () => {
//     const wrapper = mount(<Text preset="body1" numberOfLines={0} />)
//     const native = wrapper.find(ReactNativeText)
//     expect(native.prop("style")).toEqual(expect.objectContaining({ lineHeight: 24 }))
//   })
//   test("uses text preset line height at >= 1", () => {
//     const wrapper = mount(<Text preset="body1" numberOfLines={666} />)
//     const native = wrapper.find(ReactNativeText)
//     expect(native.prop("style")).toEqual(expect.objectContaining({ lineHeight: 24 }))
//   })
// })
