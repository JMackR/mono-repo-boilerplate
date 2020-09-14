import React from "react"
import { usePullToRefresh, PullToRefreshContainer, StockPTRHeader, PullToRefreshListContainer } from "."
import { StockPTRListProps } from "./pull-to-refresh"
import { List } from "uc-lib"

// tslint:disable-next-line: no-any
export const StockPTRList = <ItemData extends any>(props: StockPTRListProps<ItemData>) => {
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

  return (
    <PullToRefreshContainer {...props}>
      <PullToRefreshListContainer listTy={ptrListTy}>
        <List
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
}
