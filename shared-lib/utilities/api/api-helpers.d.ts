import { HEADER_API_VALID_KEYS, HEADER_WEB_VALID_KEYS } from "./api-constants"

declare type ApiHeadersKeys = typeof HEADER_API_VALID_KEYS[number]

export type ApiHeadersProps = {
  [key in ApiHeadersKeys]?: string
}

declare type WebHeadersKeys = typeof HEADER_WEB_VALID_KEYS[number]

export type WebHeadersProps = {
  [key in WebHeadersKeys]?: string
}
