import React from "react"
import { Text, View } from "react-native"
import { Screen } from "../../widgets/screen"
import { translate } from "shared-lib"
import { NavigationBar } from "uc-lib/widgets"

export const ProfileScreen = () => {
  const [focused, setFocused] = React.useState(false)
  const onFocus = () => {
    setFocused(true)
  }

  const onBlur = () => {
    setFocused(false)
  }
  return (
    <Screen backgroundColor={"secondary"} safeAreaMode="top" onFocus={onFocus} onBlur={onBlur}>
      <NavigationBar
        title={translate("profile-stack.profile-screen.header")}
        isRootNavBar={true}
        testID="inbox-screen.navigation-bar"
      />
    </Screen>
  )
}
