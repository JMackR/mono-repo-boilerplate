import React from "react"

/**
 * on Native, a passthrough view so this can be used in conjuction with web.
 *
 * ON WEB:sets position: relative so children can properly use Overlay
 */
export const OverlayAnchor: React.FC = ({ children }) => {
  return <>{children}</>
}
