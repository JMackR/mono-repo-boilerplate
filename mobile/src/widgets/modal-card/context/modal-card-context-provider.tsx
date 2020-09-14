import React, { useState, useRef } from "react"
import { LeftButtonIconType, SnapPointsType } from "../modal-card.props"
import { ModalHostContext } from "./modal-card-context"
import { ModalHostContextProps } from "./modal-card-host-context-props"
import BottomSheet from "reanimated-bottom-sheet"
import { UUID } from "../../../utilities"

export const ModalCardContextProvider = (props: ModalHostContextProps) => {
  const [backButton, setBackButton] = useState<LeftButtonIconType>(
    props.modalProps.leftButtonType ? props.modalProps.leftButtonType : "close",
  )
  const [title, setTitle] = useState<string>(props.modalProps.title)
  const [testID, setTestID] = useState<string>(props.modalProps.testID)
  const [snapPoints, setSnapPoints] = useState<SnapPointsType>(props.modalProps.snapPoints)

  const [snapIndex, setSnapIndex] = useState<number>(props.modalProps.initialSnap || 0)

  const ref = useRef<BottomSheet>(null)

  const collapse = () => {
    refSafeSnapTo(0)
  }

  const refSafeSnapTo = (index: number) => {
    ref && ref.current && ref.current.snapTo(index)
  }

  return (
    <ModalHostContext.Provider
      value={{
        collapse,
        ref,
        refSafeSnapTo,
        backButton,
        setBackButton,
        title,
        setTitle,
        snapPoints,
        setSnapPoints,
        snapIndex,
        setSnapIndex,
        testID,
        setTestID,
      }}
    >
      {props.children}
    </ModalHostContext.Provider>
  )
}

let collapseListeners: { [key: string]: () => void } = {}

export const ModalCardCollapseListenerController = {
  generateListenerId: () => {
    return UUID.uuid()
  },

  addCollapseListener: (listenerId: string, callback: () => void) => {
    collapseListeners[listenerId] = callback
  },

  removeCollapseListener: (collapseListenerId: string) => {
    delete collapseListeners[collapseListenerId]
  },

  invokeCollapseListeners: () => {
    Object.keys(collapseListeners).forEach(key => {
      collapseListeners[key]()
    })
    collapseListeners = {}
  },
}

export const useCollapseCallback = (collapseCallback: () => void, dependentParams?: React.DependencyList) => {
  const [listenerId] = React.useState<string>(ModalCardCollapseListenerController.generateListenerId())

  React.useEffect(() => {
    ModalCardCollapseListenerController.addCollapseListener(listenerId, collapseCallback)
    return () => {
      ModalCardCollapseListenerController.removeCollapseListener(listenerId)
    }
  }, dependentParams)
}

let openListeners: { [key: string]: () => void } = {}

export const ModalCardOpenListenerController = {
  generateListenerId: () => {
    return UUID.uuid()
  },

  addOpenListener: (listenerId: string, callback: () => void) => {
    openListeners[listenerId] = callback
  },

  removeOpenListener: (collapseListenerId: string) => {
    delete openListeners[collapseListenerId]
  },

  invokeOpenListeners: () => {
    Object.keys(openListeners).forEach(key => {
      openListeners[key]()
    })
    openListeners = {}
  },
}

export const useOpenCallback = (openCallback: () => void, dependentParams?: React.DependencyList) => {
  const [listenerId] = React.useState<string>(ModalCardOpenListenerController.generateListenerId())

  React.useEffect(() => {
    ModalCardOpenListenerController.addOpenListener(listenerId, openCallback)
    return () => {
      ModalCardOpenListenerController.removeOpenListener(listenerId)
    }
  }, dependentParams)
}
