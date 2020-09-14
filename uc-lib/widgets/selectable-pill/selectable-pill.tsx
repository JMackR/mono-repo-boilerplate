import React from "react"
import { StyleSheet, css } from "aphrodite/no-important"
import { SelectablePillProps } from "./selectable-pill.d"
import { useColor } from "../../themes"
import { useState } from "react"
import { Touchable, Text } from "../../controls"

const PILL_BORDER_RADIUS = 16
const PILL_BORDER_WIDTH = 1
const CONTAINER_MARGIN = 8
const PADDING_VERTICAL = 8
const PADDING_HORIZONTAL = 14

export const Pill: React.FC<SelectablePillProps> = ({ text, initiallySelected, onClick, testId }) => {
  const { colors } = useColor()
  const [selected, setSelected] = useState<boolean>(initiallySelected)

  const clickInternal = (event: React.MouseEvent<Element, MouseEvent>) => {
    const newSelectedValue = !selected
    setSelected(newSelectedValue)
    onClick(event, newSelectedValue)
  }

  const STYLES = StyleSheet.create({
    container: {
      backgroundColor: colors.granite,
      borderRadius: PILL_BORDER_RADIUS,
      borderWidth: PILL_BORDER_WIDTH,
      paddingTop: PADDING_VERTICAL,
      paddingBottom: PADDING_VERTICAL,
      paddingLeft: PADDING_HORIZONTAL,
      paddingRight: PADDING_HORIZONTAL,
      marginRight: CONTAINER_MARGIN,
      whiteSpace: "nowrap",
      textDecoration: "none",
    },
  })

  return (
    <Touchable
      onPress={clickInternal}
      className={css(STYLES.container)}
      testID={testId || "uc-lib.selectable-pill." + text}
    >
      <Text textType="secondaryBody1" color={selected ? "primaryAlt" : "brand"}>
        {text}
      </Text>
    </Touchable>
  )
}
