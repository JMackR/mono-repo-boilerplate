import _ from "lodash"
import React, { FC, useEffect, useRef } from "react"
import { Platform } from "react-native"
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps"
import { Flex } from "../layout"
import { MapMarker } from "./map-marker"
import { DEFAULT_MAP_POSITION, MapProps, MapLocation } from "./map.props"
import { _MAP_CIRCLE_RADIUS_METERS, _MAP_CIRCLE_ALPHA, _MAP_LAT_DELTA, _MAP_LONG_DELTA } from "./map-constants"
import { useColor } from "../../themes"

const DELTA = {
  latitudeDelta: _MAP_LAT_DELTA,
  longitudeDelta: _MAP_LONG_DELTA,
}

const ANIMATION_DURATION = 200
const parseToLatLng = (center?: MapLocation): LatLng => {
  return {
    latitude: _.toNumber(center?.latitude) || DEFAULT_MAP_POSITION.lat,
    longitude: _.toNumber(center?.longitude) || DEFAULT_MAP_POSITION.lng,
  }
}
export const Map: FC<MapProps> = ({ children, center, itemCircleCenter }) => {
  const mapProvider = Platform.OS === "android" ? PROVIDER_GOOGLE : null
  const colors = useColor().colors
  const mapView = useRef<MapView | null>(null)
  useEffect(() => {
    if (!center || !mapView.current) {
      return
    }
    mapView.current.animateToRegion({ ...parseToLatLng(center), ...DELTA }, ANIMATION_DURATION)
  }, [center])
  return (
    <Flex direction="column" grow={1}>
      <MapView
        ref={mapView}
        style={{ flex: 1 }}
        provider={mapProvider}
        initialRegion={{
          latitude: DEFAULT_MAP_POSITION.lat,
          longitude: DEFAULT_MAP_POSITION.lng,
          ...DELTA,
        }}
      >
        {center?.placeType && (
          <Marker coordinate={parseToLatLng(center)}>
            <MapMarker center={center} />
          </Marker>
        )}
        {itemCircleCenter && (
          <Circle
            center={{
              latitude: _.toNumber(itemCircleCenter.latitude),
              longitude: _.toNumber(itemCircleCenter.longitude),
            }}
            radius={_MAP_CIRCLE_RADIUS_METERS}
            fillColor={colors.green + _MAP_CIRCLE_ALPHA.toString(16).toUpperCase()}
            strokeWidth={0}
            strokeColor="#0000"
          />
        )}
        {children}
      </MapView>
    </Flex>
  )
}
