import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { PortfolioScreen } from "../../screens"
import { NavigationPayload } from "../navigation"
import { NavigableRoute } from "../navigator/navigableroute"

// tslint:disable-next-line: interface-over-type-literal
export type TodoStackNavigatorParamList = {
  [NavigableRoute.Portfolio]: NavigationPayload<undefined>
}

const Stack = createStackNavigator<TodoStackNavigatorParamList>()

export const PortfolioStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NavigableRoute.Portfolio} headerMode="float">
      <Stack.Screen name={NavigableRoute.Portfolio} component={PortfolioScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
