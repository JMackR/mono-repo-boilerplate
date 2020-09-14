import React from "react"
import { KeyboardAvoidanceFocus, KeyboardAvoidanceFocusProps } from "./keyboard-avoidance-focus-provider.d"
import invariant from "invariant"

export const KeyboardAvoidanceFocusContextProvider = (_props: KeyboardAvoidanceFocusProps) => {
  invariant(false, "KeyboardAvoidanceFocusContextProvider is native only")
  return <></>
}

export const useKeyboardAvoidanceFocus = (): KeyboardAvoidanceFocus => {
  invariant(false, "useKeyboardAvoidanceFocus is native only")
}
