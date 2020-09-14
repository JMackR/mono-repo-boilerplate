import React, { createContext, useContext } from "react"
import { KeyboardAvoidanceContainer } from "./keyboard-avoidance-container-provider.d"

const _KEYBOARD_AVOIDANCE_CONTAINER_DEFAULT: KeyboardAvoidanceContainer = {
  containerId: undefined,
}
const KeyboardAvoidanceContainerContext = createContext(_KEYBOARD_AVOIDANCE_CONTAINER_DEFAULT)

interface KeyboardAvoidanceContainerProviderProps {
  containerId?: string
  children?: React.ReactNode
}

export const KeyboardAvoidanceContainerContextProvider = (props: KeyboardAvoidanceContainerProviderProps) => {
  const { children, containerId } = props
  const context = { containerId }

  return <KeyboardAvoidanceContainerContext.Provider value={context}>{children}</KeyboardAvoidanceContainerContext.Provider>
}

export const useKeyboardAvoidanceContainer = (): KeyboardAvoidanceContainer => {
  const { containerId } = useContext(KeyboardAvoidanceContainerContext)

  return { containerId }
}
