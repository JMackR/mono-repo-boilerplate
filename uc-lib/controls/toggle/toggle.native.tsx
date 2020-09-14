import React from "react"
import { StyleSheet, StyleProp, ViewStyle } from "react-native"
import { ToggleProps } from "./toggle.props"
import { Switch } from "react-native"
import { useColor } from "uc-lib/themes"
import { Platform } from "react-native"

export const Toggle = (props: ToggleProps) => {
  const { disabled, onChange, state, testID } = props
  const { colors } = useColor()

  const backgroundColor = Platform.OS === "ios" ? colors.crystal : colors.granite
  const thumbColor = Platform.OS === "ios" ? undefined : colors.limestone
  const borderStyles: StyleProp<ViewStyle> =
    Platform.OS === "ios" && state === false
      ? {
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.granite,
        }
      : undefined

  const onValueChange = (value: boolean): void => {
    onChange(value)
  }
  return (
    <Switch
      trackColor={{ false: backgroundColor, true: colors.green }}
      ios_backgroundColor={colors.crystal}
      thumbColor={thumbColor}
      onValueChange={onValueChange}
      value={state}
      disabled={disabled}
      style={borderStyles}
      testID={testID || "uc-lib.toggle"}
      accessibilityLabel={testID || "uc-lib.toggle"}
    />
  )
}
