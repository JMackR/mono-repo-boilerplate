import React from "react"
import { StyleSheet } from "react-native"
import { DraggableListItemProps } from "./draggable-list-item.d"
import { defaultLayoutContainerProps, useColorForBackgroundColor, ClickableOpacity } from "uc-lib"

export const DraggableListItem: React.FC<DraggableListItemProps> = props => {
  const {
    isDragging,
    dragOpacity,
    longPressHandler,
    backgroundColor,
    debugColor,
    width,
    height,
    axisDistribution,
    crossAxisDistribution,
    basis,
    grow,
    shrink,
    direction,
    children,
    onPressHandler,
    testID,
  } = props

  const bgColor = useColorForBackgroundColor(backgroundColor || "primary")
  const styles = StyleSheet.create({
    oudraggablelistitem: {
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      flexDirection: direction,
      alignItems: crossAxisDistribution,
      justifyContent: axisDistribution,
      backgroundColor: backgroundColor ? bgColor : debugColor,
      height,
      width,
      opacity: isDragging ? dragOpacity : 1,
    },
  })

  return (
    <ClickableOpacity
      activeOpacity={dragOpacity}
      onLongClick={longPressHandler}
      onClick={onPressHandler}
      style={styles.oudraggablelistitem}
      testID={testID || "draggable-list-item"}
    >
      {children}
    </ClickableOpacity>
  )
}

DraggableListItem.defaultProps = {
  ...defaultLayoutContainerProps,
  dragOpacity: 0.5,
}
