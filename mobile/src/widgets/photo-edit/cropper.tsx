import React, { FC } from "react"
import { LayoutRectangle, View } from "react-native"
import { useColor, Flex, Text } from "uc-lib"
import Svg, { Defs, Mask, Rect, Line, G } from "react-native-svg"

interface CornerProps {
  cropperRectangle: LayoutRectangle
}

const CORNER_LENGTH = 32

const TopLeftCorner: FC<CornerProps> = ({ cropperRectangle }) => {
  const { colors } = useColor()
  const { x, y } = cropperRectangle
  return (
    <G>
      <Line x1={x} y1={y} x2={x} y2={y + CORNER_LENGTH} stroke={colors.alwaysLight} strokeWidth="2" />
      <Line x1={x} y1={y} x2={x + CORNER_LENGTH} y2={y} stroke={colors.alwaysLight} strokeWidth="2" />
    </G>
  )
}

const TopRightCorner: FC<CornerProps> = ({ cropperRectangle }) => {
  const { colors } = useColor()
  const x = cropperRectangle.x + cropperRectangle.width
  const y = cropperRectangle.y
  return (
    <G>
      <Line x1={x} y1={y} x2={x} y2={y + CORNER_LENGTH} stroke={colors.alwaysLight} strokeWidth="2" />
      <Line x1={x} y1={y} x2={x - CORNER_LENGTH} y2={y} stroke={colors.alwaysLight} strokeWidth="2" />
    </G>
  )
}
const BottomRightCorner: FC<CornerProps> = ({ cropperRectangle }) => {
  const { colors } = useColor()
  const x = cropperRectangle.x + cropperRectangle.width
  const y = cropperRectangle.y + cropperRectangle.height
  return (
    <G>
      <Line x1={x} y1={y} x2={x} y2={y - CORNER_LENGTH} stroke={colors.alwaysLight} strokeWidth="2" />
      <Line x1={x} y1={y} x2={x - CORNER_LENGTH} y2={y} stroke={colors.alwaysLight} strokeWidth="2" />
    </G>
  )
}
const BottomLeftCorner: FC<CornerProps> = ({ cropperRectangle }) => {
  const { colors } = useColor()
  const x = cropperRectangle.x
  const y = cropperRectangle.y + cropperRectangle.height
  return (
    <G>
      <Line x1={x} y1={y} x2={x} y2={y - CORNER_LENGTH} stroke={colors.alwaysLight} strokeWidth="2" />
      <Line x1={x} y1={y} x2={x + CORNER_LENGTH} y2={y} stroke={colors.alwaysLight} strokeWidth="2" />
    </G>
  )
}

const GridLines: FC<{ cropperRectangle: LayoutRectangle }> = ({ cropperRectangle }) => {
  const { colors } = useColor()
  const widthStep = cropperRectangle.width / 3
  const heightStep = cropperRectangle.width / 3
  const { x, y, width, height } = cropperRectangle
  return (
    <G>
      <Line
        x1={x + widthStep}
        x2={x + widthStep}
        y1={cropperRectangle.y}
        y2={y + height}
        strokeWidth="1"
        stroke={colors.alwaysLight}
      />
      <Line
        x1={x + widthStep * 2}
        x2={x + widthStep * 2}
        y1={y}
        y2={y + height}
        strokeWidth="1"
        stroke={colors.alwaysLight}
      />
      <Line x1={x} x2={x + width} y1={y + heightStep} y2={y + heightStep} strokeWidth="1" stroke={colors.alwaysLight} />
      <Line
        x1={x}
        x2={x + width}
        y1={y + heightStep * 2}
        y2={y + heightStep * 2}
        strokeWidth="1"
        stroke={colors.alwaysLight}
      />
    </G>
  )
}

export const Cropper: FC<{ cropperRectangle: LayoutRectangle; withGrid?: boolean }> = ({
  cropperRectangle,
  withGrid = true,
}) => {
  const { colors } = useColor()
  return (
    <View style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}>
      <Svg height="100%" width="100%">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill={colors.alwaysLight} fillOpacity={0.7} />
            <Rect
              x={cropperRectangle.x}
              y={cropperRectangle.y}
              width={cropperRectangle.width}
              height={cropperRectangle.height}
              fill={colors.alwaysDark}
              fillOpacity={1}
            />
          </Mask>
        </Defs>
        <Rect height="100%" width="100%" mask="url(#mask)" fill={colors.alwaysDark} />
        {withGrid && <GridLines cropperRectangle={cropperRectangle} />}
        <TopLeftCorner cropperRectangle={cropperRectangle} />
        <TopRightCorner cropperRectangle={cropperRectangle} />
        <BottomRightCorner cropperRectangle={cropperRectangle} />
        <BottomLeftCorner cropperRectangle={cropperRectangle} />
      </Svg>
    </View>
  )
}
