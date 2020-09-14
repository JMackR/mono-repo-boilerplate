import React, { FC } from "react"
import { Text } from "uc-lib/controls/text/text"
import { View } from "react-native"
import { Flex } from "uc-lib"
import { useColorForTextColor } from "../../themes"
import { StrikeThroughTextProps } from "./strike-through-text.props"

const EXPECTED_LINE_TOP = 10

const StrikeThroughText: FC<StrikeThroughTextProps> = props => {
  const lineColor = useColorForTextColor(props.lineColor)

  return (
    <Flex>
      <Text {...props} />
      <View
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          top: EXPECTED_LINE_TOP,
          height: 2,
          backgroundColor: lineColor,
        }}
      />
    </Flex>
  )
}

export { StrikeThroughText }
