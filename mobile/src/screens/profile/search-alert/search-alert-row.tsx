import React from "react"
import {
  translate,
  useSearch,
  parseMinAndMaxPriceFromFilters,
  AnalyticsSavedSearch,
  SavedSearchElementName,
} from "shared-lib"
import { Text, Margin, Stack, Flex, Separator, Touchable, useScreen } from "uc-lib"
import { Navigation } from "../../../navigation/navigation"
import { NavigableRoute } from "../../../navigation/navigator"
import { _ } from "lodash"

interface SearchAlertRowProps {
  alert: SearchAlert
  onDeleteSearchAlert(alertId: string): void
  numTotalSearchAlerts?: number
}

export const SearchAlertRow: React.FC<SearchAlertRowProps> = ({ alert, onDeleteSearchAlert, numTotalSearchAlerts }) => {
  const { alertId, query, filters } = alert
  const { filter } = useSearch()
  const { screenName } = useScreen()
  const initButtonClickEventInput = {
    screenName,
    numSavedSearches: numTotalSearchAlerts,
  }
  const handPressDeleteAction = () => {
    AnalyticsSavedSearch.trackButtonClick({
      ...initButtonClickEventInput,
      elementName: SavedSearchElementName.Delete,
    })
    if (alertId) {
      onDeleteSearchAlert(alertId)
    }
  }

  const showSearchResults = () => {
    const cid = undefined // Category id, if search alerts start sending category data we can use that here
    const { priceMin, priceMax } = parseMinAndMaxPriceFromFilters(filters)

    filter({
      priceMin,
      priceMax,
    })
    AnalyticsSavedSearch.trackButtonClick({
      ...initButtonClickEventInput,
      elementName: SavedSearchElementName.ViewSavedSearch,
    })
    Navigation.navigateToRoute(NavigableRoute.SearchFeed, { q: _.toString(query), cid })
  }

  return (
    <>
      <Stack direction="row" crossAxisDistribution="center">
        <Stack grow={1} direction="column">
          <Touchable onPress={showSearchResults}>
            <Margin direction="column" marginLeftStep={4} marginRightStep={4} marginBottomStep={3} marginTopStep={3}>
              <Margin direction="row" crossAxisDistribution="center">
                <Flex grow={1} axisDistribution="flex-start" crossAxisDistribution="center">
                  <Stack direction="column" childSeparationStep={1} crossAxisDistribution="flex-start">
                    <Text textType="secondaryBody2">{query}</Text>
                    <Text textType="tertiaryBody2" color="secondary">
                      {filters}
                    </Text>
                  </Stack>
                </Flex>
              </Margin>
            </Margin>
          </Touchable>
        </Stack>
        <Stack direction="column">
          <Touchable onPress={handPressDeleteAction}>
            <Margin marginStep={4} marginBottomStep={5} marginTopStep={5}>
              <Text textType="secondaryBody2" color="brand">
                {translate("common-actions.delete")}
              </Text>
            </Margin>
          </Touchable>
        </Stack>
      </Stack>
      <Margin direction="column" marginLeftStep={4} marginRightStep={4}>
        <Separator />
      </Margin>
    </>
  )
}
