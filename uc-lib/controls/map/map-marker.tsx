import React, { FC } from "react"
import _ from "lodash"
import {
  LocationPinFill,
  CommunityMeetupLibraryIcon,
  CommunityMeetupPoliceStation,
  CommunityMeetupStore,
} from "../../assets"
import { SVG, LocalSVGSource } from "../image"
import { MapLocation } from "./map.props"

const MARKER_SIZE = 48
export const MapMarker: FC<{ center?: MapLocation }> = ({ center }) => {
  const meetupSpotMarker = (meetupLocation?: MapLocation): LocalSVGSource => {
    if (!meetupLocation) {
      return LocationPinFill
    }
    switch (meetupLocation.placeType) {
      case "library":
        return CommunityMeetupLibraryIcon
      case "police":
        return CommunityMeetupPoliceStation
      case "store":
        return CommunityMeetupStore
      default:
        return LocationPinFill
    }
  }
  return (
    <SVG
      tint="brand"
      localSVG={_.extend(meetupSpotMarker(center), {
        size: { width: MARKER_SIZE, height: MARKER_SIZE },
      })}
    />
  )
}
