import { ApiRequest, createApiRequest } from "./api-request"

export interface GetVersionRequirementResponse {
  /** Minimum version for soft update */
  soft: number
  /** Minimum version for hard update */
  hard: number
}

export const UpdateApi = {
  /**
   * GET /api/update/:platform/:bundle
   */
  getVersionRequirements: (
    platform: string,
    bundle: string,
  ): ApiRequest<GetVersionRequirementResponse> =>
    createApiRequest("get", `/api/update/${platform}/${bundle}`),
}
