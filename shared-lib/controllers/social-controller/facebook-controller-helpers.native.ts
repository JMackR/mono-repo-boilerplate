import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk"
import { FBApiResponseType } from "./facebook-controller.d"

export const api = (endpoint: string) => {
  return new Promise<FBApiResponseType>(async (resolve, reject) => {
    const responseCallback = (error?: object, response?: FBApiResponseType) => {
      if (error) {
        reject(error)
      }
      resolve(response)
    }
    const infoRequest = new GraphRequest(endpoint, null, responseCallback)
    new GraphRequestManager().addRequest(infoRequest).start()
  })
}

export const login = async (callback: (response: fb.StatusResponse) => void, options: fb.LoginOptions) => {
  const { scope } = options
  try {
    const response = await LoginManager.logOut()
  } catch (err) {
    // ignore
  }

  const response = await LoginManager.logInWithPermissions(scope)
  let result = { ...response }
  if (!response.isCancelled) {
    const accessToken = await getAccessToken()
    result = {
      ...result,
      accessToken,
    }
  }
  callback(result)
  return result
}

export const getAccessToken = async () => {
  const { accessToken } = await AccessToken.getCurrentAccessToken()
  return accessToken
}
