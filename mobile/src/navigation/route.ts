import { RouteProp, ParamListBase } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

export interface ScreenRoute<ParamList extends ParamListBase, RouteName extends keyof ParamList> {
  route: RouteProp<ParamList, RouteName>
}

export interface ScreenRouteAndStackNavigation<ParamList extends ParamListBase, RouteName extends keyof ParamList>
  extends ScreenRoute<ParamList, RouteName> {
  navigation: StackNavigationProp<ParamList, RouteName>
}
