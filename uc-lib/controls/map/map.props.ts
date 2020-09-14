export const DEFAULT_MAP_POSITION = {
  lat: 37.78825,
  lng: -122.4324,
}

export interface MapLocation {
  latitude: string
  longitude: string
  placeType?: string
}

export interface MapProps {
  center?: MapLocation
  /**
   * Displays a marker at this location for an item approximation location circle
   */
  itemCircleCenter?: MapLocation
  testID?: string
}
