import { DeclinedPermissionHandlerType } from "./facebook-controller-constants"

export interface DeclinedPermissionOptionsExplainToRepromptType {
  requiredScope: string[]
  type: DeclinedPermissionHandlerType.ExplainToReprompt
  callback(): boolean
}

export interface DeclinedPermissionOptionsManualCollectFallbackType {
  requiredScope: string[]
  type: DeclinedPermissionHandlerType.ManualCollectFallback
  callback(): void
}

export interface FBLoginPropsType {
  scope: string[]
  handleGranted?: (accessToken: string) => void
  declinedPermissionOptions?:
    | DeclinedPermissionOptionsExplainToRepromptType
    | DeclinedPermissionOptionsManualCollectFallbackType
  authType?: "reauthenticate" | "reauthorize" | "rerequest"
  handleCanceled?: () => void
}

// @type-defs/facebook-js-sdk  not support for type of FB.api?
interface FBApiPermissionResponseType {
  status: string
  permission: string
}
interface FBApiResponseType extends Response {
  data: FBApiPermissionResponseType[]
}
