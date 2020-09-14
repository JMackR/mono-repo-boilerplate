import { FBApiResponseType } from "./facebook-controller.d"

/* Convert FB.getLoginStatus to Promise call */
export const getLoginStatus = () => {
  return new Promise<fb.StatusResponse>(async (resolve) => {
    FB.getLoginStatus((response) => {
      resolve(response)
    })
  })
}
/* Convert FB.api to Promise call */
export const api = (endpoint: string) => {
  return new Promise<FBApiResponseType>(async (resolve) => {
    FB.api(endpoint, (response: FBApiResponseType) => {
      resolve(response)
    })
  })
}
/* Convert FB.login to Promise call */
export const login = (callback: (response: fb.StatusResponse) => void, options: fb.LoginOptions) => {
  return new Promise<fb.StatusResponse>(async (resolve) => {
    FB.login((response) => {
      callback(response)
      resolve(response)
    }, options)
  })
}

/* Convert FB initialize script to Promise call */
export const init = () => {
  return new Promise(async (resolve) => {
    ;(window as any).fbAsyncInit = () => {
      FB.init({
        appId: "1412960615413644",
        cookie: true,
        xfbml: true,
        version: "v2.9",
      })
      resolve()
    }
    ;((d, s, id) => {
      let js
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        resolve()
        return
      }
      js = d.createElement(s)
      js.id = id
      ;(js as any).src = "https://connect.facebook.net/en_US/sdk.js"
      fjs?.parentNode?.insertBefore(js, fjs)
    })(document, "script", "facebook-jssdk")
  })
}
