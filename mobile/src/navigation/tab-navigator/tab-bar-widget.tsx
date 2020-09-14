import React, { memo } from "react"
import { View, StyleSheet } from "react-native"
import { useColor, useColorForBackgroundColor } from "uc-lib"
import { useAuth } from "shared-lib/providers"
import { TabBarButton } from "./tab-bar-button"
import { TabBarIndicator } from "./tab-bar-indicator"
import { Navigation } from "../navigation"
import { NavigableRoute } from "../navigator/navigableroute"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { useNavigationState, NavigationState } from "@react-navigation/native"
import {
  AnalyticsNavigation,
  ScreenName,
  TabNavigatorElementName,
  // AnalyticsDebug,
  BottomNavEventInput,
} from "shared-lib"
import { TodosDataContext } from "shared-lib/providers/todos"

export const TabBarHeight = 52
const TabStyles = StyleSheet.create({
  tabBar: {
    flexDirection: "column",
    height: TabBarHeight,
  },
  tabContainer: { flexDirection: "row", height: TabBarHeight },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: StyleSheet.hairlineWidth,
  },
})

const canPopTabStack = (state: NavigationState, stackRoute: string): boolean => {
  const homeTabInfo = state.routes.find(route => route.name === NavigableRoute.HomeTabs)
  const homeTabInfoState = homeTabInfo?.state as NavigationState
  if (!homeTabInfoState) {
    return false
  }

  const stackInfo = homeTabInfoState.routes.find(route => route.name === stackRoute)
  const stackInfoState = stackInfo?.state as NavigationState
  if (!stackInfoState) {
    return false
  }

  return stackInfoState.index > 0
}

const TabBarWidget = memo((props: BottomTabBarProps) => {
  const navState = useNavigationState(state => state)

  const { unseenAlertCount, refetchUnseenAlertCount } = React.useContext(TodosDataContext)
  const { isAuthed } = useAuth()
  const { colors } = useColor()
  const [todosBadgeAmount, setTodosBadgeAmount] = React.useState<number>()
  const activeTintColor = colors.green

  React.useEffect(() => {
    let subscription
    if (isAuthed) {
      // subscription = subscribe(() => {
      //   refetchUnseenAlertCount()
      // })
    }
    return () => subscription && subscription.unsubscribe()
  }, [isAuthed, refetchUnseenAlertCount])

  React.useEffect(() => {
    if (!isAuthed || !unseenAlertCount) {
      setTodosBadgeAmount(undefined)
      return
    }

    setTodosBadgeAmount(unseenAlertCount.total > 0 ? unseenAlertCount.total : undefined)
  }, [isAuthed, unseenAlertCount])

  return (
    // The container for the whole tab bar
    <View style={TabStyles.tabBar} testID="tab-navigator.tab-bar-widget" accessibilityLabel="tab-navigator.tab-bar-widget">
      {/* The bar under the slider for the actual tabs */}
      <View style={TabStyles.tabContainer}>
        {/* Build the tab buttons from the routes */}
        {props.state.routes.map((route, index: number) => {
          const { options } = props.descriptors[route.key]
          const label = options.title || route.name
          const isFocused = props.state.index === index
          const icon = options.tabBarIcon! as (props: { focused: boolean }) => React.ReactNode
          const badgeAmount = route.name === NavigableRoute.Todos ? todosBadgeAmount : undefined
          // console.log("what is the icon", options.tabBarIcon)
          const onPress = () => {
            // const eventInput: BottomNavEventInput = {
            //   screenName: ScreenName[props.state.routeNames[props.state.index]],
            //   elementName: TabNavigatorElementName[route.name],
            // }
            // AnalyticsNavigation.trackBottomNavEventButtonClick(eventInput)
            requestAnimationFrame(() => {
              if (!isFocused) {
                Navigation.navigateToRoute(route.name)
                  .then(() => {
                    // AnalyticsNavigation.trackBottomNavEventScreenShow(eventInput)
                  })
                  .catch(error => {
                    // AnalyticsDebug.logError(error)
                  })
              } else {
                Navigation.performWhenAvailable(() => {
                  if (canPopTabStack(navState, route.name)) {
                    Navigation.popToTop()
                  }
                })
              }
            })
          }
          return (
            <TabBarButton
              key={index}
              index={index}
              onPress={onPress}
              active={isFocused}
              labelText={label}
              renderIcon={icon({ focused: isFocused })}
              badgeAmount={badgeAmount}
              testID={label}
            />
          )
        })}
      </View>

      {/* Line at the top of the tab bar */}
      <View style={[TabStyles.line, { backgroundColor: useColorForBackgroundColor("tertiary") }]} />

      {/*<TabBarIndicator tabCount={props.state.routes.length} tintColor={activeTintColor} activeIndex={props.state.index} />*/}
    </View>
  )
})

export { TabBarWidget }
