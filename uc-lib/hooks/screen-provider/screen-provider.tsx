import React from "react"
import { ScreenProviderProps, ScreenProviderContext, _SCREEN_PROVIDER_DEFAULT_SCREEN_NAME } from "./screen-provider.d"

const ScreenContext = React.createContext<ScreenProviderContext>({
  screenName: "unavailable",
  setScreenName: (_?: string) => {},
  screenRoute: "unavailable",
})

export const ScreenProvider: React.FC<ScreenProviderProps> = props => {
  const { screenName, screenRoute, children } = props
  const [currentScreenName, setCurrentScreenName] = React.useState(screenName)
  const context = {
    screenName: currentScreenName,
    setScreenName: setCurrentScreenName,
    screenRoute,
  }

  return <ScreenContext.Provider value={context}>{children}</ScreenContext.Provider>
}

export const useScreen = () => {
  const { screenName: contextScreenName, setScreenName, screenRoute: contextScreenRoute } = React.useContext(ScreenContext)
  const screenName = contextScreenName || _SCREEN_PROVIDER_DEFAULT_SCREEN_NAME
  const screenRoute = contextScreenRoute || "web"
  return { screenName, setScreenName, screenRoute }
}

ScreenProvider.defaultProps = {
  screenName: _SCREEN_PROVIDER_DEFAULT_SCREEN_NAME,
  screenRoute: "web",
}
