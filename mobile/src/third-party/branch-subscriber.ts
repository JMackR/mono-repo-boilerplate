// import branch from "react-native-branch"
import { Linking, Platform } from "react-native"
import { Navigation } from "../navigation/navigation"

const BRANCH_SESSION_TIMET = 10000

// https://github.com/facebook/react-native/issues/25675
// tslint:disable-next-line: no-any
const getInitialURLOverride = (success: (url?: string) => void, failure: (error: any) => void) => {
  if (Platform.OS === "android") {
    const NativeLinking = require("react-native/Libraries/Linking/NativeLinking").default
    NativeLinking.getInitialURL()
      .then(url => success(url))
      .catch(err => failure(err))
  } else {
    Linking.getInitialURL()
      .then(url => success(url))
      .catch(err => failure(err))
  }
}

const performDeeplink = (deeplinkUrl: string) => {
  Navigation.navigateToURL(deeplinkUrl, undefined, { isDeepLink: true })
}

export function InitializeDeeplinking() {
  getInitialURLOverride(
    url => {
      if (url && isBranchLink(url) === false) {
        performDeeplink(url)
      }
    },
    err => console.error("Error getting initial URL", err),
  )

  // branch.initSessionTtl = BRANCH_SESSION_TIMET
  // branch.subscribe(({ error, params }) => {
  //   if (error) {
  //     // Log the error or do something about it
  //     return
  //   }
  //
  //   // params will never be null if error is null
  //   if (params["+non_branch_link"]) {
  //     const nonBranchUrl = params["+non_branch_link"]
  //     // Route non-Branch URL if appropriate or Go to splash/search screen
  //     return
  //   }
  //
  //   if (!params["+clicked_branch_link"]) {
  //     // Indicates initialization success and some other conditions.
  //     // No link was opened.
  //     return
  //   }
  //   const deeplinkUrl = params.$deeplink_path
  //   if (deeplinkUrl) {
  //     performDeeplink(deeplinkUrl)
  //   }
  // })
}

function isBranchLink(url: string): boolean {
  if (url) {
    if (url.includes("redibs.co/") || url.includes("redibs.app.link") || url.includes("redibs-alternate.app.link")) {
      return true
    }
  }
  return false
}
