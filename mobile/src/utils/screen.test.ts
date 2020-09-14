import { Dimensions } from "react-native"
import { screenColumns } from "./screen"

test("columns", () => {
  const value = { height: 9, scale: 1, fontScale: 1 }
  jest.spyOn(Dimensions, "get").mockReturnValue({ width: 414, ...value })
  expect(screenColumns(120)).toEqual(3)
  jest.spyOn(Dimensions, "get").mockReturnValue({ width: 834, ...value })
  expect(screenColumns(120)).toEqual(6)
})
