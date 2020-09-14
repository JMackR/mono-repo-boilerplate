import React, { FC } from "react"
import { SettingsProvider } from "./settings-provider"
import { SettingsProviderProps } from "./settings-provider.props"
import { useSettingsContextLoader } from "./settings-context-loader"
import { createWebViewLinks } from "shared-lib/constants/url-constants"
import { ServerType } from "shared-lib/utilities/settings/server-settings-common"

export const SettingsContextProvider: FC = ({ children }) => {
  const {
    appUrl,
    hasLoadedSettings,
    serverList,
    serverType,
    setServerType,
    websiteUrl,
    webViewLinks,
  } = useSettingsContextLoader()

  if (!hasLoadedSettings) {
    return <></>
  }

  const providerValue: SettingsProviderProps = {
    appUrl: appUrl ?? "",
    serverList,
    serverType: serverType ?? ServerType.Environment,
    setServerType,
    websiteUrl: websiteUrl ?? "",
    webViewLinks: webViewLinks ?? createWebViewLinks(""),
  }

  return <SettingsProvider.Provider value={providerValue}>{children}</SettingsProvider.Provider>
}
