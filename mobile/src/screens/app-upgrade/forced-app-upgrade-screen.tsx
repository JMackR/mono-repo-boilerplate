import React, { FC, useEffect } from "react"

import { Platform, BackHandler } from "react-native"
import { NavigableRoute } from "mobile/src/navigation/navigator"
import { ScreenRouteAndStackNavigation } from "mobile/src/navigation/route"
import { NavigatorParamList } from "mobile/src/navigation/navigator"
import { Screen } from "mobile/src/widgets/screen"
import { translate } from "shared-lib"
import { OpenURL } from "../../utilities"
import { Button, Flex, Margin, Text, SVG, SpacerFlex, Spacer, ActionDownload } from "uc-lib"

export const ForcedAppUpgrade: FC<ScreenRouteAndStackNavigation<NavigatorParamList, NavigableRoute.UpdateApp>> = ({
  route,
}) => {
  const { iosAppStoreUrl, androidPlayStoreUrl } = route.params.props
  const onUpdatePressed = () => {
    const url = Platform.OS === "ios" ? iosAppStoreUrl : androidPlayStoreUrl
    OpenURL.openInExternalBrowser(url)
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true)
    return () => BackHandler.removeEventListener("hardwareBackPress", () => true)
  }, [])

  return (
    <Screen safeAreaMode={"all"} screenName="Forced-App-Upgrade-Screen">
      <Margin marginStep={8} marginLeftStep={22} marginRightStep={22} grow={1} direction={"column"}>
        <Flex axisDistribution="center" grow={0}>
          <SVG localSVG={ActionDownload} />
        </Flex>
        <Spacer direction={"column"} sizeStep={8} />
        <Flex axisDistribution="center" grow={0}>
          <Text textType={"headline3"}>{translate("app-upgrade.screen-title")}</Text>
        </Flex>
        <Spacer direction={"column"} sizeStep={8} />
        <Margin marginLeftStep={4} marginRightStep={4}>
          <Flex axisDistribution="center" grow={0}>
            <Text textType={"primaryBody2"} textAlign="center">
              {translate("app-upgrade.screen-subtitle1")}
            </Text>
          </Flex>
        </Margin>
        <Spacer direction={"column"} sizeStep={4} />
        <Flex axisDistribution="center" grow={0}>
          <Text textType={"primaryBody2"} textAlign="center">
            {translate("app-upgrade.screen-subtitle2")}
          </Text>
        </Flex>
      </Margin>
      <SpacerFlex />
      <Margin marginStep={4} direction="column">
        <Button
          onClick={onUpdatePressed}
          title={translate("app-upgrade.update-app")}
          testID="forced-update-app-button"
          buttonType={"primary"}
          buttonSize={"large"}
        />
      </Margin>
    </Screen>
  )
}
