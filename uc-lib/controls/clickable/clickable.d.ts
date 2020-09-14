import { Colors } from "../../themes"
import { UCLAnalyticsProps } from "shared-lib"

export interface ClickableBaseProps extends UCLAnalyticsProps {
  style?: any
  onClick?: () => void
  onLongClick?: () => void
  testID?: string
  accessibilityLabel?: string
  affectedUserId?: string
}

export interface ClickableOpacityProps extends ClickableBaseProps {
  activeOpacity?: number
}

export interface ClickableHighlightProps extends ClickableOpacityProps {
  underlayColor?: keyof Colors
}
