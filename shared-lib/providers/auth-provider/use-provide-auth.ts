import { useState, useEffect } from "react"
import { AuthProps } from "./auth-provider.d"
import { AnalyticsDebug, AnalyticsAuth } from "../../analytics"
import { StorageControllerHelper } from "../../utilities/storage"
import { User } from "../../type-defs/generated-types/type-defs"

export const useProvideAuth = (authUser?: User, cleanUpForLogOut?: () => Promise<void>): AuthProps => {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<null | User>(authUser || null)
  // const [logout] = useMutation(LOGT_MUTATION)
  // const apolloClient = useApolloClient()

  const handleSuccessfulAuth = async () => {
    setLoading(true)

    try {
      // apolloClient.resetStore()
    } catch (e) {
      console.log("auth err", e)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async (fallbackCall?: () => void) => {
    try {
      // await logout()
      StorageControllerHelper.clearAllButWhitelist()
      cleanUpForLogOut && (await cleanUpForLogOut())
      // await apolloClient.resetStore()
      if (fallbackCall) {
        fallbackCall()
      } else {
        // window.location.assign("/")
      }
    } catch (e) {
      AnalyticsDebug.logError(e)
    }
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
