import moment from "moment"
import { Api } from "../api"
import { RefreshToken } from "./refresh-token"
import { AuthenticationForbiddenError, UnexpectedAuthenticationError } from "./errors"
import { AccessTokenResponse } from "../login"
import { AuthenticationStore } from "../../../models/authentication-store"
import { AuthenticationToken, AuthenticationTokenModel } from "../../../models/authentication-token"
import { isAlive } from "mobx-state-tree"

export const AccessToken = {
  /**
   * Returns a valid access token, requesting from server if necessary
   * @param {Api} api
   * @param {AuthenticationStore} authenticationStore
   * @param {boolean} renew
   */
  async get(
    api: Api,
    authenticationStore: AuthenticationStore,
    renew?: boolean,
  ): Promise<AuthenticationToken> {
    const accessToken = authenticationStore.accessToken
    if (!renew && accessToken && accessToken.isValid()) {
      return Promise.resolve(accessToken)
    } else {
      console.debug("accessToken is invalid")
      const refreshToken = await RefreshToken.get(api, authenticationStore)
      const userId = authenticationStore.userId
      return api
        .request<AccessTokenResponse>("post", "/api/login/access", {
          headers: {
            Authorization: `Bearer ${refreshToken.token}`,
          },
          shouldCancel: () =>
            !isAlive(authenticationStore) || authenticationStore.userId !== userId,
          validateStatus: status => [401, 403].includes(status),
        })
        .then(response => {
          console.debug("accessToken response", response.status)
          if (response.ok && response.status === 200) {
            const { jwt, expiresIn } = response.data
            const expiresAt = moment().unix() + expiresIn
            const accessToken = AuthenticationTokenModel.create({
              token: jwt,
              expiresAt,
              userId: refreshToken.userId,
            })
            authenticationStore.setAccessToken(accessToken)
            return accessToken
          } else if (response.status === 401) {
            // There's an edge case where 401's cause a loop ... should never happen ;)
            console.debug("Clearing refreshToken, retrying")
            authenticationStore.setRefreshToken(undefined)
            return AccessToken.get(api, authenticationStore)
          } else if (response.status === 403) {
            throw new AuthenticationForbiddenError()
          } else {
            console.error("Unexpected response for access token", response.status)
            throw new UnexpectedAuthenticationError()
          }
        })
    }
  },
}
