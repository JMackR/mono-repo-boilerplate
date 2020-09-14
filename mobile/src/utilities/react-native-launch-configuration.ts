import { YellowBox, Text, TextInput } from "react-native"

export const setupReactNativeLaunchConfiguration = () => {
  // This is required to disable fontScaling until we have baked in support for it.
  // Yes, this shows errors in VSCode, yes it actually works at runtime.
  Text.defaultProps = Text.defaultProps || {}
  Text.defaultProps.allowFontScaling = false

  TextInput.defaultProps = TextInput.defaultProps || {}
  TextInput.defaultProps.allowFontScaling = false

  // YellowBox.ignoreWarnings(["Non-serializable values were found in the navigation state", "Setting a timer"])
}
