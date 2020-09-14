import { LocalSVGSource } from "../../controls/image"
import { TextColors } from "../../themes"

export interface LoginButtonProps {
  buttonText: string
  onClick(): void
  testID?: string
  loading?: boolean
  isFullWidth?: boolean
}

// These are only used in the generic button from the specific ones, so they do not need to be exposed outside uc-lib
export interface ExtendedLoginButtonProps extends LoginButtonProps {
  style: LoginButtonStyleProps
  icon: LocalSVGSource
  showBorder?: boolean
}

export interface LoginButtonStyleProps {
  isFullWidth?: boolean
  mainBackgroundColor?: string
  borderColor?: string
  showBorderInDarkMode?: boolean
  iconBackgroundColor?: string
  iconTint?: keyof TextColors
  iconSize?: number
  pressedColor?: string
  hoverColor?: string
  textColor?: string
}
