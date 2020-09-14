import { Exception } from "../../network"

export interface LocationDetails {
  lat?: number
  lon?: number
  zipcode?: string
  locationName?: string
  didUseGPS?: boolean
  default?: boolean
}

export enum LocationAcquisitionErrorReason {
  PermissionDenied,
  LocationUnavailable,
  NetworkTimeout,
  Other,
}

export type LocationSuccessCallback = (locationDetails: LocationDetails) => void
export type LocationErrorCallback = (error: Exception, reason?: LocationAcquisitionErrorReason) => void

export interface LocationFetchingOptions {
  skipGeocoding?: boolean
}

export interface LocationProviderClass {
  getCurrentLocation: (
    onSuccess: LocationSuccessCallback,
    onError: LocationErrorCallback,
    options?: LocationFetchingOptions,
  ) => void
}

export interface GeocodingProviderClass {
  reverseGeocodeLocation: (
    lat: number,
    lng: number,
    onSuccess: LocationSuccessCallback,
    onError: LocationErrorCallback,
  ) => void
  geocodeAddress: (
    address1: string,
    address2: string,
    city: string,
    state: string,
    zip: string,
    onSuccess: LocationSuccessCallback,
    onError: LocationErrorCallback,
  ) => void
  geocodeZipcode: (zip: string, onSuccess: LocationSuccessCallback, onError: LocationErrorCallback) => void
}
