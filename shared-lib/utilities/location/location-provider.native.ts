import Geolocation, { GeolocationResponse, GeolocationError } from "@react-native-community/geolocation"
import { LocationProviderClass, LocationDetails, LocationFetchingOptions } from "./location"
import { GeocodingProvider } from "./geocoding-provider"
import { logLocationAcquisitionError } from "./location-utils"
import { handleLocationError } from "./location-common"

// tslint:disable: no-any

export const LocationProvider: LocationProviderClass = {
  getCurrentLocation(
    onSuccess: (locationDetails: LocationDetails) => void,
    onError: (error: any) => void,
    options?: LocationFetchingOptions,
  ) {
    const handlePositionFetchSuccess = (position: GeolocationResponse) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      if (options && options.skipGeocoding) {
        onSuccess({ lat, lon })
      } else {
        GeocodingProvider.reverseGeocodeLocation(lat, lon, onSuccess, onError)
      }
    }

    const handlePositionFetchFailed = (error: GeolocationError) => {
      logLocationAcquisitionError(error)
      handleLocationError(error, onError)
    }

    Geolocation.getCurrentPosition(handlePositionFetchSuccess, handlePositionFetchFailed)
  },
}
