import { RefreshToken } from "./refresh-token"
import { mockResponse } from "../../../../test/__mocks__/api"
import {
  AuthenticationForbiddenError,
  CredentialsRejectedError,
  MissingCredentialsError,
  UnexpectedAuthenticationError,
} from "./errors"
import { AuthenticationStore, AuthenticationStoreModel } from "../../../models/authentication-store"
import { AuthenticationToken, AuthenticationTokenModel } from "../../../models/authentication-token"
import { CredentialsModel } from "../../../models/credentials"
import { AuthenticateResponse, RefreshTokenResponse } from "../login"
import moment from "moment"
import { Api } from "../api"
import { MockEnvironment } from "../../../../test/models/mock-environment"
import { Environment } from "../../../models/environment"
import { UserStore } from "../../../models/user-store"
import { mocked } from "ts-jest/utils"
import { destroy } from "mobx-state-tree"

const api = new Api()
const token = "test_refresh_token"
const userId = "test-user-id"

const createToken = (token: string) =>
  AuthenticationTokenModel.create({ token, expiresAt: 666, userId })

const authenticationResponse: AuthenticateResponse = {
  userId: "new_user",
  refreshToken: { expiresIn: 666666, jwt: "new_refresh" },
  accessToken: { expiresIn: 666, jwt: "new_access" },
}

let env: Environment
beforeEach(() => {
  jest.spyOn(api, "request")
  env = MockEnvironment({ authenticationStore: { userId: "local" }, userStore: {} })
  env.api = api
})

afterEach(() => {
  jest.clearAllMocks()
})

describe("get", () => {
  let authenticationStore: AuthenticationStore
  let userStore: UserStore
  let refreshToken: AuthenticationToken

  async function expectGetToken(expectedToken: RefreshTokenResponse, renew = false) {
    expect(await RefreshToken.get(api, authenticationStore, renew)).toEqual(
      expect.objectContaining({
        token: expectedToken.jwt,
      }),
    )
    expect(authenticationStore.refreshToken?.token).toEqual(expectedToken.jwt)
  }

  beforeEach(() => {
    userStore = env.rootStore.userStore
    jest.spyOn(userStore, "add")
  })

  describe("saved", () => {
    beforeEach(() => {
      refreshToken = createToken(token)
      authenticationStore = AuthenticationStoreModel.create({ userId, refreshToken }, env)
      jest.spyOn(refreshToken, "isValid").mockReturnValue(true)
    })

    it("resolves with a saved refresh token if the token is still valid", async () => {
      expect((await RefreshToken.get(api, authenticationStore)).token).toEqual("test_refresh_token")
      expect(refreshToken.isValid).toHaveBeenCalled()
      expect(api.request).not.toHaveBeenCalled()
    })

    it("does not change the local user ID", async () => {
      expect(authenticationStore.userId).toEqual(userId)
      await RefreshToken.get(api, authenticationStore)
      expect(api.request).not.toHaveBeenCalled()
      expect(authenticationStore.userId).toEqual(userId)
    })

    it("does not add the user", async () => {
      await RefreshToken.get(api, authenticationStore)
      expect(api.request).not.toHaveBeenCalled()
      expect(userStore.add).not.toHaveBeenCalled()
    })
  })

  describe("fetch", () => {
    beforeEach(() => {
      refreshToken = createToken("old_refresh")

      const credentials = CredentialsModel.create({ recoveryCode: "test_code" }, env)
      authenticationStore = AuthenticationStoreModel.create({ refreshToken, credentials }, env)

      jest.spyOn(authenticationStore, "setRefreshToken")

      jest
        .spyOn(api, "request")
        .mockResolvedValue(mockResponse<AuthenticateResponse>(authenticationResponse))
    })

    describe("invalid token", () => {
      beforeEach(() => {
        jest.spyOn(refreshToken, "isValid").mockReturnValue(false)
      })

      it("fetches a new token and saves it", async () => {
        await expectGetToken({ jwt: "new_refresh", expiresIn: 666666 })
        expect(refreshToken.isValid).toHaveBeenCalled()
        expect(api.request).toHaveBeenCalledWith(
          "post",
          "/api/login/authenticate",
          expect.anything(),
        )
      })

      it("adds the new local user", async () => {
        await expectGetToken({ jwt: "new_refresh", expiresIn: 666666 })
        expect(refreshToken.isValid).toHaveBeenCalled()
        expect(api.request).toHaveBeenCalledWith(
          "post",
          "/api/login/authenticate",
          expect.anything(),
        )
        expect(userStore.add).toHaveBeenCalledWith({ id: "new_user" })
      })

      describe("validateStatus", () => {
        let validateStatus: (status: number) => boolean
        beforeEach(async () => {
          await expectGetToken({ jwt: "new_refresh", expiresIn: 666666 })
          validateStatus = mocked(api.request).mock.calls[0][2]!.validateStatus!
        })
        it("returns true for 401", () => expect(validateStatus(401)).toEqual(true))
        it("returns true for 403", () => expect(validateStatus(403)).toEqual(true))
        it("returns false for 400", () => expect(validateStatus(400)).toEqual(false))
        it("returns false for 500", () => expect(validateStatus(500)).toEqual(false))
        it("returns false for 502", () => expect(validateStatus(502)).toEqual(false))
        it("returns false for 503", () => expect(validateStatus(503)).toEqual(false))
      })

      describe("shouldCancel", () => {
        let shouldCancel: () => boolean
        beforeEach(async () => {
          await expectGetToken({ jwt: "new_refresh", expiresIn: 666666 })
          shouldCancel = mocked(api.request).mock.calls[0][2]!.shouldCancel!
        })

        it("returns true if AuthenticationStore is dead", () => {
          destroy(authenticationStore)
          expect(shouldCancel()).toEqual(true)
        })

        it("returns false if userId has changed", () => {
          authenticationStore.setUserId("other")
          expect(shouldCancel()).toEqual(true)
        })
      })
    })

    describe("forced `renew` with valid token", () => {
      beforeEach(() => {
        jest.spyOn(refreshToken, "isValid").mockReturnValue(true)
      })

      it("fetches a new token", async () => {
        expect((await RefreshToken.get(api, authenticationStore)).token).toEqual("old_refresh")
        expect(refreshToken.isValid).toHaveBeenCalled()
        expect(api.request).not.toHaveBeenCalled()
        await expectGetToken({ jwt: "new_refresh", expiresIn: 666666 }, true)
        expect(api.request).toHaveBeenCalledWith(
          "post",
          "/api/login/authenticate",
          expect.anything(),
        )
      })
    })
  })

  describe("invalid", () => {
    it("fetches a new token using credentials, saves, if current is invalid", async () => {
      const refreshToken = createToken("old_refresh")
      jest.spyOn(refreshToken, "isValid").mockReturnValue(false)

      const credentials = CredentialsModel.create({ recoveryCode: "test_code" }, env)
      const authenticationStore = AuthenticationStoreModel.create(
        { refreshToken, credentials },
        env,
      )

      jest
        .spyOn(api, "request")
        .mockResolvedValue(mockResponse<AuthenticateResponse>(authenticationResponse))

      expect((await RefreshToken.get(api, authenticationStore)).token).toEqual("new_refresh")

      const token = authenticationStore.refreshToken && authenticationStore.refreshToken.token
      expect(token).toEqual("new_refresh")
      const expectedTime = moment().unix() + 666666
      const expiresAt =
        authenticationStore.refreshToken && authenticationStore.refreshToken.expiresAt
      expect(expiresAt).toBeGreaterThanOrEqual(expectedTime - 1)
      expect(expiresAt).toBeLessThanOrEqual(expectedTime + 1)

      expect(api.request).toHaveBeenCalledWith("post", "/api/login/authenticate", expect.anything())
    })

    describe("errors", () => {
      describe("valid credentials", () => {
        it("throws AuthenticationForbiddenError on 403", () => {
          const refreshToken = createToken("old_refresh")
          const credentials = CredentialsModel.create({ recoveryCode: "test_recovery_code" }, env)
          const authenticationStore = AuthenticationStoreModel.create(
            { refreshToken, credentials },
            env,
          )
          jest.spyOn(api, "request").mockResolvedValue(mockResponse({}, { ok: false, status: 403 }))
          return expect(RefreshToken.get(api, authenticationStore)).rejects.toThrow(
            AuthenticationForbiddenError,
          )
        })

        it("throws CredentialsRejectedError on 401", () => {
          const refreshToken = createToken("old_refresh")
          const credentials = CredentialsModel.create({ recoveryCode: "test_recovery_code" }, env)
          const authenticationStore = AuthenticationStoreModel.create(
            { refreshToken, credentials },
            env,
          )
          jest.spyOn(api, "request").mockResolvedValue(mockResponse({}, { ok: false, status: 401 }))
          return expect(RefreshToken.get(api, authenticationStore)).rejects.toThrow(
            CredentialsRejectedError,
          )
        })

        it("throws UnexpectedAuthenticationError on unexpected codes", () => {
          const refreshToken = createToken("old_refresh")
          const credentials = CredentialsModel.create({ recoveryCode: "test_recovery_code" }, env)
          const authenticationStore = AuthenticationStoreModel.create(
            { refreshToken, credentials },
            env,
          )
          jest.spyOn(api, "request").mockResolvedValue(mockResponse({}, { ok: false, status: 400 }))
          return expect(RefreshToken.get(api, authenticationStore)).rejects.toThrow(
            UnexpectedAuthenticationError,
          )
        })
      })

      it("throws MissingCredentialsError if credentials are missing", async () => {
        const refreshToken = createToken("old_refresh")
        const credentials = CredentialsModel.create({}, env)
        const authenticationStore = AuthenticationStoreModel.create(
          { refreshToken, credentials },
          env,
        )
        return expect(RefreshToken.get(api, authenticationStore))
          .rejects.toThrow(MissingCredentialsError)
          .then(() => {
            expect(api.request).not.toHaveBeenCalled()
          })
      })
    })
  })
})
