import React, { MouseEvent } from "react"
import { NativeTouchEvent } from "react-native"

export interface FeedFilterSortButtonProps {
  icon: JSX.Element
  text: string
  onClick(event: NativeTouchEvent | MouseEvent): void
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
  active?: boolean
}
