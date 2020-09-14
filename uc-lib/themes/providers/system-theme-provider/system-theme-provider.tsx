import React from "react"

// System Theme Provider is pass through on web, but required for native
export const SystemThemeProvider: React.FC = props => {
  return <>{props.children}</>
}
