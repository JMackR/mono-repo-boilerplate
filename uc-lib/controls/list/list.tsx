import React, { useRef, forwardRef, useImperativeHandle } from "react"
import { css, StyleSheet } from "aphrodite/no-important"
import { ListProps, ListRef } from "./list.d"
import { VisibilityCheck } from "../visibility-check"
import { useInfiniteScroll } from "../../hooks"

export const List = forwardRef(<ItemData extends any>(props: ListProps<ItemData>, ref: React.Ref<ListRef>) => {
  const { horizontal: horizontalProp, data, renderItem, onEndReached, onEndReachedThreshold, paddingBottom } = props

  const firstElementRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => {
    return {
      scrollToTop: (animated?: boolean) => {
        if (firstElementRef.current) {
          const scrollBehavior = (animated === undefined ? true : animated) ? "smooth" : "auto"
          const scrollOptions: ScrollIntoViewOptions = {
            behavior: scrollBehavior,
            block: "start",
          }
          firstElementRef.current.scrollIntoView(scrollOptions)
        }
      },
      scrollToIndex: () => {
        // TODO
      },
      scrollToEnd: () => {
        // TODO
      },
      scrollToOffset: () => {
        // TODO
      },
    }
  })

  const horizontal: boolean = horizontalProp !== undefined ? horizontalProp : false
  const styles = StyleSheet.create({
    list: {
      overflowX: horizontal ? "auto" : "hidden",
      overflowY: horizontal ? "hidden" : "auto",
      display: "flex",
      flexDirection: horizontal ? "row" : "column",
      flex: 1,
      paddingBottom,
    },
  })
  const { handleItemVisibilityChange } = useInfiniteScroll({
    data,
    onEndReachedThreshold,
    onEndReached,
  })
  return (
    <div style={{ overflow: "hidden", display: "flex" }}>
      <div className={css(styles.list)}>
        {(data || []).map((item, index) => {
          const refForFirstIndexOnly = index === 0 ? firstElementRef : undefined

          return (
            <div key={index} ref={refForFirstIndexOnly}>
              <VisibilityCheck index={index} onVisibilityChange={handleItemVisibilityChange}>
                {renderItem(item, index)}
              </VisibilityCheck>
            </div>
          )
        })}
      </div>
    </div>
  )
})
