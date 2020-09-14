// import crashlytics from "@react-native-firebase/crashlytics";
import { GTAG_EVENT_EXCEPTION, LOCATION_ERROR, GEOCODING_ERROR } from "./analytics-constants"
import { logEvent } from "./analytics-event-logger"

export const AnalyticsDebug = {
  logInfo(message: string) {
    // tslint:disable-next-line: no-console
    // crashlytics().log(message);
  },
  logError(error: Error) {
    // crashlytics().recordError(error);
    // TODO: Limit this to production
    logEvent(GTAG_EVENT_EXCEPTION, {
      description: error.name + ": " + error.message,
      fatal: false,
    })
  },
  logLocationError(error: Error) {
    logEvent(LOCATION_ERROR, {
      description: error.name + ": " + error.message,
      fatal: false,
    })
  },
  logGeocodingError(error: Error) {
    logEvent(GEOCODING_ERROR, {
      description: error.name + ": " + error.message,
      fatal: false,
    })
  },
}
