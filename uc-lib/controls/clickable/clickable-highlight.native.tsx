import React from "react"
import { TouchableHighlight } from "react-native"
import { ClickableHighlightProps } from "./clickable.d"
import { useScreen } from "../../hooks"
// import { UCLAnalyticsController } from "shared-lib/analytics/analytics-app"
import { useColor } from "../../themes"

export const ClickableHighlight: React.FC<ClickableHighlightProps> = props => {
  const {
    underlayColor,
    style,
    activeOpacity,
    onClick,
    onLongClick,
    testID,
    accessibilityLabel,
    affectedUserId,
    children,
  } = props
  const { screenName, screenRoute } = useScreen()
  const { colors } = useColor()

  const colorParam = underlayColor ? colors[underlayColor] : undefined

  const clickHandler = () => {
    // UCLAnalyticsController.trackClickableEvent({
    //   screenName,
    //   screenRoute,
    //   actionType: "Click",
    //   testId: testID,
    //   affectedUserId,
    // })
    if (onClick) {
      onClick()
    }
  }

  const longClickHandler = () => {
    // UCLAnalyticsController.trackClickableEvent({
    //   screenName,
    //   screenRoute,
    //   actionType: "LongClick",
    //   testId: testID,
    //   affectedUserId,
    // })
    if (onLongClick) {
      onLongClick()
    }
  }

  return (
    <TouchableHighlight
      style={style}
      underlayColor={colorParam}
      activeOpacity={activeOpacity}
      onPress={clickHandler}
      onLongPress={longClickHandler}
      testID={testID || "uc-lib.clickable-highlight"}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </TouchableHighlight>
  )
}
