import { DeclinedPermissionHandlerType, FB_ENDPOINTS } from "./facebook-controller-constants"
import * as FB from "./facebook-controller-helpers"
import * as FBUtils from "./facebook-controller-utils"
import { FBLoginPropsType } from "./facebook-controller.d"

/* Login with option to handle declined permissions
https://developers.facebook.com/docs/facebook-login/handling-declined-permissions
DeclinedPermissionHandlerType:
1. Continue on w/o information
FacebookController.login({
  scope,
  handleGranted,
  handleCanceled
})

2. ExplainToRepromptFallback: show exlain why & reprompt: fallbackExplainInfoToRepromt ->yes/no
FacebookController.login({
  scope,
  handleGranted,
  handleCanceled,
  declinedPermissionOptions: {
    requiredScope,
    type: DeclinedPermissionHandlerType.ExplainToReprompt,
    callback: ()=> boolean
  }
})

3. ManualCollectFallback: collect ourself
FacebookController.login({
  scope,
  handleGranted,
  handleCanceled,
  declinedPermissionOptions: {
    requiredScope,
    type: DeclinedPermissionHandlerType.ManualCollectFallback,
    callback: ()=> YourLogicHere
  }
})
*/
export const login = async (props: FBLoginPropsType) => {
  const { scope, handleGranted, declinedPermissionOptions, handleCanceled } = props
  const handleUserPermission = async (fbResponse: fb.StatusResponse) => {
    const { isCancelled, declinedPermissions, accessToken } = fbResponse
    if (isCancelled) {
      handleCanceled && handleCanceled()
      return
    }

    if (declinedPermissionOptions) {
      const { type, callback } = declinedPermissionOptions
      if (declinedPermissions.length && Object.values(DeclinedPermissionHandlerType).includes(type)) {
        switch (type) {
          case DeclinedPermissionHandlerType.ExplainToReprompt:
            if (callback()) {
              await login({
                ...props,
                scope: declinedPermissions,
                declinedPermissionOptions: {
                  ...declinedPermissionOptions,
                  requiredScope: declinedPermissions,
                },
              })
              return
            }
            handleGranted && handleGranted(accessToken)
            return accessToken
          case DeclinedPermissionHandlerType.ManualCollectFallback:
            callback()
            return
          default:
        }
        return
      }
    }
    // Continue on w/o info
    handleGranted && handleGranted(accessToken)
    return accessToken
  }
  try {
    const { accessToken } = await FB.login(handleUserPermission, {
      scope,
    })
    return accessToken
  } catch (err) {}
}

// /* Check scope if is granted */
export const isGrantedScope = async (scope: string[]): Promise<boolean> => {
  try {
    const permResponse = await FB.api(FB_ENDPOINTS.permissions)
    const { data: userScope } = permResponse
    const grantedScope = userScope.filter((p) => p.status === "granted").map((p) => p.permission)
    const ungrantedRequiredScope = FBUtils.getUngrantedRequiredScope({
      scope,
      requiredScope: scope,
      grantedScope,
    })
    return !ungrantedRequiredScope.length
  } catch (err) {
    return false
  }
}
