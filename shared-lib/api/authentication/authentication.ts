import { ApiResponse } from "apisauce"
import { Api } from "../api"
import { AxiosRequestConfig } from "axios"
import { AccessToken } from "./access-token"
import { AuthenticationForbiddenError } from "./errors"
import { AuthenticationStore } from "../../../models/authentication-store"

export type AuthenticatedRequest<T> = (config: AxiosRequestConfig) => Promise<ApiResponse<T>>

export const Authentication = {
  /**
   * Executes an API request, wrapping it with auth validation, handling common auth responses
   * @param api
   * @param authenticationStore
   * @param config
   * @param executeRequest
   * @throws {AuthenticationForbiddenError} if response suggests forbidden
   * @throws {CredentialsRejectedError} if credentials were required and are invalid
   * @throws {MissingCredentialsError} if credentials were required and missing
   * @throws {UnexpectedAuthenticationError} if unexpected responses are received during auth
   */
  execute<T>(
    api: Api,
    authenticationStore: AuthenticationStore,
    config: AxiosRequestConfig,
    executeRequest: AuthenticatedRequest<T>,
  ): Promise<ApiResponse<T>> {
    console.debug("withAuthentication")
    return AccessToken.get(api, authenticationStore)
      .then(({ token }) => {
        console.debug("Executing with accessToken", token)
        return executeRequest({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        })
      })
      .then(response => {
        if (response.status === 401) {
          // Edge case could cause infinite 401 loop ... should never happen ;)
          console.info("401, invalid access token")
          authenticationStore.setAccessToken(undefined)
          return Authentication.execute(api, authenticationStore, config, executeRequest)
        } else if (response.status === 403) {
          throw new AuthenticationForbiddenError()
        } else {
          return response
        }
      })
  },
}
