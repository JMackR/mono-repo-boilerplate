import Keychain, { ACCESSIBLE, STORAGE_TYPE } from "react-native-keychain"

const DEFAULT_OPTIONS: Keychain.Options = {
  storage: STORAGE_TYPE.AES,
  accessible: ACCESSIBLE.AFTER_FIRST_UNLOCK,
}

/**
 * Keychain wrapper to give secure storage on native.
 *
 * @description Both setGenericPassword and setInternetCredentials are limited to strings only, so if
 *  you need to store objects etc, please use JSON.stringify/JSON.parse when you store/access it.
 *
 * @param key The Key you wish to store this data under, this must be unique to avoid collisions
 * @param defaultValue [Optional] A default value that will be returned if a value
 *    does not exist in storage for that key.
 *    Note: this will not set the default value in the store.
 */
export const SecureStorage = (key: string, defaultValue?: string, debugLogEnabled?: boolean) => {
  const secureGetItem = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({ service: key, ...DEFAULT_OPTIONS })
      const token = credentials ? (credentials as Keychain.SharedWebCredentials).password : defaultValue
      return token
    } catch (error) {
      debugLog("read data error: " + error)
      throw error
    }
  }

  const secureSetItem = async (value: string) => {
    try {
      return await Keychain.setGenericPassword(key, value, { service: key, ...DEFAULT_OPTIONS })
    } catch (error) {
      debugLog("write data error: " + error)
      throw error
    }
  }

  const secureRemoveItem = async () => {
    try {
      return await Keychain.resetGenericPassword({ service: key, ...DEFAULT_OPTIONS })
    } catch (error) {
      debugLog("remove data error: " + error)
      throw error
    }
  }

  const debugLog = (log: string) => {
    if (debugLogEnabled && __DEV__) {
      /* tslint:disable-next-line: no-console */
      console.log("[SecureStorage] " + log)
    }
  }

  return {
    secureSetItem,
    secureGetItem,
    secureRemoveItem,
  }
}
