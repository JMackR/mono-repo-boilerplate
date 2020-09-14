import { css, StyleSheet } from "aphrodite/no-important"
import invariant from "invariant"
import React from "react"

const styles = StyleSheet.create({
  overlay_anchor: {
    position: "relative",
  },
})

/**
 * sets position: relative so children can properly use Overlay
 */
export const OverlayAnchor: React.FC = ({ children }) => {
  invariant(React.Children.count(children) > 0, "OverlayAnchor requires children")

  return <div className={css(styles.overlay_anchor)}>{children}</div>
}
