import React from "react"
import invariant from "invariant"
import { KeyboardAvoidanceContainer } from "./keyboard-avoidance-container-provider.d"

const _KEYBOARD_AVOIDANCE_CONTAINER_DEFAULT: KeyboardAvoidanceContainer = {
  containerId: undefined,
}

interface KeyboardAvoidanceContainerProviderProps {
  containerId?: string
  children?: React.ReactNode
}

export const KeyboardAvoidanceContainerContextProvider = (_props: KeyboardAvoidanceContainerProviderProps) => {
  invariant(false, "KeyboardAvoidanceContainerContextProvider is native only")
  return <></>
}

export const useKeyboardAvoidanceContainer = (): KeyboardAvoidanceContainer => {
  invariant(false, "useKeyboardAvoidanceContainer is native only")
  return _KEYBOARD_AVOIDANCE_CONTAINER_DEFAULT
}
