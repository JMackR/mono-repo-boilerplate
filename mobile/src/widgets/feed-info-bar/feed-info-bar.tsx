import React, { FC, useContext } from "react"
import _ from "lodash"
import {
  FeedInfoBar as SharedFeedInfoBar,
  AnalyticsBrowse,
  BrowseElementName,
  SearchScreenName,
  saveUserSearchLocation,
  HomeContext,
  SearchContext,
} from "shared-lib"
import { CommonNavs } from "../../navigation/navigation"
import { LocationPickerType } from "../../screens/location-picker/location-picker"
import { FeedInfoBarProps } from "shared-lib/widgets/portfolio-info-bar/portfolio-info-bar.d"
import { useScreen } from "uc-lib"

export const FeedInfoBar: FC<FeedInfoBarProps> = ({ isLandingScreen, testID }) => {
  const context = isLandingScreen ? HomeContext : SearchContext
  const { screenName } = useScreen()
  const { state } = useContext(context)

  const handlePress = async () => {
    AnalyticsBrowse.trackButtonClick({
      elementName: BrowseElementName.LocationShippingFilter,
      screenName: screenName as SearchScreenName,
      categoryId: state.searchParams && state.searchParams.cid,
    })

    CommonNavs.presentSearchLocationFilters({ isLandingScreen })
  }
  return <SharedFeedInfoBar onPress={handlePress} isLandingScreen={isLandingScreen} testID={testID} />
}
