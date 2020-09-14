import React, { FC } from "react"
import { Text } from "uc-lib/controls/text/text"
import { Flex } from "uc-lib"
import { useColorForTextColor } from "../../themes"
import { StrikeThroughTextProps } from "./strike-through-text.props"
import { StyleSheet, css } from "aphrodite"

const EXPECTED_LINE_TOP = 10

const StrikeThroughText: FC<StrikeThroughTextProps> = props => {
  const lineColor = useColorForTextColor(props.lineColor)

  const style = StyleSheet.create({
    line: {
      position: "absolute",
      right: 0,
      left: 0,
      top: EXPECTED_LINE_TOP,
      height: 2,
      backgroundColor: lineColor,
    },
  })

  return (
    <Flex>
      <Text {...props} />
      <div className={css(style.line)} />
    </Flex>
  )
}

export { StrikeThroughText }
