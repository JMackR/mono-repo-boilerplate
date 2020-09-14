import { NAVIGATION_BAR_HEIGHT, ActionClose, NavigationBar, NavigationBarItem, useColorForBackgroundColor } from "uc-lib"
import React, { useContext } from "react"
import { StyleSheet, View } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { ModalHostContext } from "./context"
import { ModalCardProps } from "./modal-card.props"
import { CARD_CORNER_RADIUS } from "./modal-card"
import { getNavigationBackIcon } from "../../navigation/common"

export const ModalHeader = (props: ModalCardProps) => {
  const { collapse, backButton, title } = useContext(ModalHostContext)

  const {
    disableDefaultNavigationBar,
    onLeftButtonClick: onLeftButtonClickProp,
    onRightButtonOnClick,
    rightButtonText,
    testID,
  } = props

  const useHeaderRadius = props.useHeaderRadius !== undefined ? props.useHeaderRadius : true

  const insets = useSafeArea()
  const navBarHeight = disableDefaultNavigationBar ? 0 : NAVIGATION_BAR_HEIGHT
  const cardCornerRadius = useHeaderRadius ? CARD_CORNER_RADIUS : 0
  const topInset = useHeaderRadius ? 0 : insets.top
  const headerHeight = navBarHeight + topInset

  const styles = StyleSheet.create({
    header_container: {
      paddingTop: topInset,
      width: "100%",
      marginBottom: -1,
      backgroundColor: useColorForBackgroundColor("primary"),
      borderTopLeftRadius: cardCornerRadius,
      borderTopRightRadius: cardCornerRadius,
      height: headerHeight,
      flexWrap: "nowrap",
      alignItems: "center",
      overflow: "hidden",
    },
  })

  const getBackSvg = () => {
    switch (backButton) {
      case "close":
        return ActionClose
      case "back":
        return getNavigationBackIcon()
      default:
        return null
    }
  }

  const onLeftButtonClick = () => {
    onLeftButtonClickProp && onLeftButtonClickProp()
    collapse()
  }

  const leftButton: NavigationBarItem = {
    icon: getBackSvg(),
    pressHandler: onLeftButtonClick,
    testID: (testID || "modal-card") + ".back",
  }

  const rightButton: NavigationBarItem = {
    pressHandler: () => {
      if (onRightButtonOnClick) {
        onRightButtonOnClick()
      }
    },
    title: rightButtonText && rightButtonText,
    testID: (testID || "modal-card") + "." + (rightButtonText || "right-button").toLowerCase(),
  }

  return (
    <View style={styles.header_container}>
      {!!!disableDefaultNavigationBar && (
        <NavigationBar title={title} testID={testID} leftItems={[leftButton]} rightItems={[rightButton]} />
      )}
    </View>
  )
}
