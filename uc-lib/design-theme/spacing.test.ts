import { border, hairline, size, thin } from "./spacing"
import { StyleSheet } from "react-native"

describe("size", () => {
  test("multiplier defaults to 1", () => {
    expect(size()).toEqual(8)
  })
  test("handles undefined param", () => {
    expect(size(undefined)).toEqual(8)
  })
  test("handles custom multiplier", () => {
    expect(size(2)).toEqual(16)
  })
})

describe("thin", () => {
  test("multiplier defaults to 1", () => {
    expect(thin()).toEqual(2)
  })
  test("handles undefined param", () => {
    expect(thin(undefined)).toEqual(2)
  })
  test("handles custom multiplier", () => {
    expect(thin(2)).toEqual(4)
  })
})

describe("hairline", () => {
  it("returns hairlineWidth multiplied", () => {
    expect(hairline(3)).toEqual(StyleSheet.hairlineWidth * 3)
  })
  it("defaults to just hairlineWidth", () => {
    expect(hairline()).toEqual(StyleSheet.hairlineWidth)
  })
})

describe("border", () => {
  it("returns hairlineWidth multiplied * 4", () => {
    expect(border(3)).toEqual(StyleSheet.hairlineWidth * 12)
  })
  it("defaults to 4 * hairlineWidth", () => {
    expect(border()).toEqual(StyleSheet.hairlineWidth * 4)
  })
})
