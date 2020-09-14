import Clipboard from "@react-native-community/clipboard"
import _ from "lodash"
import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { translate } from "shared-lib/utilities/i18n"
import { Share } from "shared-lib/utilities/share/share.native"
import { ActionClose, ProfileInviteFriendsBanner, ShareLine } from "uc-lib/assets"
import { ActivityIndicator, Button, SVG, Text, ClickableOpacity } from "uc-lib/controls"
import { Center, Flex, Margin, Spacer, SpacerFlex, Stack } from "uc-lib/controls/layout"
import { AccountScreenElement, AccountScreenNames } from "../shared-lib/analytics/constants/profile-constants"
import { AccountAnalyticsController } from "shared-lib/analytics/account"
import { CommonNavs } from "../../navigation/navigation"
import { ActionSheetParams, useActionSheet } from "../../widgets/action-sheet"
import { Screen } from "../../widgets/screen"
import { useSettingsWebViewLinks } from "../../providers/settings-provider"

export const AccountInviteFriendsModalContent: React.FC = () => {
  const { loading, data } = useQuery<Query>(ACCNT_INVITE_FRIENDS_QUERY)
  const webViewLinks = useSettingsWebViewLinks()

  const url = data?.incentivizedLink.link || ""
  const titleText = data?.incentivizedLink.displayTitle || ""
  const subText = data?.incentivizedLink.displayText || ""
  const shareMessage = data?.incentivizedLink?.shareText || ""

  const onShareClicked = () => {
    AccountAnalyticsController.trackInviteFriendsModalClickEvent(AccountScreenElement.InviteFriendsShareLink)
    Share.share({
      title: translate("profile-stack.invite-friends.share-title"),
      url,
      message: shareMessage,
    })
  }

  const howInvitesWork = () => {
    AccountAnalyticsController.trackInviteFriendsModalClickEvent(AccountScreenElement.InviteFriendsHowInvitesWork)
    CommonNavs.presentWebView(webViewLinks.AccountInviteHelp)
  }

  const { show: showActionSheet } = useActionSheet()

  const onLinkPressed = () => {
    const ouActionSheetOptions: ActionSheetParams = {
      icons: [ShareLine, ActionClose],
      options: [translate("common-actions.copy-to-clipboard"), translate("common-actions.cancel")],
      cancelButtonIndex: 1,
    }
    showActionSheet(ouActionSheetOptions, (pressed: number) => {
      if (pressed === 0) {
        AccountAnalyticsController.trackInviteFriendsModalClickEvent(AccountScreenElement.InviteFriendsCopy)
        Clipboard.setString(url)
      }
    })
  }

  return (
    <Screen safeAreaMode="top" screenName={AccountScreenNames.InviteFriendsPromo}>
      <Stack direction="column" grow={1}>
        <Margin marginStep={4} grow={1}>
          <Stack direction="column" grow={1}>
            <Stack direction="column" grow={0}>
              <Center>
                <SVG localSVG={ProfileInviteFriendsBanner} />
              </Center>
              {loading ? (
                <ActivityIndicator size={"large"} />
              ) : (
                <>
                  <Spacer direction="column" sizeStep={12} />
                  <Flex axisDistribution={"center"}>
                    <Text textType="headline3">{titleText}</Text>
                  </Flex>
                  <Spacer direction="column" sizeStep={8} />
                  <Flex axisDistribution={"center"}>
                    <Flex width="80%" direction="row">
                      <Text textAlign="center" textType="secondaryBody2">
                        {subText}
                      </Text>
                    </Flex>
                  </Flex>
                  <Spacer direction="column" sizeStep={8} />
                  <Flex grow={1} direction="column" crossAxisDistribution="center" axisDistribution="center">
                    <Button
                      title={translate("profile-stack.invite-friends.how-invites-work")}
                      buttonSize="small"
                      onClick={howInvitesWork}
                      testID="invite-friends-how-invites-work"
                      buttonType="flat"
                    />
                  </Flex>
                </>
              )}
            </Stack>
            <SpacerFlex />
            <Stack direction="column" childSeparationStep={4}>
              {loading ? null : (
                <ClickableOpacity onClick={onLinkPressed} testID="invite-friends-share-link">
                  <Center>
                    <Text textType="primaryBody1">{url}</Text>
                  </Center>
                </ClickableOpacity>
              )}
              <Spacer direction="column" sizeStep={2} />
              <Button
                onClick={onShareClicked}
                buttonSize="large"
                buttonType={loading ? "disabled" : "primary"}
                title={translate("profile-stack.invite-friends.share-title")}
                testID="invite-friends-share-link"
              />
              <Spacer direction="column" sizeStep={8} />
            </Stack>
          </Stack>
        </Margin>
      </Stack>
    </Screen>
  )
}
