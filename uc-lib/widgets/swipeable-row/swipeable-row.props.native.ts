import { BackgroundColors } from "uc-lib/themes"

export interface SwipeableActionProps {
  background?: keyof BackgroundColors
  children: JSX.Element
  fullWidth?: boolean
  onPress?: () => void
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
export interface SwipeableRowProps {
  children: React.ReactNode
  horizontal?: "left" | "right" | "center"
  renderLeftActions?: JSX.Element
  renderRightActions?: JSX.Element
}

export interface WithSwipeableCallbacks {
  close: () => void
  openLeft: () => void
  openRight: () => void
}
