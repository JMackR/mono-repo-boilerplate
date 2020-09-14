import React from "react"
import { TouchableOpacity } from "react-native"
import { ClickableOpacityProps } from "./clickable.d"
import { useScreen } from "../../hooks/screen-provider/screen-provider"
// import { UCLAnalyticsController } from "shared-lib/analytics/analytics-app"

export const ClickableOpacity: React.FC<ClickableOpacityProps> = (props) => {
  const { style, activeOpacity, onClick, onLongClick, testID, accessibilityLabel, affectedUserId, children } = props
  const { screenName, screenRoute } = useScreen()

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
    <TouchableOpacity
      style={style}
      activeOpacity={activeOpacity}
      onPress={clickHandler}
      onLongPress={longClickHandler}
      accessibilityLabel={accessibilityLabel}
      testID={testID || "uc-lib.clickable-opacity"}
    >
      {children}
    </TouchableOpacity>
  )
}
