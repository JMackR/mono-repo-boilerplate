import React, { useEffect, useRef, useCallback } from "react"
import { View } from "react-native"
import _ from "lodash"
import { GridItemType, Flex, useScreen } from "uc-lib"
import { FeedItemsGridRef, FeedItemsGridProps, FeedItemWrapper } from "./feed-item-grid.d"
import { RNFeedItem } from "./feed-item"
import { FeedSellerAd } from "./feed-seller-ad"
import { FeedAd } from "./feed-ad"
import { FeedBanner } from "./feed-banner"
import { SaveSearchAlertBanner } from "../save-search-alert-button"
import {
  AnalyticsSavedSearch,
  SavedSearchElementName,
  useFeed,
  AnalyticsAds,
  AdScreenName,
  SellerAd,
  BingAd,
} from "shared-lib"
import { StockPTRGrid } from "../pull-to-refresh"
import { StockPTRGridRef } from "../pull-to-refresh/pull-to-refresh"
import { FeedItem } from "shared-lib"

enum ActionBannerType {
  searchAlert = "search_alert",
  fanout = "fanout",
}

const DEFALUT_GRID_COLUMNS = 3
const ENDREACHED_THREADHOLD = 2

const processFeedItems = (feed?: FeedItemWrapper[] | null, numColumns?: number, shouldShowDetails: boolean = false) => {
  if (!feed || !numColumns) {
    return []
  }

  const feedItems = feed.filter(item => !item.isDummyItem)
  const isFullRowItem = (item: FeedItemWrapper) => {
    if (item.isDummyItem || !item.type) {
      return false
    }
    return [GridItemType.Banner, GridItemType.ActionBanner].includes(item.type as GridItemType)
  }
  const isAppendedDummpyItemsToNextOneFullRowItem = (index: number) => {
    const nextIndex = index + 1
    if (nextIndex >= feedItems.length) {
      return false
    }
    if (isFullRowItem(feedItems[index])) {
      return false
    }
    return isFullRowItem(feedItems[nextIndex])
  }
  const indexIsAd = (index: number) => {
    if (index < feedItems.length) {
      return feedItems[index].type === "ad"
    }
    return false
  }
  const indexWithinRow = (index: number) => {
    return index % numColumns
  }

  const rowOfIndex = (index: number) => {
    return Math.floor(index / numColumns)
  }
  const marginNeededForRow: { [index: number]: boolean | undefined } = {}
  for (let i = 0; i < feedItems.length; i++) {
    const isAd = indexIsAd(i)
    const feedItem = feedItems[i]
    const rowOfCurrentItem = rowOfIndex(i)

    feedItem.needsTopMargin =
      !feedItem.isDummyItem && !isFullRowItem(feedItem) && !shouldShowDetails && marginNeededForRow[rowOfCurrentItem]

    if (isAppendedDummpyItemsToNextOneFullRowItem(i)) {
      // Append dummy items to fill the row so one row item can go on the new row
      const appendedDummyItemNum = numColumns - (indexWithinRow(i) + 1)
      for (let j = 0; j < appendedDummyItemNum; j++) {
        const dummyObject: FeedItemWrapper = { isDummyItem: true, needsTopMargin: false }
        feedItems.splice(i + 1, 0, dummyObject)
      }
    }
    if (isAd && !shouldShowDetails) {
      const dummyObject: FeedItemWrapper = { isDummyItem: true, needsTopMargin: false }
      const spliceLocation = i + numColumns
      if (spliceLocation < feedItems.length && !feedItems[spliceLocation].isDummyItem) {
        feedItems.splice(spliceLocation, 0, dummyObject)
      }
      marginNeededForRow[rowOfCurrentItem + 1] = true
    } else if (isFullRowItem(feedItems[i])) {
      // Append dummy items to fill up the row so this row can be filled up
      const appendedDummyItemNum = numColumns - 1
      for (let j = 0; j < appendedDummyItemNum; j++) {
        const dummyObject: FeedItemWrapper = { isDummyItem: true, needsTopMargin: false }
        feedItems.splice(i + 1, 0, dummyObject)
      }
    }
  }
  return feedItems
}

const DummyTile = React.memo(() => {
  return <View style={{ height: 0 }} />
})

export const FeedItemsGrid = React.forwardRef((props: FeedItemsGridProps, ref: React.Ref<FeedItemsGridRef>) => {
  const {
    onLoadingChanged,
    onQueryChanged,
    onSearchAlertChanged,
    onSearchDataChanged,
    onSearchSuggestionChanged,
    onErrorRender,
    onLoadingRender,
    onEmptyRender,
    onFeedOptionsChanged,
    searchParams,
    onClickFeedItem,
    onClickAdItem,
    onAnimatedScroll,
    onPressSaveSearchBanner,
    renderSaveSearchBannerOnlyPlaceholder,
    expandedHeaderHeight,
    testID,
  } = props
  const {
    query,
    loading,
    feedErrorMessage,
    refetch,
    feedItems,
    feedOptions,
    loadMore,
    searchAlert,
    searchData,
    feedPresentation,
    searchSuggestion,
    lastFetchFeedItems,
  } = useFeed({
    searchParams,
  })
  const { screenName } = useScreen()
  const gridNumColums = feedPresentation?.columnCount || DEFALUT_GRID_COLUMNS
  const shouldShowDetails = feedPresentation?.showDetailsOnTiles || false
  const processedFeedItems = React.useMemo(() => processFeedItems(feedItems, gridNumColums, shouldShowDetails), [
    feedItems,
    gridNumColums,
    shouldShowDetails,
  ])

  let feedIndex: number
  const _renderItem: (item: FeedItemWrapper, index: number) => React.ReactElement = (feedItem, index) => {
    if (feedItem.isDummyItem) {
      return <DummyTile />
    }
    if (index === 0) {
      feedIndex = -1
    }
    feedIndex++
    switch (feedItem.type) {
      case GridItemType.Item: {
        return <RNFeedItem feedItem={feedItem} onClick={onClickFeedItem} shouldShowDetails={shouldShowDetails} />
      }
      case GridItemType.SellerAd: {
        return (
          <FeedSellerAd
            feedItem={feedItem}
            onClick={onClickFeedItem}
            shouldShowDetails={shouldShowDetails}
            feedIndex={feedIndex}
          />
        )
      }
      case GridItemType.Banner: {
        if (!feedItem.banner) {
          return <></>
        }
        return <FeedBanner feedItem={feedItem} />
      }
      case GridItemType.ActionBanner: {
        if (!feedItem.banner) {
          return <></>
        }
        const { actionBannerType } = feedItem.banner
        if (actionBannerType === ActionBannerType.searchAlert) {
          if (feedItems.length === 1 && renderSaveSearchBannerOnlyPlaceholder) {
            return renderSaveSearchBannerOnlyPlaceholder()
          }
          const handlePressSaveSearchBanner = () => {
            AnalyticsSavedSearch.trackButtonClick({
              screenName,
              elementName: SavedSearchElementName.SaveSearchMid,
            })
            onPressSaveSearchBanner && onPressSaveSearchBanner()
          }
          return <SaveSearchAlertBanner onPress={handlePressSaveSearchBanner} />
        }
        return <></>
      }
      case GridItemType.Ad: {
        return (
          <FeedAd feedItem={feedItem} onClick={onClickAdItem} shouldShowDetails={shouldShowDetails} feedIndex={feedIndex} />
        )
      }
      default:
        return <></>
    }
  }

  const refetchListings = async (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      refetch()
        .then(() => resolve())
        .catch(() => reject())
    })
  }

  const onVisibilityChange = (visible: boolean, item: FeedItem, index: number) => {
    if (item.type === "seller_ad") {
      const sellerAd = item.tile as SellerAd
      const ouAdId = sellerAd.ouAdId
      const impressionUrl = sellerAd.impressionFeedbackUrls[0]
    } else if (item.type === "ad") {
      const bingAd = item.tile as BingAd
      const ouAdId = bingAd.ouAdId
      const impressionUrl = bingAd.impressionFeedbackUrl
    }
  }

  const handleEndReached = () => {
    if (!loading) {
      loadMore()
    }
  }

  React.useImperativeHandle(ref, () => {
    return {
      refetch: () => {
        refetch()
          .then()
          .catch()
      },
      scrollToTop: (animated: boolean) => {
        if (!!ptrGridRef.current) {
          ptrGridRef.current.scrollToTop(animated)
        }
      },
    }
  })
  useEffect(() => {
    if (!lastFetchFeedItems) {
      return
    }
    const adItems = lastFetchFeedItems.filter(item =>
      [GridItemType.Ad, GridItemType.SellerAd].includes(item.type as GridItemType),
    )
    const adNetworkItems = _.groupBy(adItems, "tile.adNetwork")
    Object.keys(adNetworkItems)
      .filter(adNetwork => adNetwork !== "undefined")
      .forEach(adNetwork => {
        const { adExperimentId: experimentId, adRequestId, experimentDataHash, searchId } = adNetworkItems[adNetwork][0]
          .tile as BingAd | SellerAd
        AnalyticsAds.trackRequest({
          screenName: screenName as AdScreenName,
          adNetwork,
          adQuery: query,
          adRequestId,
          numAdsRequested: adNetworkItems[adNetwork].length,
          experimentId,
          experimentDataHash,
          searchId,
        })
      })
  }, [lastFetchFeedItems])

  useEffect(() => {
    if (onQueryChanged) {
      onQueryChanged(query)
    }
  }, [query])

  React.useEffect(() => {
    if (onFeedOptionsChanged) {
      onFeedOptionsChanged(feedOptions)
    }
  }, [feedOptions])

  React.useEffect(() => {
    if (onLoadingChanged) {
      onLoadingChanged(loading)
    }
  }, [loading])

  React.useEffect(() => {
    if (onSearchAlertChanged) {
      onSearchAlertChanged(searchAlert)
    }
  }, [searchAlert])

  React.useEffect(() => {
    if (onSearchDataChanged) {
      onSearchDataChanged(searchData)
    }
  }, [searchData])

  React.useEffect(() => {
    if (onSearchSuggestionChanged) {
      onSearchSuggestionChanged(searchSuggestion)
    }
  }, [searchSuggestion])

  const showGrid = feedItems && feedItems.length > 0 && feedOptions
  const showLoading = !showGrid && loading && onLoadingRender
  const showError = !showGrid && !loading && feedErrorMessage && onErrorRender
  const showEmpty = !showGrid && !showLoading && !showError && onEmptyRender
  const keyExtractor = useCallback((_item: any, index: number) => `tile-key-${index}`, [])
  const ptrGridRef = useRef<StockPTRGridRef>(null)

  return (
    <Flex grow={1} testID="feed-items">
      {showGrid && (
        <StockPTRGrid
          ref={ptrGridRef}
          data={processedFeedItems}
          initialNumToRender={processedFeedItems.length}
          keyExtractor={keyExtractor}
          columns={gridNumColums}
          renderItem={_renderItem}
          onEndReachedThreshold={ENDREACHED_THREADHOLD}
          onEndReached={_.debounce(handleEndReached, 500)}
          contentPadding={{ top: expandedHeaderHeight }}
          testID={testID || "portfolio-items.grid"}
          animationHandlers={{
            onScroll: onAnimatedScroll,
          }}
          leadingRefreshHandler={refetchListings}
          leadingHeaderOffset={expandedHeaderHeight}
          onVisibilityChange={onVisibilityChange}
        />
      )}
      {showEmpty && onEmptyRender!()}
      {showLoading && onLoadingRender!()}
      {showError && onErrorRender!()}
    </Flex>
  )
})
