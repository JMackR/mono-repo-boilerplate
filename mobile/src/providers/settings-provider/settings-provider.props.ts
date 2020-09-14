import { WebViewLinks } from "shared-lib/constants/url-constants"
import { ServerTypeProps } from "shared-lib/utilities/settings/server-settings.native"
import { ServerType } from "shared-lib/utilities/settings/server-settings-common"

export interface SettingsProviderProps {
  appUrl: string
  serverList: ServerTypeProps[]
  serverType: ServerType
  setServerType: (serverType: ServerType) => Promise<void>
  websiteUrl: string
  webViewLinks: WebViewLinks
}
