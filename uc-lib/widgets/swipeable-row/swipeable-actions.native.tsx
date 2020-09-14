import { Background, Flex } from "uc-lib/controls"
import React, { useContext } from "react"
import { TouchableOpacity } from "react-native"
import { SwipeableActionProps } from "./swipeable-row.props.native"
import { SwipeableCallbackContext } from "./swipeable-row.native"

export const SwipeableAction: React.FC<SwipeableActionProps> = props => {
  const { children, background, onPress, fullWidth, testID } = props
  const { hideActions } = useContext(SwipeableCallbackContext)
  const press = () => {
    onPress && onPress()
    hideActions && hideActions()
  }
  const width = (fullWidth && "100%") || null
  return (
    <TouchableOpacity
      style={{ flexGrow: 1, position: "relative", width }}
      onPress={press}
      testID={testID || "uc-lib.swipeable-action"}
    >
      <Background type={background} />
      <Flex grow={1} axisDistribution="center" crossAxisDistribution="center">
        {children}
      </Flex>
    </TouchableOpacity>
  )
}
