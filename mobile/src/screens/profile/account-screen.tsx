import React, { useContext } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Navigation } from "../../navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator"
import { ModalCardProps } from "../../widgets/modal-card"
import { useModal } from "../../widgets/modal-card/context/modal-provider"
import { Screen } from "../../widgets/screen"
import { AnalyticsDebug, AuthScreenContext, AccountScreenElement, AccountAnalyticsController } from "shared-lib/analytics"
import { AccountDataContext, useAuth } from "shared-lib/providers"
import { translate } from "shared-lib/utilities/i18n"
import {
  LocalSVGSource,
  Margin,
  Spacer,
  Stack,
  Text,
  Button,
  Flex,
  Center,
  ActivityIndicator,
  ScrollView,
} from "uc-lib/controls"
import { FlexibleRow, FlexibleRowContainer, EmptyState, NavigationBar, NavigationBarItem } from "uc-lib/widgets"
import {
  ActionSettingsLine,
  HeartLine,
  PaymentsCreditCardLineIcon,
  ProfileCommunityActionsIcon,
  ProfileHelpIcon,
  ProfileLineSettingsIcon,
  ProfileLinkIcon,
  ProfilePromotePlusIcon,
  ProfileSearchAlertsIcon,
  ProfileSellingIcon,
  TabBarProfileOutline,
  ErrorBearFailure,
} from "uc-lib/assets/image-catalog"
import {
  AccountProfileAvatar,
  AccountProfileImageSelector,
  AccountSectionLabel,
  AccountVerificationSection,
} from "uc-lib/widgets/account"
import { AccountInviteFriendsModalContent } from "./account-invite-friends"
import { CommonNavs } from "../../navigation/navigation"
import { useSettingsWebViewLinks } from "../../providers/settings-provider"

export const ACCNT_FLEX_ROW_HEIGHT = 48

export const AccountScreen = () => {
  const { loading, data: userInfo, error, refetch } = useContext(AccountDataContext)
  const webViewLinks = useSettingsWebViewLinks()
  const { show } = useModal()
  const auth = useAuth()
  const insets = useSafeAreaInsets()

  // TODO: CLIENT-1535 remove logout button when refresh logic is proper */
  const logOutPressed = async () => {
    // AnalyticsDebug.logInfo("User pressed log out on Account failure page. Auth token refresh issue?")
    auth.handleLogout()
    Navigation.navigateToRoute(NavigableRoute.SearchStack)
  }

  const UserInfo = () => {
    const avatar = userInfo?.profile?.avatars?.xlImage || ""
    const name = userInfo?.profile?.name || ""
    const location = userInfo?.profile?.publicLocationName
    const ratingAverage = userInfo?.profile?.ratingSummary?.average || 0
    const ratingCount = userInfo?.profile?.ratingSummary?.count || 0
    const truYouVerified = userInfo?.profile?.isTruyouVerified || false

    const NameAndRating = () => (
      <>
        <Spacer direction="row" sizeStep={4} />
        <Stack direction="column" childSeparationStep={1}>
          <Spacer direction="column" sizeStep={5} />
          <Text textType="primaryBody1" testID="account-screen.user-info.name">
            {name}
          </Text>
          <Text textType="secondaryBody2" color="secondary" testID="account-screen.user-info.location">
            {location}
          </Text>
          <Stack direction="row" crossAxisDistribution="stretch">
            <Spacer direction="row" sizeStep={2} />
            <Text textType="tertiaryBody2" color="secondary" testID="account-screen.user-info.rating-count">
              {translate("profile-stack.profile-screen.rating-count-formatted", { ratings: ratingCount })}
            </Text>
          </Stack>
        </Stack>
      </>
    )
    const goToProfileImageSelectScreen = () => {
      // AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.ChangePhoto)
      Navigation.navigateToRoute(NavigableRoute.ProfileImageStack)
    }
    return (
      <Margin marginStep={4}>
        <Stack direction="row">
          <AccountProfileImageSelector
            onClick={goToProfileImageSelectScreen}
            testID="account-screen.user-info.profile-image-selector"
          >
            <AccountProfileAvatar avatarUri={avatar} isTruyouVerified={truYouVerified} />
          </AccountProfileImageSelector>
          <NameAndRating />
        </Stack>
      </Margin>
    )
  }

  const LocalFlexRow = ({
    mainContent,
    clickAction,
    rightIcon,
    testID,
  }: {
    mainContent: string
    clickAction?: () => void
    rightIcon?: LocalSVGSource
    testID?: string
  }) => (
    <FlexibleRow
      mainContent={mainContent}
      height={ACCNT_FLEX_ROW_HEIGHT}
      rightIcon={rightIcon}
      clickAction={clickAction}
      rightArrowHidden={true}
      testID={testID}
    />
  )

  const openSettingsViaCog = () => {
    // AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.SettingsGear)
    Navigation.navigateToRoute(NavigableRoute.AccountSettings)
  }

  const openSettings = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.AccountSettings)
    Navigation.navigateToRoute(NavigableRoute.AccountSettings)
  }

  const openSearchAlertScreen = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.SavedSearched)
    Navigation.navigateToRoute(NavigableRoute.AccountSearchAlerts)
  }

  const openCustomProfileLink = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.CustomProfileLink)
    Navigation.navigateToRoute(NavigableRoute.AccountVanityUrl)
  }

  const openManagePromotions = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.PromotePlus)
    Navigation.navigateToRoute(NavigableRoute.ManagePromotions)
  }

  const openPaymentAccount = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.Payments)
    Navigation.navigateToRoute(NavigableRoute.PaymentAccount)
  }

  const openTransactions = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.PurchasesAndSales)
    Navigation.navigateToRoute(NavigableRoute.PaymentAccount, { selectedTab: "transactions" })
  }

  const openPublicProfile = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.PublicProfile)
    userInfo?.id && Navigation.navigateToRoute(NavigableRoute.PublicProfile, { userId: userInfo.id })
  }

  const openInviteFriends = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.InviteFriends)

    const props: ModalCardProps = {
      content: () => <AccountInviteFriendsModalContent />,
      onLeftButtonClick: () => {
        AccountAnalyticsController.trackInviteFriendsModalClickEvent(AccountScreenElement.X)
      },
      title: translate("profile-stack.invite-friends.title"),
      testID: "profile-stack.invite-friends",
      snapPoints: [0, "100%"],
      initialSnap: 1,
      useHeaderRadius: false,
    }
    show(props)
  }

  const openSavedLists = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.SavedItems)
    Navigation.navigateToRoute(NavigableRoute.SavedLists)
  }

  const openHelp = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.Help)
    CommonNavs.presentWebView(webViewLinks.HelpCenter, translate("webview.help_center_page_title"))
  }

  const openCommunityForums = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.CommunityForums)
    CommonNavs.presentWebView(webViewLinks.CommunityForum, translate("webview.help_center_page_title"))
  }

  const emailverifiedClicked = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.EmailVerifiedIcon)
    Navigation.navigateToRoute(NavigableRoute.VerifyEmail, {
      email: userInfo?.account?.email,
      context: AuthScreenContext.ExistingUser,
    })
  }
  const facebookConnectedClicked = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.FacebookConnectedIcon)
  }
  const imageAddedClicked = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.ImageAddedIcon)
    Navigation.navigateToRoute(NavigableRoute.ProfileImageStack)
  }
  const phoneVerifiedClicked = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.PhoneVerifiedIcon)
    Navigation.navigateToRoute(NavigableRoute.VerifyPhone, { skippable: false, context: AuthScreenContext.ExistingUser })
  }
  const truYouJoinedClicked = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.TruYouIcon)
    Navigation.navigateToRoute(NavigableRoute.TruYouVerify)
  }
  const improveReputationClicked = () => {
    AccountAnalyticsController.trackMyAccountUIEventClick(AccountScreenElement.Reputationlink)
    CommonNavs.presentWebView(webViewLinks.ImproveReputationHelp, translate("profile-stack.profile-screen.reputation-help"))
  }

  const AccountPageHeader = () => (
    <NavigationBar
      title={translate("profile-stack.profile-screen.profile-title")}
      isRootNavBar={true}
      rightItems={SettingsButton}
      testID="settings-screen.navigation-bar"
    />
  )

  const SettingsButton: NavigationBarItem[] = [
    {
      icon: ActionSettingsLine,
      testID: "profile-screen.header.settings-button",
      pressHandler: openSettingsViaCog,
    },
  ]

  const emailVerified = userInfo?.profile?.isEmailVerified || false
  const facebookConnected = !!userInfo?.account?.facebookId
  const imageAdded = !userInfo?.profile?.avatars.useDefaultAvatar
  const phoneVerified = userInfo?.profile?.isPhoneNumberVerified || false
  const truYouJoined = userInfo?.account?.identityAttributes?.isTruyouMember || false
  const verificationStatus = userInfo?.profile?.truYouVerificationStatus || TruYouStatus.TruyouUnknown
  const dateJoined = userInfo?.profile?.dateJoined || ""
  const dateDate = new Date(dateJoined)
  const LoggedInContent = () => (
    <ScrollView>
      <Stack direction="column" height="100%">
        <UserInfo />
        <AccountVerificationSection
          emailVerified={emailVerified}
          facebookConnected={facebookConnected}
          imageAdded={imageAdded}
          phoneVerified={phoneVerified}
          truYouJoined={truYouJoined}
          truYouVerificationStatus={verificationStatus}
          joinDate={dateDate}
          testID="account-screen.account-verification-section"
          emailClickListener={emailverifiedClicked}
          facebookConnectedClickListener={facebookConnectedClicked}
          imageAddedClickListener={imageAddedClicked}
          phoneVerifiedClickListener={phoneVerifiedClicked}
          truYouJoinedClickListener={truYouJoinedClicked}
          reputationTextClickListener={improveReputationClicked}
        />

        {/* Transactions */}
        <AccountSectionLabel title={translate("profile-stack.profile-screen.section-label.transactions")} />
        <FlexibleRowContainer extendMargin={false} skipFirstSeparator={true}>
          <LocalFlexRow
            mainContent={translate("profile-stack.profile-screen.purchases-and-sales")}
            rightIcon={ProfileSellingIcon}
            clickAction={openTransactions}
            testID="account-screen.purchases-and-sales"
          />
          <LocalFlexRow
            mainContent={translate("profile-stack.profile-screen.payments-and-deposit-methods")}
            rightIcon={PaymentsCreditCardLineIcon}
            clickAction={openPaymentAccount}
            testID="account-screen.payments-and-deposit-methods"
          />
        </FlexibleRowContainer>

        {/* Saves */}
        <AccountSectionLabel title={translate("profile-stack.profile-screen.section-label.saves")} />
        <FlexibleRowContainer extendMargin={false} skipFirstSeparator={true}>
          <LocalFlexRow
            mainContent={translate("profile-stack.profile-screen.saved-items")}
            rightIcon={HeartLine}
            clickAction={openSavedLists}
            testID="account-screen.saved-items"
          />
          <LocalFlexRow
            mainContent={translate("profile-stack.profile-screen.search-alerts")}
            rightIcon={ProfileSearchAlertsIcon}
            clickAction={openSearchAlertScreen}
            testID="account-screen.search-alerts"
          />
        </FlexibleRowContainer>

        {/* Account */}
        <AccountSectionLabel title={translate("profile-stack.profile-screen.section-label.profile")} />
        <FlexibleRowContainer extendMargin={false} skipFirstSeparator={true}>
          <LocalFlexRow
            mainContent={translate("profile-stack.profile-screen.profile-settings")}
            rightIcon={ProfileLineSettingsIcon}
            clickAction={openSettings}
            testID="account-screen.account-settings"
          />
          <LocalFlexRow
            mainContent={translate("profile-stack.profile-screen.public-profile")}
            rightIcon={TabBarProfileOutline}
            clickAction={openPublicProfile}
            testID="account-screen.public-profile"
          />
          <LocalFlexRow
            mainContent={translate("profile-stack.profile-screen.custom-profile-link")}
            rightIcon={ProfileLinkIcon}
            clickAction={openCustomProfileLink}
            testID="account-screen.custom-profile-link"
          />
          <LocalFlexRow
            mainContent={translate("profile-stack.profile-screen.promote-plus")}
            rightIcon={ProfilePromotePlusIcon}
            clickAction={openManagePromotions}
            testID="account-screen.manage-promotions"
          />
        </FlexibleRowContainer>

        {/* Help */}
        <AccountSectionLabel title={translate("profile-stack.profile-screen.section-label.help")} />
        <FlexibleRowContainer extendMargin={false} skipFirstSeparator={true}>
          <LocalFlexRow
            mainContent={translate("profile-stack.profile-screen.help-center")}
            rightIcon={ProfileHelpIcon}
            clickAction={openHelp}
            testID="account-screen.help"
          />
          <LocalFlexRow
            mainContent={translate("profile-stack.profile-screen.community-actions")}
            rightIcon={ProfileCommunityActionsIcon}
            clickAction={openCommunityForums}
            testID="account-screen.community-forums"
          />
        </FlexibleRowContainer>

        <Spacer direction="column" sizeStep={5} />
        {/* Remove Invite Banner
        <TouchableOpacity
          onPress={openInviteFriends}
          testID='profile-screen.invite-friends-button'
          accessibilityLabel='profile-screen.invite-friends-button'
        >
          <AccountInviteFriendsBanner text={translate('profile-stack.profile-screen.invite-friends')} />
        </TouchableOpacity>
        <Spacer direction='column' sizeStep={4} />
        */}
      </Stack>
    </ScrollView>
  )

  return (
    <Screen safeAreaMode="top">
      {loading ? (
        <Center>
          <ActivityIndicator size="large" />
        </Center>
      ) : error ? (
        <Stack direction="column" grow={1} axisDistribution="center" childSeparationStep={2}>
          <EmptyState
            icon={ErrorBearFailure}
            title={translate("common-errors.server-error.title")}
            subtitle={translate("common-errors.server-error.subtitle")}
            buttonTitle={translate("common-errors.server-error.button-title")}
            buttonHandler={refetch}
            testID="account-screen.empty-state"
          />

          {/* // TODO: CLIENT-1535 remove logout button when refresh logic is proper */}
          <Flex direction="row" axisDistribution="center">
            <Button
              buttonSize="large"
              buttonType="tertiary"
              title={translate("profile-stack.settings-screen.log-out")}
              onClick={logOutPressed}
              testID="account-screen.log-out-button"
            />
          </Flex>
        </Stack>
      ) : (
        <>
          <AccountPageHeader />
          <LoggedInContent />
        </>
      )}
    </Screen>
  )
}
