import { MouseEvent } from "react"
import { NativeTouchEvent, ViewStyle } from "react-native"

export interface ViewBlockProps {
  children?: React.ReactNode
  /* Define style in web via aphrodite */
  className?: string
  /* Define style in native apps*/
  style?: ViewStyle
  /* Used to locate this view in end-to-end tests. */
  testID?: string
}
