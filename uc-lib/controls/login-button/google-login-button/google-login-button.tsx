import React from "react"
import { useColor } from "../../../themes"
import { LoginButtonProps, LoginButtonStyleProps } from "../login-button.props"
import { LoginButton } from "../login-button"
import { SocialGoogleIcon } from "../../../assets"

// No official Google pressed color, so just do three shades ligher. Hover is middle of pressed and official color.
const GOOGLE_BLUE_PRESSED = "#295399"
const GOOGLEBLUE_HOVER = "#356CC6"
const GOOGLE_BLUE = "#4285F4"

export const GoogleLoginButton: React.FC<LoginButtonProps> = props => {
  const { colors } = useColor()

  const style: LoginButtonStyleProps = {
    mainBackgroundColor: GOOGLE_BLUE,
    iconBackgroundColor: colors.alwaysLight,
    pressedColor: GOOGLE_BLUE_PRESSED,
    hoverColor: GOOGLEBLUE_HOVER,
    textColor: colors.alwaysLight,
  }

  return <LoginButton style={style} icon={SocialGoogleIcon} showBorder={false} {...props} />
}
