import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { AxiosRequestConfig } from "axios"
import {
  Authentication,
  AuthenticationForbiddenError,
  CredentialsRejectedError,
  UnhandledResponseError,
} from "./authentication"
import { AuthenticationStore, AuthenticationStoreModel } from "../../models/authentication-store"

const LOG = true

/**
 * Exponential backoff, with some sane maximum time
 * @param retryCount number of retries, determines wait time
 */
const backoff = async (retryCount: number) =>
  new Promise(resolve => setTimeout(resolve, Math.min(10000, 0.05 * 2 ** retryCount)))

/**
 * Manages all requests to the API.
 */
export class Api {
  static nextRequestId = 0
  apisauce!: ApisauceInstance
  config: ApiConfig
  authenticationStore: AuthenticationStore
  inFlight: Set<string>

  /**
   * Creates the api.
   * @param config The configuration to use.
   * @param authenticationStore the AuthenticationStore
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.authenticationStore = AuthenticationStoreModel.create({})
    this.config = config
    this.inFlight = new Set<string>()
  }

  /**
   * Prepares Api, connecting to AuthenticationStore
   */
  setup(authenticationStore: AuthenticationStore) {
    this.authenticationStore = authenticationStore
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
      },
    })
  }

  /** Returns the RequestFunction for a given RequestMethod */
  getRequestFunction<T>(method: Types.RequestMethod): Types.RequestFunction<T> {
    switch (method) {
      case "get":
        return this.apisauce.get
      case "post":
        return this.apisauce.post
      case "delete":
        return this.apisauce.delete
      case "put":
        return this.apisauce.put
    }
  }

  /**
   * Makes a request, with optional request data (params or body, depending on type)
   * If given `authenticate` in the config, executes internally with Authentication until failure
   * Automatically retries requests until they are canceled, either with token or `shouldCancel`
   */
  async request<T>(
    method: Types.RequestMethod,
    url: string,
    requestConfig: Types.RequestConfig = {},
  ): Promise<Types.Response<T>> {
    const requestId = (Api.nextRequestId += 1)
    const { body } = requestConfig
    const log = (message: string, ...args: any[]) =>
      LOG && console.debug(`Api [${requestId}] (${method} ${url}) ${message}`, ...args)
    log("Request", requestConfig)
    const executeRequest = async (): Promise<ApiResponse<T>> => {
      const cancelToken = requestConfig.cancel ? requestConfig.cancel.token : undefined
      const axiosConfig: AxiosRequestConfig = {
        cancelToken,
        validateStatus: requestConfig.validateStatus,
        headers: requestConfig.headers,
      }
      const authenticatedRequest = (): Promise<ApiResponse<T> | undefined> => {
        const requestFunction = this.getRequestFunction<T>(method)
        if (requestConfig.authenticate) {
          return Authentication.execute<T>(this, this.authenticationStore, axiosConfig, authenticatedConfig =>
            requestFunction(url, body, authenticatedConfig),
          ).catch(err => {
            if (err instanceof CredentialsRejectedError) return undefined
            throw err
          })
        }
        return requestFunction(url, body, axiosConfig)
      }
      let retryCount = -1
      const shouldCancel = () => requestConfig.shouldCancel && requestConfig?.shouldCancel()
      while (true) {
        if (shouldCancel()) return new Promise(() => log("Cancel for shouldCancel before request"))
        let apiResponse: ApiResponse<T> | undefined
        try {
          apiResponse = await authenticatedRequest()
        } catch (error) {
          log("Error", error)
          await backoff((retryCount += 1))
          continue
        }
        if (!apiResponse) {
          log("Unable to run authenticated request, failing")
          throw new AuthenticationForbiddenError()
        }
        if (shouldCancel()) return new Promise(() => log("Cancel for shouldCancel before response"))
        if (apiResponse.ok) {
          log("OK", apiResponse.data)
          return apiResponse
        } else if (apiResponse.status) {
          if (requestConfig.validateStatus && requestConfig.validateStatus(apiResponse.status)) {
            log("Accept status as valid", apiResponse.status)
            return apiResponse
          } else if (apiResponse.status === 403) {
            throw new AuthenticationForbiddenError()
          } else if (apiResponse.status < 500) {
            if (apiResponse.status === 400) {
              log("Unexpected Bad Request", apiResponse.data)
            } else {
              log("Unexpected status", apiResponse.status)
            }
            throw new UnhandledResponseError(`Unexpected status  ${apiResponse.status} for request ${url}`)
          }
        } else {
          if (cancelToken?.reason) {
            return new Promise(() => log("Canceled for cancelToken", cancelToken.reason))
          } else {
            await backoff((retryCount += 1))
          }
        }
      }
    }
    return executeRequest().then(response => {
      if (!response.status) throw new UnhandledResponseError(`Unexpected status  ${response.status} for request ${url}`)
      return {
        ok: response.ok,
        data: response.data!,
        status: response.status,
        headers: {},
      }
    })
  }
}
