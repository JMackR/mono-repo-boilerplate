import React from "react"
import { View, TouchableOpacity, TouchableNativeFeedback, Platform, NativeTouchEvent } from "react-native"
import { TouchableProps } from "./touchable.d.native"
// import { UCLAnalyticsController } from "shared-lib/analytics/analytics-app"
import { useScreen } from "../../hooks"

export const Touchable: React.FC<TouchableProps> = props => {
  const { onPress, style, children, testID, affectedUserId, disabled } = props
  const Touchchable = Platform.select({
    ios: TouchableOpacity,
    android: TouchableNativeFeedback,
  })
  const { screenName, screenRoute } = useScreen()

  const pressHandler = (event: NativeTouchEvent) => {
    // UCLAnalyticsController.trackClickableEvent({
    //   screenName,
    //   screenRoute,
    //   actionType: "Click",
    //   testId: testID,
    //   affectedUserId,
    // })
    if (onPress) {
      onPress(event)
    }
  }

  return (
    <Touchchable
      onPress={pressHandler}
      disabled={disabled}
      testID={testID || "uc-lib.touchable"}
      accessibilityLabel={testID || "uc-lib.touchable"}
    >
      <View style={style}>{children}</View>
    </Touchchable>
  )
}
