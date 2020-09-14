import { getNavigationSafeArea, setNavigationSafeArea } from "./navigation"

afterEach(() => setNavigationSafeArea({ top: 0, right: 0, bottom: 0, left: 0 }))

describe("getNavigationSafeArea", () => {
  it("defaults to zero", () =>
    expect(getNavigationSafeArea()).toEqual({ top: 0, right: 0, bottom: 0, left: 0 }))
})

test("setNavigationSafeArea", () => {
  const safeArea = { top: 1, right: 2, bottom: 2, left: 3 }
  setNavigationSafeArea(safeArea)
  expect(getNavigationSafeArea()).toEqual(safeArea)
})
