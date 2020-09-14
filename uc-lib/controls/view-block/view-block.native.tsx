import React, { forwardRef } from "react"
import { View } from "react-native"
import { ViewBlockProps } from "./view-block.d"

export const ViewBlock = forwardRef<View, ViewBlockProps>((props, ref) => {
  const { style, children, testID } = props
  return (
    <View ref={ref} style={style} testID={testID || "uc-lib.view-block"}>
      {children}
    </View>
  )
})
