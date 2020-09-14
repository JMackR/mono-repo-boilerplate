import React from "react"
import { useColor } from "../../../themes"
import { LoginButtonProps, LoginButtonStyleProps } from "../login-button.props"
import { LoginButton } from "../login-button"
import { SocialFacebookIcon } from "../../../assets"

// No official Facebook pressed color, so just do three shades ligher.
const FACEBOOK_BLUE_PRESSED = "#1053a9"
const FACEBOOK_BLUE = "#1877F2"

export const FacebookLoginButton: React.FC<LoginButtonProps> = (props) => {
  const { testID, ...rest } = props
  const localTestId = testID || "uc-lib.apple-login-button"
  const { colors } = useColor()

  const style: LoginButtonStyleProps = {
    mainBackgroundColor: FACEBOOK_BLUE,
    pressedColor: FACEBOOK_BLUE_PRESSED,
    textColor: colors.alwaysLight,
  }

  return <LoginButton style={style} icon={SocialFacebookIcon} testID={localTestId} {...rest} />
}
