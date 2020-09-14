import * as React from "react"
import { View } from "react-native"
import { size } from "../spacing"

const separator = (multiplier: number) => ({ width: size(multiplier), height: size(multiplier) })

export const separators = {
  /** Size 1 separating View */
  separator: React.memo(() => <View style={separator(1)} />),
  /** Size 2 separating View */
  separator2: React.memo(() => <View style={separator(2)} />),
  /** Thin separating View */
  thinSeparator: React.memo(() => <View style={separator(0.25)} />),
}
