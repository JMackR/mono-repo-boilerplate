import {
  LocationProviderClass,
  LocationFetchingOptions,
  LocationAcquisitionErrorReason,
  LocationErrorCallback,
  LocationSuccessCallback,
} from "./location.d"
import { GeocodingProvider } from "./geocoding-provider"
import { logLocationAcquisitionError } from "./location-utils"
import { handleLocationError } from "./location-common"

// tslint:disable: no-any

export const LocationProvider: LocationProviderClass = {
  getCurrentLocation(onSuccess: LocationSuccessCallback, onError: LocationErrorCallback, options?: LocationFetchingOptions) {
    const handlePositionFetchSuccess = (position: Position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      if (options && options.skipGeocoding) {
        onSuccess({ lat, lon })
      } else {
        GeocodingProvider.reverseGeocodeLocation(lat, lon, onSuccess, onError)
      }
    }

    const handlePositionFetchFailed = (error: PositionError) => {
      logLocationAcquisitionError(error)
      handleLocationError(error, onError)
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handlePositionFetchSuccess, handlePositionFetchFailed, {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      })
    } else {
      onError(new Error(), LocationAcquisitionErrorReason.LocationUnavailable)
    }
  },
}
