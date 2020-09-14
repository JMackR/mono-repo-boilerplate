import { Platform } from "react-native"
import { ShowConfirmationPopupAndroid } from "./confirmation-popup-android"
import { ShowConfirmationPopupIOS } from "./confirmation-popup-ios"

/**
 * Displays a platform-specific confirmation popup
 */
export const showConfirmationPopup = Platform.select({
  android: ShowConfirmationPopupAndroid,
  ios: ShowConfirmationPopupIOS,
})
