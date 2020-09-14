/**
 * Used for regex domain matching
 */
const HOSTNAME_INDEX = 2

/**
 * Helper function to extract host name from a URL
 * @param url
 */
export const getHostName = (url: string) => {
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
  if (
    match !== null &&
    match.length > HOSTNAME_INDEX &&
    typeof match[HOSTNAME_INDEX] === "string" &&
    match[HOSTNAME_INDEX].length > 0
  ) {
    return match[HOSTNAME_INDEX]
  } else {
    return null
  }
}

/**
 * Extract the domain from a URL.
 *
 * Handles .co.uk urls, but that's the only edge case it covers right now.
 * @param url
 */
export const getDomain = (url: string) => {
  const hostName = getHostName(url)
  let domain = hostName

  if (hostName !== null) {
    const parts = hostName.split(".").reverse()

    if (parts !== null && parts.length > 1) {
      domain = parts[1] + "." + parts[0]

      if (hostName.toLowerCase().indexOf(".co.uk") !== -1 && parts.length > HOSTNAME_INDEX) {
        domain = parts[HOSTNAME_INDEX] + "." + domain
      }
    }
  }

  return domain
}
