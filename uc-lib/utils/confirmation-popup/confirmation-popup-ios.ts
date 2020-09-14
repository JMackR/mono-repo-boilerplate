import { ActionSheetIOS } from "react-native"
import { ConfirmationPopupOption } from "./confirmation-popup.types"
import R from "ramda"

/**
 * Displays a confirmation popup, specific to iOS
 * @param title (not used)
 * @param options an array of {@link ConfirmationPopupOption}
 */
export const ShowConfirmationPopupIOS = (title: string, options: ConfirmationPopupOption[]) => {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: R.map(R.prop("text"), options),
      destructiveButtonIndex: options.findIndex(option => option.isDestructive),
      cancelButtonIndex: options.findIndex(option => option.isCancel),
    },
    (buttonIndex: number) => {
      const option = options[buttonIndex]
      option?.callback && option.callback()
    },
  )
}
