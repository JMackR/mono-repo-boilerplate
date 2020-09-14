import { ShareContent, ShareOptions } from "./share.props.native"
import { generateDeepLink, BranchLinkProperties } from "./branch-wrapper"
import { Platform } from "react-native"
import Share from "react-native-share"
export const ITEM_SHARE_BASE_URL = "https://redibs.com/item/detail/"

export const SocialShare = {
  share(content: ShareContent, options?: ShareOptions, linkProperties?: BranchLinkProperties): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      let { message, title, url } = content
      if (message === null && url === null) {
        reject("Share content must include either a message or a url")
      }
      if (url != null && !options?.skipUrlMutation) {
        url = await generateDeepLink(url, linkProperties)
      }
      if ((message === null || message === undefined) && url !== null) {
        message = url
      } else {
        message = `${message} ${url}`
      }
      try {
        const option = Platform.select({
          ios: {
            activityItemSources: [
              {
                placeholderItem: {
                  type: "text",
                  content: message,
                },
                item: {
                  default: {
                    type: "text",
                    content: message,
                  },
                },
                subject: {
                  default: title,
                },
                linkMetadata: {
                  title,
                  icon: url,
                },
              },
            ],
          },
          default: {
            title,
            subject: title,
            message,
          },
        })
        const result = await Share.open(option)
        resolve(result.action === "sharedAction")
      } catch (error) {
        reject(error)
      }
    })
  },
}
