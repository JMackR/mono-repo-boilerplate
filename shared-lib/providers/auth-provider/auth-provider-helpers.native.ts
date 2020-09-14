import { SecureStorage } from "../../utilities/secure-storage/secure-storage.native"
import { AuthTokensProps } from "./auth-provider.d"
import { JWT_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./auth-provider-constants"

const jwtTokenStorage = SecureStorage(JWT_TOKEN_KEY)
const refreshTokenStorage = SecureStorage(REFRESH_TOKEN_KEY)

let sharedJwtToken: string | undefined
let sharedRefreshToken: string | undefined

export const setAuthTokens = async (data: AuthTokensProps) => {
  const { jwtToken, refreshToken } = data
  if (!jwtToken || !refreshToken) {
    return
  }
  sharedJwtToken = jwtToken
  sharedRefreshToken = refreshToken
  await jwtTokenStorage.secureSetItem(jwtToken)
  await refreshTokenStorage.secureSetItem(refreshToken)
}

export const getAuthTokens = () => {
  return {
    jwtToken: sharedJwtToken,
    refreshToken: sharedRefreshToken,
  }
}

export const removeAuthTokens = async () => {
  sharedJwtToken = undefined
  sharedRefreshToken = undefined
  await jwtTokenStorage.secureRemoveItem()
  await refreshTokenStorage.secureRemoveItem()
}

export const loadAuthTokens = async () => {
  sharedJwtToken = await jwtTokenStorage.secureGetItem()
  sharedRefreshToken = await refreshTokenStorage.secureGetItem()
}
