import { useColor } from "uc-lib"
import React, { FC } from "react"
import { TransformsStyle, View } from "react-native"
import { Line, Polygon, Svg } from "react-native-svg"
import { POINTER_HEIGHT, POINTER_WIDTH, SPACE_BETWEEN_ARROW_AND_BORDER } from "./constants.native"
import { PointerProps } from "./tooltip-props.native"

export interface PointerOffset {
  x?: number
  y?: number
}

const SIZE = {
  width: POINTER_WIDTH,
  height: POINTER_HEIGHT,
}
const strokeWidth = 1

export const Pointer: FC<PointerProps> = ({ isDown, clickComponentRect, tooltipRect, type }) => {
  const { colors } = useColor()
  let translateX = clickComponentRect.x - tooltipRect.x - POINTER_WIDTH / 2 + clickComponentRect.width / 2
  translateX = Math.min(translateX, tooltipRect.width - SPACE_BETWEEN_ARROW_AND_BORDER - POINTER_WIDTH)
  const transformStyles: TransformsStyle = {
    transform: [
      { translateX },
      {
        translateY: isDown ? tooltipRect.height - strokeWidth : -POINTER_HEIGHT + strokeWidth,
      },
      { rotate: isDown ? "180deg" : "0" },
    ],
  }
  const fillColor = type === "primary" ? colors.crystal : colors.larchYellow
  return (
    <View
      style={{
        position: "absolute",
        transform: transformStyles.transform,
      }}
    >
      <Svg {...SIZE}>
        <Polygon
          points={`0,${POINTER_HEIGHT} ${POINTER_WIDTH / 2},0 ${POINTER_WIDTH},${POINTER_HEIGHT}`}
          fill={fillColor}
          stroke={colors.limestone}
        />
        <Line x1={0} y1={POINTER_HEIGHT} x2={POINTER_WIDTH} y2={POINTER_HEIGHT} stroke={fillColor} />
      </Svg>
    </View>
  )
}

Pointer.defaultProps = {
  type: "primary",
}
