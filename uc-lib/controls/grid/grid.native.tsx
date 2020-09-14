import React, { forwardRef } from "react"
import { StyleSheet, View, Dimensions, ViewStyle } from "react-native"
import { GridProps } from "./grid.d"
import { GridItemType } from "./grid-constants"
import { useMargin } from "../../themes"
import { List, ListRef } from "../list"

const DEFAULT_END_REACH_THRESHOLD = 2

const createStyle = (columnCount: number, index: number, margin: number) => {
  let itemStyle: ViewStyle = {
    width: "100%",
    paddingBottom: margin,
  }
  switch (index % columnCount) {
    case 0: {
      itemStyle = {
        ...itemStyle,
        paddingRight: margin,
      }
      break
    }
    case columnCount - 1: {
      itemStyle = {
        ...itemStyle,
        paddingLeft: margin,
      }
      break
    }
    default:
      itemStyle = {
        ...itemStyle,
        paddingLeft: margin / 2,
        paddingRight: margin / 2,
      }
  }
  const cellWidth = Dimensions.get("window").width / columnCount
  return StyleSheet.create({
    container: {
      flexGrow: 0,
      flexBasis: cellWidth,
      maxWidth: cellWidth,
      overflow: "hidden",
      flexDirection: "row",
      display: "flex",
      alignItems: "flex-start",
      paddingBottom: margin,
    },
    item: itemStyle,
  })
}

// tslint:disable-next-line: no-any
export const Grid = forwardRef(<ItemData extends any>(props: GridProps<ItemData>, ref: React.Ref<ListRef>) => {
  const { columns = 1, testID, renderItem } = props
  const { baseMargin } = useMargin()

  const _renderCell = (item: ItemData, index: number) => {
    // tslint:disable-next-line: no-magic-numbers
    const margin = baseMargin / 2
    let columnCount
    switch (item.type) {
      case GridItemType.Banner:
      case GridItemType.ActionBanner: {
        columnCount = 1
        break
      }
      default:
        columnCount = columns
    }
    const style = createStyle(columnCount, index, margin)
    const marginTop = item.needsTopMargin ? -style.container.maxWidth + margin : 0
    const accessibilityLabel = (testID ? testID : "uc-lib.grid") + ".item." + index

    return (
      <View
        style={{ ...style.container, marginTop }}
        key={index}
        testID={accessibilityLabel}
        accessibilityLabel={accessibilityLabel}
      >
        <View style={{ ...style.item }}>{renderItem(item, index)}</View>
      </View>
    )
  }

  const _getItemLayout = (data: [], index: number) => {
    const cellWidth = Dimensions.get("window").width / columns
    let length = cellWidth
    if (data[index].isDummyItem) {
      length = 0
    }
    if (data[index].type === GridItemType.Ad) {
      length = cellWidth * 2
    }
    return { length, offset: cellWidth * index, index }
  }

  return (
    <List
      ref={ref}
      {...props}
      renderItem={_renderCell}
      getItemLayout={_getItemLayout}
      showsVerticalScrollIndicator={false}
      centerContent={false}
      onEndReachedThreshold={props.onEndReachedThreshold || DEFAULT_END_REACH_THRESHOLD}
      testID={testID || "uc-lib.grid"}
      accessibilityLabel={testID || "uc-lib.grid"}
    />
  )
})
