import DeviceInfo from "react-native-device-info"
import { getCurrentLocale } from "../../utilities/i18n"
import { OuApiHeadersProps, OuWebHeadersProps } from "./api-helpers.d"
import { getAuthTokens } from "../../providers/auth-provider/auth-provider-helpers.native"
import {
  HEADER_DEVICE_TOKEN,
  HEADER_JWT_TOKEN,
  HEADER_SESSION_TOKEN,
  HEADER_USER_AGENT,
  HEADER_WEB_USER_AGENT,
} from "./api-constants"

export const getOuUserAgent = () => {
  return `redibs/${DeviceInfo.getVersion()} (build: ${DeviceInfo.getBuildNumber()}; ${DeviceInfo.getDeviceId()}; ${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}; ${getCurrentLocale()})`
}

export const getOuApiHeaders = () => {
  try {
    // TODO: CLIENT-3859 Should read this from Settings in case of migration
    const deviceId = DeviceInfo.getUniqueId()
    const userAgent = getOuUserAgent()
    const headers: OuApiHeadersProps = {}
    headers[HEADER_DEVICE_TOKEN] = deviceId
    headers[HEADER_USER_AGENT] = userAgent

    const authTokens = getAuthTokens()
    if (!!authTokens.jwtToken) {
      headers[HEADER_JWT_TOKEN] = `Bearer ${authTokens.jwtToken}`
    }
    if (!!authTokens.djangoToken) {
      headers[HEADER_SESSION_TOKEN] = `${authTokens.djangoToken}`
    }
    return headers
  } catch {
    return {}
  }
}

export const getOuWebHeaders = () => {
  try {
    const userAgent = getOuUserAgent()
    const headers: OuWebHeadersProps = {
      ...getOuApiHeaders(),
    }
    headers[HEADER_WEB_USER_AGENT] = userAgent
    return headers
  } catch {
    return {}
  }
}
