import _ from "lodash"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { useAuth } from "shared/providers"
import { GoogleLoginButton } from "uc-lib"
import React, { useState } from "react"
import { GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin } from "react-google-login"
import { translate } from "../../../../utilities/i18n"
import { GoogleLoginButtonProps } from "./google-login-button.d"

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = (props) => {
  const { onFailure: onExternalFailure, onSuccess, onCancel, onClick } = props
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const handleError = (err: Error) => {
    onExternalFailure && onExternalFailure(err)
  }

  const { data: loginInfo } = useQuery<Query>(GET_FEDERATED_LOGIN_INFO, {
    variables: {
      clientType: "web",
      provider: "Google",
    },
    onError: (err) => handleError(err),
  })

  /**
   * Login to backend after authenticated with google
   */
  const [federatedLogin] = useMutation<Mutation, FederatedLoginInput>(FEDERATED_LOGIN)

  const onGoogleFailure = (error: any) => {
    setLoading(false)
    if (error.error === "popup_closed_by_user") {
      onCancel && onCancel()
    } else {
      handleError(error)
    }
  }

  const onGoogleSuccess = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const accessToken: string = (_.property("accessToken")(response) as string) || ""
    try {
      const { data } = await federatedLogin({
        variables: {
          redirectUri: loginInfo?.federatedLoginInfo?.redirectUri || "",
          state: loginInfo?.federatedLoginInfo?.state || "",
          accessToken,
        },
      })
      data?.federatedLogin && (await auth.handleSuccessfulAuth(data.federatedLogin as any))
      onSuccess()
    } catch (error) {
      handleError(error)
    }
    setLoading(false)
  }

  const { signIn } = useGoogleLogin({
    onSuccess: onGoogleSuccess,
    clientId: loginInfo?.federatedLoginInfo?.clientId || "",
    redirectUri: loginInfo?.federatedLoginInfo?.redirectUri || "",
    onFailure: onGoogleFailure,
    scope: loginInfo?.federatedLoginInfo?.scope?.join(" ") || "",
    onRequest: () => onClick,
  })
  const onSignIn = async () => {
    setLoading(true)
    await signIn()
  }
  const title = translate("google-login-button")
  return <GoogleLoginButton buttonText={title} onClick={onSignIn} loading={loading} />
}
