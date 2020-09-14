import { Exception, DEFAULT_SOMETHING_WENT_WRONG } from "../../network/utility"
import { translate } from "../i18n"
import { LocationAcquisitionErrorReason, LocationErrorCallback } from "./location.d"

const GOOGLE_MAP_ZIPCODE_KEY = "postal_code"
const CITY_KEY = "locality"
const STATE_KEY = "administrative_area_level_1"

// tslint:disable-next-line: no-any
export const parseZipFromComponents = (addressComponents: any[]): string => {
  const zipcodes = addressComponents.filter(comp => comp.types[0] === GOOGLE_MAP_ZIPCODE_KEY).map(comp => comp.short_name)
  if (zipcodes.length) {
    return String(zipcodes[0])
  }
  return ""
}

// tslint:disable-next-line: no-any
export const parseLocaleFromComponents = (addressComponents: any[]): string => {
  const cityNames = addressComponents.filter(comp => comp.types[0] === CITY_KEY).map(comp => comp.short_name)
  let cityName: string
  if (cityNames.length) {
    cityName = String(cityNames[0])
  } else {
    return ""
  }
  const stateCodes = addressComponents.filter(comp => comp.types[0] === STATE_KEY).map(comp => comp.short_name)
  let stateCode: string
  if (stateCodes.length) {
    stateCode = String(stateCodes[0])
  } else {
    return ""
  }
  return cityName + ", " + stateCode
}

// tslint:disable-next-line: no-any
export const handleLocationError = (originalError: any, onError: LocationErrorCallback) => {
  const ouExceptionFromError: Exception = {
    ...DEFAULT_SOMETHING_WENT_WRONG,
    title: translate("location-picker.location-error-title"),
    message: originalError ? originalError.message : undefined,
  }
  const reason = locationAcquisitionErrorReason(originalError)
  onError(ouExceptionFromError, reason)
}

// tslint:disable-next-line: no-any
const locationAcquisitionErrorReason = (error: any): LocationAcquisitionErrorReason => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return LocationAcquisitionErrorReason.PermissionDenied
    case error.POSITION_UNAVAILABLE:
      return LocationAcquisitionErrorReason.LocationUnavailable
    case error.TIMET:
      return LocationAcquisitionErrorReason.NetworkTimeout
    default:
      return LocationAcquisitionErrorReason.Other
  }
}
