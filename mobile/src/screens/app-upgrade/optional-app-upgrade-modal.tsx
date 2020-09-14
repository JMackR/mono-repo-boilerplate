import _ from "lodash"
import { Screen } from "../../widgets/screen"
import { Button, Text } from "uc-lib/controls"
import { Flex, Margin, SpacerFlex, Stack } from "uc-lib/controls/layout"
import React from "react"
import { PillDataProps, Pill } from "uc-lib"
import { translate } from "shared-lib"
import { Platform } from "react-native"
import { OpenURL } from "mobile/src/utilities"

export const OptionalAppUpgradeModalContent: React.FC<{ appStoreUrl: string; playStoreUrl: string }> = ({
  appStoreUrl,
  playStoreUrl,
}) => {
  const pillProps: PillDataProps = {
    text: translate("app-upgrade.modal-pill-name"),
    textType: "primaryBody1",
    paddingStepHorizontal: 4,
    paddingStepVertical: 2,
    pillColor: "larchYellow",
    textColor: "primary",
  }
  const onUpdateClicked = () => {
    const url = Platform.OS === "ios" ? appStoreUrl : playStoreUrl
    OpenURL.openInExternalBrowser(url)
  }

  return (
    <Screen safeAreaMode="bottom" screenName="App-upgrade-Modal">
      <Stack direction="column" grow={1}>
        <Margin marginLeftStep={8} marginRightStep={8}>
          <Stack direction="column" childSeparationStep={4}>
            <Flex direction="row" grow={1} axisDistribution="center">
              <Pill data={pillProps} />
            </Flex>
            <Text textType="headline3" textAlign="center">
              {translate("app-upgrade.modal-title")}
            </Text>

            <Text textType="primaryBody2" textAlign="center">
              {translate("app-upgrade.modal-subtitle")}
            </Text>
          </Stack>
        </Margin>
        <SpacerFlex />
        <Margin marginBottomStep={4} marginLeftStep={3} marginRightStep={3} direction="column">
          <Button
            onClick={onUpdateClicked}
            buttonSize="large"
            buttonType="primary"
            title={translate("app-upgrade.update-app")}
            testID="optional-update-app-button"
          />
        </Margin>
      </Stack>
    </Screen>
  )
}
