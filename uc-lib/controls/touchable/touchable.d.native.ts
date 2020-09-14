import { NativeTouchEvent, ViewStyle } from "react-native"
import { TouchableCommonProps } from "./touchable.d.common"

export interface TouchableProps extends TouchableCommonProps {
  onPress?(event: NativeTouchEvent): void
  /* Define style in native apps*/
  style?: ViewStyle
}
