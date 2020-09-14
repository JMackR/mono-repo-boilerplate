import { NativeModules } from "react-native"

const AppVersionModule = NativeModules.PAppVersionModule

interface AppVersionData {
  isFirstRunAfterInstall: boolean
  isRunningFirstInstalledVersion: boolean
  wasAppUpdated: boolean
}

export const AppVersionManager = {
  getAppVersionInfo: async (): Promise<AppVersionData> => {
    const info = await AppVersionModule.getAppVersionInfo()
    return info
  },
}
