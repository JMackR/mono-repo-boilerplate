import React, { useEffect, useState } from "react"
import { useLazyQuery, useMutation } from "@apollo/react-hooks"
import { FacebookLoginButton } from "uc-lib"
import { FacebookLoginButtonProps } from "./facebook-login-button.d"
import * as FacebookController from "../../../../controllers/social-controller"
import { useAuth } from "../../../../providers/auth-provider"
import { translate } from "../../../../utilities/i18n"

export const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = (props) => {
  const { onSuccess, onCancel, onClick, onFailure } = props
  const auth = useAuth()
  const [loading, setLoading] = useState(false)
  const handleError = (_err: Error) => {
    const loginErrorMessage = {
      ouException: { title: "Error", message: translate("generic-login-error") },
    }
    onFailure && onFailure(loginErrorMessage)
  }
  const handleCanceled = () => {
    alert("Login was cancelled")
    onCancel && onCancel()
  }
  const [getFederatedLoginInfo, { data }] = useLazyQuery(GET_FEDERATED_LOGIN_INFO, {
    onError: handleError,
    onCompleted: (result) => {
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
      const { state, redirectUri } = data.federatedLoginInfo
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
      // TODO: CLIENT-411 handle TryNoFBEmailFallback
    } catch (err) {
      handleError(err)
    }
    setLoading(false)
  }
  const handleClick = () => {
    setLoading(true)
    onClick && onClick()
    getFederatedLoginInfo({
      variables: {
        clientType: "web",
        provider: "Facebook",
      },
    })
  }
  useEffect(() => {
    FacebookController.init()
  }, [])
  return (
    <FacebookLoginButton buttonText={"Continue with Facebook"} onClick={handleClick} isFullWidth={true} loading={loading} />
  )
}
