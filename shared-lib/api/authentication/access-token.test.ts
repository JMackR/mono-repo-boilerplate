import moment from "moment"
import { AccessToken } from "./access-token"
import { RefreshToken } from "./refresh-token"
import { Api } from "../api"
import { mockResponse } from "../../../../test/__mocks__/api"
import { AuthenticationForbiddenError, UnexpectedAuthenticationError } from "./errors"
import { AuthenticationTokenModel } from "../../../models/authentication-token"
import { AuthenticationStore, AuthenticationStoreModel } from "../../../models/authentication-store"
import { AccessTokenResponse } from "../login"
import { mocked } from "ts-jest/utils"
import { destroy } from "mobx-state-tree"

const api = new Api()
const userId = "test-user-id"

const createToken = (token: string) =>
  AuthenticationTokenModel.create({ token, expiresAt: 666, userId })

beforeEach(() => {
  jest.spyOn(RefreshToken, "get").mockResolvedValue(createToken("test_refresh"))
  jest.spyOn(api, "request")
})

afterEach(() => {
  jest.clearAllMocks()
})

const createStore = (accessValid: boolean, refreshValid: boolean) => {
  const accessToken = createToken("test_token_value")
  jest.spyOn(accessToken, "isValid").mockReturnValue(accessValid)
  const refreshToken = createToken("test_refresh")
  jest.spyOn(refreshToken, "isValid").mockReturnValue(refreshValid)
  return AuthenticationStoreModel.create({ accessToken, refreshToken, userId })
}

describe("get", () => {
  describe("valid", () => {
    it("resolves with stored access token", async () => {
      const store = createStore(true, true)
      expect((await AccessToken.get(api, store)).token).toEqual("test_token_value")
      expect(api.request).not.toHaveBeenCalled()
    })
    it("requests a new access token if forcing renew", async () => {
      const store = createStore(true, true)
      jest.spyOn(api, "request").mockResolvedValue(
        mockResponse<AccessTokenResponse>({ jwt: "new_access", expiresIn: 666 }),
      )

      expect((await AccessToken.get(api, store, true)).token).toEqual("new_access")

      const token = store.accessToken && store.accessToken.token
      expect(token).toEqual("new_access")
      const expiresAt = store.accessToken && store.accessToken.expiresAt
      expect(expiresAt).toBeGreaterThanOrEqual(moment().unix() + 666 - 1)
      expect(expiresAt).toBeLessThanOrEqual(moment().unix() + 666)
      expect(api.request).toHaveBeenCalledWith("post", "/api/login/access", {
        headers: { Authorization: "Bearer test_refresh" },
        shouldCancel: expect.any(Function),
        validateStatus: expect.any(Function),
      })
    })
  })
  describe("shouldCancel", () => {
    let shouldCancel: () => boolean
    let store: AuthenticationStore
    beforeEach(async () => {
      store = createStore(false, true)
      jest.spyOn(api, "request").mockResolvedValue(
        mockResponse<AccessTokenResponse>({ jwt: "new_access", expiresIn: 666 }),
      )
      await AccessToken.get(api, store)
      expect(api.request).toHaveBeenCalledWith("post", "/api/login/access", {
        headers: { Authorization: "Bearer test_refresh" },
        shouldCancel: expect.any(Function),
        validateStatus: expect.any(Function),
      })
      shouldCancel = mocked(api.request).mock.calls[0][2]!.shouldCancel!
    })

    it("returns false if the authenticationStore has not changed", async () => {
      expect(shouldCancel()).toEqual(false)
    })
    it("returns true if the authenticationStore is now dead", () => {
      destroy(store)
      expect(shouldCancel()).toEqual(true)
    })
    it("returns true if userId has changed", () => {
      store.setUserId("other-user-id")
      expect(shouldCancel()).toEqual(true)
    })
  })
  describe("invalid", () => {
    it("requests a new access token, using the refresh token, saves", async () => {
      const store = createStore(false, true)
      jest.spyOn(api, "request").mockResolvedValue(
        mockResponse<AccessTokenResponse>({ jwt: "new_access", expiresIn: 666 }),
      )

      expect((await AccessToken.get(api, store)).token).toEqual("new_access")

      const token = store.accessToken && store.accessToken.token
      expect(token).toEqual("new_access")
      const expiresAt = store.accessToken && store.accessToken.expiresAt
      expect(expiresAt).toBeGreaterThanOrEqual(moment().unix() + 666 - 1)
      expect(expiresAt).toBeLessThanOrEqual(moment().unix() + 666)
      expect(api.request).toHaveBeenCalledWith("post", "/api/login/access", {
        headers: { Authorization: "Bearer test_refresh" },
        shouldCancel: expect.any(Function),
        validateStatus: expect.any(Function),
      })
    })
    it("throws AuthenticationForbiddenError on 403", () => {
      const store = createStore(false, true)
      jest.spyOn(api, "request").mockResolvedValue(mockResponse({}, { status: 403 }))
      return expect(AccessToken.get(api, store))
        .rejects.toThrow(AuthenticationForbiddenError)
        .then(() => {
          expect(api.request).toHaveBeenCalledWith("post", "/api/login/access", {
            headers: { Authorization: "Bearer test_refresh" },
            shouldCancel: expect.any(Function),
            validateStatus: expect.any(Function),
          })
        })
    })
    it("deletes RefreshToken and tries again on 401", async () => {
      const store = createStore(false, true)
      jest
        .spyOn(api, "request")
        .mockResolvedValueOnce(mockResponse({}, { status: 401 }))
        .mockResolvedValue(
          mockResponse<AccessTokenResponse>({ jwt: "new_access", expiresIn: 666 }),
        )

      expect((await AccessToken.get(api, store)).token).toEqual("new_access")
      expect(api.request).toHaveBeenCalledWith("post", "/api/login/access", {
        headers: { Authorization: "Bearer test_refresh" },
        shouldCancel: expect.any(Function),
        validateStatus: expect.any(Function),
      })
    })
    it("rejects with UnexpectedAuthenticationError for unexpected codes", () => {
      const store = createStore(false, true)
      jest.spyOn(api, "request").mockResolvedValue(mockResponse({}, { status: 400 }))
      return expect(AccessToken.get(api, store))
        .rejects.toThrow(UnexpectedAuthenticationError)
        .then(() => {
          expect(api.request).toHaveBeenCalledWith("post", "/api/login/access", {
            headers: { Authorization: "Bearer test_refresh" },
            shouldCancel: expect.any(Function),
            validateStatus: expect.any(Function),
          })
        })
    })
  })
})
