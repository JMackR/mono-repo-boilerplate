import React from "react"
import { Margin } from "uc-lib"
import { View } from "react-native"

export interface VerticalRevealViewProps {
  renderChildren: boolean
  invertHorizontalMarginStep?: number
}

/**
 * Intended to be used in tandem with LayoutAnimation to animate the showing and hiding
 * of its children, but it does not have to animate to function correctly.
 * @param props.renderChildren A flag to control if the children are rendered or not.
 * @param props.invertHorizontalMarginStep [Optional] Used to expand the views horizontal
 * margin beyond its parent container.
 */
export const VerticalRevealView: React.FC<VerticalRevealViewProps> = props => {
  const { children, renderChildren, invertHorizontalMarginStep } = props
  const horizontalStep = invertHorizontalMarginStep || 0
  return (
    <Margin direction="column" grow={1} marginLeftStep={-horizontalStep} marginRightStep={-horizontalStep}>
      <View style={{ overflow: "hidden" }}>
        <Margin
          allowNoChildren={true}
          direction="column"
          grow={1}
          marginLeftStep={horizontalStep}
          marginRightStep={horizontalStep}
        >
          {!!renderChildren && children}
        </Margin>
      </View>
    </Margin>
  )
}
