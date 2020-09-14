// import analytics from "@react-native-firebase/analytics";
// import appsFlyer from "react-native-appsflyer";
// import ReactAppboy from "react-native-appboy-sdk";
import { AnalyticsParams } from "./analytics-common"
import _ from "lodash"
import NetInfo, { NetInfoState, NetInfoStateType } from "@react-native-community/netinfo"

const shouldLogEventsToConsole = false

let networkState: NetInfoState

NetInfo.addEventListener(state => {
  networkState = state
})

export const logEvent = (eventName: string, params: AnalyticsParams) => {
  let ipAddress: string | undefined
  if (networkState && networkState.type === NetInfoStateType.wifi && networkState.details) {
    ipAddress = networkState.details.ipAddress || undefined
  }

  const modifiedParams: AnalyticsParams = { ...params, ip_address: ipAddress }
  const sanitizedParams = _.pickBy(modifiedParams)

  if (__DEV__ && shouldLogEventsToConsole) {
    // tslint:disable-next-line: no-console no-magic-numbers
    console.log(`Event: ${eventName}\nParams: ${JSON.stringify(sanitizedParams, null, 2)}`)
  }
  analytics().logEvent(eventName, sanitizedParams)
}

export const logAppsflyerEvent = (eventName: string, params: AnalyticsParams) => {
  if (__DEV__ && shouldLogEventsToConsole) {
    // tslint:disable-next-line: no-console no-magic-numbers
    console.log(`Appsflyer Event: ${eventName}\nParams: ${JSON.stringify(params, null, 2)}`)
  }
  // appsFlyer.trackEvent(eventName, params);
}

export const logBrazeEvent = (eventName: string, params: AnalyticsParams) => {
  if (__DEV__ && shouldLogEventsToConsole) {
    // tslint:disable-next-line: no-console no-magic-numbers
    console.log(`Braze Event: ${eventName}\nParams: ${JSON.stringify(params, null, 2)}`)
  }
  // ReactAppboy.logCustomEvent(eventName, params);
}
