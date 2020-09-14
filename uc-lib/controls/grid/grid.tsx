import React, { forwardRef, useImperativeHandle, useRef } from "react"
import { StyleSheet, css } from "aphrodite/no-important"
import { useMargin } from "../../themes"
import { GridProps } from "./grid.d"
import { getMediaNameBasedOnWindowWidth, MediaName } from "../../utilities"
import { ListRef } from "../list"

const GRID_CONFIGS = {
  [MediaName.Mobile]: {
    colGap: 1,
    rowGap: 1,
    columnTemplate: "repeat(3, 33.3%)",
  },
  [MediaName.Tablet]: {
    colGap: 6,
    rowGap: 2,
    columnTemplate: "repeat(auto-fill, minmax(177px, 1fr))",
  },
  [MediaName.Desktop]: {
    colGap: 6,
    rowGap: 2,
    columnTemplate: "repeat(auto-fill, minmax(177px, 1fr))",
  },
}

// tslint:disable-next-line: no-any
export const Grid = forwardRef(<ItemData extends any>(props: GridProps<ItemData>, ref: React.Ref<ListRef>) => {
  const { baseMargin } = useMargin()

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
      overscrollToOffset: () => {
        // TODO
      },
    }
  })

  const mediaName = getMediaNameBasedOnWindowWidth()
  const config = mediaName ? GRID_CONFIGS[mediaName] : GRID_CONFIGS[MediaName.Mobile]
  const STYLES = StyleSheet.create({
    ougrid: {
      display: "grid",
      rowGap: `${baseMargin * config.rowGap}px`,
      columnGap: `${baseMargin * config.colGap}px`,
      gridTemplateColumns: config.columnTemplate,
    },
  })
  const { data, renderItem } = props
  return (
    <div className={css(STYLES.ougrid)}>
      {data.map((item, index) => {
        const refForFirstIndexOnly = index === 0 ? firstElementRef : undefined

        return (
          <div key={index} ref={refForFirstIndexOnly}>
            {renderItem(item, index)}
          </div>
        )
      })}
    </div>
  )
})
