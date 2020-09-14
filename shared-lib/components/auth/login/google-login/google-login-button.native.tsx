import { GoogleSignin, statusCodes } from "@react-native-community/google-signin"
import { AnalyticsDebug } from "shared/analytics"
import { FEDERATED_LOGIN, GET_FEDERATED_LOGIN_INFO } from "shared/type-defs"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { useAuth } from "shared/providers"
import { GoogleLoginButton } from "uc-lib"
import React, { useState } from "react"
import { Platform } from "react-native"
import { translate } from "../../../../utilities/i18n"
import { GoogleLoginButtonProps } from "./google-login-button.d"

const getClientType = Platform.select({
  ios: "iOS",
  android: "Android",
})

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = (props) => {
  const { onSuccess, onCancel, onClick, onFailure, ...rest } = props
  const [loading, setLoading] = useState(false)
  const auth = useAuth()

  const [federatedLogin] = useMutation(FEDERATED_LOGIN)

  const handleError = (err: Error) => {
    AnalyticsDebug.logError(err)
    onFailure && onFailure(err)
  }

  // Fetch the clientId for the specific device
  const { data: clientInfoResponse } = useQuery(GET_FEDERATED_LOGIN_INFO, {
    variables: {
      clientType: getClientType,
      provider: "Google",
    },
    onError: handleError,
  })

  // Fetch the webClientId (leveraged by the react google-signin plugin)
  const { data: webInfoResponse } = useQuery(GET_FEDERATED_LOGIN_INFO, {
    variables: {
      clientType: "web",
      provider: "Google",
    },
    onError: handleError,
  })

  const beginSignIn = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    onClick && onClick()
    const { scope, clientId } = clientInfoResponse?.federatedLoginInfo
    const { clientId: webClientId } = webInfoResponse?.federatedLoginInfo
    GoogleSignin.configure({
      scopes: scope, // what API you want to access on behalf of the user, default is email and profile
      webClientId, // client ID of type WEB for your server (needed to verify user ID and offline access)
      iosClientId: clientId,
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    })
    try {
      await GoogleSignin.hasPlayServices()
      await GoogleSignin.signIn()

      const code = (await GoogleSignin.getCurrentUser())?.serverAuthCode
      const { state, redirectUri } = webInfoResponse.federatedLoginInfo
      const {
        data: { federatedLogin: authData },
      } = await federatedLogin({
        variables: {
          redirectUri,
          state,
          code,
        },
      })
      await auth.handleSuccessfulAuth(authData)
      onSuccess()
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        onCancel && onCancel()
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        handleError(error)
      } else {
        // some other error happened
        handleError(error)
      }
    }
    setLoading(false)
  }

  return (
    <GoogleLoginButton buttonText={translate("google-login-button")} onClick={beginSignIn} loading={loading} {...rest} />
  )
}
