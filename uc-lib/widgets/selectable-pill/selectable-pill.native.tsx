import React from "react"
import { StyleSheet, NativeTouchEvent } from "react-native"
import { Text, Touchable } from "../../controls"
import { useColor } from "../../themes"
import { SelectablePillProps } from "./selectable-pill.d"
import { useState } from "react"

const PILL_BORDER_RADIUS = 16
const PILL_BORDER_WIDTH = 1
const CONTAINER_MARGIN = 8
const PADDING_VERTICAL = 8
const PADDING_HORIZONTAL = 14

export const SelectablePill: React.FC<SelectablePillProps> = ({ text, initiallySelected, onClick, testId }) => {
  const { colors } = useColor()
  const [selected, setSelected] = useState<boolean>(initiallySelected)

  const clickInternal = (event: NativeTouchEvent) => {
    const newSelectedValue = !selected
    setSelected(newSelectedValue)
    onClick(event, newSelectedValue)
  }

  const STYLES = StyleSheet.create({
    container: {
      backgroundColor: selected ? colors.green : colors.crystal,
      borderRadius: PILL_BORDER_RADIUS,
      borderWidth: PILL_BORDER_WIDTH,
      borderColor: colors.green,
      marginRight: CONTAINER_MARGIN,
      paddingTop: PADDING_VERTICAL,
      paddingBottom: PADDING_VERTICAL,
      paddingLeft: PADDING_HORIZONTAL,
      paddingRight: PADDING_HORIZONTAL,
    },
  })

  return (
    <Touchable onPress={clickInternal} style={STYLES.container} testID={testId || "uc-lib.selectable-pill." + text}>
      <Text textType="secondaryBody1" color={selected ? "primaryAlt" : "brand"}>
        {text}
      </Text>
    </Touchable>
  )
}
