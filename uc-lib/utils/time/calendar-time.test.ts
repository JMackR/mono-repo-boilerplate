import moment, { CalendarSpec } from "moment"
import { calendarTime } from "./calendar-time"

afterEach(() => jest.clearAllMocks())

describe("calendarTime", () => {
  it("uses calendar time for default options", () => {
    const now = moment().subtract(1, "days")
    const spy = jest.spyOn(now, "calendar")
    expect(calendarTime(now)).toEqual("Yesterday")
    expect(spy).toHaveBeenCalledWith(undefined, {
      lastDay: "[Yesterday]",
      sameDay: "LT",
      lastWeek: "dddd",
      nextDay: "[Tomorrow]",
      nextWeek: "l",
      sameElse: "l",
    } as CalendarSpec)
  })
  describe("options", () => {
    describe("time", () => {
      it("includes time on everything", () => {
        const now = moment().subtract(1, "days")
        const spy = jest.spyOn(now, "calendar")
        expect(calendarTime(now, { time: true })).toEqual(`Yesterday, ${now.format("LT")}`)
        expect(spy).toHaveBeenCalledWith(undefined, {
          sameDay: "LT",
          lastDay: "[Yesterday], LT",
          lastWeek: "dddd, LT",
          nextDay: "[Tomorrow] LT",
          nextWeek: "lll",
          sameElse: "lll",
        } as CalendarSpec)
      })
    })
  })
})
