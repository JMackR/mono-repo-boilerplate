import React from "react"
import { ClickableOpacityProps } from "./clickable.d"
// import { UCLAnalyticsController } from "shared-lib/analytics/analytics-app";
import { StyleSheet, css } from "aphrodite/no-important"
import { useScreen } from "../../hooks/screen-provider/screen-provider"

const STYLES = StyleSheet.create({
  clickableopacity: {
    width: "100%",
    display: "inline-block",
    cursor: "pointer",
  },
})

/**
 * @note Web does not yet support opacity transitions nor long-click handling.
 * @param props - See ClickableOpacityProps
 */
export const ClickableOpacity: React.FC<ClickableOpacityProps> = (props) => {
  const { style, onClick, testID, accessibilityLabel, children, affectedUserId } = props

  const { screenName, screenRoute } = useScreen()

  const pressHandler = () => {
    // UCLAnalyticsController.trackClickableEvent({
    //   screenName,
    //   screenRoute,
    //   actionType: "Click",
    //   testId: testID,
    //   affectedUserId
    // });
    if (onClick) {
      onClick()
    }
  }

  return (
    <div
      onClick={pressHandler}
      className={css(STYLES.clickableopacity)}
      style={style}
      aria-label={accessibilityLabel}
      data-test-id={testID}
    >
      {children}
    </div>
  )
}
