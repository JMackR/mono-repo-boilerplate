/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /** The API host */
  host: string
  /** Full URL of the api */
  url: string
  /** Milliseconds before we timeout the request */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  host: __DEV__ ? "test.redibs.network" : "redibs.com",
  url: __DEV__ ? "https://test.redibs.network" : "https://redibs.com",
  timeout: 10000,
}
