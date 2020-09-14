import React from "react"
import { View } from "react-native"
import { useMargin } from "uc-lib/themes"
import { SpacerProps } from "./spacer.d"
import invariant from "invariant"

export const Spacer: React.FC<SpacerProps> = props => {
  const { children, sizeStep, direction } = props

  invariant(React.Children.count(children) === 0, "Spacer does not allow children")

  const { baseMargin } = useMargin()

  const styles = React.useMemo(() => {
    const multipliedSize = sizeStep * baseMargin
    return {
      height: direction === "column" ? multipliedSize : undefined,
      width: direction === "row" ? multipliedSize : undefined,
      zIndex: -1000,
    }
  }, [sizeStep, direction, baseMargin])

  return <View style={styles} />
}
