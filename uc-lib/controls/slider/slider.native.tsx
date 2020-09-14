import React, { FC, useState } from "react"
import { View, Platform, LayoutChangeEvent } from "react-native"
import { default as RNSlider } from "@react-native-community/slider"
import Svg, { Polygon } from "react-native-svg"

import { Text } from "../text/"
import { Margin } from "../layout"
import { useMargin, useColor } from "../../themes"
import { SliderProps } from "./slider.props"
import { SliderTic } from "./slider-tic.native"

const TIC_SIDE_MARGIN_STEP = 8
// tslint:disable-next-line: no-magic-numbers
const TIC_SIDE_MARGIN_STEP_HALF = TIC_SIDE_MARGIN_STEP / 2
const LABEL_PADDING = 2
// tslint:disable-next-line: no-magic-numbers
const SLIDER_VERTICAL_OFFSET = Platform.OS === "ios" ? 0 : 6
const emptySnapPoints: number[] = []

const DESIGN_LABEL_WIDTH = 67
const DESIGN_LABEL_HEIGHT = 30

const Slider: FC<SliderProps> = ({ options, initialIndex, onIndexChanged, testID }) => {
  const [snapPoints, setSnapPoints] = useState(emptySnapPoints)
  const [index, setIndex] = useState(initialIndex ? initialIndex : 0)
  const [labelWidth, setLabelWidth] = useState(DESIGN_LABEL_WIDTH)
  const [labelHeight, setLabelHeight] = useState(DESIGN_LABEL_HEIGHT)

  const { baseMargin } = useMargin()
  const { colors } = useColor()

  const thumbTintColor = Platform.OS === "ios" ? colors.alwaysLight : colors.green

  const onLabelContainerLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    if (width) {
      setLabelWidth(width)
    }
    if (height) {
      setLabelHeight(height)
    }
  }

  const onTicContainerLayout = (e: LayoutChangeEvent) => {
    if (!options.length) {
      setSnapPoints(emptySnapPoints)
      return
    }
    const { width: availableSpace } = e.nativeEvent.layout
    const steps: number[] = []
    options.forEach((_option, optionIndex) => {
      const ticPosX = (availableSpace / (options.length - 1)) * optionIndex
      steps.push(ticPosX)
    })
    setSnapPoints(steps)
  }

  const onValueChange = (newIndex: number) => {
    setIndex(newIndex)
  }

  const handleTouchEnded = () => {
    if (onIndexChanged) {
      onIndexChanged(index)
    }
  }

  if (options.length === 0) {
    return null
  }

  return (
    <Margin
      marginBottomStep={TIC_SIDE_MARGIN_STEP}
      direction="column"
      axisDistribution="flex-start"
      crossAxisDistribution="flex-start"
    >
      {!!snapPoints.length && (
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // tslint:disable-next-line: no-magic-numbers
            left: snapPoints[index] - labelWidth / 2 + baseMargin * TIC_SIDE_MARGIN_STEP,
          }}
        >
          <View
            onLayout={onLabelContainerLayout}
            style={{
              backgroundColor: colors.green,
              padding: LABEL_PADDING * baseMargin,
              borderRadius: 4,
            }}
          >
            <Text textType="tertiaryBody2" color="alwaysLight">
              {options[index]}
            </Text>
          </View>
          <View style={{ marginTop: -1 }}>
            <Point />
          </View>
        </View>
      )}
      <Margin
        marginTopStep={1}
        marginBottomStep={1}
        marginLeftStep={TIC_SIDE_MARGIN_STEP}
        marginRightStep={TIC_SIDE_MARGIN_STEP}
      >
        <View onLayout={onTicContainerLayout} style={{ flexDirection: "row", flexGrow: 1 }}>
          {snapPoints.map((posX, ticIndex) => (
            <SliderTic posX={posX} key={ticIndex} />
          ))}
        </View>
      </Margin>
      <RNSlider
        minimumValue={0}
        maximumValue={options.length - 1}
        step={1}
        value={index}
        minimumTrackTintColor={colors.green}
        maximumTrackTintColor={colors.basalt}
        thumbTintColor={thumbTintColor}
        onValueChange={onValueChange}
        onTouchEnd={handleTouchEnded}
        style={{
          flexGrow: 1,
          position: "absolute",
          top: SLIDER_VERTICAL_OFFSET + labelHeight,
          right: TIC_SIDE_MARGIN_STEP_HALF * baseMargin,
          left: TIC_SIDE_MARGIN_STEP_HALF * baseMargin,
        }}
        testID={testID || "uc-lib.slider"}
        accessibilityLabel={testID || "uc-lib.slider"}
      />
    </Margin>
  )
}

const POINT_HEIGHT = 5
const POINT_WIDTH = 7
const SIZE = {
  width: POINT_WIDTH,
  height: POINT_HEIGHT,
}

const Point = () => {
  const { colors } = useColor()
  return (
    <Svg {...SIZE}>
      {/* tslint:disable-next-line: no-magic-numbers */}
      <Polygon
        points={`0,-1 ${POINT_WIDTH},-1 ${POINT_WIDTH / 2},${POINT_HEIGHT}`}
        fill={colors.green}
        stroke={colors.green}
      />
    </Svg>
  )
}

export { Slider }
