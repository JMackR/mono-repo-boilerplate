import { iif } from "./iif"

describe("iif", () => {
  it("returns undefined if the condition is false", () => {
    expect(iif(false, 666)).toBeUndefined()
  })
  it("returns the value if condition is true", () => {
    expect(iif(true, 666)).toEqual(666)
  })
  it("returns a lazy value if condition is true", () => {
    expect(iif(true, () => 666)).toEqual(666)
  })
})
