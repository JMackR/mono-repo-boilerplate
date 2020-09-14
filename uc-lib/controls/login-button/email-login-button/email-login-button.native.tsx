import React from "react"
import { useColor } from "../../../themes"
import { LoginButtonProps, LoginButtonStyleProps } from "../login-button.props"
import { LoginButton } from "../login-button"
import { SocialEmailIcon } from "../../../assets"

export const EmailLoginButton: React.FC<LoginButtonProps> = props => {
  const { testID, ...rest } = props
  const localTestId = testID || "uc-lib.email-login-button"
  const { colors } = useColor()

  const style: LoginButtonStyleProps = {
    mainBackgroundColor: colors.crystal,
    borderColor: colors.green,
    showBorderInDarkMode: true,
    pressedColor: colors.crystalPressed,
    textColor: colors.green,
    iconTint: "brand",
  }

  return <LoginButton style={style} icon={SocialEmailIcon} testID={localTestId} {...rest} />
}
