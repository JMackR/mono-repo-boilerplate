import moment, { CalendarSpec } from "moment"

interface CalendarTimeOptions {
  /** Whether to include the time even for older dates */
  time?: boolean
}

const defaultFormats: CalendarSpec = {
  lastDay: "[Yesterday]",
  sameDay: "LT",
  lastWeek: "dddd",
  nextDay: "[Tomorrow]",
  nextWeek: "l",
  sameElse: "l",
}

const timeFormats: CalendarSpec = {
  sameDay: "LT",
  lastDay: "[Yesterday], LT",
  lastWeek: "dddd, LT",
  nextDay: "[Tomorrow] LT",
  nextWeek: "lll",
  sameElse: "lll",
}

// TODO We need to have a conversation with design...
// ^ IMO they should not define timestamp formats, we should be using localized versions
// ^ https://momentjs.com/ > "Multiple Locale Support"
// ^ Get sign off, make some decisions with them, LIMIT RSELVES TO THESE

/**
 * TODO How do i18n this? Should it return keys instead? Maybe needs options, return object?
 * Determines a good user-facing time to display for the user
 * @param time
 * @return the string to display
 */
export function calendarTime(time: moment.Moment, options: CalendarTimeOptions = {}): string {
  return time.calendar(undefined, options.time ? timeFormats : defaultFormats)
}
