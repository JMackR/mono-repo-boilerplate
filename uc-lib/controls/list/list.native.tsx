import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react"
import { ReanimatedFlatList } from "./reanimated-flatlist.native"
import {
  FlatList,
  LayoutChangeEvent,
  LayoutRectangle,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  ViewToken,
  ViewabilityConfig,
} from "react-native"
import { ListProps, ListRef, ListScrollEvent } from "./list.d"
import { Flex } from "../layout/flex"
import { Separator } from "../separator"
import {
  useKeyboardAvoidance,
  KeyboardAvoidanceContainerContextProvider,
  KeyboardAvoidanceMeasureView,
  KeyboardAvoidanceAnimateForHidden,
  KeyboardAvoidanceAnimateForShown,
} from "../layout/keyboard-avoidance"
import _ from "lodash"
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  GestureHandlerStateChangeNativeEvent,
  PanGestureHandlerEventExtra,
  GestureHandlerGestureEventNativeEvent,
  State,
} from "react-native-gesture-handler"
import Reanimated, {
  debug,
  or,
  onChange,
  lessThan,
  greaterThan,
  neq,
  eq,
  and,
  add,
  block,
  set,
  call,
  cond,
  lessOrEq,
  greaterOrEq,
  sub,
  min,
  max,
  Easing,
  clockRunning,
  startClock,
  timing,
  stopClock,
} from "react-native-reanimated"

// tslint:disable: no-any

const VIEWABILITY_CONFIG: ViewabilityConfig = {
  minimumViewTime: 100,
  itemVisiblePercentThreshold: 95,
}

const FAIL_THRESHOLD = 10

interface AnimatedValueScrollEvent {
  contentInset: {
    top: Reanimated.Value<number>
    left: Reanimated.Value<number>
    bottom: Reanimated.Value<number>
    right: Reanimated.Value<number>
  }
  contentOffset: {
    x: Reanimated.Value<number>
    y: Reanimated.Value<number>
  }
  contentSize: {
    height: Reanimated.Value<number>
    width: Reanimated.Value<number>
  }
  layoutMeasurement: {
    height: Reanimated.Value<number>
    width: Reanimated.Value<number>
  }
  zoomScale: Reanimated.Value<number>
}

const maxContentOffsetY = (contentHeight: Reanimated.Adaptable<number>, layoutHeight: Reanimated.Adaptable<number>) =>
  max(0, sub(contentHeight, layoutHeight))

const updateOverscrollY = (
  overscrollY: Reanimated.Value<number>,
  lowerBound: Reanimated.Adaptable<number>,
  upperBound: Reanimated.Adaptable<number>,
  offsetDelta: Reanimated.Adaptable<number>,
  maxContentOffset: Reanimated.Adaptable<number>,
) =>
  block([
    cond(lessThan(offsetDelta, 0), [set(overscrollY, max(lowerBound, min(0, offsetDelta)))]),
    cond(greaterThan(offsetDelta, maxContentOffset), [
      set(overscrollY, min(upperBound, max(0, sub(offsetDelta, maxContentOffset)))),
    ]),
    cond(and(greaterOrEq(offsetDelta, 0), lessOrEq(offsetDelta, maxContentOffset)), [set(overscrollY, 0)]),
  ])

const useAnimatedValueScrollEvent = () => {
  const animatedValueScrollEvent: AnimatedValueScrollEvent = {
    contentInset: {
      top: useRef(new Reanimated.Value(0)).current,
      left: useRef(new Reanimated.Value(0)).current,
      bottom: useRef(new Reanimated.Value(0)).current,
      right: useRef(new Reanimated.Value(0)).current,
    },
    contentOffset: {
      x: useRef(new Reanimated.Value(0)).current,
      y: useRef(new Reanimated.Value(0)).current,
    },
    contentSize: {
      height: useRef(new Reanimated.Value(0)).current,
      width: useRef(new Reanimated.Value(0)).current,
    },
    layoutMeasurement: {
      height: useRef(new Reanimated.Value(0)).current,
      width: useRef(new Reanimated.Value(0)).current,
    },
    zoomScale: useRef(new Reanimated.Value(1)).current,
  }

  return [animatedValueScrollEvent]
}

const mapNativeScrollEventToAnimatedBlock = (native: NativeScrollEvent, animated: AnimatedValueScrollEvent) => {
  return block([
    set(animated.contentInset.bottom, native.contentInset.bottom),
    set(animated.contentInset.left, native.contentInset.left),
    set(animated.contentInset.right, native.contentInset.right),
    set(animated.contentInset.top, native.contentInset.top),
    set(animated.contentOffset.x, native.contentOffset.x),
    set(animated.contentOffset.y, native.contentOffset.y),
    set(animated.contentSize.height, native.contentSize.height),
    set(animated.contentSize.width, native.contentSize.width),
    set(animated.layoutMeasurement.height, native.layoutMeasurement.height),
    set(animated.layoutMeasurement.width, native.layoutMeasurement.width),
    set(animated.zoomScale, native.zoomScale),
  ])
}

enum OnScrollCallArgs {
  ContentInsetBottom = 0,
  ContentInsetLeft,
  ContentInsetRight,
  ContentInsetTop,
  ContentOffsetX,
  ContentOffsetY,
  ContentSizeHeight,
  ContentSizeWidth,
  LayoutHeight,
  LayoutWidth,
  ZoomScale,
}
const animatedScrollEventToNativeCallback = (e: AnimatedValueScrollEvent, callback: (e: NativeScrollEvent) => void) => {
  return call(
    [
      e.contentInset.bottom,
      e.contentInset.left,
      e.contentInset.right,
      e.contentInset.top,
      e.contentOffset.x,
      e.contentOffset.y,
      e.contentSize.height,
      e.contentSize.width,
      e.layoutMeasurement.height,
      e.layoutMeasurement.width,
      e.zoomScale,
    ],
    (args: readonly any[]) =>
      callback({
        contentInset: {
          bottom: args[OnScrollCallArgs.ContentInsetBottom],
          left: args[OnScrollCallArgs.ContentInsetLeft],
          right: args[OnScrollCallArgs.ContentInsetRight],
          top: args[OnScrollCallArgs.ContentInsetTop],
        },
        contentOffset: {
          x: args[OnScrollCallArgs.ContentOffsetX],
          y: args[OnScrollCallArgs.ContentOffsetY],
        },
        contentSize: {
          height: args[OnScrollCallArgs.ContentSizeHeight],
          width: args[OnScrollCallArgs.ContentSizeWidth],
        },
        layoutMeasurement: {
          height: args[OnScrollCallArgs.LayoutHeight],
          width: args[OnScrollCallArgs.LayoutWidth],
        },
        zoomScale: args[OnScrollCallArgs.ZoomScale],
      }),
  )
}

const convertNativeScrollEvent = (e: NativeScrollEvent): ListScrollEvent => {
  return {
    contentOffset: { x: e.contentOffset.x, y: e.contentOffset.y },
    contentSize: { width: e.contentSize.width, height: e.contentSize.height },
    layout: {
      width: e.layoutMeasurement.width,
      height: e.layoutMeasurement.height,
    },
  }
}

const SCROLL_EVENT_THROTTLE = 16
export const List = forwardRef(<ItemData extends any>(props: ListProps<ItemData>, ref: React.Ref<ListRef>) => {
  const {
    overscrollLimits,
    overscrollEnabled,
    animationHandlers,
    contentPadding,
    centerContent,
    columns,
    showsVerticalScrollIndicator,
    onContentSizeChange,
    onLayout,
    dismissKeyboardOnDrag,
    keyboardAvoidanceEnabled,
    data,
    initialNumToRender,
    renderItem,
    inverted,
    horizontal,
    keyExtractor,
    onEndReached,
    onEndReachedThreshold,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    testID,
    showSeparator,
    scrollEnabled,
    sticky,
    getItemLayout,
    minHeight,
    onVisibilityChange,
    paddingBottom,
    paddingLeft,
    activeOffsetX,
    activeOffsetY,
  } = props
  const {
    addKeyboardAvoidingContainer,
    removeKeyboardAvoidingContainer,
    updateKeyboardAvoidingContainer,
  } = useKeyboardAvoidance()
  const [itemLayouts, setItemLayouts] = useState<LayoutRectangle[]>([])
  const contentOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const [contentSize, setContentSize] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })
  const [keyboardAvoidanceContentPadding, setKeyboardAvoidanceContentPadding] = useState(0)
  const [containerId, setContainerId] = useState<string>()
  const flatListRef = React.useRef<FlatList<ItemData>>(null)
  const animatedViewRef = useRef<any>(null)
  const outerGestureHandlerRef = React.useRef<PanGestureHandler>(null)
  const innerGestureHandlerRef = React.useRef<NativeViewGestureHandler>(null)
  const dragStartOffsetY = useRef(new Reanimated.Value(0)).current
  const isDragging = useRef(new Reanimated.Value(0)).current
  const animatedOverscrolled = useRef(new Reanimated.Value(0)).current
  const overscrollLowerBound = useRef(new Reanimated.Value<number>(0)).current
  const overscrollUpperBound = useRef(new Reanimated.Value<number>(0)).current
  const [overscrolled, setOverscrolled] = useState(false)
  const onOverscrollAnimatedEvent = {
    x: useRef(new Reanimated.Value(0)).current,
    y: useRef(new Reanimated.Value(0)).current,
  }
  const overscrollAnimationClock = useRef(new Reanimated.Clock()).current
  const overscrollAnimationTimingState: Reanimated.TimingState = {
    frameTime: useRef(new Reanimated.Value(0)).current,
    finished: useRef(new Reanimated.Value(0)).current,
    time: useRef(new Reanimated.Value(0)).current,
    position: onOverscrollAnimatedEvent.y,
  }
  const [onScrollAnimatedEvent] = useAnimatedValueScrollEvent()

  const runOverscrollAnimation = (target: Reanimated.Adaptable<number>) => {
    return block([
      cond(clockRunning(overscrollAnimationClock), 0, [
        set(overscrollAnimationTimingState.finished, 0),
        set(overscrollAnimationTimingState.time, 0),
        set(overscrollAnimationTimingState.frameTime, 0),
        startClock(overscrollAnimationClock),
      ]),
      timing(overscrollAnimationClock, overscrollAnimationTimingState, {
        duration: 150,
        toValue: target,
        easing: Easing.linear,
      }),
      cond(overscrollAnimationTimingState.finished, [stopClock(overscrollAnimationClock), updateOverscrolled()]),
      overscrollAnimationTimingState.position,
    ])
  }

  const measuringViewRef = (): View | undefined => {
    if (!animatedViewRef.current) {
      return
    }

    return animatedViewRef.current._component
  }

  const measureView: KeyboardAvoidanceMeasureView = (_viewId, view, callback) => {
    const measuringView = measuringViewRef()
    if (!measuringView || !containerId) {
      callback()
      return
    }

    const itemIndex = view.viewInfo
    const itemLayout = itemLayouts[itemIndex]
    measuringView.measureInWindow((x, y, width, height) => {
      let itemY = 0
      itemLayouts.forEach((iLayout, index) => {
        if (index < itemIndex) {
          itemY += iLayout.height
        }
      })
      callback({
        x: itemLayout.x + x,
        y: itemY + y,
        width: itemLayout.width,
        height: itemLayout.height,
        containerId,
        containerInfo: {
          contentOffset,
          contentSize,
          layout: { x, y, width, height },
        },
      })
    })
  }

  const animateForShown: KeyboardAvoidanceAnimateForShown = (layout, keyboardY) => {
    const targetOffset = layout.y - (keyboardY - layout.height)
    const targetScrollPadding = layout.containerInfo.layout.y + layout.containerInfo.layout.height - keyboardY
    if (targetScrollPadding > 0) {
      setKeyboardAvoidanceContentPadding(targetScrollPadding)
    }
    if (targetOffset > 0) {
      setTimeout(() => {
        scrollToOffset(targetOffset)
      }, 1)
    }
  }

  const DURATION_MODIFIER = 0.5
  const animateForHidden: KeyboardAvoidanceAnimateForHidden = duration => {
    setTimeout(() => {
      setKeyboardAvoidanceContentPadding(0)
      setTimeout(() => {
        scrollToRelativeOffset(-1)
      }, 1)
    }, duration * DURATION_MODIFIER)
  }

  const scrollToEnd = (animated?: boolean) => {
    flatListRef.current?.scrollToEnd({
      animated: animated !== undefined ? animated : true,
    })
  }

  const scrollToOffset = (offset: number, animated?: boolean) => {
    flatListRef.current?.scrollToOffset({
      animated: animated !== undefined ? animated : true,
      offset,
    })
  }

  const scrollToRelativeOffset = (relativeOffset: number, animated?: boolean) => {
    const currentOffset = horizontal ? contentOffset.current.x : contentOffset.current.y
    scrollToOffset(currentOffset + relativeOffset, animated)
  }

  const addAndRemoveContainer = () => {
    if (!keyboardAvoidanceEnabled) {
      return
    }

    const id = addKeyboardAvoidingContainer({
      measureView,
      animateForHidden,
      animateForShown,
    })
    setContainerId(id)
    return () => {
      removeKeyboardAvoidingContainer(id)
    }
  }

  const updateContainer = () => {
    if (!keyboardAvoidanceEnabled) {
      return
    }

    if (!containerId) {
      return
    }

    updateKeyboardAvoidingContainer(containerId, {
      measureView,
      animateForHidden,
      animateForShown,
    })
  }

  useImperativeHandle(ref, () => {
    return {
      scrollToEnd,
      scrollToOffset,
      scrollToTop: (animated?: boolean) => {
        scrollToOffset(0, animated)
      },
      scrollToIndex: (index: number, animated?: boolean) => {
        if (flatListRef.current) {
          const shouldAnimate = animated === undefined ? true : animated
          flatListRef.current.scrollToIndex({
            animated: shouldAnimate,
            index,
          })
        }
      },
    }
  })

  const handleKeyExtractor = (_item: any, index: number) => String(index)

  const handleRenderItem = ({ item, index }: { item: ItemData; index: number }) => {
    if (keyboardAvoidanceEnabled) {
      const cacheLayout = (e: LayoutChangeEvent) => {
        itemLayouts[index] = e.nativeEvent.layout
        setItemLayouts([...itemLayouts])
      }

      return (
        <View onLayout={cacheLayout} collapsable={false}>
          {renderItem(item, index)}
        </View>
      )
    } else {
      return renderItem(item, index)
    }
  }

  const contentSizeChangeHandler = (w: number, h: number) => {
    setContentSize({ width: w, height: h })
    if (onContentSizeChange) {
      onContentSizeChange(w, h)
    }
  }

  const SeparatorComponent = () => {
    return <Separator direction={horizontal ? "row" : "column"} />
  }

  const scrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (onScrollBeginDrag) {
      onScrollBeginDrag(convertNativeScrollEvent(e.nativeEvent))
    }
  }

  const scrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (onScrollEndDrag) {
      onScrollEndDrag(convertNativeScrollEvent(e.nativeEvent))
    }
  }

  const layoutHandler = (e: LayoutChangeEvent) => {
    if (onLayout) {
      onLayout(e.nativeEvent.layout)
    }
  }

  useEffect(addAndRemoveContainer, [])
  useEffect(updateContainer, [contentSize, itemLayouts])

  const innerGestureEnabled = (scrollEnabled === undefined || scrollEnabled) && !overscrolled

  const viewableItemCallbackRef = React.useRef(
    onVisibilityChange
      ? (info: { changed: ViewToken[] }) => {
          if (onVisibilityChange && flatListRef.current!.props.data) {
            info.changed.forEach(token => {
              onVisibilityChange(token.isViewable, token.item, token.index || -1)
            })
          }
        }
      : undefined,
  )
  const viewabilityConfigRef = React.useRef(onVisibilityChange ? VIEWABILITY_CONFIG : undefined)

  const failOffsetY = horizontal ? [-FAIL_THRESHOLD, FAIL_THRESHOLD] : undefined

  const commonOnScrollHandler = (e: NativeScrollEvent) => {
    contentOffset.current = e.contentOffset
    if (onScroll) {
      onScroll(convertNativeScrollEvent(e))
    }
  }

  const noAnimationOnScrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    commonOnScrollHandler(e.nativeEvent)
  }

  const animatedOnScrollEventBlock = (e: NativeScrollEvent) => {
    const cmdArray = [mapNativeScrollEventToAnimatedBlock(e, onScrollAnimatedEvent)]
    if (Platform.OS === "ios" && overscrollEnabled) {
      cmdArray.push(
        block([
          updateOverscrollY(
            onOverscrollAnimatedEvent.y,
            overscrollLowerBound,
            overscrollUpperBound,
            onScrollAnimatedEvent.contentOffset.y,
            maxContentOffsetY(onScrollAnimatedEvent.contentSize.height, onScrollAnimatedEvent.layoutMeasurement.height),
          ),
        ]),
      )
      if (animationHandlers && animationHandlers.onOverscroll) {
        cmdArray.push(
          animationHandlers.onOverscroll({
            x: onOverscrollAnimatedEvent.x,
            y: onOverscrollAnimatedEvent.y,
          }),
        )
      }
    }
    if (animationHandlers && animationHandlers.onScroll) {
      cmdArray.push(animationHandlers.onScroll(e))
    }

    cmdArray.push(animatedScrollEventToNativeCallback(onScrollAnimatedEvent, commonOnScrollHandler))

    return block(cmdArray)
  }

  const onscrollHandler =
    animationHandlers || overscrollEnabled
      ? Reanimated.event(
          [
            {
              nativeEvent: (e: NativeScrollEvent) => animatedOnScrollEventBlock(e),
            },
          ],
          { useNativeDriver: true },
        )
      : noAnimationOnScrollHandler

  const updateOverscrolled = () => {
    return onChange(
      animatedOverscrolled,
      block([call([animatedOverscrolled], ([overscrollY]) => setOverscrolled(overscrollY !== 0))]),
    )
  }

  const outerGestureStateHandler =
    Platform.OS === "android" && overscrollEnabled
      ? Reanimated.event(
          [
            {
              nativeEvent: (e: GestureHandlerStateChangeNativeEvent & PanGestureHandlerEventExtra) =>
                block([
                  cond(eq(e.state, State.BEGAN), [set(dragStartOffsetY, onScrollAnimatedEvent.contentOffset.y)]),
                  cond(eq(e.state, State.ACTIVE), [set(isDragging, 1)]),
                  cond(or(eq(e.state, State.END), eq(e.state, State.CANCELLED)), [
                    set(isDragging, 0),
                    set(dragStartOffsetY, 0),
                    runOverscrollAnimation(0),
                  ]),
                  updateOverscrolled(),
                ]),
            },
          ],
          {
            useNativeDriver: true,
          },
        )
      : undefined

  const createGestureBlock = (e: GestureHandlerGestureEventNativeEvent & PanGestureHandlerEventExtra) => {
    const cmdArray = [
      cond(and(isDragging, eq(e.state, State.ACTIVE)), [
        updateOverscrollY(
          onOverscrollAnimatedEvent.y,
          overscrollLowerBound,
          overscrollUpperBound,
          sub(dragStartOffsetY, e.translationY),
          maxContentOffsetY(onScrollAnimatedEvent.contentSize.height, onScrollAnimatedEvent.layoutMeasurement.height),
        ),
      ]),
    ]

    if (animationHandlers && animationHandlers.onOverscroll) {
      cmdArray.push(
        animationHandlers.onOverscroll({
          x: onOverscrollAnimatedEvent.x,
          y: onOverscrollAnimatedEvent.y,
        }),
      )
    }

    return block(cmdArray)
  }

  const outerGestureEventHandler =
    Platform.OS === "android" && overscrollEnabled
      ? Reanimated.event(
          [
            {
              nativeEvent: (e: GestureHandlerGestureEventNativeEvent & PanGestureHandlerEventExtra) =>
                block([
                  createGestureBlock(e),
                  set(animatedOverscrolled, neq(onOverscrollAnimatedEvent.y, 0)),
                  updateOverscrolled(),
                ]),
            },
          ],
          {
            useNativeDriver: true,
          },
        )
      : undefined

  useEffect(() => {
    overscrollLowerBound.setValue(overscrollLimits!.y.lower)
    overscrollUpperBound.setValue(overscrollLimits!.y.upper)
  }, [overscrollLimits])

  return (
    <KeyboardAvoidanceContainerContextProvider containerId={containerId}>
      <Flex direction={props.horizontal ? "row" : "column"} grow={1}>
        <PanGestureHandler
          ref={outerGestureHandlerRef}
          simultaneousHandlers={innerGestureHandlerRef}
          onGestureEvent={outerGestureEventHandler}
          onHandlerStateChange={outerGestureStateHandler}
          avgTouches={true}
          enabled={scrollEnabled}
          failOffsetY={failOffsetY}
          activeOffsetX={activeOffsetX}
          activeOffsetY={activeOffsetY}
        >
          <Reanimated.View
            style={{
              flexGrow: 1,
              transform: [
                {
                  translateY: Platform.OS === "android" ? sub(0, onOverscrollAnimatedEvent.y) : 0,
                },
              ],
            }}
            ref={animatedViewRef}
            collapsable={false}
          >
            <NativeViewGestureHandler
              ref={innerGestureHandlerRef}
              simultaneousHandlers={outerGestureHandlerRef}
              enabled={innerGestureEnabled}
            >
              <ReanimatedFlatList
                inverted={inverted}
                scrollEnabled={innerGestureEnabled}
                scrollEventThrottle={SCROLL_EVENT_THROTTLE}
                contentContainerStyle={{
                  paddingTop: contentPadding?.top,
                  paddingBottom: keyboardAvoidanceContentPadding + (paddingBottom || 0),
                  paddingLeft,
                  minHeight,
                }}
                onLayout={layoutHandler}
                onContentSizeChange={contentSizeChangeHandler}
                ref={flatListRef}
                data={data}
                initialNumToRender={initialNumToRender}
                horizontal={horizontal}
                showsHorizontalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
                keyExtractor={keyExtractor || handleKeyExtractor}
                renderItem={handleRenderItem}
                onScroll={onscrollHandler}
                onScrollBeginDrag={scrollBeginDrag}
                onScrollEndDrag={scrollEndDrag}
                ItemSeparatorComponent={showSeparator ? SeparatorComponent : null}
                testID={testID || "uc-lib.list"}
                accessibilityLabel={testID || "uc-lib.list"}
                pagingEnabled={sticky}
                getItemLayout={getItemLayout}
                keyboardShouldPersistTaps={"handled"}
                keyboardDismissMode={dismissKeyboardOnDrag ? "on-drag" : "none"}
                onViewableItemsChanged={viewableItemCallbackRef.current}
                viewabilityConfig={viewabilityConfigRef.current}
                showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                numColumns={columns}
                centerContent={centerContent}
                key={columns}
              />
            </NativeViewGestureHandler>
          </Reanimated.View>
        </PanGestureHandler>
      </Flex>
    </KeyboardAvoidanceContainerContextProvider>
  )
})

List.defaultProps = {
  dismissKeyboardOnDrag: true,
  overscrollLimits: {
    y: { lower: 0, upper: 0 },
  },
}
