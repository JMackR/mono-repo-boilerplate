import { ActionSheetIOS, ActionSheetIOSOptions } from "react-native"
import { showConfirmationPopup } from "./confirmation-popup"
import { ConfirmationPopupOption } from "./confirmation-popup.types"

const callback = jest.fn()
const options = [
  { text: "test-option-1", isCancel: true },
  {
    text: "test-option-2",
    callback: () => callback(),
  },
] as ConfirmationPopupOption[]

let showActionSheetWithOptions: any
beforeEach(() => {
  showActionSheetWithOptions = jest
    .spyOn(ActionSheetIOS, "showActionSheetWithOptions")
    .mockImplementation((options: ActionSheetIOSOptions, callback: (buttonIndex: number) => void) =>
      callback(1),
    )
  showConfirmationPopup("test-title", options)
})

test("showActionSheetWithOptions", () => {
  expect(showActionSheetWithOptions).toHaveBeenCalled()
})

test("onButtonPress", () => {
  expect(callback).toHaveBeenCalled()
})
