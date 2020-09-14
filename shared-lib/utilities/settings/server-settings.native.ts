import invariant from "invariant"
import { Platform } from "react-native"
import Config from "react-native-config"
import { ServerType, getServerTypeFromString, getServerEnvType, getServerWebsite } from "./server-settings-common"
import { StorageController, SERVER_TYPE_KEY } from "../storage"

export interface ServerTypeProps {
  type: ServerType
  app: string
  website: string
}

export const serverTypeStorage = StorageController<string>(SERVER_TYPE_KEY)

export const getServerType = async (): Promise<ServerType> => {
  const storedType = await serverTypeStorage.getItem()
  if (storedType != null) {
    return getServerTypeFromString(storedType)
  }
  return ServerType.Environment
}

export const setServerType = async (serverType: ServerType): Promise<void> => {
  if (serverType === ServerType.Environment) {
    await serverTypeStorage.removeItem()
  } else {
    await serverTypeStorage.setItem(serverType as string)
  }
}

export const getServerList = (): ServerTypeProps[] => {
  return Object.keys(ServerType).map((key) => {
    const serverType = ServerType[key as keyof typeof ServerType]
    const envServerType = serverType === ServerType.Environment ? getServerEnvType() : serverType

    const props: ServerTypeProps = {
      type: serverType,
      app: getServerURL(envServerType),
      website: getServerWebsite(envServerType),
    }
    return props
  })
}

const getServerURL = (serverType: ServerType) => {
  switch (serverType) {
    case ServerType.Development:
      return Platform.OS === "ios" ? Config.APP_URL_DEV_IOS : Config.APP_URL_DEV_AND
    case ServerType.Environment:
      return Config.APP_URL
    case ServerType.Integration:
      return Config.APP_URL_INT
    case ServerType.Staging:
      return Config.APPL_URL_STG
    default:
      return ""
  }
}

/*
 * Priority for server settings:
 * 1) GRAPHQL_URL, WEBSITE
 * 2) Settings
 * 3) Environment
 */

export const getAppUrl = async () => {
  let appUrl: string
  if (Config.SHOW_SERVER_MENU !== "true") {
    appUrl = getServerURL(ServerType.Environment)
  } else {
    let serverType = await getServerType()
    if (serverType === ServerType.Environment) {
      serverType = getServerEnvType()
    }
    appUrl = getServerURL(serverType)
  }

  invariant(appUrl.length > 0, "GRAPHQL_URL is required in .env")
  return appUrl
}

export const getWebsiteUrl = async () => {
  let website: string
  if (Config.SHOW_SERVER_MENU !== "true") {
    website = getServerWebsite(ServerType.Environment)
  } else {
    let serverType = await getServerType()
    if (serverType === ServerType.Environment) {
      serverType = getServerEnvType()
    }
    website = getServerWebsite(serverType)
  }

  invariant(website.length > 0, "WEBSITE is required in .env")
  return website
}
