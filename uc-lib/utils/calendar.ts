import ReactNativeCalendarEvents, { AuthorizationStatus } from "react-native-calendar-events"
import * as AddCalendarEvent from "react-native-add-calendar-event"
import { Permissions } from "./permissions"
import { i18n } from "../i18n"

export interface CalendarEvent {
  title: string
  startDate?: string
  endDate?: string
  location?: string
}

/**
 * Utilities for interacting with user's calendar
 */
export const Calendar = {
  /**
   * Opens calendar, adding an event
   * Displays an alert when set (flow & text taken from BF)
   * @param event
   * @return Promise with the calendar event Id
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  add(event: CalendarEvent) {
    return Calendar.authorize().then(status => {
      if (status === "authorized") return AddCalendarEvent.presentEventCreatingDialog(event)
      else return undefined
    })
  },
  /**
   * Authorizes the app for accessing the calendar
   * If permissions are already granted, this resolves immediately
   * If permissions have not been defined yet, this requests
   * If permissions have been denied, this prompts the user to take them to settings
   * @return Promise resolving with the authorization status
   */
  authorize(): Promise<AuthorizationStatus> {
    return ReactNativeCalendarEvents.authorizationStatus().then(authorization => {
      if (authorization === "undetermined") return ReactNativeCalendarEvents.authorizeEventStore()
      if (authorization !== "denied") return authorization
      return new Promise(resolve => {
        Permissions.showSettingsPrompt({
          title: i18n("alert/permissions/calendar/title"),
          description: i18n("alert/permissions/calendar/description"),
          onOpen: () => resolve(authorization),
          onCancel: () => resolve(authorization),
        })
      })
    })
  },
}
