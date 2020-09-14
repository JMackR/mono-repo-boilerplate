import moment from "moment"
import R from "ramda"
import uuid from "uuid/v4"

type ApiRequestMethod = "get" | "post" | "put" | "delete"

interface ApiRequestOptions {
  /** Custom request ID */
  id?: string
  /** Optional body, expects serializable object */
  body?: Readonly<Record<string, any>>
  /** Query parameters */
  query?: Readonly<Record<string, string | number | undefined>>
  /** Custom deduplication key */
  deduplicationOverride?: string
  /** Whether to authenticate as the user */
  authenticate?: boolean
  /** An optional list of status codes to consider as valid errors */
  validErrors?: number[]
}

export interface ApiRequest<ResponseType extends object> extends ApiRequestOptions {
  /** HTTP method */
  method: ApiRequestMethod
  /** The URL path (do not include parameters) */
  endpoint: string
  /** The request ID */
  id: string
  /** Creation timestamp */
  created: moment.Moment
  /**
   * @returns the URL path, building query parameters
   * */
  url: string
  /**
   * @returns the key for deduplication, undefined if no deduplication
   * The value of deduplicationOverride is used if set
   * If not set, the key is equal to the URL for GET requests
   * There is no default deduplication for POST/PUT/DELETE's
   */
  deduplicationKey?: string
}

const createUrl = (endpoint: string, options: ApiRequestOptions): string => {
  if (!options.query) return endpoint
  const params: string[] = []
  R.forEachObjIndexed((value, key) => {
    if (value) {
      params.push(`${key}=${value}`)
    }
  }, options.query)
  return `${endpoint}?${params.sort().join("&")}`
}

/**
 * Creates an ApiRequest, associated with a response type
 * @param method the HTTP method
 * @param endpoint the endpoint path
 * @param options the options
 */
export function createApiRequest<ResponseType extends object>(
  method: ApiRequestMethod,
  endpoint: string,
  { id, ...options }: ApiRequestOptions = {},
): Readonly<ApiRequest<ResponseType>> {
  const created = moment()
  const url = createUrl(endpoint, options)
  const deduplicationKey = options.deduplicationOverride || (method === "get" && url) || undefined
  return {
    id: id || uuid(),
    method,
    endpoint,
    ...options,
    created,
    url,
    deduplicationKey,
  }
}
