import { Platform } from "react-native"
import { opacity } from "./color"

type KeyboardBehaviorType = "padding" | undefined

/** App wide constants, for theming */
export const globals = {
  /** Standard, app-wide active opacity (pressed state) value */
  activeOpacity: opacity.down,
  /** The default keyboard behavior for this platform */
  keyboardBehavior: Platform.select<KeyboardBehaviorType>({ ios: "padding" }),
  /** The delay for press states when part of a list */
  scrollPressDelay: 300,
  /** The default transition time */
  transition: 250,
}
