import { ConfirmationPopupOption } from "./confirmation-popup.types"
import { Alert } from "react-native"
import R from "ramda"

/**
 * Displays a confirmation popup, specific to Android
 * @param title the title of the confirmation popup
 * @param options an array of {@link ConfirmationPopupOption}
 */
export const ShowConfirmationPopupAndroid = (title: string, options: ConfirmationPopupOption[]) => {
  Alert.alert(
    title,
    undefined,
    R.map(
      ({ text, callback }) => ({ text, onPress: callback }),
      R.reject(option => !!option.isCancel, options),
    ),
    { cancelable: true },
  )
}
