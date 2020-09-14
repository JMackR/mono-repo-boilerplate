import React, { useState, useEffect } from "react"
import { ModalCardHost } from "./modal-card-host"
import invariant from "invariant"
import { NavigableRoute } from "../../navigation/navigator/navigableroute"
import { NavigatorParamList } from "../../navigation/navigator"
import { ScreenRoute } from "../../navigation/route"
import { useModal } from "./context/modal-provider"

export const StaticModalPopup: React.FC<ScreenRoute<NavigatorParamList, NavigableRoute.ModalCard>> = ({ route }) => {
  invariant(route.params.props !== undefined, "must have modal_props sent in as param")
  const { consume, getModalCardProps } = useModal()
  const props = getModalCardProps(route.params.props.modalId)
  invariant(props !== undefined, "attempted to show modal with no cached props")
  useEffect(() => {
    return () => consume(route.params.props.modalId)
  }, [])
  return <ModalCardHost modalProps={props} />
}
