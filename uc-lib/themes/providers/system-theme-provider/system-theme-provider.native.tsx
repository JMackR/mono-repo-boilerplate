import React from "react"
import { AppearanceProvider } from "react-native-appearance"

export const SystemThemeProvider: React.FC = props => {
  return <AppearanceProvider>{props.children}</AppearanceProvider>
}
