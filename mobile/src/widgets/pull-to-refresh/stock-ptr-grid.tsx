import React, { forwardRef } from "react"
import { usePullToRefresh, PullToRefreshContainer, StockPTRHeader, PullToRefreshListContainer } from "."
import { StockPTRGridProps, StockPTRGridRef } from "./pull-to-refresh"
import { Grid } from "uc-lib"

// tslint:disable-next-line: no-any
export const StockPTRGrid = forwardRef(
  <ItemData extends any>(props: StockPTRGridProps<ItemData>, ref: React.Ref<StockPTRGridRef>) => {
    const {
      animationHandlers,
      leadingRefreshHandler,
      trailingRefreshHandler,
      leadingHeaderOffset,
      trailingHeaderOffset,
      listRef,
    } = props
    const {
      ptrListRef,
      ptrListTy,
      ptrLeadingHeaderTy,
      ptrTrailingHeaderTy,
      ptrOverscrollLimits,
      ptrListScrollEnabled,
      ptrOnLeadingHeaderLayout,
      ptrOnTrailingHeaderLayout,
      ptrOnListOverscroll,
      ptrOnRefreshComplete,
      ptrOnAnimatedScroll,
    } = usePullToRefresh(animationHandlers?.onScroll, listRef)

    React.useImperativeHandle(ref, () => {
      return {
        scrollToTop: (animated: boolean) => {
          if (!!ptrListRef.current) {
            ptrListRef.current.scrollToTop(animated)
          }
        },
      }
    })

    return (
      <PullToRefreshContainer {...props}>
        <PullToRefreshListContainer listTy={ptrListTy}>
          <Grid
            {...props}
            ref={ptrListRef}
            scrollEnabled={ptrListScrollEnabled}
            overscrollEnabled={true}
            overscrollLimits={ptrOverscrollLimits}
            animationHandlers={{ onScroll: ptrOnAnimatedScroll, onOverscroll: ptrOnListOverscroll }}
          />
        </PullToRefreshListContainer>
        {leadingRefreshHandler !== undefined && (
          <StockPTRHeader
            type="leading"
            headerTy={ptrLeadingHeaderTy}
            refreshHandler={leadingRefreshHandler}
            onLayout={ptrOnLeadingHeaderLayout}
            onRefreshComplete={ptrOnRefreshComplete}
            headerOffset={leadingHeaderOffset}
          />
        )}
        {trailingRefreshHandler !== undefined && (
          <StockPTRHeader
            type="trailing"
            headerTy={ptrTrailingHeaderTy}
            refreshHandler={trailingRefreshHandler}
            onLayout={ptrOnTrailingHeaderLayout}
            onRefreshComplete={ptrOnRefreshComplete}
            headerOffset={trailingHeaderOffset}
          />
        )}
      </PullToRefreshContainer>
    )
  },
)
