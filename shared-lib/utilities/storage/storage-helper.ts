import { PERMANENT_STORAGE_KEY_WHITELIST } from "./storage-constants"

export class StorageControllerHelper {
  public static clearAllButWhitelist() {
    const length = localStorage.length
    const allKeys: string[] = []
    for (let i = 0; i < length; i++) {
      const key = localStorage.key(i)
      if (key) {
        allKeys.push(key)
      }
    }
    const keysToRemove = allKeys.filter(key => !PERMANENT_STORAGE_KEY_WHITELIST.includes(key))
    keysToRemove.forEach(key => localStorage.removeItem(key))
  }
}
