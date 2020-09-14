import { formatDate } from "../payments-input-formatter"

describe("Payments input formatter tests", () => {
  test("Format card expiration input", async () => {
    const MAX_LENGTH = 5

    const caseOne = formatDate("", "a", MAX_LENGTH)
    expect(caseOne).toBe("")

    const caseTwo = formatDate("", "1", MAX_LENGTH)
    expect(caseTwo).toBe("1")

    const caseThree = formatDate("1", "11", MAX_LENGTH)
    expect(caseThree).toBe("11/")

    const caseFour = formatDate("11", "111", MAX_LENGTH)
    expect(caseFour).toBe("11/1")

    const caseFive = formatDate("11/1", "11/", MAX_LENGTH)
    expect(caseFive).toBe("11")

    const caseSix = formatDate("1", "", MAX_LENGTH)
    expect(caseSix).toBe("")

    const caseSeven = formatDate("11/11", "11/111", MAX_LENGTH)
    expect(caseSeven).toBe("11/11")
  })
})
