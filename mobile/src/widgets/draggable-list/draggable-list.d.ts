import { FlatListProps } from "react-native"
import { DragEndParams, RenderItemParams } from "react-native-draggable-flatlist"

export interface DraggableListProps<T> {
  data: T[]
  horizontal?: boolean
  keyExtractor?: (item: T, index: number) => string
  renderItem: (params: RenderItemParams<T>) => React.ReactNode
  onDragEnd?: (params: DragEndParams<T>) => void
  testID?: string
}
