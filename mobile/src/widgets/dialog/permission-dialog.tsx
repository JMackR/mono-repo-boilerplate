import React, { FC } from "react"
import { translate } from "shared-lib"
import { AffirmRejectDialog } from "uc-lib"
import invariant from "ts-invariant"
import { NavigatorParamList, NavigableRoute } from "../../navigation/navigator"
import { ScreenRouteAndStackNavigation } from "../../navigation/route"
import { Navigation } from "../../navigation/navigation"

export const PERMISSION_PROPS = "permission_props"

export const PermissionDialog: FC<ScreenRouteAndStackNavigation<NavigatorParamList, NavigableRoute.PermissionsDialog>> = ({
  route,
}) => {
  const permissionProps = route.params.props
  invariant(permissionProps !== undefined, "must have permission_props sent in as param")

  const affirmText = translate("permissions.affirm")
  const rejectText = translate("permissions.reject")

  const dismiss = () => {
    Navigation.popRootNavigator()
  }
  const affirm = permissionProps.onGranted
  const reject = permissionProps.onDenied

  return (
    <AffirmRejectDialog
      affirmText={affirmText}
      onAffirm={affirm}
      rejectText={rejectText}
      onReject={reject}
      dismiss={dismiss}
      title={permissionProps.title}
      body={permissionProps.prompt}
      icon={permissionProps.localSVGSource}
    />
  )
}
