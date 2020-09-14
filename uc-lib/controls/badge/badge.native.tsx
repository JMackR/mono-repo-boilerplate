import React from "react"
import { StyleSheet, View } from "react-native"
import { BadgeProps } from "./badge-props"
import { useColor } from "uc-lib/themes"
import { Text } from "../text"
import { truncateAmount } from "./badge.common"
// This control is also referred to as a 'Gleam' by the design team. If a spec describes a Gleam use this.

const BADGE_SIZE = 20
const BADGE_CORNER_RADIUS = BADGE_SIZE / 2
const WIDTH_MULTIPLIER = 0.53

export const Badge = (props: BadgeProps) => {
  const truncated = truncateAmount(props.amount)
  const { colors } = useColor()
  const { testID } = props

  const shouldDisplay = truncated.length > 0
  const badgeWidth = truncated.length > 1 ? truncated.length * WIDTH_MULTIPLIER * BADGE_SIZE : BADGE_SIZE

  const BadgeStyles = StyleSheet.create({
    container: {
      borderRadius: BADGE_CORNER_RADIUS,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      width: badgeWidth,
      height: BADGE_SIZE,
      padding: 3,
      backgroundColor: colors.paintbrushRed,
    },
  })

  if (shouldDisplay) {
    return (
      <View
        style={BadgeStyles.container}
        testID={testID || "uc-lib.text-badge"}
        accessibilityLabel={testID || "uc-lib.text-badge"}
      >
        <Text textType="tertiaryBody1" color="alwaysLight" testID="redibs-ucl.text-badge.amount" text={truncated} />
      </View>
    )
  } else {
    return <View />
  }
}
