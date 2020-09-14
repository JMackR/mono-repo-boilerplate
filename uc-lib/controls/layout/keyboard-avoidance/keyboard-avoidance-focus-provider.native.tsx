import React, { createContext, useContext } from "react"
import { useKeyboardAvoidance } from "./keyboard-avoidance-provider.native"
import { KeyboardAvoidanceFocus, KeyboardAvoidanceFocusProps } from "./keyboard-avoidance-focus-provider.d"

// tslint:disable: no-magic-numbers
// tslint:disable: no-bitwise

const _KEYBOARD_AVOIDANCE_FOCUS_DEFAULT: KeyboardAvoidanceFocus = {
  keyboardAvoidanceFocus: () => {},
  keyboardAvoidanceBlur: () => {},
  generateFocusId: () => "",
}
const KeyboardAvoidanceFocusContext = createContext(_KEYBOARD_AVOIDANCE_FOCUS_DEFAULT)

export const KeyboardAvoidanceFocusContextProvider = (props: KeyboardAvoidanceFocusProps) => {
  const { viewId, groupId, children } = props
  const { didBlurEvent, didFocusEvent } = useKeyboardAvoidance()
  const context: KeyboardAvoidanceFocus = {
    keyboardAvoidanceFocus: (focusId: string) => {
      if (viewId === undefined) {
        return
      }
      didFocusEvent({ focusId, viewId, groupId })
    },
    keyboardAvoidanceBlur: (focusId: string) => {
      if (viewId === undefined) {
        return
      }
      didBlurEvent({ focusId })
    },
    generateFocusId: (): string => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0
        const v = c === "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    },
  }
  return <KeyboardAvoidanceFocusContext.Provider value={context}>{children}</KeyboardAvoidanceFocusContext.Provider>
}

export const useKeyboardAvoidanceFocus = () => {
  const { keyboardAvoidanceFocus, keyboardAvoidanceBlur, generateFocusId } = useContext(KeyboardAvoidanceFocusContext)

  return { keyboardAvoidanceFocus, keyboardAvoidanceBlur, generateFocusId }
}
