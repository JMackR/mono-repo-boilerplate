import { useRef } from "react"
import { ListAnimatedScrollEvent } from "uc-lib"
import Reanimated, { block, set, max, min, add, sub } from "react-native-reanimated"

export const useCollapseScrollListener = (expandedHeaderHeight: number) => {
  const headerTyAnimated = useRef(new Reanimated.Value(0)).current
  const clampedY = useRef(new Reanimated.Value(0)).current
  const lastOffsetY = useRef(new Reanimated.Value(0)).current
  const onScroll = (e: ListAnimatedScrollEvent) =>
    block([
      set(clampedY, max(0, min(sub(e.contentSize.height, e.layoutMeasurement.height), e.contentOffset.y))),
      set(headerTyAnimated, min(0, max(-expandedHeaderHeight, add(headerTyAnimated, sub(lastOffsetY, clampedY))))),
      set(lastOffsetY, clampedY),
    ])
  return { headerTyAnimated, onScroll }
}
