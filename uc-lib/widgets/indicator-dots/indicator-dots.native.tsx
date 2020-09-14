import React, { FC } from "react"
import { Stack, Flex } from "../../controls"
import { IndicatorDotsProps } from "./indicator-dots-props"
import { View, StyleSheet } from "react-native"
import { useColor } from "uc-lib/themes"

const CHILD_SEPARATION_STEP = 2

const IndicatorDots: FC<IndicatorDotsProps> = props => {
  const { count, selectedIndex } = props

  const dots = []
  for (let i = 0; i < count; i++) {
    dots.push(<IndicatorDot selected={i === selectedIndex} key={i} />)
  }

  return (
    <Flex direction="column" grow={1} axisDistribution="center" crossAxisDistribution="center">
      <Stack direction="row" grow={1} childSeparationStep={CHILD_SEPARATION_STEP}>
        {dots}
      </Stack>
    </Flex>
  )
}

interface IndicatorDotsProps {
  selected: boolean
}

const IndicatorDot: FC<IndicatorDotsProps> = props => {
  const { selected } = props
  const { colors } = useColor()

  const DotStyles = StyleSheet.create({
    dot: {
      borderRadius: 8,
      width: 8,
      height: 8,
      backgroundColor: selected ? colors.green : colors.limestone,
    },
  })

  return <View style={DotStyles.dot} />
}

export { IndicatorDots }
