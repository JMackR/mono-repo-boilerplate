import { css, StyleSheet } from "aphrodite/no-important"
import invariant from "invariant"
import React from "react"

const styles = StyleSheet.create({
  ouSpacerFlex: {
    flex: 1,
    flexGrow: 1,
  },
})

/**
 * Componenet used to take up all available space between at least two flex components
 */
export const SpacerFlex: React.FC<{}> = ({ children }) => {
  invariant(React.Children.count(children) === 0, "Spacer does not allow children")

  return <div className={css(styles.ouSpacerFlex)} />
}
