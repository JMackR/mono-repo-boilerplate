import { useEffect, useState } from "react"
import { User } from "../../type-defs/generated-types/type-defs"
import { AuthProps } from "./auth-provider.d"
import { setAuthTokens, getAuthTokens, removeAuthTokens } from "./auth-provider-helpers.native"
import { AnalyticsAuth } from "../../analytics/analytics-auth"
import { StorageControllerHelper } from "../../utilities/storage"

export const authenticationChecker = () => {
  const { jwtToken } = getAuthTokens()
  return !!jwtToken
}

export const useProvideAuth = (authUser?: User, cleanUpForLogOut?: () => Promise<void>): AuthProps => {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<null | User>(authUser || null)

  const checkInitAuth = async () => {
    setLoading(true)
    const isAuthenticated = authenticationChecker()
    // go ahead and grab the user info
    if (!isAuthenticated) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      // const { data } = await apolloClient.query<Query>({
      //   query: ME_QUERY,
      // })
      // setUser(data.me)
      // const userId = String(_.property("me.id")(data))
    } catch (error) {
      setUser(null)
      // TODO: CLIENT-431 to handle retry with refresh token when it's relevant.
    }
    setLoading(false)
  }
  useEffect(() => {
    checkInitAuth()
  }, [])

  const handleSuccessfulAuth = async (updatedUser: User) => {
    const { sessionToken, refreshToken } = updatedUser

    if (sessionToken && refreshToken) {
      await setAuthTokens({
        jwtToken: sessionToken.value,
        refreshToken: refreshToken.value,
      })
      await checkInitAuth()
      // await apolloClient.resetStore().catch(() => {
      //   // TO-DO: handle error to cleanup previous user data in cache
      // })
    }
  }
  const handleLogout = async () => {
    setLoading(true)
    setUser(null)
    await StorageControllerHelper.clearAllButWhitelist()
    await removeAuthTokens()
    cleanUpForLogOut && (await cleanUpForLogOut())
    // await apolloClient.resetStore()
    setLoading(false)
  }

  return {
    loading,
    user,
    setUser,
    isAuthed: !!user,
    handleSuccessfulAuth,
    handleLogout,
  }
}
