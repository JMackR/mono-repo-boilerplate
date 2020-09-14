import React, { FC } from "react"
import { Separator as RNSeparator, Margin } from "../../controls"
import { View } from "react-native"

const MARGIN_PADDING = 4

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

  return (
    <View>
      {skipFirstSeparator === true ? null : (
        <Separator marginLeftHorizontal={marginLeftHorizontal} marginRightHorizontal={marginRightHorizontal} />
      )}

      {React.Children.map(children, (child, i) => {
        return (
          <>
            {child !== null && child}

            {child !== null && (
              <Separator marginLeftHorizontal={marginLeftHorizontal} marginRightHorizontal={marginRightHorizontal} />
            )}
          </>
        )
      })}
    </View>
  )
}

const Separator: FC<{ marginLeftHorizontal: number; marginRightHorizontal: number }> = ({
  marginLeftHorizontal,
  marginRightHorizontal,
}) => (
  <Margin marginLeftStep={marginLeftHorizontal} marginRightStep={marginRightHorizontal}>
    <RNSeparator />
  </Margin>
)
