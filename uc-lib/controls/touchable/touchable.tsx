import React, { MouseEventHandler } from "react"
import { TouchableProps } from "./touchable.d"
import classNames from "classnames"
import { StyleSheet, css } from "aphrodite/no-important"
// import { UCLAnalyticsController } from "shared-lib/analytics/analytics-app"
import { useScreen } from "../../hooks"

const STYLES = StyleSheet.create({
  el: {
    width: "100%",
    display: "inline-block",
    cursor: "pointer",
  },
})

export const Touchable: React.FC<TouchableProps> = props => {
  const { onPress, className, href, children, testID, affectedUserId, disabled } = props
  const Component = href ? "a" : "div"
  const { screenName, screenRoute } = useScreen()

  const pressHandler: MouseEventHandler<HTMLAnchorElement & HTMLDivElement> = event => {
    if (disabled) {
      event.preventDefault()
      return
    }
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
    <Component href={disabled ? "#" : href} onClick={pressHandler} className={classNames(className, css(STYLES.el))}>
      {children}
    </Component>
  )
}
