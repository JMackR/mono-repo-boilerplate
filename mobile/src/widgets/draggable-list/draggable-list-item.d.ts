import { LayoutContainerProps } from "uc-lib/controls/layout"
import { BackgroundColors } from "uc-lib/themes"

export interface DraggableListItemProps extends LayoutContainerProps {
  dragOpacity?: number
  longPressHandler?: () => void
  onPressHandler?: () => void
  backgroundColor?: keyof BackgroundColors
  isDragging?: boolean
  testID?: string
}
