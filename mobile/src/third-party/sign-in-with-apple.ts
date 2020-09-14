import { NativeModules } from "react-native"
import { AnalyticsDebug } from "shared-lib"

const SignInWithAppleProvider = NativeModules.SignInWithAppleNative

export interface AppleLoginPropsType {
  scope: string[]
  clientId: string
  state: string
  redirectUri: string
  handleGranted(authCode: string, firstName?: string, lastName?: string, email?: string): void
  handleCanceled(): void
  handleError(err: Error): void
}

export const signInWithApple = async (props: AppleLoginPropsType) => {
  const { scope, clientId, state, redirectUri, handleGranted, handleCanceled, handleError } = props
  try {
    const response = await SignInWithAppleProvider.signInWithApple(scope, clientId, state, redirectUri)

    if (response != null) {
      const { code, responseState, firstName, lastName, email } = response
      if (responseState != null && code != null) {
        handleGranted(code, firstName, lastName, email)
        return
      }
    }
    handleCanceled()
  } catch (e) {
    AnalyticsDebug.logError(e)
    handleError(e)
  }
}
