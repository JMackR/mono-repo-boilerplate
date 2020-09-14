import { EdgeInsets } from "react-native-safe-area-context"

let headerSafeArea: EdgeInsets = { top: 0, right: 0, bottom: 0, left: 0 }

/**
 * Sets the current navigation safe area
 */
export const setNavigationSafeArea = (safeArea: EdgeInsets) => {
  headerSafeArea = safeArea
}

/**
 * The current navigation safe area
 */
export const getNavigationSafeArea = (): Readonly<EdgeInsets> => headerSafeArea
