import React from "react"
import { AffirmRejectDialog } from "uc-lib"
import { ScreenRouteAndStackNavigation } from "../../navigation/route"
import { NavigatorParamList, NavigableRoute } from "../../navigation/navigator"
import { Navigation } from "../../navigation/navigation"

export const AffirmRejectDialogScreen: React.FC<ScreenRouteAndStackNavigation<
  NavigatorParamList,
  NavigableRoute.AffirmRejectDialog
>> = ({ route }) => {
  const dismiss = () => {
    Navigation.popRootNavigator()
  }
  const { onAffirm, onReject, affirmText, rejectText, title, body, dismissOnReject, icon } = route.params.props

  return (
    <AffirmRejectDialog
      onAffirm={onAffirm}
      onReject={onReject}
      dismiss={dismiss}
      affirmText={affirmText}
      rejectText={rejectText}
      icon={icon}
      title={title}
      body={body}
      dismissOnReject={dismissOnReject}
    />
  )
}
