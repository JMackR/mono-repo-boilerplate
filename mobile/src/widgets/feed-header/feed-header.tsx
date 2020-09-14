import React, { FC, useRef, useImperativeHandle, forwardRef, useContext } from "react"
import { View } from "react-native"
import { Margin, Stack, Spacer, SVG, useScreen } from "uc-lib"
import { CategoryBar } from "../category-bar"
import { CategoryTitle } from "../category-title"
import { FeedInfoBar } from "../feed-info-bar"
import { SearchInputBar, SearchInputBarRef } from "../search-input-bar"
import { FeedFilterSort } from "../feed-filter-sort"
import { FeedHeaderProps, FeedHeaderRef } from "./feed-header.d"
import { Navigation } from "../../navigation/navigation/navigation"
import { SearchSuggestionLink } from "../search-suggestion-link"
import { AnalyticsSavedSearch, SavedSearchElementName } from "shared-lib"
import { getNavigationBackIcon } from "../../navigation/common"

const MARGIN_STEP = 4
const MARGIN_HALF_STEP = 2
const PADDING_LEFT_CATEGORIES = 16

export const FeedHeader = forwardRef<FeedHeaderRef, FeedHeaderProps>(
  (
    {
      query,
      cid,
      isLandingScreen,
      isSearchFilterSort,
      showFeedInfoBar = true,
      showSearchPlaceholder,
      showSearchAlertButton,
      originalQuery,
      searchWithOriginalQuery,
      testID,
    },
    ref,
  ) => {
    const { screenName } = useScreen()
    const searchInputBarRef = useRef<SearchInputBarRef>(null)
    useImperativeHandle(ref, () => ({
      saveSearch: () => {
        if (searchInputBarRef && searchInputBarRef.current) {
          searchInputBarRef.current.saveSearch()
        }
      },
    }))
    const handlePressCancelButton = () => {
      Navigation.goBack()
    }
    const handleSaveAlertPress = () => {
      AnalyticsSavedSearch.trackButtonClick({
        screenName,
        elementName: SavedSearchElementName.SaveSearchTop,
      })
    }
    return (
      <View testID={testID || "portfolio-header"}>
        <Margin marginTopStep={MARGIN_STEP} marginBottomStep={MARGIN_STEP} direction="column">
          <Margin marginLeftStep={MARGIN_STEP} marginRightStep={MARGIN_STEP} direction="column">
            <Stack childSeparationStep={MARGIN_STEP} direction="column">
              <Stack direction="row" crossAxisDistribution="center" testID="search-input-bar">
                {!isLandingScreen && (
                  <Stack direction="row" axisDistribution="center">
                    <SVG localSVG={getNavigationBackIcon()} tint="brand" onPress={handlePressCancelButton} />
                    <Spacer direction="row" sizeStep={5} />
                  </Stack>
                )}
                <SearchInputBar
                  ref={searchInputBarRef}
                  query={query}
                  cid={cid}
                  isLandingScreen={isLandingScreen}
                  showSearchPlaceholder={showSearchPlaceholder}
                  showSearchAlertButton={showSearchAlertButton}
                  onSaveAlertPress={handleSaveAlertPress}
                  testID={(testID || "portfolio-header") + ".search-input-bar"}
                />
              </Stack>
              {originalQuery && searchWithOriginalQuery && (
                <SearchSuggestionLink originalQuery={originalQuery} searchWithOriginalQuery={searchWithOriginalQuery} />
              )}
              {cid && <CategoryTitle id={cid} testID={(testID || "portfolio-header") + ".category-title"} />}
            </Stack>
          </Margin>
          {isLandingScreen ? (
            <Margin marginTopStep={MARGIN_STEP} marginBottomStep={MARGIN_HALF_STEP}>
              <CategoryBar paddingLeft={PADDING_LEFT_CATEGORIES} testID={(testID || "portfolio-header") + ".category-bar"} />
            </Margin>
          ) : (
            <Spacer direction="column" sizeStep={MARGIN_HALF_STEP} />
          )}
          <Margin marginLeftStep={MARGIN_STEP} marginRightStep={MARGIN_STEP} direction="column">
            <Stack childSeparationStep={MARGIN_HALF_STEP} direction="column">
              {showFeedInfoBar && (
                <FeedInfoBar
                  isLandingScreen={isLandingScreen}
                  testID={(testID || "portfolio-header") + ".portfolio-info-bar"}
                />
              )}
              {isSearchFilterSort && <FeedFilterSort />}
            </Stack>
          </Margin>
        </Margin>
      </View>
    )
  },
)
