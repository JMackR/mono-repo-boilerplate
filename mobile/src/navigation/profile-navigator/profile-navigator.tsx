import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { ProfileScreen } from "../../screens/profile"
import { PushPopStackAnimationOptions } from "../common"
import { NavigationPayload } from "../navigation"
import { NavigableRoute } from "../navigator/navigableroute"

// tslint:disable-next-line: interface-over-type-literal
export type ProfileParamList = {
  [NavigableRoute.Profile]: NavigationPayload<undefined>
  [NavigableRoute.ProfileSettings]: NavigationPayload<undefined>
}

const Stack = createStackNavigator<ProfileParamList>()

export const ProfileStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavigableRoute.Profile}
      headerMode="none"
      screenOptions={PushPopStackAnimationOptions}
    >
      <Stack.Screen name={NavigableRoute.Profile} component={ProfileScreen} />
    </Stack.Navigator>
  )
}
