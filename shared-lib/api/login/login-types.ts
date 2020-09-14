export interface RefreshTokenResponse {
  jwt: string
  expiresIn: number
}

export interface AccessTokenResponse {
  jwt: string
  expiresIn: number
}

export interface AuthenticateResponse {
  userId: string
  refreshToken: RefreshTokenResponse
  accessToken: AccessTokenResponse
}
