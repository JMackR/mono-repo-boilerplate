import React, { FC, useEffect, useState } from "react"
import { Text, Flex, Margin, Stack, Spacer, AlertFill, AlertLine, EmptyState, TabBarNotificationsOutline } from "uc-lib"
import { translate, useSearch, AnalyticsSavedSearch, SavedSearchElementName } from "shared-lib"
import { SaveSearchAlertButton } from "../save-search-alert-button"
import { useScreen } from "uc-lib/hooks/screen-provider/screen-provider.native"

interface FeedEmptyPlaceholderProps {
  query?: string
}

export const FeedEmptyPlaceholder: FC<FeedEmptyPlaceholderProps> = ({ query }) => {
  const { state: searchState } = useSearch()
  const [isSavedSearch, setIsSavedSearch] = useState(!!searchState.searchAlert?.alertId)
  const { screenName } = useScreen()
  useEffect(() => {
    setIsSavedSearch(!!searchState.searchAlert?.alertId)
  }, [searchState.searchAlert])
  const handleSaveAlertPress = () => {
    AnalyticsSavedSearch.trackButtonClick({
      screenName,
      elementName: SavedSearchElementName.SaveSearchEmpty,
    })
  }
  if (!!query) {
    return (
      <Flex grow={1} axisDistribution="center">
        <Stack direction="column" crossAxisDistribution="center">
          <Spacer direction="column" sizeStep={14} />
          {isSavedSearch ? (
            <Stack direction="column" crossAxisDistribution="center" childSeparationStep={4}>
              <EmptyState
                icon={{ SVG: AlertFill.SVG, size: { width: 48, height: 48 } }}
                title={translate("search-stack.search-alert.empty-placeholder.remove-search.title")}
                subtitle={translate("search-stack.search-alert.empty-placeholder.remove-search.description")}
              />
              <SaveSearchAlertButton query={query} />
            </Stack>
          ) : (
            <Stack direction="column" crossAxisDistribution="center" childSeparationStep={4}>
              <EmptyState
                icon={{ SVG: AlertLine.SVG, size: { width: 48, height: 48 } }}
                title={translate("search-stack.search-alert.empty-placeholder.save-search.title")}
                subtitle={translate("search-stack.search-alert.empty-placeholder.save-search.description")}
              />
              <SaveSearchAlertButton query={query} onSavePress={handleSaveAlertPress} />
            </Stack>
          )}
        </Stack>
      </Flex>
    )
  }
  if (!!searchState.searchParams.cid) {
    return (
      <Flex grow={1} axisDistribution="center">
        <Stack direction="column" crossAxisDistribution="center">
          <Spacer direction="column" sizeStep={14} />
          <EmptyState
            icon={{ SVG: TabBarNotificationsOutline.SVG, size: { width: 48, height: 48 } }}
            title={translate("search-stack.portfolio-items.empty-placeholder.category.title")}
            subtitle={translate("search-stack.portfolio-items.empty-placeholder.category.description")}
          />
        </Stack>
      </Flex>
    )
  }
  return (
    <Flex grow={1} axisDistribution="flex-start">
      <Margin marginStep={4}>
        <Text textType="primaryBody1" testID="feed-items.empty-result">
          {translate("search-stack.portfolio-items.empty-result")}
        </Text>
      </Margin>
    </Flex>
  )
}
