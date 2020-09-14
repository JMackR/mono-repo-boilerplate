import { useQuery } from "@apollo/react-hooks"
import { AnalyticsDebug } from "../../analytics"
import { propertyOf } from "lodash"
import { SearchParamsProps } from "../../providers/search-provider"

interface FeedHookParams {
  searchParams?: SearchParamsProps
  prefetchData?: SearchResponse
}

/*
 * Hook supported pagination in search portfolio with apollo client
 * Support prefetch data for server side render web page
 */
export const useFeed = (options: FeedHookParams) => {
  const { searchParams = {}, prefetchData = {} } = options
  const { feedItems, feedOptions, feedPresentation, searchAlert: prefetchSearchAlert, nextPageCursor = "" } = prefetchData
  let showFeedItems = feedItems
  let showFeedOptions = feedOptions
  let showFeedPresentation = feedPresentation
  let loadMorePageCursor: string | null | undefined = nextPageCursor
  let query: string | undefined
  let searchSuggestion
  let searchData
  let isEndOfFeedReached = false
  let lastFetchFeedItems = feedItems
  let searchAlert = prefetchSearchAlert

  const searchParamsAsKeyValuePairs: SearchParam[] = Object.keys(searchParams || {}).map(key => ({
    key,
    value: searchParams[key],
  }))

  const { data, loading, error, refetch, fetchMore } = useQuery<Query>(GET_SEARCH_FEED, {
    variables: {
      searchParams: searchParamsAsKeyValuePairs,
    },
    notifyOnNetworkStatusChange: false,
    fetchPolicy: "network-only",
  })

  if (data && data.search) {
    query = data.search.query || undefined
    showFeedItems = data.search.feedItems
    showFeedOptions = data.search.feedOptions
    showFeedPresentation = data.search.feedPresentation
    loadMorePageCursor = data.search.nextPageCursor
    searchSuggestion = data.search.searchSuggestion
    searchData = data.search.searchData
    searchAlert = data.search.searchAlert ? data.search.searchAlert : undefined
    isEndOfFeedReached = !loadMorePageCursor
    lastFetchFeedItems = data.search.feedItems
  }
  const loadMore = async () => {
    if (!loadMorePageCursor) {
      return
    }

    const fetchMoreSearchParams: SearchParam[] = [
      ...searchParamsAsKeyValuePairs,
      {
        key: "page_cursor",
        value: loadMorePageCursor,
      },
    ]

    try {
      await fetchMore({
        query: GET_SEARCH_FEED,
        variables: {
          searchParams: fetchMoreSearchParams,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (
            !fetchMoreResult ||
            propertyOf(fetchMoreResult)("search.next_page_cursor") === propertyOf(previousResult)("search.next_page_cursor")
          ) {
            return previousResult
          }
          isEndOfFeedReached = !propertyOf(fetchMoreResult)("search.next_page_cursor")
          lastFetchFeedItems = propertyOf(fetchMoreResult)("search.feedItems")
          return {
            ...fetchMoreResult,
            next_page_cursor: propertyOf(fetchMoreResult)("search.next_page_cursor"),
            search: {
              ...fetchMoreResult.search,
              feedItems: [
                ...propertyOf(previousResult)("search.feedItems"),
                ...propertyOf(fetchMoreResult)("search.feedItems"),
              ],
            },
          }
        },
      })
    } catch (err) {
      AnalyticsDebug.logError(err)
    }
  }
  return {
    query,
    loading,
    feedErrorMessage: error ? error.message : undefined,
    loadMore,
    searchSuggestion,
    searchData,
    feedItems: showFeedItems,
    feedOptions: showFeedOptions,
    feedPresentation: showFeedPresentation,
    searchAlert,
    refetch,
    isEndOfFeedReached,
    lastFetchFeedItems,
  }
}
