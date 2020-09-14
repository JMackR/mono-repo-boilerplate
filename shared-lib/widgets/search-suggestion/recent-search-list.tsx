import React, { FC, useEffect, useState } from "react"
import { useRecentSearch, translate } from "uc-lib"
import { List, Text, Stack, Touchable, Margin, Separator, Spacer, Flex, ActionClose, SVG } from "uc-lib"
import _ from "lodash"

export const RecentSearchList: FC<{
  onSelectSuggestion: (actionPath: string, label: string) => void
}> = ({ onSelectSuggestion }) => {
  const [recentSearches, setRecentSearches] = useState<any>()
  const { getRecentSearches, removeRecentSearch } = useRecentSearch()
  const fetchRecentSearch = async () => {
    const data = await getRecentSearches()
    setRecentSearches(data)
  }
  useEffect(() => {
    fetchRecentSearch()
  }, [])
  const renderItem = (item: Suggestion, index: number): JSX.Element => {
    const { actionPath, label, subLabel } = item
    const onSelect = () => {
      onSelectSuggestion(actionPath, label)
    }
    const handleDeleteSuggestion = async () => {
      await removeRecentSearch(actionPath)
      await fetchRecentSearch()
    }
    return (
      <Margin marginLeftStep={4} marginRightStep={4} key={index}>
        <Stack grow={1} direction="column">
          <Stack grow={1} direction="row" crossAxisDistribution="center">
            <Stack grow={1} direction="column">
              <Touchable onPress={onSelect} key={index}>
                <Stack grow={1} direction="column" childSeparationStep={1}>
                  <Spacer direction="column" sizeStep={3} />
                  <Text textType="primaryBody2" textAlign="left">
                    {label}
                  </Text>
                  {!!subLabel && (
                    <Text textType="secondaryBody2" color="secondary" textAlign="left">
                      {subLabel}
                    </Text>
                  )}
                  <Spacer direction="column" sizeStep={3} />
                </Stack>
              </Touchable>
            </Stack>
            <Stack direction="column">
              <Spacer direction="column" sizeStep={3} />
              <SVG localSVG={ActionClose} tint="secondary" onPress={handleDeleteSuggestion} />
              <Spacer direction="column" sizeStep={3} />
            </Stack>
          </Stack>
          <Separator />
        </Stack>
      </Margin>
    )
  }
  if (!recentSearches || recentSearches.length === 0) {
    return null
  }
  return (
    <Flex direction="column" axisDistribution="flex-start">
      <Margin marginLeftStep={4} marginRightStep={4}>
        <Text textType="headline3">{translate("search-stack.recent-searches")}</Text>
      </Margin>
      <List data={recentSearches} horizontal={false} renderItem={renderItem} />
    </Flex>
  )
}
