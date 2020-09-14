import React, { FC, useEffect, useCallback } from "react"
import {
  GET_SEARCH_SUGGESTIONS,
  translate,
  useRecentSearch,
  AnalyticsKeywordSearch,
  KeywordSearchElementName,
  SearchScreenName,
  useSearch,
} from "uc-lib"
import { List, Text, Stack, Touchable, Margin, Separator, Spacer, Flex, ActivityIndicator } from "uc-lib"
import { useLazyQuery } from "@apollo/react-hooks"
import _ from "lodash"

interface SearchSuggestionListProps {
  query: string
  onSearchWithQuery: (query: string) => void
  onSelectSuggestion: (actionPath: string, label: string) => void
}
export const SearchSuggestionList: FC<SearchSuggestionListProps> = ({
  query,
  categoryName,
  onSelectSuggestion,
  onSearchWithQuery,
}) => {
  const { state: searchState } = useSearch()
  const [getSearchSuggestions, { loading, data: suggestionsData }] = useLazyQuery(GET_SEARCH_SUGGESTIONS)
  const { addRecentSearch } = useRecentSearch()
  const getUpdatedSearchSuggestions = (keyword?: string) => {
    getSearchSuggestions({
      variables: {
        prefix: _.toString(keyword),
      },
    })
  }
  const updateSearchSuggestions = useCallback(
    _.debounce((keyword: string) => getUpdatedSearchSuggestions(keyword), 200),
    [],
  )
  useEffect(() => {
    updateSearchSuggestions(query)
  }, [query])
  const handlePressSeeAllButton = () => {
    AnalyticsKeywordSearch.trackButtonClick({
      elementName: KeywordSearchElementName.SeeAllResults,
      screenName: SearchScreenName.Search,
      categoryId: (searchState.searchParams && searchState.searchParams.cid) ?? undefined,
    })
    onSearchWithQuery(query)
  }
  const renderItem = (item: Suggestion, index: number): JSX.Element => {
    const { actionPath, label, preposition, subLabel } = item
    const handleSelectSuggestion = async () => {
      await addRecentSearch({
        type: "listing",
        label,
        subLabel,
        actionPath,
      })
      onSelectSuggestion(actionPath, label)
    }
    return (
      <Touchable onPress={handleSelectSuggestion} key={index}>
        <Margin marginLeftStep={4} marginRightStep={4}>
          <Stack grow={1} direction="column">
            <Spacer direction="column" sizeStep={3} />
            <Stack direction="row">
              <Text textType="primaryBody2" textAlign="left">
                {label}
                {categoryName && `${translate("search-stack.search-suggestion.in")}${categoryName}`}
              </Text>
              {!!subLabel && (
                <>
                  <Spacer direction="row" sizeStep={1} />
                  <Text textType="primaryBody1" textAlign="left">
                    {`${preposition} ${subLabel}`}
                  </Text>
                </>
              )}
            </Stack>
            <Spacer direction="column" sizeStep={3} />
            <Separator />
          </Stack>
        </Margin>
      </Touchable>
    )
  }
  if (loading) {
    return <ActivityIndicator size="small" />
  }
  return (
    <Flex direction="column" axisDistribution="flex-start">
      {suggestionsData && <List data={suggestionsData.suggestions.suggestions} horizontal={false} renderItem={renderItem} />}
      <Touchable onPress={handlePressSeeAllButton}>
        <Stack direction="row" axisDistribution="flex-start">
          <Margin marginStep={4}>
            <Text textType="primaryBody2" textAlign="left" color="brand">
              {`${translate("search-stack.search-suggestion.see-all-results-for")} ${query}`}
            </Text>
          </Margin>
        </Stack>
      </Touchable>
    </Flex>
  )
}
