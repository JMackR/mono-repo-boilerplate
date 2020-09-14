import React, { FC, useEffect, useState } from "react"
import { Text, Flex, Margin, Stack, Spacer, AlertFill, AlertLine, EmptyState, useScreen } from "uc-lib"
import { useSearch } from "../../providers"
import { translate } from "../../utilities"
interface FeedEmptyPlaceholderProps {
  query?: string
  onSaveAlertPress?(): void
}

export const EmptyPlaceholder: FC<FeedEmptyPlaceholderProps> = ({ query }) => {
  const { state: searchState } = useSearch()
  const { screenName } = useScreen()
  const [isSavedSearch, setIsSavedSearch] = useState(!!searchState.searchAlert?.alertId)
  useEffect(() => {
    setIsSavedSearch(!!searchState.searchAlert?.alertId)
  }, [searchState.searchAlert])

  if (!!query) {
    return (
      <Flex grow={1} axisDistribution="center">
        <Stack direction="column" crossAxisDistribution="center" width={350}>
          <Spacer direction="column" sizeStep={14} />
          {isSavedSearch ? (
            <Stack direction="column" crossAxisDistribution="center" childSeparationStep={6}>
              <EmptyState
                icon={{ SVG: AlertFill.SVG, size: { width: 48, height: 48 } }}
                title={translate("search-stack.search-alert.empty-placeholder.remove-search.title")}
                subtitle={translate("search-stack.search-alert.empty-placeholder.remove-search.description")}
              />
            </Stack>
          ) : (
            <Stack direction="column" crossAxisDistribution="center" childSeparationStep={8}>
              <EmptyState
                icon={{ SVG: AlertLine.SVG, size: { width: 48, height: 48 } }}
                title={translate("search-stack.search-alert.empty-placeholder.save-search.title")}
                subtitle={translate("search-stack.search-alert.empty-placeholder.save-search.description")}
              />
            </Stack>
          )}
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
