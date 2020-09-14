import _ from "lodash"
import { Background, Flex, Margin, Text, Touchable, useMargin } from "uc-lib"
import React, { FC, useState } from "react"
import { Animated, LayoutChangeEvent } from "react-native"
import { TabInfo } from "./tabbed-screen-props"

export const TabbedScreen: FC<{ tabs: TabInfo[] }> = ({ tabs }) => {
  const [selected, setSelected] = useState<number>(0)
  const [width, setWidth] = useState<number>(0)
  const [animation] = useState(new Animated.Value(0))
  const size = _.size(tabs)
  const onSelect = (index: number) => () => {
    setSelected(index)
    Animated.timing(animation, { toValue: (index * width) / size, duration: 200 }).start()
  }
  const { baseMargin } = useMargin()
  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width)
  }
  return (
    <Flex direction="column" height="100%" grow={1}>
      <Flex direction="row" height={65} grow={0}>
        <Background />
        {tabs.map((props, index) => {
          return (
            <Flex direction="column" grow={1} key={`${index}`}>
              <Touchable onPress={onSelect(index)}>
                <Margin direction="column" crossAxisDistribution="center" axisDistribution="center" marginStep={4}>
                  <Text>{props.title}</Text>
                </Margin>
                <Margin
                  direction="column"
                  crossAxisDistribution="center"
                  height={baseMargin}
                  axisDistribution="center"
                  marginStep={1}
                >
                  <Background type={selected === index ? "brand" : "primary"} />
                </Margin>
              </Touchable>
            </Flex>
          )
        })}
      </Flex>
      <Flex direction="row" width="100%" grow={1}>
        <Animated.View onLayout={onLayout} style={{ flexDirection: "row", width: `${size * 100}%`, right: animation }}>
          <Flex direction="row" width="100%" grow={1}>
            {tabs.map(props => {
              return props.tabContent
            })}
          </Flex>
        </Animated.View>
      </Flex>
    </Flex>
  )
}
