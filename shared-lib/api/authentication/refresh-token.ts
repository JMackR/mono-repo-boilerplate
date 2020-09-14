import { Api } from "../api"
import { AuthenticateResponse } from "../login"
import {
  AuthenticationForbiddenError,
  CredentialsRejectedError,
  MissingCredentialsError,
  UnexpectedAuthenticationError,
} from "./errors"
import { AuthenticationStore } from "../../../models/authentication-store"
import { AuthenticationToken, AuthenticationTokenModel } from "../../../models/authentication-token"
import moment from "moment"
import { isAlive } from "mobx-state-tree"

export const RefreshToken = {
  /**
   * Gets the refresh token, fetching a new one using Credentials if necessary
   * Resolves to the string value of the token
   * @param {Api} api
   * @param {AuthenticationStore} authenticationStore
   * @param {boolean} renew whether to force a new token, even if current is valid
   * @throws MissingCredentialsError if there are no credentials available
   */
  async get(api: Api, authenticationStore: AuthenticationStore, renew?: boolean): Promise<AuthenticationToken> {
    const refreshToken = authenticationStore.refreshToken
    if (!renew && refreshToken && refreshToken.isValid()) {
      return Promise.resolve(refreshToken)
    }
    console.debug("refreshToken is invalid")
    const credentials = authenticationStore.credentials.active
    if (credentials) {
      const userId = authenticationStore.userId
      return api
        .request<AuthenticateResponse>("post", "/api/login/authenticate", {
          body: credentials,
          validateStatus: (status) => [401, 403].includes(status),
          shouldCancel: () => !isAlive(authenticationStore) || authenticationStore.userId !== userId,
        })
        .then((response) => {
          console.debug("refreshToken response", response.status)
          if (response.ok && response.status === 200) {
            const { refreshToken, userId } = response.data
            const { jwt, expiresIn } = refreshToken
            const token = AuthenticationTokenModel.create({
              token: jwt,
              expiresAt: moment().unix() + expiresIn,
              userId,
            })
            authenticationStore.setRefreshToken(token)
            return token
          } else if (response.status === 401) {
            throw new CredentialsRejectedError()
          } else if (response.status === 403) {
            throw new AuthenticationForbiddenError()
          } else {
            console.error("Unexpected response for refresh token", response.status)
            throw new UnexpectedAuthenticationError()
          }
        })
    } else {
      throw new MissingCredentialsError()
    }
  },
}
