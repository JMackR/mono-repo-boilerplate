import React, { createContext, useEffect, useContext } from "react"
import { Keyboard, Dimensions, Platform, StatusBar, KeyboardEvent } from "react-native"
import { v4 as uuid } from "uuid"
import {
  KeyboardAvoidanceViewLayout,
  KeyboardAvoidanceViewAttributes,
  KeyboardAvoidanceContainerAttributes,
  KeyboardAvoidance,
  KeyboardAvoidanceFocusEvent,
  KeyboardAvoidanceBlurEvent,
} from "./keyboard-avoidance-provider.d"

const _KEYBOARD_AVOIDANCE_CONTEXT_DEFAULT: KeyboardAvoidance = {
  keyboardAvoidingViewDidChangeLayout: () => {},
  didBlurEvent: () => {},
  didFocusEvent: () => {},
  addKeyboardAvoidingView: () => "",
  removeKeyboardAvoidingView: () => {},
  addKeyboardAvoidingContainer: () => "",
  removeKeyboardAvoidingContainer: () => {},
  updateKeyboardAvoidingContainer: () => {},
}
const KeyboardAvoidanceContext = createContext<KeyboardAvoidance>(_KEYBOARD_AVOIDANCE_CONTEXT_DEFAULT)

interface ViewDictionary {
  [index: string]: KeyboardAvoidanceViewAttributes
}

interface ViewLayoutDictionary {
  [index: string]: KeyboardAvoidanceViewLayout
}

interface ContainerDictionary {
  [index: string]: KeyboardAvoidanceContainerAttributes
}

enum EventType {
  KeyboardShow,
  KeyboardHide,
  KeyboardLayoutUpdate,
  Focus,
  Blur,
}

interface KeyboardAvoidanceEvent {
  type: EventType
  params: KeyboardEvent | KeyboardAvoidanceFocusEvent | KeyboardAvoidanceBlurEvent
}

const EVENT_BUFFER_FRAME_MS = 16

const useKeyboardAvoidanceContext = (): KeyboardAvoidance => {
  const focusEventRef = React.useRef<KeyboardAvoidanceFocusEvent>()
  const keyboardShowingEventRef = React.useRef<KeyboardEvent>()
  const viewsRef = React.useRef<ViewDictionary>({})
  const measuredLayoutsRef = React.useRef<ViewLayoutDictionary>({})
  const dirtyLayoutsRef = React.useRef<ViewDictionary>({})
  const isMeasuringLayoutsRef = React.useRef(false)
  const containersRef = React.useRef<ContainerDictionary>({})
  const containersToResetRef = React.useRef<ContainerDictionary>({})
  const eventBufferRef = React.useRef<KeyboardAvoidanceEvent[]>([])
  const flushingBufferRef = React.useRef(false)
  const bufferEnabledRef = React.useRef(false)
  const flushTimeoutRef = React.useRef<number>()

  const extractBufferedKeyboardEvents = () => {
    const keyboardEvents = eventBufferRef.current.filter(e =>
      [EventType.KeyboardHide, EventType.KeyboardShow, EventType.KeyboardLayoutUpdate].includes(e.type),
    )
    let hideEvent: KeyboardEvent | undefined
    let showEvent: KeyboardEvent | undefined
    let updateEvent: KeyboardEvent | undefined
    keyboardEvents.forEach(e => {
      if (e.type === EventType.KeyboardHide) {
        showEvent = undefined
        updateEvent = undefined
        hideEvent = e.params as KeyboardEvent
      }
      if (e.type === EventType.KeyboardShow) {
        hideEvent = undefined
        updateEvent = undefined
        showEvent = e.params as KeyboardEvent
      }
      if (e.type === EventType.KeyboardLayoutUpdate && hideEvent === undefined && showEvent === undefined) {
        updateEvent = e.params as KeyboardEvent
      }
    })

    return { hideEvent, showEvent, updateEvent }
  }

  const updateFocusForBuffer = () => {
    const focusBlurEvents = eventBufferRef.current.filter(e => [EventType.Blur, EventType.Focus].includes(e.type))
    focusBlurEvents.forEach(e => {
      if (e.type === EventType.Blur) {
        if ((e.params as KeyboardAvoidanceBlurEvent).focusId === focusEventRef.current?.focusId) {
          focusEventRef.current = undefined
        }
      }
      if (e.type === EventType.Focus) {
        focusEventRef.current = e.params as KeyboardAvoidanceFocusEvent
      }
    })
  }

  const tryAndConsumeShowEvent = (e: KeyboardEvent) => {
    if (Object.keys(dirtyLayoutsRef.current).length > 0) {
      measureViews()
    } else if (focusEventRef.current) {
      const updatedContainers = updateContainersForShown(e)
      const updatedContainerKeys = Object.keys(updatedContainers)
      const containersToReset: ContainerDictionary = {}
      Object.entries(containersToResetRef.current).forEach(([k, v]) => {
        if (!updatedContainerKeys.includes(k)) {
          containersToReset[k] = v
        }
      })
      Object.entries(containersToReset).forEach(([_k, v]) => v.animateForHidden(0))
      containersToResetRef.current = updatedContainers
      keyboardShowingEventRef.current = e
      return
    }

    return e
  }

  const consumeHideEvent = (e: KeyboardEvent) => {
    Object.entries(containersToResetRef.current).forEach(([_k, v]) =>
      v.animateForHidden(Platform.OS === "ios" ? e.duration : 0, e),
    )
    containersToResetRef.current = {}
    keyboardShowingEventRef.current = undefined
  }

  const tryAndConsumeUpdateEvent = (e: KeyboardEvent) => {
    if (Object.keys(dirtyLayoutsRef.current).length > 0) {
      measureViews()
    } else {
      updateContainersForShown(e, 0)
      return
    }

    return e
  }

  const flushEventBuffer = () => {
    const { hideEvent, showEvent, updateEvent } = extractBufferedKeyboardEvents()

    updateFocusForBuffer()

    let forwardShow: KeyboardEvent | undefined
    let forwardUpdate: KeyboardEvent | undefined
    if (showEvent) {
      forwardShow = tryAndConsumeShowEvent(showEvent)
    } else if (hideEvent) {
      consumeHideEvent(hideEvent)
    } else if (updateEvent) {
      forwardUpdate = tryAndConsumeUpdateEvent(updateEvent)
    }

    eventBufferRef.current = []
    if (forwardShow) {
      eventBufferRef.current.push({
        type: EventType.KeyboardShow,
        params: forwardShow,
      })
    }
    if (forwardUpdate) {
      eventBufferRef.current.push({
        type: EventType.KeyboardLayoutUpdate,
        params: forwardUpdate,
      })
    }
    flushTimeoutRef.current = undefined
    flushingBufferRef.current = false
  }

  const scheduleBufferFlush = (at?: number) => {
    if (flushingBufferRef.current) {
      return
    }

    flushingBufferRef.current = true
    if (at && at > 0) {
      flushTimeoutRef.current = setTimeout(flushEventBuffer, at)
    } else {
      flushEventBuffer()
    }
  }

  const bufferEvent = (e: KeyboardAvoidanceEvent) => {
    if (!bufferEnabledRef.current) {
      return
    }

    eventBufferRef.current.push(e)
    scheduleBufferFlush(EVENT_BUFFER_FRAME_MS)
  }

  const keyboardDidShow = (e: KeyboardEvent) => {
    bufferEvent({ type: EventType.KeyboardShow, params: e })
  }

  const keyboardDidHide = (e: KeyboardEvent) => {
    bufferEvent({ type: EventType.KeyboardHide, params: e })
  }

  const measureViews = () => {
    if (isMeasuringLayoutsRef.current) {
      return
    }

    isMeasuringLayoutsRef.current = true
    const layoutsToMeasure = dirtyLayoutsRef.current

    const getMeasureCallback = (viewId: string) => {
      return (measuredLayout?: KeyboardAvoidanceViewLayout) => {
        if (viewsRef.current[viewId] !== undefined && measuredLayout !== undefined) {
          measuredLayoutsRef.current[viewId] = measuredLayout
        } else {
          delete measuredLayoutsRef.current[viewId]
        }
        delete layoutsToMeasure[viewId]
        delete dirtyLayoutsRef.current[viewId]
        isMeasuringLayoutsRef.current = Object.keys(layoutsToMeasure).length > 0
        if (!isMeasuringLayoutsRef.current && eventBufferRef.current.length > 0) {
          scheduleBufferFlush()
        }
      }
    }

    Object.entries(layoutsToMeasure).forEach(([k, v]) => {
      containersRef.current[v.containerId]?.measureView(k, v, getMeasureCallback(k))
    })
  }

  const updateContainersForShown = (e: KeyboardEvent, duration?: number): ContainerDictionary => {
    const keyboardY = Dimensions.get("window").height - e.endCoordinates.height

    const filteredViews = Object.keys(measuredLayoutsRef.current).filter(key => {
      if (focusEventRef.current === undefined) {
        return false
      }
      const viewAttribs = viewsRef.current[key]
      if (viewAttribs === undefined) {
        return false
      }
      const { activeInGroups } = viewAttribs
      if (activeInGroups !== undefined) {
        if (activeInGroups.length === 0) {
          return true
        }
        if (focusEventRef.current.groupId !== undefined && activeInGroups.includes(focusEventRef.current.groupId)) {
          return true
        }
      }
      return key === focusEventRef.current.viewId
    })

    let stackOffset = Platform.OS === "ios" ? 0 : StatusBar.currentHeight || 0
    const stackSortedKeys = filteredViews.sort((ka, kb) => {
      const stackOrderA = viewsRef.current[ka]?.stackOrder || 0
      const stackOrderB = viewsRef.current[kb]?.stackOrder || 0
      return stackOrderA - stackOrderB
    })
    const updatedContainers: ContainerDictionary = {}
    stackSortedKeys.forEach(key => {
      const layout = measuredLayoutsRef.current[key]
      const containerattribs = containersRef.current[layout.containerId]
      if (containerattribs) {
        containerattribs.animateForShown(
          layout,
          keyboardY - stackOffset,
          duration !== undefined ? duration : Platform.OS === "ios" ? e.duration : 0,
          e,
        )
        updatedContainers[layout.containerId] = containerattribs
      }
      stackOffset += layout.height
    })

    return updatedContainers
  }

  const keyboardAvoidingViewDidChangeLayout = (viewId: string) => {
    const viewattribs = viewsRef.current[viewId]
    if (dirtyLayoutsRef.current[viewId] !== undefined || viewattribs === undefined) {
      return
    }
    dirtyLayoutsRef.current[viewId] = viewattribs
    if (focusEventRef.current && keyboardShowingEventRef.current) {
      bufferEvent({
        type: EventType.KeyboardLayoutUpdate,
        params: keyboardShowingEventRef.current,
      })
    }
  }

  const didFocusEvent = (e: KeyboardAvoidanceFocusEvent) => {
    bufferEvent({ type: EventType.Focus, params: e })
  }

  const didBlurEvent = (e: KeyboardAvoidanceBlurEvent) => {
    bufferEvent({ type: EventType.Blur, params: e })
  }

  const addKeyboardAvoidingView = (viewAttributes: KeyboardAvoidanceViewAttributes): string => {
    const id = uuid()
    viewsRef.current[id] = viewAttributes
    return id
  }

  const removeKeyboardAvoidingView = (viewId: string) => {
    if (viewsRef.current[viewId] === undefined) {
      return
    }

    delete viewsRef.current[viewId]
  }

  const addKeyboardAvoidingContainer = (containerAttributes: KeyboardAvoidanceContainerAttributes): string => {
    const id = uuid()
    containersRef.current[id] = containerAttributes
    bufferEnabledRef.current = true
    return id
  }

  const removeKeyboardAvoidingContainer = (containerId: string) => {
    if (containersRef.current[containerId] === undefined) {
      return
    }

    delete containersRef.current[containerId]
    bufferEnabledRef.current = Object.keys(containersRef.current).length > 0
  }

  const updateKeyboardAvoidingContainer = (
    containerId: string,
    containerAttributes: KeyboardAvoidanceContainerAttributes,
  ) => {
    if (containersRef.current[containerId] === undefined) {
      return
    }

    containersRef.current[containerId] = containerAttributes
  }

  useEffect(() => {
    const showListener = Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow"
    const hideListener = Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide"

    Keyboard.addListener(showListener, keyboardDidShow)
    Keyboard.addListener(hideListener, keyboardDidHide)

    return () => {
      Keyboard.removeListener(showListener, keyboardDidShow)
      Keyboard.removeListener(hideListener, keyboardDidHide)
      if (flushTimeoutRef.current !== undefined) {
        clearTimeout(flushTimeoutRef.current)
      }
    }
  }, [])

  return {
    keyboardAvoidingViewDidChangeLayout,
    addKeyboardAvoidingView,
    removeKeyboardAvoidingView,
    didBlurEvent,
    didFocusEvent,
    addKeyboardAvoidingContainer,
    removeKeyboardAvoidingContainer,
    updateKeyboardAvoidingContainer,
  }
}

interface KeyboardAvoidanceProviderProps {
  children?: React.ReactNode
  debug?: boolean
}

export const KeyboardAvoidanceContextProvider = (props: KeyboardAvoidanceProviderProps) => {
  const context = useKeyboardAvoidanceContext()
  return <KeyboardAvoidanceContext.Provider value={context}>{props.children}</KeyboardAvoidanceContext.Provider>
}

export const useKeyboardAvoidance = (): KeyboardAvoidance => {
  const {
    keyboardAvoidingViewDidChangeLayout,
    addKeyboardAvoidingView,
    removeKeyboardAvoidingView,
    didBlurEvent,
    didFocusEvent,
    addKeyboardAvoidingContainer,
    removeKeyboardAvoidingContainer,
    updateKeyboardAvoidingContainer,
  } = useContext(KeyboardAvoidanceContext)

  return {
    keyboardAvoidingViewDidChangeLayout,
    addKeyboardAvoidingView,
    removeKeyboardAvoidingView,
    didBlurEvent,
    didFocusEvent,
    addKeyboardAvoidingContainer,
    removeKeyboardAvoidingContainer,
    updateKeyboardAvoidingContainer,
  }
}
