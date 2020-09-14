/**
 * @format
 */
import React from "react"
import { AppRegistry, Platform, Text, View } from "react-native"
import { name as appName } from "./app.json"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { AppProvider } from "./src/providers/app-provider"
import { initializeNavigation } from "./src/navigation/navigation"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { Navigator } from "./src/navigation/navigator"
import { setupReactNativeLaunchConfiguration as config } from "./src/utilities/react-native-launch-configuration"

const translations = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require("shared-lib/translations/en.json"),
}
const Main = () => {
  config()
  const navigationRef = React.useRef<NavigationContainerRef>(null)
  initializeNavigation(navigationRef)

  /**
   * Android has proper metrics on start and actually has a funny jump before content is on the screen to fill it up.
   */

  const initialMetrics = Platform.OS === "android" ? undefined : initialWindowMetrics
  return (
    <AppProvider translations={translations}>
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <NavigationContainer ref={navigationRef}>
          <Navigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  )
}
AppRegistry.registerComponent(appName, () => Main)
