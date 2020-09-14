import React from "react"
import { StyleSheet } from "react-native"
import { Text, Stack, Touchable } from "../../controls"
import { useColor, useMargin } from "../../themes"
import { PillProps } from "./pill-list-props"
import { determinePadding, borderWidth, CONTAINER_MARGIN } from "./shared"

const ICON_MARGIN = 1
const PILL_BORDER_RADIUS = 14

export const Pill: React.FC<PillProps> = ({ data, index }) => {
  const { colors } = useColor()
  const { baseMargin } = useMargin()
  const {
    text,
    icon,
    onClick,
    testID,
    textType,
    paddingStepHorizontal,
    paddingStepVertical,
    pillColor,
    textColor,
    border,
    borderColor,
  } = data
  const padding = determinePadding(baseMargin, paddingStepHorizontal, paddingStepVertical, border)

  const backgroundColor = pillColor ? colors[pillColor!] : colors.limestone

  const STYLES = StyleSheet.create({
    container: {
      backgroundColor,
      borderRadius: PILL_BORDER_RADIUS,
      marginRight: CONTAINER_MARGIN,
      borderColor: border ? (borderColor ? colors[borderColor] : colors.limestone) : undefined,
      borderWidth: borderWidth(border),
      borderStyle: border ? "solid" : undefined,
      ...padding,
    },
  })

  return (
    <Touchable
      onPress={onClick}
      style={STYLES.container}
      disabled={onClick === undefined}
      testID={testID || "uc-lib.pill-list-item" + (index ? "." + index : "")}
    >
      <Stack direction="row" childSeparationStep={ICON_MARGIN}>
        {icon && icon}
        <Text textType={textType ? textType : "secondaryBody1"} color={textColor || "primary"}>
          {text}
        </Text>
      </Stack>
    </Touchable>
  )
}
