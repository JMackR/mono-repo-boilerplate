import { Background, Flex } from "uc-lib/controls"
import React, { createContext, useRef } from "react"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { SwipeableRowProps } from "./swipeable-row.props.native"

export const SwipeableCallbackContext = createContext({
  hideActions: () => any,
})

export const SwipeableRow: React.FC<SwipeableRowProps> = props => {
  const { children, renderRightActions, renderLeftActions } = props
  const element = useRef() as any
  const hideActions = () => {
    element.current && element.current.close()
  }
  return (
    <SwipeableCallbackContext.Provider value={{ hideActions }}>
      <Swipeable
        ref={element}
        friction={5}
        leftThreshold={40}
        rightThreshold={40}
        renderLeftActions={() => <Flex>{renderLeftActions}</Flex>}
        renderRightActions={() => <Flex>{renderRightActions}</Flex>}
      >
        <Background />
        {children}
      </Swipeable>
    </SwipeableCallbackContext.Provider>
  )
}
