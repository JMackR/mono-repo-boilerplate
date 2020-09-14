import React, { useEffect } from "react"
import { TodosDataContext } from "shared-lib/providers/todos"
import { PushManager } from "./push-manager"

export const AlertBadgeController: React.FC = props => {
  const { unseenAlertCount } = React.useContext(TodosDataContext)

  useEffect(() => {
    PushManager.setBadgeCount(unseenAlertCount?.total || 0)
  }, [unseenAlertCount?.total])

  return <>{props.children}</>
}
