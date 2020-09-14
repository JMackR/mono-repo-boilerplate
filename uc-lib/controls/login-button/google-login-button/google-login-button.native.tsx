import React from "react"
import { useColor } from "../../../themes"
import { LoginButtonProps, LoginButtonStyleProps } from "../login-button.props"
import { LoginButton } from "../login-button"
import { SocialGoogleIcon } from "../../../assets"

// No official Google pressed color, so just do three shades ligher.
const GOOGLE_BLUE_PRESSED = "#295399"
const GOOGLE_BLUE = "#4285F4"

export const GoogleLoginButton: React.FC<LoginButtonProps> = (props) => {
  const { testID, ...rest } = props
  const localTestId = testID || "uc-lib.google-login-button"
  const { colors } = useColor()

  const style: LoginButtonStyleProps = {
    mainBackgroundColor: GOOGLE_BLUE,
    iconBackgroundColor: colors.alwaysLight,
    pressedColor: GOOGLE_BLUE_PRESSED,
    textColor: colors.alwaysLight,
  }

  return <LoginButton style={style} icon={SocialGoogleIcon} testID={localTestId} {...rest} />
}
