import React from "react"
import { StyleSheet, css } from "aphrodite/no-important"
import { BadgeProps } from "./badge-props"
import { useColor } from "uc-lib/themes/hooks/use-color"
import { Text } from "../text"
import { truncateAmount } from "./badge.common"
// This control is also referred to as a 'Gleam' by the design team. If a spec describes a Gleam use this.

const BADGE_SIZE = 20
const BADGE_CORNER_RADIUS = BADGE_SIZE / 2
const WIDTH_MULTIPLIER = 0.53

export const Badge = (props: BadgeProps) => {
  const truncated = truncateAmount(props.amount)
  const colors = useColor().colors

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
      backgroundColor: colors.paintbrushRed,
      textAlign: "center",
      padding: 3,
    },
  })

  if (shouldDisplay) {
    return (
      <div className={css(BadgeStyles.container)}>
        <Text textType="tertiaryBody1" color="alwaysLight" text={truncated} />
      </div>
    )
  } else {
    return <div />
  }
}
