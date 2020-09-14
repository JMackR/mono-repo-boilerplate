import { User } from "../../type-defs/generated-types/type-defs"

export interface AuthProps {
  loading: boolean
  isAuthed: boolean
  /**
   * @deprecated use profile-data-provider.
   */
  user: User | null
  setUser: (update: User) => void
  handleSuccessfulAuth: (user: User) => Promise<void>
  handleLogout: (fallbackCall?: () => void) => Promise<void>
}

export interface AuthTokensProps {
  jwtToken: string
  refreshToken: string
}
