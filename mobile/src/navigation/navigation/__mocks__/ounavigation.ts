import { NavigationPathHandler } from "../navigation"
import { NavigationContainerComponent, NavigationScreenProp, NavigationRoute, NavigationParams } from "react-navigation"
import { Url } from "../../../url"

export const Navigation = {
  addScheme(aScheme: string, shouldGlobalFallback?: boolean) {},
  addPaths(toScheme: string, paths: string[], withHandler: NavigationPathHandler, shouldGlobalFallback?: boolean) {},
  navigateToRoute(route: string, params?: any) {},
  navigateToURL(toUrl: Url | string, params?: any) {},
  start(navigatorRef: NavigationContainerComponent, defaultGlobalRoutesAsPaths?: string[]) {},
  extractDetails(navigationProps: NavigationScreenProp<NavigationRoute, NavigationParams>, key: string) {},
  extractPram<T>(navigationProps: NavigationScreenProp<NavigationRoute, NavigationParams>, key: string): T {},
}
