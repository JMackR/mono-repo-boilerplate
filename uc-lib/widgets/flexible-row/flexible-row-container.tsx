import React from "react"
import { StyleSheet, css } from "aphrodite/no-important"
import { useColor } from "uc-lib/themes"
import { Flex } from "../../controls"

const MARGIN_PADDING = 16

export interface FlexibleRowContainerProps {
  children: React.ReactNode
  extendRightMargin?: boolean
  extendLeftMargin?: boolean
  skipFirstSeparator?: boolean
}

export const FlexibleRowContainer = (props: FlexibleRowContainerProps) => {
  const { children, extendRightMargin, extendLeftMargin, skipFirstSeparator = false } = props
  const marginRightHorizontal = extendRightMargin ? MARGIN_PADDING : 0
  const marginLeftHorizontal = extendLeftMargin ? MARGIN_PADDING : 0
  const colors = useColor().colors

  const styles = StyleSheet.create({
    borderView: {
      marginLeft: marginLeftHorizontal ? 0 : MARGIN_PADDING,
      marginRight: marginRightHorizontal ? 0 : MARGIN_PADDING,
      backgroundColor: colors.limestone,
      height: 1,
      display: "flex",
    },
  })

  return (
    <Flex direction="column">
      {skipFirstSeparator === true ? null : <div className={css(styles.borderView)} />}

      {React.Children.map(children, (child, _i) => {
        return (
          <>
            {child !== null && child}
            {child !== null && <div className={css(styles.borderView)} />}
          </>
        )
      })}
    </Flex>
  )
}
