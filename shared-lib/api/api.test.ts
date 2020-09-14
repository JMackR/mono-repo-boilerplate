import { RootStore, RootStoreModel } from "../../models/root-store"
import { MockEnvironment } from "../../../test/models/mock-environment"
import { AxiosRequestConfig } from "axios"
import { AccessToken } from "./authentication"
import { Alert } from "react-native"
import { Api as ApiType } from "./api"
import { AuthenticationTokenModel } from "../../models/authentication-token"

// TODO Finish testing this, in the future

const { Api } = jest.requireActual("./api")

const userId = "test-user-id"

const createToken = (token: string) =>
  AuthenticationTokenModel.create({ token, expiresAt: 666, userId })

interface MockResponse {
  ok: true
  status: 200
  headers: {}
}

const axiosConfig: AxiosRequestConfig = {
  cancelToken: undefined,
  validateStatus: undefined,
  headers: { Authorization: "Bearer aY0norDo0aDznzskIeg1Og" },
}

const env = MockEnvironment()

let rootStore: RootStore
let api: ApiType
beforeEach(async () => {
  rootStore = RootStoreModel.create({}, env)
  api = new Api()
  await api.setup(rootStore.authenticationStore)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe("setup", () => {
  it("creates properly", () => {
    expect(api.authenticationStore).toEqual(rootStore.authenticationStore)
    expect(api.apisauce).toBeDefined()
  })
})

describe("getRequestFunction", () => {
  it("returns get", () => {
    expect(api.getRequestFunction("get")).toEqual(api.apisauce.get)
  })
  it("returns post", () => {
    expect(api.getRequestFunction("post")).toEqual(api.apisauce.post)
  })
  it("returns delete", () => {
    expect(api.getRequestFunction("delete")).toEqual(api.apisauce.delete)
  })
  it("returns put", () => {
    expect(api.getRequestFunction("put")).toEqual(api.apisauce.put)
  })
})

xdescribe("authenticate", () => {
  it("defaults to no authentication", () => {
    jest.spyOn(api.apisauce, "get")
    api.request<MockResponse>("get", "/test/fake/path")
    expect(api.apisauce.get).toHaveBeenCalledWith("/test/fake/path", undefined, {
      ...axiosConfig,
      headers: undefined,
    })
  })
  it("requests w/ authentication", async () => {
    jest.spyOn(api.apisauce, "get")
    jest.spyOn(AccessToken, "get").mockResolvedValue(createToken("aY0norDo0aDznzskIeg1Og"))
    await api.request<MockResponse>("get", "/test/fake/path", {
      authenticate: true,
    })
    expect(api.apisauce.get).toHaveBeenCalledWith("/test/fake/path", undefined, axiosConfig)
  })
})

xdescribe("executeRequest", () => {
  it("catches and returns not okay when status is undefined", async () => {
    jest
      .spyOn(api.apisauce, "get")
      .mockResolvedValue({ ok: true, problem: null, originalError: null })
    expect(await api.request<MockResponse>("get", "/test/fake/path")).toEqual({
      ok: false,
    })
  })
  it("shows alert when authentication is forbidden", async () => {
    jest.spyOn(api.apisauce, "get").mockResolvedValue({
      ok: false,
      problem: "CLIENT_ERROR",
      originalError: { config: {}, name: "test-name", message: "test-message" },
      status: 403,
    })
    expect(await api.request<MockResponse>("get", "/test/fake/path")).toEqual({
      ok: false,
    })
  })
  it("allows validation of status code", async () => {
    jest.spyOn(api.apisauce, "get").mockResolvedValue({
      ok: false,
      problem: "CLIENT_ERROR",
      originalError: { config: {}, name: "test-name", message: "test-message" },
      status: 409,
    })
    expect(
      await api.request<MockResponse>("get", "/test/fake/path", {
        validateStatus: () => true,
      }),
    ).toEqual({
      ok: true,
      data: undefined,
      status: 409,
      headers: {},
    })
  })
  it("handles error codes less than 500", async () => {
    jest.spyOn(api.apisauce, "get").mockResolvedValue({
      ok: false,
      problem: "CLIENT_ERROR",
      originalError: { config: {}, name: "test-name", message: "test-message" },
      status: 409,
    })
    expect(await api.request<MockResponse>("get", "/test/fake/path")).toEqual({
      ok: false,
    })
  })
  it("retries", async () => {
    jest.spyOn(api.apisauce, "get").mockResolvedValue({
      ok: false,
      problem: "SERVER_ERROR",
      originalError: { config: {}, name: "test-name", message: "test-message" },
      status: 500,
    })
    expect(
      await api.request<MockResponse>("get", "/test/fake/path", {
        maxRetries: 1,
      }),
    ).toEqual({
      ok: false,
    })
  })
  it("returns a valid hash", async () => {
    jest.spyOn(api.apisauce, "get").mockResolvedValue({
      ok: false,
      problem: "CLIENT_ERROR",
      originalError: { config: {}, name: "test-name", message: "test-message" },
      status: 403,
    })
    jest.spyOn(Alert, "alert")
    expect(await api.request<MockResponse>("get", "/test/fake/path")).toEqual({
      ok: false,
    })
    // expect(Alert.alert).toHaveBeenCalledWith("TODO", "Refused")
  })
})
