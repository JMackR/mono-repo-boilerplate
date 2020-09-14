import { useColorForBackgroundColor } from "uc-lib/themes/hooks/use-color"
import React from "react"
import { View, StyleSheet } from "react-native"
import { BackgroundProps } from "../../background/background.d"

export const BackgroundContainer: React.FunctionComponent<BackgroundProps> = props => {
  const { type, borderRadius, children, testID } = props
  const color = useColorForBackgroundColor(type || "primary")
  const STYLES = StyleSheet.create({
    container: {
      backgroundColor: color,
      borderRadius,
    },
  })
  return (
    <View style={STYLES.container} testID={testID} accessibilityLabel={testID}>
      {children}
    </View>
  )
}
