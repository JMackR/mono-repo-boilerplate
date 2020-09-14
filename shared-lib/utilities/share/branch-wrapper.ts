// import branch, { BranchEvent } from "react-native-branch";

const SHARE_DESKTOP_URI = "https://redibs.com/sendapp"
const SHARE_APP_URI = "https://redibs.com/search/"

export interface BranchLinkProperties {
  channel?: string
  campaign?: string
  sharetype?: string
  screensource?: string
}

export const generateDeepLink = async (shareUriValue: string, linkProperties?: BranchLinkProperties): Promise<string> => {
  try {
    // const branchUniversalObject = await branch.createBranchUniversalObject("")
    // const controlParams = {
    //   $deeplink_path: shareUriValue,
    //   $fallback_url: shareUriValue,
    //   $desktop_url: "",
    // }
    // if (SHARE_APP_URI === shareUriValue) {
    //   controlParams.$desktop_url = SHARE_DESKTOP_URI
    // }
    // const branchlinkdata = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
    // return branchlinkdata.url
  } catch (err) {
    console.log(err)
    // TODO Report the error
  }
  return ""
}

export const logBranchEvent = async (branchEvent: BranchEvent) => {
  // const branchUniversalObject = await branch.createBranchUniversalObject("")
  // branchUniversalObject.logEvent(branchEvent)
}
