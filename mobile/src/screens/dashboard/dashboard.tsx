import React, { useContext, useEffect, useLayoutEffect } from "react"
import { View } from "react-native"
import { Screen } from "../../widgets/screen"
import { useColorForBackgroundColor } from "uc-lib/themes"
import { AccountSettingsScreenElement, translate, ValidatedFormInput } from "shared-lib"
import { NAVIGATION_BAR_HEIGHT, NavigationBarItem, SelectableRow } from "uc-lib/widgets"
import { NavigationBar } from "uc-lib/widgets/navigation-bar"
import {
  ActionSettingsLine,
  Button,
  CameraFlip,
  FilterIcon,
  Flex,
  List,
  Margin,
  Spacer,
  Stack,
  Text,
  SelectableContextProvider,
  Background,
} from "uc-lib"
import { Navigation } from "../../navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator/navigableroute"
import { useNavigation, useNavigationState } from "@react-navigation/native"
import { AccountAnalyticsController } from "../../../../shared-lib/analytics/account"
import { KeyboardAvoidanceView } from "../../keyboardavoidance"
import { OnboardingFlowScreenContainer } from "../onboarding/onboarding-flow/onboarding-flow-container"
import { ModalCardProps } from "../../widgets/modal-card"
import { UpdateNameContent } from "../profile/settings/update-name-screen"
import { NavigatorParamList } from "../../navigation/navigator"
import { ScreenRouteAndStackNavigation } from "../../navigation/route"
import { useModal } from "../../widgets/modal-card/context/modal-provider"
import { AccountInviteFriendsModalContent } from "../profile/account-invite-friends"
import LottieView from "lottie-react-native"
import { getNavigationFilterButton } from "../../navigation/common"

const renderItem = item => {
  const props = {
    selectId: item.key,
    mainContent: item.name,
    overrideSelected: 0,
    onDidSelect: () => {
      item.enabled = true
    },
    onDidDeselect: () => {
      item.enabled = false
    },
  }

  return <SelectableRow {...props} />
}

export const DashboardScreen = () => {
  const [focused, setFocused] = React.useState(false)
  const { show } = useModal()
  const onFocus = () => {
    setFocused(true)
  }

  const onBlur = () => {
    setFocused(false)
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      // Navigation.navigateToRoute(NavigableRoute.DashboardReady, { originPayload: {} })
    }, 500)
  }, [])

  const FilterButton: NavigationBarItem[] = [
    {
      title: "",
      icon: FilterIcon,
      colorTint: "brand",
      testID: "portfolio-screen.header.filter-button",
      pressHandler: () => {
        Navigation.navigateToRoute(NavigableRoute.PortfolioFilter, { originPayload: {} })
        // AccountAnalyticsController.trackUserChangeNameElementClick(AccountSettingsScreenElement.Cancel)
      },
    },
  ]

  return (
    <Screen backgroundColor={"secondary"} safeAreaMode="top" onFocus={onFocus} onBlur={onBlur}>
      <Flex direction="column" grow={0} height={NAVIGATION_BAR_HEIGHT} crossAxisDistribution={"center"}>
        <NavigationBar
          title={translate("dashboard-stack.dashboard-screen.header")}
          rightItems={[getNavigationFilterButton("dashboard-filter.navigation-bar")]}
          isRootNavBar={true}
          testID="dashboard-screen.navigation-bar"
        />
      </Flex>
      <LottieView source={require("./data.json")} autoPlay loop />
      <Margin direction="column" grow={0} marginStep={4}>
        <SelectableContextProvider multiSelect={false} initialSelections={null}>
          <List
            data={[
              { key: 1, name: "bob" },
              { key: 2, name: "dave" },
            ]}
            renderItem={renderItem}
          />
        </SelectableContextProvider>
      </Margin>
    </Screen>
  )
}
