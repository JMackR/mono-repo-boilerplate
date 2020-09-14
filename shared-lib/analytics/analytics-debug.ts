import { GTAG_EVENT_EXCEPTION, LOCATION_ERROR, GEOCODING_ERROR } from "./analytics-constants"
import { logEvent } from "./analytics-event-logger"

export const AnalyticsDebug = {
  logInfo(message: string) {
    // TODO: Limit this to development
    // tslint:disable-next-line: no-console
    console.log(message)
    // firebaseApp.crashlytics().log(message)
  },
  logError(error: Error) {
    // firebaseApp.crashlytics().recordError(error)
    // TODO: Limit this to production
    logEvent(GTAG_EVENT_EXCEPTION, {
      description: error.name + ": " + error.message,
      fatal: false,
    })
  },
  logLocationError(_error: Error) {
    // Not implemented on web
  },
  logGeocodingError(_error: Error) {
    // Not implemented on web
  },
}
