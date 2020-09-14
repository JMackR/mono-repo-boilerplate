import React from "react"
import { StyleSheet, css } from "aphrodite/no-important"
import { useColor } from "../../themes"
import { Stack, Margin } from "../layout"
import { Text } from "../text"
import { Border } from "../layout/border/border"
import { Background } from "../background"

enum LAYTS {
  PointHeight = 4,
  PointWidth = 8,
  BubbleMargin = 2,
}

interface SliderThumbProps {
  label: string
}

export const SliderThumb = (props: SliderThumbProps) => {
  const { label } = props
  const { colors } = useColor()
  const style = StyleSheet.create({
    thumbContainer: {
      cursor: "pointer",
    },
    thumb: {
      backgroundColor: colors.alwaysLight,
      width: 28,
      height: 28,
      borderRadius: 14,
      marginTop: 5,
      boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.2)",
    },
  })

  const viewBox = `0 0 ${LAYTS.PointWidth} ${LAYTS.PointHeight}`
  // tslint:disable-next-line: no-magic-numbers
  const arrowPath = `M 0 -1 L ${LAYTS.PointWidth} -1 L ${LAYTS.PointWidth / 2} ${LAYTS.PointHeight} z`
  return (
    <div className={css(style.thumbContainer)}>
      <Stack direction="column" axisDistribution="center" crossAxisDistribution="center">
        <Border cornerRadius="small">
          <Background type="brand" />
          <Margin marginStep={LAYTS.BubbleMargin}>
            <Text textAlign="center" textType="tertiaryBody2" color="alwaysLight">
              {label}
            </Text>
          </Margin>
        </Border>
        <svg xmlns="http://www.w3.org/2000/svg" width={LAYTS.PointWidth} height={LAYTS.PointHeight} viewBox={viewBox}>
          <g fill={colors.green}>
            <path d={arrowPath} />
          </g>
        </svg>
        <div className={css(style.thumb)} />
      </Stack>
    </div>
  )
}
