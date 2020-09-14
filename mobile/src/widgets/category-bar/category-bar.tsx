import React, { FC } from "react"
import _ from "lodash"
import { Navigation } from "../../navigation/navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator/navigableroute"
import { useScreen } from "uc-lib/hooks/screen-provider/screen-provider.native"
import { CategoryBar as SharedCategoryBar, AnalyticsBrowse, BrowseElementName, SearchScreenName } from "shared-lib"
import { CategoryBarProps } from "shared-lib/widgets/category-bar/category-bar.d"

export const CategoryBar: FC<CategoryBarProps> = ({ paddingLeft, testID }) => {
  const { screenName } = useScreen()
  const handlePressCategory = (cid: string) => {
    AnalyticsBrowse.trackCarouselClick({
      elementName: BrowseElementName.CategoryCarousel,
      screenName: screenName as SearchScreenName,
      // TODO: udpate name with new category name
      name: cid,
    })
    Navigation.navigateToRoute(NavigableRoute.Search, { cid })
  }
  const handlePressAllCategories = () => {
    AnalyticsBrowse.trackCarouselClick({
      elementName: BrowseElementName.CategoryCarousel,
      screenName: screenName as SearchScreenName,
      // TODO: update name with new category name
      name: "All Categories",
    })
    Navigation.navigateToRoute(NavigableRoute.AllCategories)
  }
  return (
    <SharedCategoryBar
      onPressAllCategories={handlePressAllCategories}
      onPressCategory={handlePressCategory}
      paddingLeft={paddingLeft}
      testID={testID}
    />
  )
}
