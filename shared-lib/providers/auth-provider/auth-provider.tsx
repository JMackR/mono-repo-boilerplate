import React, { createContext, FC, useContext } from "react"
import { AuthProps } from "./auth-provider.d"
import { useProvideAuth } from "./use-provide-auth"
import { User } from "../../type-defs/generated-types/type-defs"

interface AuthProviderProps {
  cleanUpForLogOut?: () => Promise<void>
  user?: User
  children: React.ReactNode
}

const initialValue: AuthProps = {
  loading: false,
  isAuthed: false,
  user: null,
  setUser: () => {},
  handleSuccessfulAuth: async (_u: null | object) => {},
  handleLogout: async () => {},
}

const AuthContext = createContext<AuthProps>(initialValue)

export const useAuth = (): AuthProps => {
  return useContext(AuthContext)
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children, user, cleanUpForLogOut } = props
  const auth = useProvideAuth(user, cleanUpForLogOut)
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
