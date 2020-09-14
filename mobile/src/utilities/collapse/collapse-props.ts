import { LayoutChangeEvent } from "react-native"
import Reanimated from "react-native-reanimated"

export interface CollapseContainerProps {
  headerTy: Reanimated.Value<number>
}

export interface CollapseHeaderProps {
  onLayout: (event: LayoutChangeEvent) => void
}
