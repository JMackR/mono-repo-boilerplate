import React from "react"
import { StyleSheet, css } from "aphrodite/no-important"
import { Text, Stack, Touchable } from "../../controls"
import { useColor, useMargin } from "../../themes"
import { PillProps } from "./pill-list-props"
import { ViewBlock } from "../../controls"
import { determinePadding, borderWidth } from "./shared"

const ICON_MARGIN = 1
const PILL_BORDER_RADIUS = 14
const CONTAINER_MARGIN = 8

export const Pill: React.FC<PillProps> = ({ data, index }) => {
  const { baseMargin } = useMargin()
  const { colors } = useColor()
  const {
    text,
    href,
    icon,
    onClick,
    pillColor,
    textColor,
    testID,
    paddingStepHorizontal,
    paddingStepVertical,
    border,
    borderColor,
  } = data
  const backgroundColor = pillColor ? colors[pillColor!] : colors.limestone
  const padding = determinePadding(baseMargin, paddingStepHorizontal, paddingStepVertical, border)

  const STYLES = StyleSheet.create({
    container: {
      backgroundColor,
      borderRadius: PILL_BORDER_RADIUS,
      marginRight: CONTAINER_MARGIN,
      whiteSpace: "nowrap",
      textDecoration: "none",
      display: "block",
      borderColor: border ? (borderColor ? colors[borderColor] : colors.limestone) : undefined,
      borderWidth: borderWidth(border),
      borderStyle: border ? "solid" : "none",
      ...padding,
    },
  })

  return (
    <Touchable
      href={href}
      onPress={onClick}
      disabled={onClick === undefined}
      testID={testID || "uc-lib.pill-list-item" + (index ? "." + index : "")}
    >
      <ViewBlock className={css(STYLES.container)}>
        <Stack direction="row" childSeparationStep={ICON_MARGIN}>
          {icon && icon}
          <Text textType="secondaryBody2" color={textColor || "primary"}>
            {text}
          </Text>
        </Stack>
      </ViewBlock>
    </Touchable>
  )
}
