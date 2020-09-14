import moment from "moment"

const MONTH_AND_YEAR_FORMAT = "MMM YYYY"
const MONTH_AND_DAY_FORMAT = "MMM DD"
const MONTH_AND_DAY_ORDINAL_FORMAT = "MMM Do"

export const MON_DATE_YEAR_FORMAT = "MMM DD, YYYY"
const TIME_MONTH_DAY_FORMAT = "h:mm A MMM DD"
const HR_MONTH_DAY_FORMAT = "h A MMM DD"
const DAYOFWEEK_MONTH_DAY_FORMAT = "ddd, MMM DD"
const HR_DAYOFWEEK_MONTH_DAY_FORMAT = "h A ddd, MMM DD"

const EVENT_FORMAT = "YYYY-MM-DDTHH:mm:ssZ"

// for todos
// tslint:disable-next-line: no-magic-numbers
const ONE_DAY_SECONDS = 60 * 60 * 24
const CHAT_DATE_FORMAT = "h:mm A MMM DD"
const CHAT_TODAY_FORMAT = "h:mm A"

export const DateFormatter = {
  formatTimeLeft(dateToFormat: string): string {
    return moment.duration(moment().diff(moment(dateToFormat))).humanize()
  },

  formatFromNow(dateToFormat: string): string {
    return moment.utc(dateToFormat).fromNow()
  },

  formatToMonthAndYear(dateToFormat: string): string {
    return moment.utc(dateToFormat).format(MONTH_AND_YEAR_FORMAT)
  },

  formatToMonthAndDay(dateToFormat: string): string {
    return moment.utc(dateToFormat).format(MONTH_AND_DAY_FORMAT)
  },

  formatToDayOfWeekMonthAndDay(dateToFormat: string): string {
    return moment.utc(dateToFormat).format(DAYOFWEEK_MONTH_DAY_FORMAT)
  },

  formatToTimeDayOfWeekMonthAndDay(dateToFormat: string): string {
    return moment.utc(dateToFormat).format(HR_DAYOFWEEK_MONTH_DAY_FORMAT)
  },

  formatToMonthAndDayOrdinal(dateToFormat: string): string {
    return moment.utc(dateToFormat).format(MONTH_AND_DAY_ORDINAL_FORMAT)
  },

  format(dateToFormat: string, format: string): string {
    return moment.utc(dateToFormat).format(format)
  },

  formatEpoch(millis: number, format: string): string {
    return moment.unix(millis).format(format)
  },

  formatToTimeMonthAndDay(dateToFormat: string): string {
    const date = moment(dateToFormat)
    const zeroMinutes = date.minute() === 0
    return moment.utc(dateToFormat).format(zeroMinutes ? HR_MONTH_DAY_FORMAT : TIME_MONTH_DAY_FORMAT)
  },

  formatNowForEvent(): string {
    return moment().format(EVENT_FORMAT)
  },

  formatEpochFromNow(millis: number): string {
    return moment.unix(millis).fromNow()
  },

  formatChatTimestamp(chatUnixTime: number): string {
    const now = moment().unix()
    const formatForToday = !chatUnixTime || now - Number(chatUnixTime) <= ONE_DAY_SECONDS
    // if the message was sent less than 24 hours ago, show just time, otherwise include date as well.
    return DateFormatter.formatEpoch(Number(chatUnixTime), formatForToday ? CHAT_TODAY_FORMAT : CHAT_DATE_FORMAT)
  },

  getCurrentWeekday(): string {
    return moment().format("dddd")
  },

  addDaysToTodayOrdinal(daysToAdd: number): string {
    return moment()
      .add(daysToAdd, "days")
      .format()
  },
}
