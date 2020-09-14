import React, { MouseEvent } from "react"
import { NativeTouchEvent } from "react-native"
import { TextTypes, Colors, TextColors } from "uc-lib/themes"

export interface PillDataProps {
  text: string
  textType?: keyof TextTypes
  paddingStepVertical?: number
  paddingStepHorizontal?: number
  icon?: JSX.Element
  href?: string
  pillColor?: keyof Colors
  textColor?: keyof TextColors
  border?: boolean
  borderColor?: keyof Colors
  onClick?(event: NativeTouchEvent | MouseEvent): void
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
export interface PillProps {
  data: PillDataProps
  index: number
}

export interface PillListProps {
  data: PillDataProps[]
  /**
   * Used to locate this view in end-to-end tests.
   */
  paddingLeft?: number
  testID?: string
}
