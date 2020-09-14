import React from "react"
import { Border, LayoutContainerProps } from "uc-lib"

export const PullToRefreshContainer: React.FC<LayoutContainerProps> = props => {
  const { children } = props
  return (
    <Border {...props} cornerRadius="none" lineWeight="none">
      {children}
    </Border>
  )
}

PullToRefreshContainer.defaultProps = {
  grow: 1,
  direction: "column",
}
