import invariant from "invariant"
import React from "react"
import { View, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  flexStyle: {
    flex: 1,
    flexGrow: 1,
  },
})

/**
 * Componenet used to take up all available space between at least two flex components
 */
export const SpacerFlex: React.FC<{}> = ({ children }) => {
  invariant(React.Children.count(children) === 0, "Spacer does not allow children")

  return <View style={styles.flexStyle} />
}
