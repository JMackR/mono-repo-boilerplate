import { iso8601 } from "./iso8601"
import { isRefinementType } from "mobx-state-tree"

const validDate = "2019-11-18"
const validDatetime1 = "2019-11-18T18:53:57+00:00"
const validDatetime2 = "2019-11-18T18:53:57Z"
const validDatetime3 = "20191118T185357Z"

it("is a refinement of a string", () => {
  expect(isRefinementType(iso8601)).toBeTruthy()
  expect(iso8601.name).toEqual("string")
})

test("valid", () => {
  const predicate = (iso8601 as any)._predicate
  expect(predicate(validDate)).toBeTruthy()
  expect(predicate(validDatetime1)).toBeTruthy()
  expect(predicate(validDatetime2)).toBeTruthy()
  expect(predicate(validDatetime3)).toBeTruthy()

  expect(predicate("invalid")).toBeFalsy()
  expect(predicate(123456789)).toBeFalsy()
})
