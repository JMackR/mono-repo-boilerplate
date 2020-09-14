import React, { FC, useState } from "react"
import { SegmentedControlProps } from "./segmented-control.d"
import { Animated, LayoutChangeEvent } from "react-native"
import { Flex, Touchable, Margin, Text, Background, Border, Circle, Spacer } from "../../controls"
import { useMargin } from "../../themes"
import _ from "lodash"

const HEADER_HEIGHT = 60
const ANIMATION_DURATION = 200

export const SegmentedControl: FC<SegmentedControlProps> = ({ tabs, onSelect, selectedIndex, testID }) => {
  const [selected, setSelected] = useState<number>(selectedIndex || 0)
  const [width, setWidth] = useState<number>(0)
  const animation = React.useRef(new Animated.Value(0)).current
  const animationDurationRef = React.useRef(0)
  const { baseMargin } = useMargin()
  const size = _.size(tabs)
  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width)
  }

  const selectHandler = (index: number) => () => {
    animationDurationRef.current = ANIMATION_DURATION
    onSelect && onSelect(index)
    if (selectedIndex === undefined) {
      setSelected(index)
    }
  }

  React.useEffect(() => {
    const index = selectedIndex === undefined ? selected : selectedIndex
    if (animationDurationRef.current > 0) {
      Animated.timing(animation, {
        toValue: (index * width) / size,
        duration: animationDurationRef.current,
      }).start()
    } else {
      animation.setValue((index * width) / size)
    }
  }, [width, selected, selectedIndex])

  const currentlySelected = selectedIndex !== undefined ? selectedIndex : selected
  return (
    <Flex direction="column" height="100%" grow={1} testID={testID || "uc-lib.segmented-control"}>
      <Flex direction="row" height={HEADER_HEIGHT} grow={0}>
        {tabs.map((props, index) => {
          return (
            <Flex direction="column" grow={1} key={`${index}`}>
              <Touchable onPress={selectHandler(index)} testID={props.testID || "uc-lib.segmented-control.tab." + index}>
                <Margin direction="row" crossAxisDistribution="center" axisDistribution="center" marginStep={4}>
                  <Text color={currentlySelected === index ? "brand" : "secondary"}>{props.title}</Text>
                  {props.showGleam === true && (
                    <>
                      <Spacer direction="row" sizeStep={1} />
                      <Circle size={baseMargin * 2} color={"paintbrushRed"} />
                    </>
                  )}
                </Margin>
                <Margin
                  direction="column"
                  crossAxisDistribution="center"
                  axisDistribution="center"
                  marginStep={0}
                  marginLeftStep={1}
                  marginRightStep={1}
                  height={baseMargin}
                >
                  <Border
                    direction="column"
                    height={baseMargin}
                    width="100%"
                    grow={1}
                    cornerRadius="small"
                    lineWeight="none"
                  >
                    <Background type={currentlySelected === index ? "brand" : "primary"} />
                  </Border>
                </Margin>
              </Touchable>
            </Flex>
          )
        })}
      </Flex>
      <Spacer direction="column" sizeStep={4} />
      <Flex direction="row" width="100%" height="100%" grow={1}>
        <Animated.View
          onLayout={onLayout}
          style={{
            flexDirection: "row",
            width: `${size * 100}%`,
            right: animation,
          }}
        >
          {tabs.map(({ tabContent, key }, index) => {
            return (
              <Flex key={key || `${index}`} direction="row" width={width} height="100%" grow={1}>
                {tabContent}
              </Flex>
            )
          })}
        </Animated.View>
      </Flex>
    </Flex>
  )
}
