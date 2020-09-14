import React from "react"
import _ from "lodash"
import { ErrorDialog } from "uc-lib"
import { ScreenRouteAndStackNavigation } from "../../../navigation/route"
import { NavigatorParamList, NavigableRoute } from "../../../navigation/navigator"
import { Exception, DEFAULT_SOMETHING_WENT_WRONG, GraphGQLErrorParser, exceptionAction } from "shared-lib"
import { Navigation } from "../../../navigation/navigation"

export interface ErrorDialogScreenProps {
  // tslint:disable-next-line: no-any
  error?: any
  exception?: Exception
}

export const ErrorDialogScreen: React.FC<ScreenRouteAndStackNavigation<NavigatorParamList, NavigableRoute.ErrorDialog>> = ({
  route,
}) => {
  const dismiss = () => {
    Navigation.popRootNavigator()
  }
  const onActionItemPressed = async (action: exceptionAction) => {
    Navigation.popRootNavigator()
    Navigation.performWhenAvailable(() => {
      Navigation.navigateToActionPath(action.actionPath)
    })
  }
  const { error, ouException } = route.params.props

  const exceptionFromError = GraphGQLErrorParser(error)
  const errorToPresent = _.merge({}, DEFAULT_SOMETHING_WENT_WRONG, exceptionFromError, ouException)

  return <ErrorDialog onDismissPressed={dismiss} onActionItemPressed={onActionItemPressed} ouException={errorToPresent} />
}
