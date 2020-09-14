import React, { useState } from "react"
import { Platform, Alert } from "react-native"
import { FacebookLoginButton } from "uc-lib"
import { useLazyQuery, useMutation } from "@apollo/react-hooks"
import { FacebookLoginButtonProps } from "./facebook-login-button.d"
import * as FacebookController from "../../../../controllers/social-controller"
import { useAuth } from "../../../../providers/auth-provider"
import { AnalyticsDebug } from "../../../../analytics/analytics-debug"
import { translate } from "../../../../utilities/i18n"

const getClientType = Platform.select({
  ios: "iOS",
  android: "Android",
})

export const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = (props) => {
  const { onSuccess, onCancel, onClick, onFailure, ...rest } = props

  const auth = useAuth()
  const [loading, setLoading] = useState(false)
  const handleError = (err: Error) => {
    AnalyticsDebug.logError(err)

    const loginErrorMessage = {
      ouException: { title: "Error", message: translate("generic-login-error") },
    }

    onFailure && onFailure(loginErrorMessage)
  }
  const handleCanceled = () => {
    Alert.alert(translate("generic-login-cancel"))
    setLoading(false)
    onCancel && onCancel()
    return
  }
  const [getFederatedLoginInfo, { data }] = useLazyQuery(GET_FEDERATED_LOGIN_INFO, {
    onError: handleError,
    onCompleted: (result) => {
      setLoading(true)
      const { scope } = result.federatedLoginInfo
      FacebookController.login({
        scope,
        handleGranted,
        handleCanceled,
      })
    },
    fetchPolicy: "network-only",
  })
  const [federatedLogin] = useMutation(FEDERATED_LOGIN)
  const handleGranted = async (accessToken: string) => {
    try {
      const { redirectUri, state } = data.federatedLoginInfo
      const {
        data: { federatedLogin: authData },
      } = await federatedLogin({
        variables: {
          redirectUri,
          state,
          accessToken,
        },
      })
      await auth.handleSuccessfulAuth(authData)
      onSuccess()
    } catch (err) {
      handleError(err)
      setLoading(false)
      return
    }
    setLoading(false)
  }
  const handlePress = async () => {
    onClick && onClick()
    getFederatedLoginInfo({
      variables: {
        clientType: getClientType,
        provider: "Facebook",
      },
    })
  }
  return (
    <FacebookLoginButton
      buttonText={translate("facebook-login-button")}
      onClick={handlePress}
      isFullWidth={true}
      loading={loading}
      {...rest}
    />
  )
}
