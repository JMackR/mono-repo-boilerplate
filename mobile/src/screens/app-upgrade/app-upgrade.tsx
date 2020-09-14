import React, { useEffect } from "react"
import { AppStateStatus, AppState } from "react-native"
import { useLazyQuery } from "@apollo/react-hooks"
import { ModalCardProps, Navigation, NavigableRoute } from "../../navigation"
import { OptionalAppUpgradeModalContent } from "./optional-app-upgrade-modal"
import { useModal } from "mobile/src/widgets/modal-card/context/modal-provider"
import VersionNumber from "react-native-version-number"
import _ from "lodash"

export const AppUpgrade: React.FC = props => {
  const { children } = props
  const { show } = useModal()
  const [getAppVersionData] = useLazyQuery(UPDATE_APP, {
    variables: {
      appversion: VersionNumber.appVersion,
    },
    onCompleted: data => handleAppVersionData(data),
    fetchPolicy: "network-only",
  })

  const handleAppVersionData = appVersionData => {
    const updateType = _.property("updateApp.updateType")(appVersionData) as string
    const appStoreUrl = _.property("updateApp.appStoreUrl")(appVersionData) as string
    const playStoreUrl = _.property("updateApp.playStoreUrl")(appVersionData) as string

    const showOptionalAppUpgrade = () => {
      const modalCardProps: ModalCardProps = {
        content: () => <OptionalAppUpgradeModalContent appStoreUrl={appStoreUrl} playStoreUrl={playStoreUrl} />,
        title: "",
        snapPoints: [0, "40%"],
        initialSnap: 1,
        useHeaderRadius: true,
      }
      show(modalCardProps)
    }

    if (updateType === "Optional") {
      Navigation.performWhenAvailable(() => showOptionalAppUpgrade())
    } else if (updateType === "Forced") {
      Navigation.navigateToRoute(NavigableRoute.UpdateApp, {
        iosAppStoreUrl: appStoreUrl,
        androidPlayStoreUrl: playStoreUrl,
      })
    }
  }

  const handleAppStateChange = (state: AppStateStatus) => {
    if (state === "active") {
      getAppVersionData()
    }
  }

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange)

    getAppVersionData()
    return () => {
      AppState.removeEventListener("change", handleAppStateChange)
    }
  }, [])

  return <>{children}</>
}
