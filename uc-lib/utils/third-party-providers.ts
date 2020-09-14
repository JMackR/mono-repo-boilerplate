import { ThirdPartyProvider } from "../models/connection-store/connection-store.type-defs"
import { Platform } from "react-native"
import { AppleAuthenticationCredential, AppleAuthenticationScope, signInAsync } from "expo-apple-authentication"
import { AccessToken, LoginManager } from "react-native-fbsdk"
import { GoogleSignin, User } from "@react-native-community/google-signin"

const validProviders: ThirdPartyProvider[] = []
if (Platform.OS === "ios" && parseInt(Platform.Version as string, 10) > 12) {
  validProviders.push("apple")
}
if (Platform.OS === "android") {
  validProviders.push("google")
}
validProviders.push("facebook")
validProviders.push("recovery")

const connectApple = (onSuccess?: (token: string) => void, onFailed?: (error: string) => void) => {
  signInAsync({
    requestedScopes: [AppleAuthenticationScope.EMAIL, AppleAuthenticationScope.FULL_NAME],
  })
    .then((credential: AppleAuthenticationCredential) => {
      if (onSuccess) onSuccess(credential.user)
    })
    .catch(error => {
      if (onFailed) onFailed(error)
    })
}

const connectFacebook = (onSuccess?: (token: string) => void, onFailed?: (error: string) => void) => {
  LoginManager.logInWithPermissions([]).then(({ error }) => {
    if (error) {
      if (onFailed) onFailed(`facebook.connect.error ${error}`)
      return
    }
    AccessToken.getCurrentAccessToken().then(accessToken => {
      if (accessToken?.accessToken) {
        if (onSuccess) onSuccess(accessToken.accessToken)
      } else if (onFailed) {
        onFailed(`facebook.connect.error can not get access token`)
      }
    })
  })
}

const connectGoogle = (onSuccess?: (token: string) => void, onFailed?: (error: string) => void) => {
  GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    .then((hasPlayServices: boolean) => {
      if (hasPlayServices) {
        GoogleSignin.signIn().then((userInfo: User) => {
          if (userInfo) {
            GoogleSignin.getTokens().then(({ accessToken }) => {
              if (onSuccess) onSuccess(accessToken)
            })
          } else if (onFailed) {
            onFailed("google.connect.error cannot get google user info")
          }
        })
      }
    })
    .catch(error => {
      if (onFailed) onFailed(`google.connect.error ${error.toString()}`)
    })
}

/**
 * Helper method/value for third party provider
 */
export const ThirdPartyProviders = {
  valid: validProviders as ReadonlyArray<ThirdPartyProvider>,
  connect(provider: ThirdPartyProvider, onSuccess?: (token: string) => void, onFailed?: (error: string) => void) {
    switch (provider) {
      case "apple":
        connectApple(onSuccess, onFailed)
        break
      case "facebook":
        connectFacebook(onSuccess, onFailed)
        break
      case "google":
        connectGoogle(onSuccess, onFailed)
        break
      case "recovery":
        break
    }
  },
}
