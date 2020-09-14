import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { TodoScreen } from "../../screens"
import { NavigationPayload } from "../navigation"
import { NavigableRoute } from "../navigator/navigableroute"

// tslint:disable-next-line: interface-over-type-literal
export type TodoStackNavigatorParamList = {
  [NavigableRoute.Todos]: NavigationPayload<undefined>
}

const Stack = createStackNavigator<TodoStackNavigatorParamList>()

export const TodoStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NavigableRoute.Todos} headerMode="float">
      <Stack.Screen name={NavigableRoute.Todos} component={TodoScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
