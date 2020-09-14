import { UnhandledResponseError } from "./errors"

describe("UnhandledResponseError", () => {
  it("utilizes default messages if none passed in", () => {
    expect(new UnhandledResponseError().message).toEqual("Response status was not expected")
  })
  it("utilizes custom message", () => {
    expect(new UnhandledResponseError("test").message).toEqual("test")
  })
})

xtest("todo", () => {})
