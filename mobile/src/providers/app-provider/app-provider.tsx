import React, { useEffect, useState } from "react"
import { AppState, AppStateStatus, StyleSheet, View } from "react-native"
import * as RNLocalize from "react-native-localize"
// import Instabug from "instabug-reactnative"
// import Config from "react-native-config"
// import crashlytics from "@react-native-firebase/crashlytics"
import { ThemeProvider } from "uc-lib/themes"
import { LoadingContextProvider } from "uc-lib/hooks"
// import { AnalyticsApp } from "shared-lib/analytics"
// import { RealtimeConnectionProvider, PhotoUploadProvider } from "shared-lib/network"
import { AccountDataProvider, AuthProvider, SearchProvider, HomeContext } from "shared-lib/providers"
// import { TodosDataProvider } from "shared-lib/providers/todos"
import { setI18nConfig } from "shared-lib/utilities/i18n"
import { AppProviderProps } from "./app-provider.props"
// import { usePortfolioFetchOnce } from "../portfolio-provider/portfolio-data-controller"
// import { useAppSandboxFilePathFetchOnce } from "../base-uri-provider"

import { AlertBadgeController } from "../../pushnotifications/alert-badge-controller"
// import { PushManager } from "../../pushnotifications"
import { ModalContextProvider } from "../../widgets/modal-card/context/modal-provider"
// import { AppUpgrade } from "../../screens/app-upgrade"
// import { SinglePhotoUploader } from "./photo-uploader"
import { useNativeThemeChangeOnce } from "../../utilities"
// import { ApolloProvider } from "../apollo-provider"
import { SettingsContextProvider } from "../settings-provider"

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    flex: 1,
  },
})

// tslint:disable-next-line: no-any
export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const { children, translations } = props
  const [isTranslationLoaded, setIsTranslationLoaded] = useState(false)

  const handleAppStateChange = (state: AppStateStatus) => {
    // AnalyticsApp.trackAppStateChange(state)
    // const crashlyticsEnabled = !(__DEV__ || Config.CRASHLYTICS_ENABLED === "false")
    // const instabugEnabled = !(__DEV__ || Config.INSTABUG_ENABLED === "false")

    // crashlytics().setCrashlyticsCollectionEnabled(crashlyticsEnabled)

    // if (instabugEnabled) {
    //   Instabug.startWithToken(Config.INSTABUG_APP_TOKEN, [Instabug.invocationEvent.shake])
    // } else {
    //   Instabug.startWithToken(Config.INSTABUG_APP_TOKEN, [Instabug.invocationEvent.none])
    //   Instabug.setCrashReportingEnabled(false)
    // }

    if (state === "active") {
      // AnalyticsApp.trackAppStateActive()
    }
  }

  const handleLocalizationChange = () => {
    setIsTranslationLoaded(false)
    setI18nConfig(translations)
    setIsTranslationLoaded(true)
  }

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange)
    RNLocalize.addEventListener("change", handleLocalizationChange)
    setI18nConfig(translations)
    setIsTranslationLoaded(true)

    return () => {
      AppState.removeEventListener("change", handleAppStateChange)
      RNLocalize.removeEventListener("change", handleLocalizationChange)
    }
  }, [])

  if (!isTranslationLoaded) {
    // TODO: Should display the splash screen while loading
    return <View style={styles.safeArea} />
  }
  return (
    <ThemeProvider>
      {/*<SettingsContextProvider>*/}
      {/* <ApolloProvider>*/}
      {/* <LoadDataAndThemeOnAppLaunch>*/}
      <AuthProvider cleanUpForLogOut={cleanUpForLogout}>
        {/* <AccountDataProvider>*/}
        {/*<RealtimeConnectionProvider>*/}
        {/* <PhotoUploadProvider uploader={SinglePhotoUploader}>*/}
        {/* <TodosDataProvider>*/}
        {/* <AlertBadgeController>*/}
        <SearchProvider context={HomeContext}>
          {/*  <SearchProvider>*/}
          <LoadingContextProvider>
            <ModalContextProvider>
              {/* <AppUpgrade>*/}
              {children}
              {/*</AppUpgrade>*/}
            </ModalContextProvider>
          </LoadingContextProvider>
          {/*  </SearchProvider>*/}
        </SearchProvider>
        {/* </AlertBadgeController>*/}
        {/* </TodosDataProvider>*/}
        {/* </PhotoUploadProvider>*/}
        {/* </RealtimeConnectionProvider>*/}
        {/*</AccountDataProvider>*/}
      </AuthProvider>
      {/* </LoadDataAndThemeOnAppLaunch>*/}
      {/* </ApolloProvider>*/}
      {/*</SettingsContextProvider>*/}
    </ThemeProvider>
  )
}

const LoadDataAndThemeOnAppLaunch: React.FC = (props) => {
  // useNativeThemeChangeOnce()
  // usePortfolioFetchOnce()
  // useAppSandboxFilePathFetchOnce()
  return <>{props.children}</>
}

const cleanUpForLogout = async () => {
  // PushManager.setBadgeCount(0)
}
