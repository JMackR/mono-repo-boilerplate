import React, { FC } from "react"
import { CollapseHeaderProps } from "./collapse-props"
import { View } from "react-native"

export const CollapseHeader: FC<CollapseHeaderProps> = ({ children, onLayout }) => {
  return <View onLayout={onLayout}>{children}</View>
}
