import React, { useContext } from "react"
import invariant from "invariant"
import { SettingsProviderProps } from "./settings-provider.props"
import { createWebViewLinks } from "shared-lib/constants/url-constants"
import { ServerType, getServerTitle } from "shared-lib/utilities/settings/server-settings-common"

export const useSettingsAppUrl = () => {
  const { appUrl } = useContext(SettingsProvider)
  invariant(
    appUrl,
    "No SettingsProvider instance can be found. Please ensure that you " +
      "have called `SettingsContextProvider` higher up in your tree.",
  )
  return appUrl
}

export const useSettingsServerType = () => {
  const { serverType } = useContext(SettingsProvider)
  invariant(
    serverType,
    "No SettingsProvider instance can be found. Please ensure that you " +
      "have called `SettingsContextProvider` higher up in your tree.",
  )
  return {
    serverType,
    serverTitle: getServerTitle(serverType),
  }
}

export const useSettingsWebViewLinks = () => {
  const { webViewLinks } = useContext(SettingsProvider)
  invariant(
    webViewLinks,
    "No SettingsProvider instance can be found. Please ensure that you " +
      "have called `SettingsContextProvider` higher up in your tree.",
  )
  return webViewLinks
}

export const SettingsProvider = React.createContext<SettingsProviderProps>({
  appUrl: "",
  serverList: [],
  serverType: ServerType.Environment,
  setServerType: async (_serverType: ServerType) => {},
  websiteUrl: "",
  webViewLinks: createWebViewLinks(""),
})
