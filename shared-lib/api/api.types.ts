import { AxiosRequestConfig, CancelTokenSource } from "axios"
import { ApiResponse } from "apisauce"

/** Configures a request */
export interface RequestConfig {
  /**
   * The request body
   */
  body?: any
  /**
   * An optional CancelTokenSource
   */
  cancel?: CancelTokenSource
  /**
   * Whether to wrap with automatic authentication
   */
  authenticate?: boolean
  /**
   * Uses a fixed authentication token value, rather than automatic
   * @deprecated set headers instead
   */
  authentication?: string
  /**
   * TODO No callbacks permitted in store, replace w/ some Set/List of OK's outside 200?
   * A function that determines whether to resolve with a status
   * By default (undefined) this will accept 200-299
   * @param status
   */
  validateStatus?: (status: number) => boolean
  /**
   * Whether to disable auto retry
   */
  noRetry?: boolean
  /**
   * Header key/values
   */
  headers?: {}
  /**
   * Configures maximum number of retries. If undefined, default (10) value is used
   * If not a positive number, retries indefinitely
   */
  maxRetries?: number
  /**
   * An optional callback that will be invoked each attempt
   * If the function returns true, the request will be canceled
   */
  shouldCancel?: () => boolean
}

/** Supported HTTP request types */
export type RequestMethod = "get" | "post" | "put" | "delete"

export type RequestFunction<T> = (
  url: string,
  args?: any,
  axiosConfig?: AxiosRequestConfig,
) => Promise<ApiResponse<T>>

export interface ResponseOk<T> {
  ok: true
  data: T
  status: number
  headers: {}
}

export interface ResponseError<T> {
  ok: false
  data?: T
  status?: number
  headers?: {}
}

export type Response<T> = ResponseOk<T> | ResponseError<T>

/**
 * Dispatching an API requires a response type, mainly for responses we do not need to process
 */
export type EmptyResponse = {}
