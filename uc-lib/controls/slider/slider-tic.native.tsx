import React from "react"
import { View, ViewStyle } from "react-native"
import { useColor } from "../../themes"

interface SliderTicProps {
  posX: number
}

export const SliderTic = (props: SliderTicProps) => {
  const { posX } = props
  const { colors } = useColor()

  const ticStyle: ViewStyle = {
    position: "absolute",
    left: posX,
    height: 4,
    width: 1,
    backgroundColor: colors.basalt,
  }

  return <View style={ticStyle} />
}
