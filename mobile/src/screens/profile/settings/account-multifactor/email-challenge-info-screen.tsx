import React, { FC } from "react"
import { ScreenRouteAndStackNavigation } from "../../../../navigation/route"
import { translate } from "shared-lib"
import { AccountMFANavigatorParamList } from "../../../../navigation/account-mfa-navigator/acount-mfa-navigator"
import { Screen } from "../../../../widgets"
import { NavigationBar, ScrollView, Margin, Spacer, TwoFactorLock, SVG, Text, Stack, Button } from "uc-lib"
import { NavigableRoute } from "../../../../navigation/navigator"
import { Navigation } from "../../../../navigation/navigation"
import { KeyboardAvoidanceOverlayContainer, KeyboardAvoidanceView } from "../../../../keyboardavoidance"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { getNavigationBackButton } from "../../../../navigation/common"

export const EmailChallengeInfoScreen: FC<ScreenRouteAndStackNavigation<
  AccountMFANavigatorParamList,
  NavigableRoute.EmailChallengeInfo
>> = ({ route }) => {
  const insets = useSafeAreaInsets()

  const onContinueClick = () => {
    Navigation.navigateToRoute(NavigableRoute.AccountPhoneNumber, route.params.props)
  }

  return (
    <Screen safeAreaMode="all">
      <NavigationBar title={translate("auth.multi-factor.verify-your-profile")} leftItems={[getNavigationBackButton()]} />
      <Margin marginLeftStep={4} marginRightStep={4} direction="column" crossAxisDistribution="center" grow={1}>
        <ScrollView onlyScrollsWhenNeeded={true}>
          <Stack direction="column" crossAxisDistribution="center" grow={1}>
            <Spacer direction="column" sizeStep={10} />
            <SVG localSVG={TwoFactorLock} tint={"primary"} />
            <Spacer direction="column" sizeStep={6} />
            <Text textType="headline3" textAlign="center">
              {translate("profile-stack.profile-multifactor.verify-another-way")}
            </Text>
            <Spacer direction="column" sizeStep={6} />
            <Margin marginLeftStep={4} marginRightStep={4} direction="column">
              <Text textType="primaryBody2" textAlign="center">
                {translate("profile-stack.profile-multifactor.verify-another-way-body")}
              </Text>
              <Spacer direction="column" sizeStep={8} />
              <Text textType="primaryBody2" textAlign="left">
                {translate("profile-stack.profile-multifactor.verify-another-way-list-1")}
              </Text>
              <Spacer direction="column" sizeStep={1} />
              <Text textType="primaryBody2" textAlign="left">
                {translate("profile-stack.profile-multifactor.verify-another-way-list-2")}
              </Text>
            </Margin>
          </Stack>
        </ScrollView>
        <KeyboardAvoidanceOverlayContainer grow={0} direction="row" absoluteBottom={insets.bottom}>
          <KeyboardAvoidanceView stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
            <Button
              onClick={onContinueClick}
              title={translate("common-actions.continue")}
              buttonSize="large"
              buttonType="primary"
            />
          </KeyboardAvoidanceView>
        </KeyboardAvoidanceOverlayContainer>
      </Margin>
    </Screen>
  )
}
