import React from "react"
import { BackgroundProps } from "../../background/background.d"
import { useColorForBackgroundColor } from "uc-lib/themes/hooks/use-color"

export const BackgroundContainer: React.FunctionComponent<BackgroundProps> = props => {
  const { type, children } = props
  const color = useColorForBackgroundColor(type || "primary")
  return (
    <div
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </div>
  )
}
