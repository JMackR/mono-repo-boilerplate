import { ApiRequest, createApiRequest } from "./api-request"

interface RegisterPushResponse {
  topics: ReadonlyArray<string>
}

/**
 * Push notification APIs
 */
export const PushApi = {
  /**
   * Registers with the push-notifications service
   * @param token
   */
  registerToken: (token: string): ApiRequest<RegisterPushResponse> =>
    createApiRequest("post", "/api/push/token/register", {
      authenticate: true,
      body: { token }, // TODO Scope to install UUID
    }),
}
