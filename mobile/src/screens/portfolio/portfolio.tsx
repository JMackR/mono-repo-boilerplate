import React, { useRef } from "react"
import { Screen } from "../../widgets/screen"
import { translate } from "shared-lib"
import { NavigationBar, NAVIGATION_BAR_HEIGHT } from "uc-lib/widgets/navigation-bar"
import { NavigableRoute } from "../../navigation/navigator/navigableroute"
import { FilterIcon, Flex, Margin, Text } from "uc-lib"
import { Navigation } from "../../navigation/navigation"
import { SearchInputBar, SearchInputBarRef } from "../../widgets/search-input-bar"
import { ListTitle } from "./list-component/list-title"
import { InfoSection } from "./info-section"
import { ListContainer } from "./list-component/list-container"

export const PortfolioScreen = () => {
  const [focused, setFocused] = React.useState(false)
  const onFocus = () => {
    setFocused(true)
  }

  const onBlur = () => {
    setFocused(false)
  }

  const FilterButton: NavigationBarItem[] = [
    {
      title: "",
      icon: FilterIcon,
      colorTint: "brand",
      testID: "portolio-screen.header.filter-button",
      pressHandler: () => {
        Navigation.navigateToRoute(NavigableRoute.PortfolioFilter, { originPayload: {} })
        // AccountAnalyticsController.trackUserChangeNameElementClick(AccountSettingsScreenElement.Cancel)
      },
    },
  ]

  const searchInputBarRef = useRef<SearchInputBarRef>(null)

  return (
    <Screen safeAreaMode="top" onFocus={onFocus} onBlur={onBlur}>
      <Flex direction="column" grow={0} height={NAVIGATION_BAR_HEIGHT} crossAxisDistribution={"center"}>
        <NavigationBar
          title={translate("portfolio-stack.portfolio-screen.header")}
          rightItems={FilterButton}
          isRootNavBar={true}
          testID="inbox-screen.navigation-bar"
        />
      </Flex>

      <Margin marginLeftStep={7.5} marginRightStep={7.5} marginStep={5}>
        <Text text={""}>
          <Text
            textType="primaryBody1"
            text={`${"86"} ${translate("portfolio-stack.portfolio-screen.imported-properties")} `}
          />
          <Text textType="secondaryBody2" text={translate("portfolio-stack.portfolio-screen.add-details")} />
        </Text>
      </Margin>

      <Margin marginLeftStep={7.5} marginRightStep={7.5} direction="column">
        <SearchInputBar
          ref={searchInputBarRef}
          // query={query}
          // cid={cid}
          showSearchPlaceholder={true}
          testID={"portfolio.search-input-bar"}
        />
      </Margin>
      <InfoSection />
      <ListTitle />
      <ListContainer />
    </Screen>
  )
}
