import React, { FC } from "react"
import { View, StyleSheet } from "react-native"
import { useColorsForBackgroundColorsCollection } from "uc-lib/themes"
import { Margin } from "uc-lib/controls"

const DIALOG_MARGIN_STEP = 4

export const Dialog: FC = props => {
  const [dialogBackground, scrimBackground] = useColorsForBackgroundColorsCollection(["primary", "overlay"])

  const styles = StyleSheet.create({
    dialog: {
      backgroundColor: dialogBackground,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      borderRadius: 8,
      flex: 1,
    },
    scrim: {
      flex: 1,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: scrimBackground,
    },
  })

  return (
    <View style={styles.scrim}>
      <Margin marginStep={DIALOG_MARGIN_STEP}>
        <View style={styles.dialog}>{props.children}</View>
      </Margin>
    </View>
  )
}
