import React, { createContext, useState, useContext, RefObject } from "react"
import { WebView, WebViewNavigation } from "react-native-webview"
import { WebViewProps } from "./webview-props.native"

export interface WebViewContextProviderProps {
  children?: React.ReactNode
  /**
   * props to pass down to the web view.
   */
  webViewProps: WebViewProps
}

export interface WebContextProps {
  setWebview: (webview: WebView) => void
  webview?: RefObject<WebView>
  goBack: () => void
  canGoBack: () => boolean
  setInternalRequest: (request: WebViewNavigation) => void
  title: string | undefined
  setTitle: (title: string) => void
  currentUri: string
  setUri: (uri: string) => void
}
const defaultContextProps: WebContextProps = {
  setWebview: (webview: WebView) => {},
  webview: undefined,
  goBack: () => {},
  canGoBack: () => true,
  setInternalRequest: request => {},
  title: undefined,
  setTitle: (title: string) => {},
  currentUri: "",
  setUri: () => {},
}
const WebViewContext = createContext(defaultContextProps)
export const useWebViewContext = () => useContext(WebViewContext)

export const WebViewAPI = (props: WebViewContextProviderProps) => {
  const [internalRequest, setInternalRequest] = useState<WebViewNavigation | undefined>(undefined)
  const [webview, setWebview] = useState<WebView>()

  const [title, setTitle] = useState<string | undefined>(props.webViewProps.title ? props.webViewProps.title : undefined)

  const [currentUri, setUri] = useState<string>(props.webViewProps.source.uri)

  const goBack = () => {
    internalRequest && internalRequest.canGoBack && webview?.goBack()
  }

  const canGoBack = () => {
    return (internalRequest && internalRequest.canGoBack) || false
  }

  const webViewProps: WebViewProps = props.webViewProps

  return (
    <WebViewContext.Provider
      value={{
        ...webViewProps,
        currentUri,
        setUri,
        title,
        setTitle,
        canGoBack,
        goBack,
        setWebview,
        webview,
        setInternalRequest,
      }}
    >
      {props.children}
    </WebViewContext.Provider>
  )
}
