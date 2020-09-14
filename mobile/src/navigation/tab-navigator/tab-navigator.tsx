import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  LocalSVGSource,
  LogoCircle,
  LogoCircleSecondary,
  SVG,
  TabBarHomeFill,
  TabBarHomeOutline,
  TabBarNotificationsFill,
  TabBarNotificationsOutline,
  TabBarOnboardingFill,
  TabBarOnboardingOutline,
  TabBarProfileFill,
  TabBarProfileOutline,
  useColorForBackgroundColor,
} from "uc-lib"
import React from "react"
import { Image, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { NavigableRoute } from "../navigator/navigableroute"
import { TabBarWidget } from "./tab-bar-widget"

import { DashboardStackNavigator } from "../dashboard-navigator"
import { PortfolioStackNavigator } from "../portfolio-navigator"
import { ProfileStackNavigator } from "../profile-navigator"
import { ResourceStackNavigator } from "../resource-navigator"
import { TodoStackNavigator } from "../todo-navigator"
import { Icon } from "../../widgets/icon/icon"

const createNavigationOptions = (title: string, fillSVG: LocalSVGSource, outlineSVG: LocalSVGSource) => {
  return () => {
    return {
      tabBarIcon: (props: { focused: boolean }) => {
        return (
          <>
            {(() => {
              if (title === "tab-navigator.dashboard" && props.focused) {
                return <Icon name="tabbar-dashboard-active" size="regular" style={{ height: 28, width: 28 }} />
              } else if (title === "tab-navigator.dashboard") {
                return <Icon name="tabbar-dashboard" size="regular" style={{ height: 28, width: 28 }} />
              } else if (title === "tab-navigator.portfolio" && props.focused) {
                return <Icon name="tabbar-portfolio-active" size="regular" style={{ height: 28, width: 28 }} />
              } else if (title === "tab-navigator.portfolio") {
                return <Icon name="tabbar-portfolio" size="regular" style={{ height: 28, width: 28 }} />
              } else if (title === "tab-navigator.todos" && props.focused) {
                return <Icon name="tabbar-todos-active" size="regular" style={{ height: 28, width: 28 }} />
              } else if (title === "tab-navigator.todos") {
                return <Icon name="tabbar-todos" size="regular" style={{ height: 28, width: 28 }} />
              } else if (title === "tab-navigator.resource" && props.focused) {
                return <Icon name="tabbar-resources-active" size="regular" style={{ height: 28, width: 28 }} />
              } else if (title === "tab-navigator.resource") {
                return <Icon name="tabbar-resources" size="regular" style={{ height: 28, width: 28 }} />
              } else if (title === "tab-navigator.profile" && props.focused) {
                return <Icon name="tabbar-profile-active" size="regular" style={{ height: 28, width: 28 }} />
              } else if (title === "tab-navigator.profile") {
                return <Icon name="tabbar-profile" size="regular" style={{ height: 28, width: 28 }} />
              }
            })()}
          </>
        )
      },
      title,
    }
  }
}

const ProfileNavigationOptions = createNavigationOptions("tab-navigator.profile", LogoCircle, LogoCircleSecondary)
const TodosNavigationOptions = createNavigationOptions(
  "tab-navigator.todos",
  TabBarNotificationsFill,
  TabBarNotificationsOutline,
)
const ResourceNavigationOptions = createNavigationOptions("tab-navigator.resource", TabBarHomeFill, TabBarHomeOutline)
const DashboardNavigationOptions = createNavigationOptions("tab-navigator.dashboard", TabBarHomeFill, TabBarHomeFill)
const PortfolioNavigationOptions = createNavigationOptions("tab-navigator.portfolio", TabBarHomeFill, TabBarHomeOutline)

const Tabs = createBottomTabNavigator()

const tabBarFunc = (props: BottomTabBarProps) => {
  return <TabBarWidget {...props} />
}

const ShadowOnboardingFlow = () => {
  // This route is redirected by Navigation to OnboardingNavigator as a modal on the root navigator.
  return <></>
}

export const TabNavigator = () => {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: insets.bottom,
        backgroundColor: useColorForBackgroundColor("secondary"),
      }}
      testID="tab-navigator"
      accessibilityLabel="tab-navigator"
    >
      <Tabs.Navigator tabBar={tabBarFunc}>
        <Tabs.Screen
          name={NavigableRoute.DashboardStack}
          component={DashboardStackNavigator}
          options={DashboardNavigationOptions}
        />
        <Tabs.Screen
          name={NavigableRoute.PortfolioStack}
          component={PortfolioStackNavigator}
          options={PortfolioNavigationOptions}
        />
        <Tabs.Screen name={NavigableRoute.TodoStack} component={TodoStackNavigator} options={TodosNavigationOptions} />
        <Tabs.Screen
          name={NavigableRoute.ResourceStack}
          component={ResourceStackNavigator}
          options={ResourceNavigationOptions}
        />
        <Tabs.Screen
          name={NavigableRoute.ProfileStack}
          component={ProfileStackNavigator}
          options={ProfileNavigationOptions}
        />
      </Tabs.Navigator>
    </View>
  )
}
