import * as Keychain from "react-native-keychain"

/**
 * Saves some credentials securely.
 *
 * @param username The username
 * @param password The password
 * @param server The server these creds are for.
 */
export async function save(username: string, password: string, server?: string) {
  if (server) {
    await Keychain.setInternetCredentials(server, username, password)
    return true
  } else {
    return Keychain.setGenericPassword(username, password)
  }
}

/**
 * Loads credentials that were already saved.
 *
 * @param server The server that these creds are for
 */
export async function load(server?: string) {
  if (server) {
    const creds = await Keychain.getInternetCredentials(server)
    return {
      username: (creds && creds.username) || undefined,
      password: (creds && creds.password) || undefined,
      server,
    }
  } else {
    const creds = await Keychain.getGenericPassword()
    if (typeof creds === "object") {
      return {
        username: creds.username,
        password: creds.password,
        server: null,
      }
    } else {
      return {
        username: null,
        password: null,
        server: null,
      }
    }
  }
}

/**
 * Resets any existing credentials for the given server.
 *
 * @param server The server which has these creds
 */
export async function reset(server?: string) {
  if (server) {
    await Keychain.resetInternetCredentials(server)
    return true
  } else {
    const result = await Keychain.resetGenericPassword()
    return result
  }
}
