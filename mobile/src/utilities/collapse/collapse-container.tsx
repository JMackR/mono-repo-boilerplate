import React, { FC, Children, ReactElement } from "react"
import { CollapseContainerProps } from "./collapse-props"
import { CollapseHeader } from "./collapse-header"
import invariant from "invariant"
import Reanimated from "react-native-reanimated"

export const CollapseContainer: FC<CollapseContainerProps> = ({ children, headerTy }) => {
  let headerCount = 0
  Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      const element = child as ReactElement
      if (element.type === CollapseHeader) {
        headerCount++
      }
    }
  })
  invariant(headerCount === 1, "CollapseContainer must contain 1 instance of CollapseHeader")

  return (
    <Reanimated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        transform: [
          {
            translateY: headerTy,
          },
        ],
      }}
    >
      {children}
    </Reanimated.View>
  )
}
