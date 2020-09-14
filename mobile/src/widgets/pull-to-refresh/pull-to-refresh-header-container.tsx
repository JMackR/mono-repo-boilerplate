import React from "react"
import Reanimated, {
  debug,
  and,
  set,
  cond,
  neq,
  add,
  abs,
  call,
  block,
  eq,
  greaterOrEq,
  lessThan,
} from "react-native-reanimated"
import { StyleSheet, LayoutChangeEvent } from "react-native"
import { PullToRefreshHeaderContainerProps } from "./pull-to-refresh"

const INITIAL_HIDE_OFFSET = -20000
export const PullToRefreshHeaderContainer: React.FC<PullToRefreshHeaderContainerProps> = props => {
  const { children, type, headerTy, headerOffset, onLayout, refreshHandler, onRefreshComplete } = props
  const hideHeaderOffset = React.useRef(new Reanimated.Value<number>(INITIAL_HIDE_OFFSET)).current
  const refreshing = React.useRef(new Reanimated.Value<number>(0)).current
  const styles = StyleSheet.create({
    pull_to_refresh_header_leading: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      overflow: "hidden",
    },
    pull_to_refresh_header_trailing: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      overflow: "hidden",
    },
  })

  const layoutHandler = (e: LayoutChangeEvent) => {
    const offset = type === "leading" ? -e.nativeEvent.layout.height : e.nativeEvent.layout.height
    hideHeaderOffset.setValue(offset)
    if (onLayout) {
      onLayout(e)
    }
  }

  Reanimated.useCode(
    () =>
      block([
        cond(
          and(greaterOrEq(abs(headerTy), abs(hideHeaderOffset)), neq(refreshing, 1)),
          call([], async () => {
            refreshing.setValue(1)
            await refreshHandler().finally(() => {
              if (onRefreshComplete) {
                onRefreshComplete()
              }
            })
          }),
        ),
        cond(and(refreshing, eq(headerTy, 0)), set(refreshing, 0)),
      ]),
    [headerTy, refreshHandler],
  )

  return (
    <Reanimated.View
      style={[
        type === "leading" ? styles.pull_to_refresh_header_leading : styles.pull_to_refresh_header_trailing,
        {
          transform: [
            { translateY: cond(neq(headerTy, 0), add(hideHeaderOffset, add(headerTy, headerOffset)), hideHeaderOffset) },
          ],
        },
      ]}
      onLayout={layoutHandler}
      collapsable={false}
    >
      {children}
    </Reanimated.View>
  )
}

PullToRefreshHeaderContainer.defaultProps = {
  headerOffset: 0,
}
