import axios from "axios"
import { GEOCODING_API_KEY } from "../api/keys"
import { AnalyticsDebug } from "../../analytics/analytics-debug"
import { LocationDetails, GeocodingProviderClass } from "./location.d"
import { parseZipFromComponents, parseLocaleFromComponents, handleLocationError } from "./location-common"
import _ from "lodash"

// tslint:disable: no-any
const formatLocationResponse = results => {
  if (!results || !results.length) {
    throw Error("location not found")
  }
  const location = results[0].geometry.location
  const parsedZip = parseZipFromComponents(results[0].address_components)
  const locale = parseLocaleFromComponents(results[0].address_components)
  return {
    lat: location.lat,
    lon: location.lng,
    zipcode: parsedZip,
    locationName: locale,
  }
}

const sendGeoCodeRequest = async (
  url: string,
  onSuccess: (locationDetails: LocationDetails) => void,
  onError: (error: any) => void,
) => {
  try {
    const { data } = await axios(url)
    const result = formatLocationResponse(data.results)
    onSuccess(result)
  } catch (error) {
    //  AnalyticsDebugticsDebug.logGeocodingError({
    //   name: "Geocoder Error",
    //   message: error.message,
    //   stack: error.stack,
    // })
    handleLocationError(error, onError)
  }
}

export const GeocodingProvider: GeocodingProviderClass = {
  reverseGeocodeLocation(
    lat: number,
    lng: number,
    onSuccess: (locationDetails: LocationDetails) => void,
    onError: (error: any) => void,
  ) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEOCODING_API_KEY}`
    axios
      .get(url)
      .then(response => {
        const json = response.data
        if (json.results && json.results.length) {
          const zip = parseZipFromComponents(json.results[0].address_components)
          const locale = parseLocaleFromComponents(json.results[0].address_components)
          onSuccess({
            lat,
            lon: lng,
            zipcode: zip,
            locationName: locale,
          })
        }
      })
      .catch((error: any) => {
        //  AnalyticsDebugticsDebug.logGeocodingError({
        //   name: "Reverse Geocoder Error",
        //   message: error.message,
        //   stack: error.stack,
        // })
        handleLocationError(error, onError)
      })
  },
  geocodeAddress(
    address1: string,
    address2: string,
    city: string,
    state: string,
    zip: string,
    onSuccess: (locationDetails: LocationDetails) => void,
    onError: (error: any) => void,
  ) {
    const formattedAddress = [address1, address2, city, state, zip].filter(Boolean).join(" ")
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${GEOCODING_API_KEY}`
    sendGeoCodeRequest(url, onSuccess, onError)
  },
  geocodeZipcode(zip: string, onSuccess: (locationDetails: LocationDetails) => void, onError: (error: any) => void) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zip}&key=${GEOCODING_API_KEY}`
    sendGeoCodeRequest(url, onSuccess, onError)
  },
}
