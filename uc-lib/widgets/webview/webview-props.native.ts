import { WebViewSourceUri } from "react-native-webview/lib/WebViewTypes"
import { Colors, TextColors } from "uc-lib/themes"

export interface WebViewProps {
  source: WebViewSourceUri

  /**
   * Insert headers object here, from getWebHeaders().
   * Necessary for separation of webview from shared.
   */
  requestHeaders?: {}

  /**
   * baseUrl for setting cookie and validate opening url
   */
  baseUrl: string

  /**
   * If no title is provided, the web page's title is displayed
   */
  title?: string

  /**
   * A list of host name that dont need to pass in request headers e.g authentication
   */
  hostNameRequestHeaderBlackList?: string[]

  /**
   * Provide a specific list of URL _domains_ (excluding subdomains) which are allowed
   * to be handled in this webview. Anything not batching here will be redirected to
   * the native default browser.
   *
   * Not including a list will default to a built in safe list.
   */
  urlWhitelist?: string[] | null

  /**
   * override the header background color
   */
  headerBackgroundColor?: keyof Colors

  /**
   * override the header text and icon color
   */
  textAndIconTint?: keyof TextColors

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
