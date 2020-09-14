import React, { useState } from "react"
import { Dimensions, StyleSheet, View, Animated, Easing } from "react-native"

const IndicatorToTabWidthRatio = 0.8
const IndicatorOffsetRelativeToTabWidth = 0.1
const SlideDuration = 200
const SlideSpringSpeed = 30
const SlideSpringBounciness = 1

interface TabBarIndicatorProps {
  tabCount: number
  tintColor: string
  activeIndex: number
}

const IndicatorStyle = StyleSheet.create({
  sliderBar: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 4,
  },
})

const TabBarIndicator = (props: TabBarIndicatorProps) => {
  const windowWidth = Dimensions.get("window").width
  const tabWidth = windowWidth / props.tabCount

  const [sliderX] = useState(new Animated.Value(0))
  const sliderXGoal = props.activeIndex * tabWidth

  if (sliderX.value !== sliderXGoal) {
    sliderX.stopAnimation()
    Animated.parallel([
      Animated.timing(sliderX, {
        toValue: sliderXGoal,
        duration: SlideDuration,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.cubic),
      }),
      Animated.spring(sliderX, {
        toValue: sliderXGoal,
        useNativeDriver: true,
        bounciness: SlideSpringBounciness,
        speed: SlideSpringSpeed,
      }),
    ]).start()
  }

  const SliderStyle = StyleSheet.create({
    slider: {
      width: tabWidth * IndicatorToTabWidthRatio,
      height: 4,
      backgroundColor: props.tintColor,
      opacity: 1.0,
      borderRadius: 2,
      marginStart: tabWidth * IndicatorOffsetRelativeToTabWidth,
    },
  })

  return (
    <View
      style={IndicatorStyle.sliderBar}
      testID="tab-navigator.tab-bar-indicator"
      accessibilityLabel="tab-navigator.tab-bar-indicator"
    >
      <Animated.View style={[SliderStyle.slider, { transform: [{ translateX: sliderX }] }]} />
    </View>
  )
}

export { TabBarIndicator }
