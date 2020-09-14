import { NativeModules } from "react-native"
const KeyboardNative = NativeModules.Keyboard

export const Keyboard = {
  setAdjustPan() {
    KeyboardNative?.setAdjustPan()
  },
  setAdjustResize() {
    KeyboardNative?.setAdjustResize()
  },
  setAdjustNothing() {
    KeyboardNative?.setAdjustNothing()
  },
}
