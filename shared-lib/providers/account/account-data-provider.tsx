import React, { useEffect, createContext, FC } from "react"
import { useLazyQuery } from "@apollo/react-hooks"
import _ from "lodash"
import { useAuth } from "../auth-provider"
import { User } from "../../type-defs/generated-types/type-defs"
export interface AccountContextProps {
  loading: boolean
  error: Error | undefined
  data: User | undefined
  refetch(variables?: any): Promise<any>
}
const initialValue: AccountContextProps = {
  loading: false,
  error: undefined,
  data: undefined,
  refetch: async () => {},
}

export const AccountDataContext = createContext<AccountContextProps>(initialValue)

export const AccountDataProvider: FC = ({ children }) => {
  const auth = useAuth()
  useEffect(() => {
    // only request user info once we are authed!
    if (auth.isAuthed) {
      loadAccountInfo()
    }
  }, [auth.isAuthed])
  const [loadAccountInfo, { error, loading, data, called, refetch }] = useLazyQuery<Query>(ACCNT_QUERY)

  return (
    <AccountDataContext.Provider
      value={{
        error,
        loading: loading || !called,
        data: data ? _.property<Query, User>("me")(data) : undefined,
        refetch,
      }}
    >
      {children}
    </AccountDataContext.Provider>
  )
}
