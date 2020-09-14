import React, { FC } from "react"
import GoogleMapReact, { Coords } from "google-map-react"

import { MapMarker } from "./map-marker"
import _ from "lodash"
import { Flex } from "../layout"
import { DEFAULT_MAP_POSITION, MapProps } from "./map.props"

export const Map: FC<MapProps> = ({ children, center }) => {
  const centerCoord: Coords | undefined = React.useMemo(() => {
    return center?.latitude && center.longitude
      ? {
          lat: _.toNumber(center?.latitude),
          lng: _.toNumber(center?.longitude),
        }
      : undefined
  }, [center])

  return (
    <Flex direction="column" grow={1}>
      <GoogleMapReact
        // TO-DO inject api keys in web
        bootstrapURLKeys={{ key: "AIzaSyDiE5cXBu8uAf4SQqwfw7F4JZN17xGph08" }}
        defaultCenter={DEFAULT_MAP_POSITION}
        defaultZoom={14}
        center={centerCoord ?? DEFAULT_MAP_POSITION}
      >
        {center?.placeType && <MapMarker center={center} />}
        {children}
      </GoogleMapReact>
    </Flex>
  )
}
