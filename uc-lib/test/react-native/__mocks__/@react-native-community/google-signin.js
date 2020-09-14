export default {
  /**
   * Check if the device has Google Play Services installed. Always resolves
   * true on iOS
   */
  hasPlayServices(params) {
    return true
  },

  /**
   * Configures the library for login. MUST be called before attempting login
   */
  configure(params) {},

  /**
   * Returns a Promise that resolves with the current signed in user or rejects
   * if not signed in.
   */
  signInSilently() {
    return null
  },

  /**
   * Prompts the user to sign in with their Google profile. Resolves with the
   * user if successful.
   */
  signIn() {},

  /**
   * Signs the user out.
   */
  signOut() {},

  /**
   * Removes your application from the user's authorized applications
   */
  revokeAccess() {},

  /**
   * Returns whether the user is currently signed in
   */
  isSignedIn() {
    return false
  },

  getCurrentUser() {
    return null
  },

  clearCachedAccessToken(token) {},

  getTokens() {
    return null
  },
}
