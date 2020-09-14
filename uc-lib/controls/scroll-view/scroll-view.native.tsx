import React from "react"
import { ScrollView as RNScrollView, LayoutChangeEvent } from "react-native"
import { ScrollViewProps } from "./scroll-view-props"
import { useMargin } from "../../themes"

interface Size {
  width: number
  height: number
}

/**
 * This component wraps a ScrollView and only enables scrolling when the size of its children grows beyond the ScrollView's bounds.
 */
export const ScrollView: React.FC<ScrollViewProps> = props => {
  const { children, horizontal, disableFlexGrowContentWhenNotScrolling = false, bottomContentInsetStep, testID } = props
  let { onlyScrollsWhenNeeded } = props
  if (onlyScrollsWhenNeeded === undefined) {
    onlyScrollsWhenNeeded = true
  }
  const [contentContainerSize, setContentContainerSize] = React.useState<Size>({
    width: 0,
    height: 0,
  })
  const [scrollViewSize, setScrollViewSize] = React.useState<Size>({
    width: 0,
    height: 0,
  })
  const { baseMargin } = useMargin()
  const calculatedBottomInset = baseMargin * (bottomContentInsetStep || 0)

  const handleContentSizeDidChange = (contentWidth: number, contentHeight: number) => {
    setContentContainerSize({ width: contentWidth, height: contentHeight })
  }

  const handleScrollViewLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setScrollViewSize({ width, height })
  }

  const contentHeightIsTooBig = scrollViewSize.height < contentContainerSize.height
  const contentWidthIsTooBig = scrollViewSize.width < contentContainerSize.width
  const scrollEnabledBecauseOfContentSize = horizontal ? contentWidthIsTooBig : contentHeightIsTooBig
  const scrollEnabled = onlyScrollsWhenNeeded ? scrollEnabledBecauseOfContentSize : true

  const flexGrow = disableFlexGrowContentWhenNotScrolling ? (scrollEnabled ? 0 : 1) : undefined

  return (
    <RNScrollView
      contentContainerStyle={{ flexGrow }}
      contentInset={{ bottom: calculatedBottomInset }}
      horizontal={horizontal}
      scrollEnabled={scrollEnabled}
      onLayout={handleScrollViewLayout}
      onContentSizeChange={handleContentSizeDidChange}
      testID={testID || "uc-lib.scroll-view"}
      accessibilityLabel={testID || "uc-lib.scroll-view"}
    >
      {children}
    </RNScrollView>
  )
}
