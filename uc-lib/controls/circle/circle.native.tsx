import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { useColor } from "../../themes"
import { CircleProps } from "./circle.d"

export const Circle: FC<CircleProps> = props => {
  const { size, color, children } = props
  const { colors } = useColor()

  const circleStyles = React.useMemo(() => {
    return StyleSheet.create({
      container: {
        borderRadius: size / 2,
        width: size,
        height: size,
        backgroundColor: color ? colors[color] : undefined,
        overflow: "hidden",
      },
    })
  }, [size, color])

  return <View style={circleStyles.container}>{children}</View>
}
