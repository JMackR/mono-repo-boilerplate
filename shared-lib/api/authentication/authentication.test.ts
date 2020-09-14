import { Authentication } from "./authentication"
import { Api } from "../api"
import { AxiosRequestConfig } from "axios"
import { mockResponse } from "../../../../test/__mocks__/api"
import { AccessToken } from "./access-token"
import { AuthenticationForbiddenError } from "./errors"
import { AuthenticationStoreModel } from "../../../models/authentication-store"
import { AuthenticationTokenModel } from "../../../models/authentication-token"

const api = new Api()
const config: AxiosRequestConfig = { maxRedirects: 123, headers: { Custom: 666 } }
const executeRequest = jest.fn()

const responseOk = mockResponse({})
const response400 = mockResponse({}, { status: 400 })
const response401 = mockResponse({}, { status: 401 })
const response403 = mockResponse({}, { status: 403 })

const createStore = () => AuthenticationStoreModel.create({})
const token = (token: string) =>
  AuthenticationTokenModel.create({ token, expiresAt: 666, userId: "test-user-id" })

afterEach(() => {
  jest.clearAllMocks()
})

describe("execute", () => {
  it("executes the request with access token, resolves after 200", async () => {
    jest.spyOn(AccessToken, "get").mockResolvedValue(token("test_access"))
    executeRequest.mockResolvedValue(responseOk)
    expect(await Authentication.execute(api, createStore(), config, executeRequest)).toEqual(
      responseOk,
    )
    expect(executeRequest).toHaveBeenCalledWith({
      maxRedirects: 123,
      headers: { Custom: 666, Authorization: "Bearer test_access" },
    })
  })

  it("executes the request with access token, resolves with a 400", async () => {
    jest.spyOn(AccessToken, "get").mockResolvedValue(token("test_access"))
    executeRequest.mockResolvedValue(response400)
    expect(await Authentication.execute(api, createStore(), config, executeRequest)).toEqual(
      response400,
    )
    expect(executeRequest).toHaveBeenCalledWith({
      maxRedirects: 123,
      headers: { Custom: 666, Authorization: "Bearer test_access" },
    })
  })

  it("clears the access token, then retries, after response 401, then 200", async () => {
    const store = createStore()
    jest.spyOn(store, "setAccessToken")
    jest.spyOn(AccessToken, "get").mockResolvedValueOnce(token("test_access_1"))
    jest.spyOn(AccessToken, "get").mockResolvedValueOnce(token("test_access_2"))
    executeRequest.mockResolvedValueOnce(response401)
    executeRequest.mockResolvedValueOnce(responseOk)
    expect(await Authentication.execute(api, store, config, executeRequest)).toEqual(responseOk)
    expect(store.setAccessToken).toHaveBeenCalledWith(undefined)
    expect(executeRequest).toHaveBeenNthCalledWith(1, {
      maxRedirects: 123,
      headers: { Custom: 666, Authorization: "Bearer test_access_1" },
    })
    expect(executeRequest).toHaveBeenNthCalledWith(2, {
      maxRedirects: 123,
      headers: { Custom: 666, Authorization: "Bearer test_access_2" },
    })
  })

  it("throws AuthenticationForbiddenError on 403", () => {
    jest.spyOn(AccessToken, "get").mockResolvedValue(token("test_access"))
    executeRequest.mockResolvedValue(response403)
    return expect(
      Authentication.execute(api, createStore(), config, executeRequest),
    ).rejects.toThrow(AuthenticationForbiddenError)
  })
})
