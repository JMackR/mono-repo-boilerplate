import { delay } from "./delay"

describe("promise", () => {
  test("creates a promise that sets a timeout", () => {
    jest.useFakeTimers()
    delay(1000)
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })
})
