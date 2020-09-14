import React, { useState } from "react"
import { LayoutChangeEvent, LayoutRectangle } from "react-native"
import DraggableFlatList from "react-native-draggable-flatlist"
import { DraggableListProps } from "./draggable-list.d"

// tslint:disable-next-line: no-any
export const DraggableList = <ItemData extends any>(props: DraggableListProps<ItemData>) => {
  const { testID, data, horizontal, renderItem, keyExtractor, onDragEnd } = props
  const [layout, setLayout] = useState<LayoutRectangle>()
  const [contentSize, setContentSize] = useState<{ w: number; h: number }>()

  const scrollEnabled = (): boolean => {
    if (layout === undefined || contentSize === undefined) {
      return false
    }

    return horizontal ? contentSize.w > layout.width : contentSize.h > layout.height
  }

  const layoutHandler = (e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout)
  }

  const contentSizeHandler = (w: number, h: number) => {
    setContentSize({ w, h })
  }

  const defaultKeyExtractor = (_item: ItemData, index: number): string => {
    return index.toString()
  }

  return (
    <DraggableFlatList
      onLayout={layoutHandler}
      onContentSizeChange={contentSizeHandler}
      scrollEnabled={scrollEnabled()}
      data={data}
      renderItem={renderItem}
      horizontal={horizontal}
      keyExtractor={keyExtractor || defaultKeyExtractor}
      onDragEnd={onDragEnd}
      testID={testID || "draggable-list"}
    />
  )
}
