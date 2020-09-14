import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { ResourceScreen } from "../../screens"
import { NavigationPayload } from "../navigation"
import { NavigableRoute } from "../navigator/navigableroute"

// tslint:disable-next-line: interface-over-type-literal
export type TodoStackNavigatorParamList = {
  [NavigableRoute.Resources]: NavigationPayload<undefined>
}

const Stack = createStackNavigator<TodoStackNavigatorParamList>()

export const ResourceStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NavigableRoute.Resources} headerMode="float">
      <Stack.Screen name={NavigableRoute.Resources} component={ResourceScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
