import React, { FC } from "react"
import { useColor } from "uc-lib/themes/hooks/use-color"
import { css, StyleSheet } from "aphrodite/no-important"
import { SeparatorProps } from "./separator.props"

/**
 * A thin horizontal separator
 */
export const Separator: FC<SeparatorProps> = ({ direction }) => {
  const { colors } = useColor()
  const styles = StyleSheet.create({
    separator: {
      flexDirection: direction,
      backgroundColor: colors.limestone,
    },
    vertical: {
      width: "1px",
    },
    horizontal: {
      height: "1px",
    },
  })

  return <div className={css([styles.separator, direction === "row" ? styles.vertical : styles.horizontal])} />
}
