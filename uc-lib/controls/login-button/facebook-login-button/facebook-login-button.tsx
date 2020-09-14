import React from "react"
import { useColor } from "../../../themes"
import { LoginButtonProps, LoginButtonStyleProps } from "../login-button.props"
import { LoginButton } from "../login-button"
import { SocialFacebookIcon } from "../../../assets"

// No official Facebook pressed color, so just do three shades ligher. Hover is middle of pressed and official color.
const FACEBOOK_BLUE_PRESSED = "#1053a9"
const FACEBOOK_BLUE_HOVER = "#1465CD"
const FACEBOOK_BLUE = "#1877F2"

export const FacebookLoginButton: React.FC<LoginButtonProps> = props => {
  const { colors } = useColor()

  const style: LoginButtonStyleProps = {
    mainBackgroundColor: FACEBOOK_BLUE,
    pressedColor: FACEBOOK_BLUE_PRESSED,
    hoverColor: FACEBOOK_BLUE_HOVER,
    textColor: colors.alwaysLight,
  }

  return <LoginButton style={style} icon={SocialFacebookIcon} showBorder={false} {...props} />
}
