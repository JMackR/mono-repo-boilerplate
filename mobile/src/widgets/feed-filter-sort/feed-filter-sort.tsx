import React, { FC } from "react"
import { Stack, SVG, FilterIcon, SortIcon } from "uc-lib"
import {
  translate,
  useSearch,
  getCountSelectedFilterOptions,
  getSelectedSortName,
  AnalyticsKeywordSearch,
  KeywordSearchElementName,
  SearchScreenName,
} from "shared-lib"
import { Navigation } from "../../navigation/navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator/navigableroute"
import { FeedFilterSortButton } from "./feed-filter-sort-button"
import { useRoute } from "@react-navigation/native"
import { useScreen } from "uc-lib/hooks/screen-provider/screen-provider.native"

const SPACE_MARGIN = 2

export const FeedFilterSort: FC = () => {
  const route = useRoute()
  const { state: searchState } = useSearch()
  const { screenName } = useScreen()
  const handleOpenFilterModal = () => {
    AnalyticsKeywordSearch.trackButtonClick({
      elementName: KeywordSearchElementName.Filter,
      screenName: screenName as SearchScreenName,
      categoryId: searchState.searchParams && searchState.searchParams.cid,
    })
    Navigation.navigateToRoute(NavigableRoute.SearchFilters, { ...route.params.props })
  }
  const handleOpenSortModal = () => {
    AnalyticsKeywordSearch.trackButtonClick({
      elementName: KeywordSearchElementName.Sort,
      screenName: screenName as SearchScreenName,
      categoryId: searchState.searchParams && searchState.searchParams.cid,
    })
    Navigation.navigateToRoute(NavigableRoute.SearchSortModalScreen)
  }
  const selectedFilterCount = getCountSelectedFilterOptions(searchState)
  const selectedSortName = getSelectedSortName(searchState, true)
  const filterButtonText = `${translate("search-stack.filter")}${selectedFilterCount ? `: ${selectedFilterCount}` : ""}`
  const sortButtonText = `${translate("search-stack.sort")}${selectedSortName ? `: ${selectedSortName}` : ""}`
  return (
    <Stack direction="row" childSeparationStep={SPACE_MARGIN}>
      <FeedFilterSortButton
        active={!!selectedFilterCount}
        icon={<SVG localSVG={FilterIcon} tint={!!selectedFilterCount ? "primaryAlt" : "primary"} />}
        text={filterButtonText}
        onClick={handleOpenFilterModal}
        testID="feed-header.feed-filter-button"
      />
      <FeedFilterSortButton
        active={!!selectedSortName}
        icon={<SVG localSVG={SortIcon} tint={!!selectedSortName ? "primaryAlt" : "primary"} />}
        text={sortButtonText}
        onClick={handleOpenSortModal}
        testID="feed-header.feed-sort-button"
      />
    </Stack>
  )
}
