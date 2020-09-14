import { AccessTokenResponse, RefreshTokenResponse } from "./login"
import { ApiRequest, createApiRequest } from "./api-request"
import { ClientInfo } from "../../models/analytics-store/analytics-store.types"
import { Transformers } from "../../utils/transformers"

export interface RegisterResponse {
  userId: string
  udid: string
  refreshToken: RefreshTokenResponse
  accessToken: AccessTokenResponse
}

export interface ConnectResponse {
  provider: string
  displayValue: string
  userId?: string
}

/**
 * Login (the service) APIs
 * TODO Docs, see other APIs
 */
export const LoginApi = {
  register: (clientInfo?: ClientInfo): ApiRequest<RegisterResponse> => {
    return createApiRequest("post", "/api/login/register", {
      body: { clientInfo: clientInfo ? Transformers.camelToSnake(clientInfo) : {} },
    })
  },
  connect: (provider: string, token: string): ApiRequest<ConnectResponse> =>
    createApiRequest("post", "/api/login/connect", {
      body: { provider, token },
      authenticate: true,
      validErrors: [404, 409],
    }),
  login: (provider: string, token: string): ApiRequest<ConnectResponse> =>
    createApiRequest("post", "/api/login/login", {
      body: { provider, token },
      validErrors: [401],
    }),
}
