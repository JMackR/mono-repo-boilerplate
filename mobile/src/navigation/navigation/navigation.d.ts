import { Url } from "../../ouurl/ouurl"
import { NavigationContainerRef } from "@react-navigation/native"

export type NavigationCompletionCallback = (lockContext: string) => void

export interface NavigationMetaData {
  isDeepLink?: boolean
  screenRefreshToken?: string
  lockContext?: string
  redirectedFromPayload?: NavigationPayload<any>
  navigationCompletionCallback?: NavigationCompletionCallback
  webViewFallbackUrl?: string
  navMethodOverride?: "push" | "navigate" | "replace"
}

export interface NavigationDetails {
  url: Url
  matchDetails: {
    scheme: string
    path: string
  }
  metaData: NavigationMetaData
}

export interface NavigationPayload<T> {
  details: NavigationDetails
  props: T
}

export type NavigationPathHandler = (navigationRef: React.RefObject<NavigationContainerRef>, payload: NavigationPayload<any>) => Promise<boolean>

export interface NavigationActionParams {
  route: string
  params: any
}
