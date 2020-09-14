import ReactNativeCalendarEvents from "react-native-calendar-events"
import * as AddCalendarEvent from "react-native-add-calendar-event"
import { Calendar, CalendarEvent } from "./calendar"
import { Permissions } from "./permissions"

describe("authorize", () => {
  let authorizeEventStore: any
  beforeEach(() => {
    authorizeEventStore = jest.spyOn(ReactNativeCalendarEvents, "authorizeEventStore")
  })
  test("authorized", () => {
    jest.spyOn(ReactNativeCalendarEvents, "authorizationStatus").mockResolvedValue("authorized")
    return Calendar.authorize().then(status => expect(status).toEqual("authorized"))
  })
  test("restricted", () => {
    jest.spyOn(ReactNativeCalendarEvents, "authorizationStatus").mockResolvedValue("restricted")
    return Calendar.authorize().then(status => expect(status).toEqual("restricted"))
  })
  test("undetermined", () => {
    jest.spyOn(ReactNativeCalendarEvents, "authorizationStatus").mockResolvedValue("undetermined")
    authorizeEventStore.mockResolvedValue("authorized")
    return Calendar.authorize().then(status => {
      expect(authorizeEventStore).toHaveBeenCalled()
      expect(status).toEqual("authorized")
    })
  })
  describe("denied", () => {
    beforeEach(() => {
      jest.spyOn(ReactNativeCalendarEvents, "authorizationStatus").mockResolvedValueOnce("denied")
      jest
        .spyOn(Permissions, "showSettingsPrompt")
        .mockImplementation(({ onOpen }) => onOpen && onOpen())
    })

    it("shows the settings prompt", () =>
      Calendar.authorize().then(status => {
        expect(status).toEqual("denied")
        expect(Permissions.showSettingsPrompt).toHaveBeenCalled()
      }))

    it("does not show the setting prompt again if the user authorizes", () => {
      jest
        .spyOn(ReactNativeCalendarEvents, "authorizationStatus")
        .mockResolvedValueOnce("authorized")
      return Calendar.authorize().then(status => {
        expect(status).toEqual("denied")
        expect(Permissions.showSettingsPrompt).toHaveBeenCalledTimes(1)
        return Calendar.authorize().then(status => {
          expect(status).toEqual("authorized")
          expect(Permissions.showSettingsPrompt).toHaveBeenCalledTimes(1)
        })
      })
    })
  })
})

describe("add", () => {
  const event = { title: "test-title" } as CalendarEvent
  const response = { action: "CANCELED" } as AddCalendarEvent.CancelAction
  let presentEventCreatingDialog: any
  beforeEach(
    () =>
      (presentEventCreatingDialog = jest
        .spyOn(AddCalendarEvent, "presentEventCreatingDialog")
        .mockResolvedValue(response)),
  )
  test("authorized", () => {
    jest.spyOn(Calendar, "authorize").mockResolvedValue("authorized")
    return Calendar.add(event).then(status => {
      expect(presentEventCreatingDialog).toHaveBeenCalledWith(event)
      expect(status).toEqual(response)
    })
  })
  test("restricted", () => {
    jest.spyOn(Calendar, "authorize").mockResolvedValue("restricted")
    return Calendar.add(event).then(status => {
      expect(presentEventCreatingDialog).not.toHaveBeenCalled()
      expect(status).toBeUndefined()
    })
  })
  test("denied", () => {
    jest.spyOn(Calendar, "authorize").mockResolvedValue("denied")
    return Calendar.add(event).then(status => {
      expect(presentEventCreatingDialog).not.toHaveBeenCalled()
      expect(status).toBeUndefined()
    })
  })
  test("undetermined", () => {
    jest.spyOn(Calendar, "authorize").mockResolvedValue("undetermined")
    return Calendar.add(event).then(status => {
      expect(presentEventCreatingDialog).not.toHaveBeenCalled()
      expect(status).toBeUndefined()
    })
  })
})
