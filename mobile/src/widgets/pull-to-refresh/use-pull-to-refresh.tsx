import React from "react"
import Reanimated, {
  set,
  cond,
  eq,
  lessThan,
  lessOrEq,
  greaterThan,
  greaterOrEq,
  abs,
  add,
  or,
  and,
  neq,
  max,
  min,
  block,
  sub,
  clockRunning,
  startClock,
  stopClock,
  timing,
  Easing,
  debug,
  onChange,
  call,
} from "react-native-reanimated"
import { LayoutChangeEvent } from "react-native"
import { ListAnimatedOverscrollEvent, ListRef, ListAnimatedScrollEvent } from "uc-lib"

enum HeaderAnimatingState {
  NONE = 0,
  COLLAPSING,
  EXPANDING_LEADING,
  EXPANDING_TRAILING,
}
const HEADER_ANIMATION_DURATION_MS = 150

export const usePullToRefresh = (
  onListAnimatedScroll?: (e: ListAnimatedScrollEvent) => Reanimated.Node<number | never>,
  listRef?: React.MutableRefObject<ListRef>,
) => {
  const _listRef = React.useRef<ListRef>(null)
  const ptrListRef = listRef || _listRef
  const [ptrLeadingHeaderHeight, setPTRLeadingHeaderHeight] = React.useState(0)
  const [ptrTrailingHeaderHeight, setPTRTrailingHeaderHeight] = React.useState(0)
  const [ptrOverscrollLimits, setPTROverscrollLimits] = React.useState({ y: { lower: 0, upper: 0 } })
  const ptrLeadingHeaderTy = React.useRef(new Reanimated.Value<number>(0)).current
  const ptrTrailingHeaderTy = React.useRef(new Reanimated.Value<number>(0)).current
  const ptrListTy = React.useRef(new Reanimated.Value<number>(0)).current
  const [ptrListScrollEnabled, setPTRListScrollEnabled] = React.useState(true)
  const leadingHeaderHeight = React.useRef(new Reanimated.Value<number>(0)).current
  const trailingHeaderHeight = React.useRef(new Reanimated.Value<number>(0)).current
  const headerAnimationClock = React.useRef(new Reanimated.Clock()).current
  const headerAnimationTimingState: Reanimated.TimingState = {
    frameTime: React.useRef(new Reanimated.Value(0)).current,
    finished: React.useRef(new Reanimated.Value(0)).current,
    time: React.useRef(new Reanimated.Value(0)).current,
    position: React.useRef(new Reanimated.Value<number>(0)).current,
  }
  const headerAnimatingState = React.useRef(new Reanimated.Value<number>(HeaderAnimatingState.NONE)).current
  const isBusy = React.useRef(new Reanimated.Value<number>(0)).current
  const scrollOffsetLock = React.useRef(new Reanimated.Value<number>(0)).current
  const listContentHeight = React.useRef(new Reanimated.Value<number>(0)).current
  const listLayoutHeight = React.useRef(new Reanimated.Value<number>(0)).current
  const [scrollToTarget, setScrollToTarget] = React.useState(0)

  const runHeaderAnimation = (value: Reanimated.Value<number>, target: Reanimated.Adaptable<number>) => {
    return block([
      cond(clockRunning(headerAnimationClock), value, [
        set(headerAnimationTimingState.finished, 0),
        set(headerAnimationTimingState.time, 0),
        set(headerAnimationTimingState.frameTime, 0),
        set(headerAnimationTimingState.position, value),
        startClock(headerAnimationClock),
      ]),
      timing(headerAnimationClock, headerAnimationTimingState, {
        duration: HEADER_ANIMATION_DURATION_MS,
        toValue: target,
        easing: Easing.linear,
      }),
      cond(headerAnimationTimingState.finished, [
        stopClock(headerAnimationClock),
        set(headerAnimatingState, HeaderAnimatingState.NONE),
      ]),
      set(value, headerAnimationTimingState.position),
      set(ptrListTy, headerAnimationTimingState.position),
      updateIsBusy(),
      headerAnimationTimingState.position,
    ])
  }

  const isLeadingExpanded = and(eq(leadingHeaderHeight, abs(ptrLeadingHeaderTy)), neq(leadingHeaderHeight, 0))

  const isTrailingExpanded = and(eq(trailingHeaderHeight, abs(ptrTrailingHeaderTy)), neq(trailingHeaderHeight, 0))

  const updateIsBusy = () => {
    return block([
      set(isBusy, or(isLeadingExpanded, isTrailingExpanded, neq(headerAnimatingState, HeaderAnimatingState.NONE))),
      onChange(isBusy, [
        cond(and(isBusy, isLeadingExpanded), set(scrollOffsetLock, 0)),
        cond(and(isBusy, isTrailingExpanded), set(scrollOffsetLock, max(0, sub(listContentHeight, listLayoutHeight)))),
        call([isBusy, scrollOffsetLock], ([busy, offsetlock]) => {
          setPTRListScrollEnabled(busy === 0)
          setScrollToTarget(offsetlock)
        }),
      ]),
    ])
  }

  const ptrOnAnimatedScroll = (e: ListAnimatedScrollEvent) => {
    const cmdArray = [set(listContentHeight, e.contentSize.height), set(listLayoutHeight, e.layoutMeasurement.height)]

    if (onListAnimatedScroll !== undefined) {
      cmdArray.push(
        cond(
          isBusy,
          onListAnimatedScroll({ ...e, contentOffset: { x: e.contentOffset.x, y: scrollOffsetLock } }),
          onListAnimatedScroll(e),
        ),
      )
    }

    return block(cmdArray)
  }

  const ptrOnRefreshComplete = () => {
    ptrCollapse()
  }

  const ptrCollapse = () => {
    headerAnimatingState.setValue(
      cond(eq(headerAnimatingState, HeaderAnimatingState.NONE), HeaderAnimatingState.COLLAPSING, headerAnimatingState),
    )
  }

  const ptrExpand = (header: "leading" | "trailing") => {
    const state = header === "leading" ? HeaderAnimatingState.EXPANDING_LEADING : HeaderAnimatingState.EXPANDING_TRAILING
    headerAnimatingState.setValue(cond(eq(headerAnimatingState, HeaderAnimatingState.NONE), state, headerAnimatingState))
  }

  const ptrOnLeadingHeaderLayout = (e: LayoutChangeEvent) => {
    leadingHeaderHeight.setValue(e.nativeEvent.layout.height)
    setPTRLeadingHeaderHeight(e.nativeEvent.layout.height)
  }

  const ptrOnTrailingHeaderLayout = (e: LayoutChangeEvent) => {
    trailingHeaderHeight.setValue(e.nativeEvent.layout.height)
    setPTRTrailingHeaderHeight(e.nativeEvent.layout.height)
  }

  const ptrOnListOverscroll = (e: ListAnimatedOverscrollEvent) => {
    return block([
      cond(
        eq(headerAnimatingState, HeaderAnimatingState.NONE),
        cond(
          or(isLeadingExpanded, isTrailingExpanded),
          [
            cond(isLeadingExpanded, set(ptrListTy, max(0, add(leadingHeaderHeight, e.y)))),
            cond(isTrailingExpanded, set(ptrListTy, min(0, sub(e.y, trailingHeaderHeight)))),
          ],
          [
            cond(eq(e.y, 0), [set(ptrLeadingHeaderTy, 0), set(ptrTrailingHeaderTy, 0)]),
            cond(lessThan(e.y, 0), set(ptrLeadingHeaderTy, min(leadingHeaderHeight, sub(0, e.y)))),
            cond(greaterThan(e.y, 0), set(ptrTrailingHeaderTy, sub(0, min(trailingHeaderHeight, e.y)))),
          ],
        ),
      ),
      updateIsBusy(),
    ])
  }

  React.useEffect(() => {
    if (!ptrListScrollEnabled && ptrListRef.current) {
      ptrListRef.current.scrollToOffset(scrollToTarget)
    }
  }, [ptrListScrollEnabled, scrollToTarget])

  React.useEffect(() => {
    setPTROverscrollLimits({ y: { lower: -ptrLeadingHeaderHeight, upper: ptrTrailingHeaderHeight } })
  }, [ptrLeadingHeaderHeight, ptrTrailingHeaderHeight])

  Reanimated.useCode(() => {
    return block([
      cond(
        and(eq(headerAnimatingState, HeaderAnimatingState.EXPANDING_LEADING), greaterThan(leadingHeaderHeight, 0)),
        runHeaderAnimation(ptrLeadingHeaderTy, leadingHeaderHeight),
      ),
      cond(
        and(eq(headerAnimatingState, HeaderAnimatingState.EXPANDING_TRAILING), greaterThan(trailingHeaderHeight, 0)),
        runHeaderAnimation(ptrTrailingHeaderTy, sub(0, trailingHeaderHeight)),
      ),
      cond(
        and(eq(headerAnimatingState, HeaderAnimatingState.COLLAPSING), greaterOrEq(ptrListTy, 0)),
        runHeaderAnimation(ptrLeadingHeaderTy, 0),
      ),
      cond(
        and(eq(headerAnimatingState, HeaderAnimatingState.COLLAPSING), lessOrEq(ptrListTy, 0)),
        runHeaderAnimation(ptrTrailingHeaderTy, 0),
      ),
    ])
  }, [headerAnimatingState])

  return {
    ptrListRef,
    ptrLeadingHeaderTy,
    ptrTrailingHeaderTy,
    ptrListTy,
    ptrListScrollEnabled,
    ptrLeadingHeaderHeight,
    ptrTrailingHeaderHeight,
    ptrOverscrollLimits,
    ptrOnLeadingHeaderLayout,
    ptrOnTrailingHeaderLayout,
    ptrOnListOverscroll,
    ptrOnRefreshComplete,
    ptrCollapse,
    ptrExpand,
    ptrOnAnimatedScroll,
  }
}
