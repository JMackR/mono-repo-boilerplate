import React from "react"
import invariant from "invariant"
import { KeyboardAvoidance } from "./keyboard-avoidance-provider.d"

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

interface KeyboardAvoidanceProviderProps {
  children?: React.ReactNode
  debug?: boolean
}

export const KeyboardAvoidanceContextProvider = (_props: KeyboardAvoidanceProviderProps) => {
  invariant(false, "KeyboardAvoidanceContextProvider is native only")
  return <></>
}

export const useKeyboardAvoidance = (): KeyboardAvoidance => {
  invariant(false, "useKeyboardAvoidance is native only")

  return _KEYBOARD_AVOIDANCE_CONTEXT_DEFAULT
}
