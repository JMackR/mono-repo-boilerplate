import React from "react"
import { useColorForBackgroundColor } from "uc-lib/themes"
import { BackgroundProps } from "./background.d"

export const Background: React.FunctionComponent<BackgroundProps> = props => {
  const { type } = props
  const colors = useColorForBackgroundColor(type || "primary")
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: colors,
        zIndex: 0,
      }}
      {...props}
    />
  )
}
