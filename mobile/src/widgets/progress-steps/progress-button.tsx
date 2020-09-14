import React from "react"
import { View } from "react-native"

export const ProgressButton = props => (
  <View style={{ flexDirection: "row", marginTop: 90 }}>
    <View style={{ position: "absolute", left: 60, bottom: 40 }}>{props.renderPreviousButton()}</View>
    <View style={{ position: "absolute", right: 60, bottom: 40 }}>{props.renderNextButton()}</View>
  </View>
)
