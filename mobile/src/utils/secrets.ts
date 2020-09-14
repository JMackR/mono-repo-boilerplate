import * as Keychain from "react-native-keychain"

const mask = (value: string): string => {
  if (value.length > 8) {
    return value.substr(0, 3) + "******" + value.substr(value.length - 3)
  } else {
    return value.replace(/./g, "*")
  }
}

const accessGroup = "29DDGS5GDJ.com.nextmusic"

export const Secrets = {
  /**
   * Sets a secret/token for key/value
   * @param key the key
   * @param value the value
   * @return {Promise<string>} resolves with given value
   */
  set(key: string, value: string): Promise<string> {
    console.info("Secrets#set", key, mask(value))
    return Keychain.setGenericPassword(`secrets.${key}`, value, { service: key, accessGroup }).then(
      successful => {
        if (!successful) {
          throw new Error("Unsuccessful credential save")
        }
        return value
      },
    )
  },
  /**
   * Gets a secret/token for key/value
   * @param key the key
   * @return {Promise<string | undefined>}
   */
  get(key: string): Promise<string | undefined> {
    return Keychain.getGenericPassword({ service: key, accessGroup }).then(result => {
      if (!result) return
      return result.password
    })
  },

  /**
   * Deletes a value at a given, or does nothing if unknown
   * @param key the key
   * @return {Promise<void>}
   */
  delete(key: string): Promise<void> {
    console.info("Secrets#delete", key)
    return Keychain.resetGenericPassword({ service: key, accessGroup }).then(successful => {
      if (!successful) throw new Error("Unsuccessful credential delete")
    })
  },
}
