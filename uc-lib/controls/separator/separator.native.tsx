import React, { FC } from "react"
import { StyleSheet, View, ViewStyle } from "react-native"
import { useColor } from "uc-lib/themes/hooks/use-color"
import { SeparatorProps } from "./separator.props"

/**
 * A thin horizontal separator
 */
export const Separator: FC<SeparatorProps> = ({ direction }) => {
  const { colors } = useColor()
  let width: string | number = "100%"
  let height: string | number = 1
  if (direction === "row") {
    width = 1
    height = "100%"
  }
  const style: ViewStyle = {
    width,
    height,
    borderBottomColor: colors.limestone,
    borderLeftColor: colors.limestone,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
  }
  return <View style={style} />
}
