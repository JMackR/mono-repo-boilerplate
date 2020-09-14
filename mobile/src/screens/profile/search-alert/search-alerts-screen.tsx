import React from "react"
import { ScreenRouteAndStackNavigation } from "../../../navigation/route"
import { CommonNavs, Navigation } from "../../../navigation/navigation"
import { NavigatorParamList, NavigableRoute } from "../../../navigation/navigator"
import {
  translate,
  GET_SEARCH_ALERT,
  DELETE_SEARCH_ALERT,
  AnalyticsSavedSearch,
  SavedSearchElementName,
} from "shared-lib"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { Screen, StockPTRList } from "../../../widgets"
import { NavigationBar, Flex, NAVIGATION_BAR_HEIGHT, Center, ActivityIndicator } from "uc-lib"
import { SearchAlertRow } from "./search-alert-row"
import { SearchScreenName, SearchAlertEmptyPlaceholder } from "shared-lib"
import { getNavigationBackButton } from "../../../navigation/common"
import { AffirmRejectDialogScreenProps } from "../../dialog"

export const AccountSearchAlertsScreen: React.FC<ScreenRouteAndStackNavigation<
  NavigatorParamList,
  NavigableRoute.AccountSearchAlerts
>> = () => {
  const { loading, data: searchAlertsData, refetch: refetchSearchAlert } = useQuery(GET_SEARCH_ALERT, {
    fetchPolicy: "network-only",
  })
  const [deleteSearchAlert] = useMutation(DELETE_SEARCH_ALERT)
  const searchAlerts = searchAlertsData && searchAlertsData.searchAlerts.alerts

  const handleDeleteSearchAlert = async (alertId: string) => {
    const props: AffirmRejectDialogScreenProps = {
      onAffirm: () => {
        onDeleteSearchAlert(alertId)
      },
      onReject: () => {},
      affirmText: translate("common-actions.delete"),
      rejectText: translate("common-actions.cancel"),
      title: translate("profile-stack.search-alert-screen.delete-search-alert.title"),
      body: translate("profile-stack.search-alert-screen.delete-search-alert.body"),
    }
    Navigation.performWhenAvailable(() => {
      Navigation.navigateToRoute(NavigableRoute.AffirmRejectDialog, props)
    })
  }
  const onBackButton = () => {
    AnalyticsSavedSearch.trackButtonClick({
      screenName: SearchScreenName.SavedSearch,
      numSavedSearches: searchAlerts && searchAlerts.length,
      elementName: SavedSearchElementName.Back,
    })
  }
  const onDeleteSearchAlert = async (alertId: string) => {
    try {
      await deleteSearchAlert({ variables: { alertId } })
      await refetchSearchAlert()
    } catch (error) {
      CommonNavs.presentError({ error })
    }
  }
  const refetchSearchAlerts = async (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      refetchSearchAlert()
        .then(() => resolve())
        .catch(() => reject())
    })
  }
  const renderItem = (alert: SearchAlert, index: number) => {
    return (
      <SearchAlertRow
        key={index}
        alert={alert}
        numTotalSearchAlerts={searchAlerts && searchAlerts.length}
        onDeleteSearchAlert={handleDeleteSearchAlert}
      />
    )
  }
  return (
    <Screen safeAreaMode="top" screenName={SearchScreenName.SavedSearch}>
      {loading ? (
        <Center>
          <ActivityIndicator size="large" />
        </Center>
      ) : (
        <>
          <Flex direction="column" grow={0} height={NAVIGATION_BAR_HEIGHT}>
            <NavigationBar
              title={translate("profile-stack.search-alert-screen.title")}
              leftItems={[getNavigationBackButton("search-alert-screen.navigation-bar", onBackButton)]}
              testID="search-alert-screen.navigation-bar"
            />
          </Flex>
          {searchAlerts && searchAlerts.length ? (
            <StockPTRList data={searchAlerts} renderItem={renderItem} leadingRefreshHandler={refetchSearchAlerts} />
          ) : (
            <SearchAlertEmptyPlaceholder />
          )}
        </>
      )}
    </Screen>
  )
}
