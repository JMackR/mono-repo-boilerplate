import moment from "moment"
import React, { useEffect, useState } from "react"
import { Linking, Platform } from "react-native"
import { WebView as RNWebview, WebViewNavigation } from "react-native-webview"
import { WebViewSourceUri } from "react-native-webview/lib/WebViewTypes"
import { useWebViewContext } from "./webview-api.native"
import { WebViewProps } from "./webview-props.native"
import CookieManager from "@react-native-community/cookies"
import { getHostName, getDomain } from "shared-lib/utilities/url/url-utils"

const DEBUG = false

export const WebView = (props: WebViewProps) => {
  const { requestHeaders, baseUrl, hostNameRequestHeaderBlackList, ...restProps } = props

  const { setWebview, setInternalRequest, currentUri, setUri, setTitle } = useWebViewContext()

  const urlWhitelist = props.urlWhitelist || getDomain(baseUrl)
  const shouldPassRequestHeader =
    currentUri &&
    hostNameRequestHeaderBlackList &&
    hostNameRequestHeaderBlackList.includes(getHostName(currentUri) as string)
  const unauthenticatedSource: WebViewSourceUri = {
    ...props.source,
    uri: currentUri,
  }

  const buildSourceObject: () => Promise<WebViewSourceUri> = async () => {
    let s: WebViewSourceUri
    if (shouldHandleRequest(currentUri) && requestHeaders && !shouldPassRequestHeader) {
      const sessionId = requestHeaders["X--AUTH-TOKEN"]
      // build expected headers
      s = {
        ...props.source,
        headers: requestHeaders as {},
        uri: currentUri,
      } as WebViewSourceUri

      if (sessionId) {
        // this stores django token authentication as a cookie to be expired in 1 day
        // this is required for any of our legacy web services that depend on django token authentication.
        // specifically for Android: on iOS cookie sharing works properly with @react-native-community/cookies
        const expires = moment()
          .add(1, "d")
          .toDate()
          .toUTCString()

        // this is imported at run time to avoid importing it above and breaking jest tests...
        CookieManager.setFromResponse(baseUrl, `sessionid=${sessionId}; path=/; expires=${expires}; secure; HttpOnly`)
      }
    } else {
      s = unauthenticatedSource
    }
    return s
  }

  const [sourceState, setSourceState] = useState<WebViewSourceUri>(unauthenticatedSource)

  useEffect(() => {
    buildSourceObject().then(s => {
      setSourceState(s)
    })
  }, [currentUri])

  const shouldHandleRequest = (url?: string) => {
    // make sure the request has a valid url
    if (url !== undefined) {
      // handle url whitelisting, extracting the domain and matching against the white list.
      if (urlWhitelist) {
        const requestDomain = getDomain(url)
        if (requestDomain && !urlWhitelist.includes(requestDomain)) {
          return false
        }
      }

      return true
    }
    return false
  }

  /**
   * to properly pass custom headers, we need to navigate pages ourselves at this layer, instead of the webview doing it
   * https://github.com/react-native-community/react-native-webview/blob/master/docs/Guide.md#Setting-Custom-Headers
   * @param request
   */
  // tslint:disable: no-console
  const handleOnShouldStartLoadWithRequest = (request: WebViewNavigation): boolean => {
    if (DEBUG) {
      console.log("handleOnShouldStartLoadWithRequest", request, "currentUri", currentUri)
    }

    // android doesn't receive mainDocumentURL
    const checkUrl = Platform.OS === "android" ? request.url : request.mainDocumentURL

    // if match fails, we simply forward request to platform web browser
    if (!shouldHandleRequest(checkUrl)) {
      if (DEBUG) {
        console.warn("not handling request, passing to browser", request)
      }
      Linking.openURL(request.url)
      return false
    }
    switch (request.navigationType) {
      case "click":
        // If we're loading the current URI, allow it to load
        if (request.url === currentUri) {
          return true
        }
        // We're loading a new URL -- change state first
        setUri(request.url)
        return false
      default:
        return true
    }
  }

  const handleNavigationStateChange = (request: WebViewNavigation) => {
    if (DEBUG) {
      console.log("handleNavigationStateChange", request)
    }
    // navigation state change doesn't include a mainDocumentURL
    if (shouldHandleRequest(request.url)) {
      if (!props.title) {
        // adopt title if one is not set in props`
        setTitle(request.title)
      }

      // this is what drives the forward/back logic of the top left header button
      setInternalRequest(request)
    }
  }

  return (
    <RNWebview
      {...restProps}
      source={sourceState}
      ref={ref => {
        setWebview(ref)
      }}
      sharedCookiesEnabled={true}
      domStorageEnabled={true}
      javaScriptEnabled={true}
      onShouldStartLoadWithRequest={handleOnShouldStartLoadWithRequest}
      onNavigationStateChange={handleNavigationStateChange}
      testID={restProps.testID || "uc-lib.web-view"}
    />
  )
}
