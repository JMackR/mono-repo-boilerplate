import { BackgroundColors, ScreenProviderProps } from "uc-lib"

export interface ScreenProps extends ScreenProviderProps {
  safeAreaMode: "top" | "bottom" | "all" | "none"
  backgroundColor?: keyof BackgroundColors
  forceStatusBarTint?: "light" | "dark"
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
  debugScreen?: boolean
  dismissKeyboardOnTap?: boolean
  /**
   * Android keyboard avoidance mode, "windowSoftInputMode"
   */
  androidSoftInputMode?: "adjustPan" | "adjustResize" | "adjustNothing"
  onFocus?: () => void
  onBlur?: () => void
  hidden?: boolean
}
