import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import { ClickableBaseProps } from "./clickable.d"
import { useScreen } from "../../hooks"
// import { UCLAnalyticsController } from "shared-lib"

export const ClickableWithoutFeedback: React.FC<ClickableBaseProps> = props => {
  const { style, onClick, onLongClick, testID, accessibilityLabel, affectedUserId, children } = props
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
    <TouchableWithoutFeedback
      style={style}
      onPress={clickHandler}
      onLongPress={longClickHandler}
      testID={testID || "uc-lib.clickable-without-feedback"}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </TouchableWithoutFeedback>
  )
}
