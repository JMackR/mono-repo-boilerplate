/* eslint-disable @typescript-eslint/camelcase */
import { Transformers } from "./transformers"

describe("snakeCase", () => {
  it("converts", () => {
    expect(Transformers.snakeCase("aBcDeF")).toEqual("a_bc_de_f")
    expect(Transformers.snakeCase("aBC")).toEqual("a_b_c")
  })
})

describe("snakeToCamel", () => {
  it("transforms keys", () => {
    expect(Transformers.snakeToCamel({ aaa_bbb_ccc: 123 })).toEqual({ aaaBbbCcc: 123 })
  })
  it("transforms nested keys", () => {
    expect(Transformers.snakeToCamel({ aaa_bbb_ccc: { child_key: 666 } })).toEqual({
      aaaBbbCcc: { childKey: 666 },
    })
  })
  it("transforms keys nested in an array", () => {
    expect(
      Transformers.snakeToCamel({
        aaa_bbb_ccc: [{ child_key_a: 111 }, { child_key_b: 222 }, { child_key_c: 333 }],
      }),
    ).toEqual({ aaaBbbCcc: [{ childKeyA: 111 }, { childKeyB: 222 }, { childKeyC: 333 }] })
  })
  it("retains double-underscores", () => {
    expect(Transformers.snakeToCamel({ aaa__bbb_ccc: 123 })).toEqual({ aaa_BbbCcc: 123 })
  })
  it("returns non arrays and objects", () => {
    expect(Transformers.snakeToCamel(undefined)).toEqual(undefined)
    expect(Transformers.snakeToCamel([1, 2, 3])).toEqual([1, 2, 3])
    expect(Transformers.snakeToCamel("test")).toEqual("test")
    expect(Transformers.snakeToCamel(999)).toEqual(999)
  })
})

xtest("cameToSnake", () => {})
