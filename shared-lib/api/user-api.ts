import { UserApiData, UserField } from "./user-api.types"
import { ApiRequest, createApiRequest } from "./api-request"
import { EmptyResponse } from "./api.types"
import { Transformers } from "../../utils/transformers"

export type GetFollowingResponse = UserApiData[]

export type UploadProfileImageResponse = { image: string }

/**
 * User-related APIs
 */
export const UserApi = {
  /**
   * Fetches user info, with given fields
   * @param id user Id
   * @param fields requested fields (defaults empty, name only)
   */
  getUser: (id: string, fields: ReadonlyArray<UserField> = []): ApiRequest<UserApiData> =>
    createApiRequest("get", `/api/users/user/${id}`, {
      query: {
        q: fields
          .map(Transformers.snakeCase)
          .sort()
          .join(","),
      },
    }),

  /**
   * Fetches user info, with given fields
   * @param fields requested fields (defaults empty, name only)
   */
  getLocalUser: (fields: ReadonlyArray<UserField> = []): ApiRequest<UserApiData> =>
    createApiRequest("get", `/api/users/user/me`, {
      query: {
        q: fields
          .map(Transformers.snakeCase)
          .sort()
          .join(","),
      },
      authenticate: true,
    }),

  /**
   * A request to update personal_info, may delete
   * api/users/user/me/profile/personal_info
   * @param key profile info key
   * @param value profile info value, if value is undefined it will delete
   */
  updateProfileInfo(key: string, value?: string | number): ApiRequest<EmptyResponse> {
    if (value) {
      return createApiRequest("put", "/api/users/user/me/profile/personal_info", {
        body: { [key]: value },
        authenticate: true,
        validErrors: [422],
      })
    } else {
      return createApiRequest("delete", "/api/users/user/me/profile/personal_info", {
        query: { keys: key },
        authenticate: true,
      })
    }
  },
  /**
   * DELETE /api/users/user/me/profile/image
   */
  deleteProfileImage(): ApiRequest<EmptyResponse> {
    return createApiRequest("delete", "/api/users/user/me/profile/image", { authenticate: true })
  },
  /**
   * PUT /api/users/user/me/profile/image
   * @param imageUri
   */
  uploadProfileImage(imageUri: string): ApiRequest<UploadProfileImageResponse> {
    const body = new FormData()
    body.append("file", { uri: imageUri, name: "temp", type: "image/jpeg" })
    return createApiRequest("put", "/api/users/user/me/profile/image", {
      authenticate: true,
      body,
      validErrors: [413],
    })
  },
  /**
   * A request to update social_media, may delete
   * api/users/user/me/profile/social_media
   * @param key profile social media key
   * @param value profile social media value, if value is undefined it will delete
   */
  updateLink(key: string, value?: string | number): ApiRequest<EmptyResponse> {
    if (value) {
      return createApiRequest("put", "/api/users/user/me/profile/social_media", {
        body: { [key]: value },
        authenticate: true,
      })
    } else {
      return createApiRequest("delete", "/api/users/user/me/profile/social_media", {
        query: { keys: key },
        authenticate: true,
      })
    }
  },

  /**
   * Set full name for a user
   * @param id the id of the user to set full name for
   * @param fullName the full name to set to
   */
  setFullName: (id: string, fullName: string): ApiRequest<EmptyResponse> =>
    createApiRequest("put", `/api/users/user/${id}`, {
      body: Transformers.camelToSnake({ fullName: fullName || "" }),
      authenticate: true,
      validErrors: [422],
    }),

  /**
   * Set full name for a user
   * @param id the id of the user to set full name for
   * @param login the login to set to
   */
  setName: (id: string, login: string): ApiRequest<EmptyResponse> =>
    createApiRequest("put", `/api/users/user/${id}`, {
      body: { login },
      authenticate: true,
      validErrors: [400],
    }),
}
