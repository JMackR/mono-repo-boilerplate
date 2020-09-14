import { parse, UrlWithParsedQuery } from "url"

export interface Url {
  protocol: string
  hostname: string
  pathname: string
  queryParams: { [key: string]: string | string[] }
}

export interface UrlFromString extends Url {
  fromString: string
}

const stringOrEmpty = (aString: string | null | undefined): string => {
  if (aString === undefined || aString == null) {
    return ""
  }

  return aString
}

export const urlFromString = (urlString?: string): UrlFromString => {
  if (urlString === undefined || urlString == null) {
    return {
      protocol: "",
      hostname: "",
      pathname: "",
      fromString: "",
      queryParams: {},
    }
  }

  const url: UrlWithParsedQuery = parse(urlString, true)

  return {
    protocol: stringOrEmpty(url.protocol),
    hostname: stringOrEmpty(url.hostname),
    pathname: stringOrEmpty(url.pathname),
    queryParams: url.query,
    fromString: urlString,
  }
}
