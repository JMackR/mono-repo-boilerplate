import { pickBy } from "lodash"
import { AnalyticsDebug } from "../../analytics/analytics-debug"
import { LocationDetails } from "./location.d"
import { StorageController, USER_SEARCH_LOCATION_STORAGE_KEY } from "../storage"
import _ from "lodash"
import { GeocodingProvider } from "./geocoding-provider"

export const MAX_PICKUP_DISTANCE_MILES = 50
const EARTH_RADIUS_IN_MILES = 3958.8

export const getUserSearchLocation = async (fallbackZipcode?: string): Promise<LocationDetails | undefined> => {
  const storedSearchLocation = await StorageController<LocationDetails>(USER_SEARCH_LOCATION_STORAGE_KEY).getItem()
  if (storedSearchLocation) {
    return storedSearchLocation
  } else if (fallbackZipcode) {
    const fallbackSearchLocation: LocationDetails = {
      zipcode: fallbackZipcode,
    }
    return fallbackSearchLocation
  }
  return undefined
}

export const saveUserSearchLocation = async (userLocation: LocationDetails) => {
  await StorageController<LocationDetails>(USER_SEARCH_LOCATION_STORAGE_KEY).setItem(userLocation)
}

export const didSearchLocationChange = (
  existingSearchLocation: LocationDetails | undefined,
  updatedLocation: LocationDetails,
) => {
  if (!existingSearchLocation) {
    return true
  }

  if (existingSearchLocation.zipcode !== updatedLocation.zipcode) {
    return true
  }

  if (updatedLocation.didUseGPS) {
    return true
  }

  if (existingSearchLocation.didUseGPS !== updatedLocation.didUseGPS) {
    return true
  }

  return false
}

export const isSetZipCodeFTUE = async () => {
  const location = await StorageController<LocationDetails>(USER_SEARCH_LOCATION_STORAGE_KEY).getItem()
  return !location || location.default
}

export const hasFullLocationDetails = (locationDetails: LocationDetails): boolean => {
  const requiredKeys: (keyof LocationDetails)[] = ["lat", "lon", "zipcode", "locationName"]
  const locationDetailsKeys = Object.keys(pickBy(locationDetails))
  const hasValidInput = requiredKeys.every(key => locationDetailsKeys.includes(key))
  return hasValidInput
}

// tslint:disable-next-line: no-any
export const logLocationAcquisitionError = (error: any) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      AnalyticsDebug.logLocationError({
        name: "Location Error: Access is denied!",
        message: error.message,
      })
      break
    case error.POSITION_UNAVAILABLE:
      AnalyticsDebug.logLocationError({
        name: "Location Error: Position is unavailable!",
        message: error.message,
      })
      break
    case error.TIMET:
      AnalyticsDebug.logLocationError({
        name: "Location Error: Timeout reached!",
        message: error.message,
      })
      break
    default:
      AnalyticsDebug.logLocationError({
        name: "Location Error",
        message: error.message,
      })
      break
  }
}

export const distanceToListing = async (itemLocation: LocationDetails) => {
  let distance
  const buyerLocation = await getUserSearchLocation()
  if (buyerLocation) {
    if (buyerLocation.lat && buyerLocation.lon && itemLocation.latitude && itemLocation.longitude) {
      distance = getDistanceFromLatLonInMiles(
        buyerLocation.lat,
        buyerLocation.lon,
        _.toNumber(itemLocation.latitude),
        _.toNumber(itemLocation.longitude),
      )
    } else if (buyerLocation.zipcode && itemLocation.zipcode) {
      distance = await new Promise<number>((resolve, reject) => {
        let buyerGeocoded: LocationDetails
        let itemGeocoded: LocationDetails
        const onGeocodeSucceeded = () => {
          if (buyerGeocoded && itemGeocoded) {
            if (buyerGeocoded.lat && buyerGeocoded.lon && itemGeocoded.lat && itemGeocoded.lon) {
              resolve(getDistanceFromLatLonInMiles(buyerGeocoded.lat, buyerGeocoded.lon, itemGeocoded.lat, itemGeocoded.lon))
            }
          }
        }
        GeocodingProvider.geocodeZipcode(
          buyerLocation.zipcode!,
          location => {
            buyerGeocoded = location
            onGeocodeSucceeded()
          },
          _error => {
            reject()
          },
        )
        GeocodingProvider.geocodeZipcode(
          itemLocation.zipcode!,
          location => {
            itemGeocoded = location
            onGeocodeSucceeded()
          },
          _error => {
            reject()
          },
        )
      })
    }
  }

  return distance
}

export const buyerCanPickupItem = async (itemLocation: LocationDetails) => {
  const distanceInMiles = await distanceToListing(itemLocation)
  return distanceInMiles ? distanceInMiles <= MAX_PICKUP_DISTANCE_MILES : true
}

/**
 * Using solution from https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
 * Haversine is a standard algorithm for getting the distance between two points on a globe
 */
const getDistanceFromLatLonInMiles = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = EARTH_RADIUS_IN_MILES
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in miles
  return d
}

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180)
}
