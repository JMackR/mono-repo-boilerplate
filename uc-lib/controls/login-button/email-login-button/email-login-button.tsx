import React from "react"
import { useColor } from "../../../themes"
import { SocialEmailIcon } from "../../../assets"
import { LoginButtonProps, LoginButtonStyleProps } from "../login-button.props"
import { LoginButton } from "../login-button"

export const EmailLoginButton: React.FC<LoginButtonProps> = props => {
  const { colors } = useColor()

  const style: LoginButtonStyleProps = {
    mainBackgroundColor: colors.crystal,
    borderColor: colors.green,
    pressedColor: colors.crystalPressed,
    hoverColor: colors.crystalHover,
    textColor: colors.green,
  }

  return <LoginButton style={style} icon={SocialEmailIcon} showBorder={true} {...props} />
}
