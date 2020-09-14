import { GestureResponderEvent } from "react-native"
import { TextPropsBase } from "./text.props.base"

export interface TextProps extends TextPropsBase {
  /**
   * Action performed when the text is pressed
   */
  onPress?: (event: GestureResponderEvent) => void

  /**
   * Callback for the underlying Text's onTextLayout callback
   */
  onTextLayout?: (event: { nativeEvent: { lines: [] } }) => void
}
