import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack"
import React from "react"
import { NavigationPayload } from "../navigation"
import { NavigableRoute } from "../navigator/navigableroute"
import { DashboardScreen } from "../../screens"
import { DashboardEditScreen } from "../../screens/dashboard-edit"
import { FullScreenModalOptions, ModalCardOverlayOption, PushPopStackAnimationOptions } from "../common"
import { NAVIGATION_BAR_HEIGHT } from "uc-lib/widgets"
import { DashboardReadyModal } from "../../screens/dashboard/dashboard-ready-modal"

// tslint:disable-next-line: interface-over-type-literal
export type TodoStackNavigatorParamList = {
  [NavigableRoute.Dashboard]: NavigationPayload<undefined>
  [NavigableRoute.DashboardEdit]: NavigationPayload<undefined>
  [NavigableRoute.DashboardReady]: NavigationPayload<undefined>
}

const Stack = createStackNavigator<TodoStackNavigatorParamList>()

export const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NavigableRoute.Dashboard} headerMode="none">
      <Stack.Screen name={NavigableRoute.Dashboard} component={DashboardScreen} options={FullScreenModalOptions} />
      <Stack.Screen name={NavigableRoute.DashboardEdit} component={DashboardEditScreen} options={FullScreenModalOptions} />
      <Stack.Screen name={NavigableRoute.DashboardReady} component={DashboardReadyModal} options={ModalCardOverlayOption} />
    </Stack.Navigator>
  )
}
