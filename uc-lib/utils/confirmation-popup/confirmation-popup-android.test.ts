import { ConfirmationPopupOption } from "./confirmation-popup.types"
import { Alert } from "react-native"
import { ShowConfirmationPopupAndroid } from "./confirmation-popup-android"

test("alert", () => {
  const callback = jest.fn()
  const options = [
    { text: "test-option-1", isCancel: true },
    {
      text: "test-option-2",
      callback,
    },
  ] as ConfirmationPopupOption[]
  const alert = jest.spyOn(Alert, "alert").mockImplementation(() => {})
  ShowConfirmationPopupAndroid("test-title", options)
  expect(alert).toHaveBeenCalledWith(
    "test-title",
    undefined,
    [{ text: "test-option-2", onPress: callback }],
    { cancelable: true },
  )
})
