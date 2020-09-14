// import { firebaseApp } from "./firebase";
import { AnalyticsParams } from "./analytics-common"
import _ from "lodash"

const shouldLogEventsToConsole = false

export const logEvent = (eventName: string, params: AnalyticsParams) => {
  const sanitizedParams = _.pickBy(params)

  if (shouldLogEventsToConsole) {
    // tslint:disable-next-line: no-console no-magic-numbers
    console.log(`Event: ${eventName}\nParams: ${JSON.stringify(sanitizedParams, null, 2)}`)
  }
  // firebaseApp.analytics().logEvent(eventName, sanitizedParams);
}

export const logAppsflyerEvent = (_eventName: string, _params: AnalyticsParams) => {
  // Appsflyer is not support on web yet
}

export const logBrazeEvent = (_eventName: string, _params: AnalyticsParams) => {
  // Appboy/Braze is not support on web yet
}
