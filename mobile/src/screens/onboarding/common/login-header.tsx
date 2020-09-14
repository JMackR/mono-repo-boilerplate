import { translate } from "shared-lib"
import { AuthScreen } from "shared-lib/analytics"
// import { AnalyticsAuthShared } from "shared-lib/analytics/account/analytics-auth-shared"
import { NAVIGATION_BAR_HEIGHT, Flex, NavigationBar, NavigationBarItem, Stack } from "uc-lib"
import React, { FC, useMemo } from "react"
import { Navigation } from "../../../navigation/navigation"
import { NavigableRoute } from "../../../navigation/navigator/navigableroute"
import { getNavigationBackButton, getNavigationBackIcon } from "../../../navigation/common"

export const LoginHeader: FC<{
  image?: object
  title?: string
  colorTint?: string
  screen: AuthScreen
  noBackButton?: boolean
  noCancelButton?: boolean
  testID?: string
}> = ({ colorTint, title, image, screen, noBackButton, noCancelButton, testID }) => {
  const onCancelClick = () => {
    // AnalyticsAuthShared.trackLoginUiEventClick(screen, AuthScreenElement.Cancel)
    Navigation.popToTop()
  }
  const cancelButton: NavigationBarItem | undefined = useMemo(() => {
    if (!noCancelButton) {
      return {
        pressHandler: onCancelClick,
        title: translate("auth.cancel"),
        testID: testID + ".navigation-bar.cancel",
      }
    }
    return { title: "" }
  }, [screen, noCancelButton])

  const backButton: NavigationBarItem | undefined = useMemo(() => {
    if (!noBackButton && screen !== AuthScreen.ResetPasswordThroughEmail) {
      return {
        icon: getNavigationBackIcon(),
        testID: testID + ".navigation-bar.back",
        pressHandler: () => {
          Navigation.navigateToRoute(NavigableRoute.AuthEmailLanding)
        },
      }
    } else if (!noBackButton) {
      return getNavigationBackButton(testID + ".navigation-bar")
    }
    return undefined
  }, [screen, noBackButton])

  return (
    <Stack direction="column">
      <Flex direction="column" grow={1} height={NAVIGATION_BAR_HEIGHT}>
        <NavigationBar
          title={title}
          image={image}
          colorTint={colorTint}
          // leftItems={backButton ? [backButton] : undefined}
          // rightItems={backButton ? [cancelButton] : undefined}
          testID={testID + ".navigation-bar"}
        />
      </Flex>
    </Stack>
  )
}
