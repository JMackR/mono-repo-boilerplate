import { useState, useEffect } from "react"
import { WebViewLinks, createWebViewLinks } from "shared-lib/constants/url-constants"
import { ServerType } from "shared-lib/utilities/settings/server-settings-common"
import {
  getAppUrl,
  getServerList,
  getServerType,
  setServerType,
  getWebsiteUrl,
} from "shared-lib/utilities/settings/server-settings.native"
import { loadAuthTokens } from "shared-lib/providers/auth-provider/auth-provider-helpers.native"

export const useSettingsContextLoader = () => {
  const [hasLoadedSettings, setHasLoadedSettings] = useState(false)
  const [currentServerType, setCurrentServerType] = useState<ServerType | null>(null)
  const [appUrl, setAppUrl] = useState<string | null>(null)
  const [websiteUrl, setWebsiteUrl] = useState<string | null>(null)
  const serverList = getServerList()
  const [webViewLinks, setWebViewLinks] = useState<WebViewLinks | null>(null)

  const updateServerType = async (serverType: ServerType) => {
    await setServerType(serverType)
    const appUrl = await getAppUrl()
    setAppUrl(appUrl)
    const website = await getWebsiteUrl()
    setWebsiteUrl(website)
    setWebViewLinks(createWebViewLinks(website))
    setCurrentServerType(serverType)
  }

  const loadSettingsFromDiskOnLaunch = () => {
    // Promise.all([loadAuthTokens()])
    //   .then(() => getServerType())
    //   .then((type) => setCurrentServerType(type))
    //   .catch(() => {})
  }
  useEffect(loadSettingsFromDiskOnLaunch, [])

  useEffect(() => {
    if (currentServerType !== null) {
      updateServerType(currentServerType)
        .catch(() => {})
        .finally(() => setHasLoadedSettings(true))
    }
  }, [currentServerType])

  return {
    appUrl,
    hasLoadedSettings,
    serverList,
    serverType: currentServerType,
    setServerType: updateServerType,
    websiteUrl,
    webViewLinks,
  }
}
