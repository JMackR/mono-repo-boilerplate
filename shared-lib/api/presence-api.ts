import { ApiRequest, createApiRequest } from "./api-request"
import { EmptyResponse } from "./api.types"

export interface GetConcurrencyResponse {
  count: number
}

export const PresenceApi = {
  /**
   * GET /api/presence/groups/:id
   * @param id the location ID
   */
  getConcurrency: (id: string): ApiRequest<GetConcurrencyResponse> =>
    createApiRequest("get", `/api/presence/groups/${id}`),
  /**
   * POST /api/presence/active/:id
   * @param id the location ID
   */
  active: (id: string): ApiRequest<EmptyResponse> =>
    createApiRequest("post", `/api/presence/active/${id}`, {
      authenticate: true,
    }),
}
