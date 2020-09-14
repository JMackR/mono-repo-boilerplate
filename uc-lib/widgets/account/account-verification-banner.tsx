import { Button, Center, Flex, Spacer, Stack, Text } from "uc-lib"
import {
  AccountVerificationEmailNotVerified,
  AccountVerificationEmailVerified,
  AccountVerificationFacebookConnected,
  AccountVerificationFacebookNotConnected,
  AccountVerificationImageAdded,
  AccountVerificationImageNotAdded,
  AccountVerificationPhoneNotVerified,
  AccountVerificationPhoneVerified,
  AccountVerificationTruYouJoined,
  AccountVerificationTruYouNotJoined,
  AccountVerificationTruYouPending,
} from "uc-lib/assets"
import React from "react"
import { VerificationIndicator } from "./account-verification-banner-indicator-icon"
import { translate } from "shared-lib"

export interface AccountVerificationSectionProps {
  emailVerified: boolean
  imageAdded: boolean
  phoneVerified: boolean
  truYouJoined: boolean
  truYouVerificationStatus?: OuTruYouStatus
  facebookConnected: boolean
  joinDate: Date
  emailClickListener?: () => void
  imageAddedClickListener?: () => void
  phoneVerifiedClickListener?: () => void
  truYouJoinedClickListener?: () => void
  facebookConnectedClickListener?: () => void
  reputationTextClickListener?: () => void
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}

const BUILD_REPUTATION_BUTTON_HEIGHT = 40

// tslint:disable-next-line: no-magic-numbers
const THIRTY_DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30

export const AccountVerificationSection: React.FC<AccountVerificationSectionProps> = props => {
  const {
    emailVerified,
    imageAdded,
    phoneVerified,
    truYouJoined,
    truYouVerificationStatus,
    facebookConnected,
    joinDate,
    emailClickListener,
    facebookConnectedClickListener,
    imageAddedClickListener,
    phoneVerifiedClickListener,
    reputationTextClickListener,
    truYouJoinedClickListener,
    testID,
  } = props

  // hides the banner
  const now = new Date().getTime()
  const joinedOver30DaysAgo = now - new Date(joinDate).getTime() > THIRTY_DAYS_IN_MILLISECONDS
  if (joinedOver30DaysAgo) {
    return null
  }

  const onLearnHowToImproveReputationClicked = () => {
    reputationTextClickListener && reputationTextClickListener()
  }

  const getVerificationText = () => {
    if (emailVerified && imageAdded && phoneVerified && truYouJoined && facebookConnected) {
      return translate("profile-stack.verification-banner.ydid-it")
    } else {
      return translate("profile-stack.verification-banner.verify-profile-to-build-rep")
    }
  }
  const getTruYouText = () => {
    if (truYouJoined) {
      return translate("profile-stack.verification-banner.truyverified")
    } else if (truYouVerificationStatus && truYouVerificationStatus === OuTruYouStatus.TruyouPending) {
      return translate("profile-stack.verification-banner.truyprocessing")
    } else {
      return translate("profile-stack.verification-banner.join-truyou")
    }
  }
  const getTruYouSVG = () => {
    if (truYouJoined) {
      return AccountVerificationTruYouJoined
    } else if (truYouVerificationStatus && truYouVerificationStatus === OuTruYouStatus.TruyouPending) {
      return AccountVerificationTruYouPending
    } else {
      return AccountVerificationTruYouNotJoined
    }
  }

  return (
    <Stack direction="column" childSeparationStep={4} testID={testID || "uc-lib.profile-verification"}>
      <Center>
        <Text textType="primaryBody1" testID="redibs-ucl.account-verification.verification-text">
          {getVerificationText()}
        </Text>
      </Center>
      <Flex axisDistribution="center" direction="row" grow={1}>
        <VerificationIndicator
          icon={emailVerified ? AccountVerificationEmailVerified : AccountVerificationEmailNotVerified}
          text={
            emailVerified
              ? translate("profile-stack.verification-banner.email-verified")
              : translate("profile-stack.verification-banner.verify-email")
          }
          onClick={emailClickListener}
          testID="redibs-ucl.account-verification.email"
        />
        <VerificationIndicator
          icon={imageAdded ? AccountVerificationImageAdded : AccountVerificationImageNotAdded}
          text={
            imageAdded
              ? translate("profile-stack.verification-banner.image-added")
              : translate("profile-stack.verification-banner.add-image")
          }
          onClick={imageAddedClickListener}
          testID="redibs-ucl.account-verification.image"
        />
        <VerificationIndicator
          icon={phoneVerified ? AccountVerificationPhoneVerified : AccountVerificationPhoneNotVerified}
          text={
            phoneVerified
              ? translate("profile-stack.verification-banner.phone-verified")
              : translate("profile-stack.verification-banner.verify-phone")
          }
          onClick={phoneVerifiedClickListener}
          testID="redibs-ucl.account-verification.phone"
        />
        <VerificationIndicator
          icon={getTruYouSVG()}
          text={getTruYouText()}
          onClick={truYouJoinedClickListener}
          testID="redibs-ucl.account-verification.tru-you"
        />
        <VerificationIndicator
          icon={facebookConnected ? AccountVerificationFacebookConnected : AccountVerificationFacebookNotConnected}
          text={
            facebookConnected
              ? translate("profile-stack.verification-banner.facebook-connected")
              : translate("profile-stack.verification-banner.connect-facebook")
          }
          onClick={facebookConnectedClickListener}
          testID="redibs-ucl.account-verification.facebook"
        />
      </Flex>
      <Flex grow={1}>
        <Flex
          direction="column"
          height={BUILD_REPUTATION_BUTTON_HEIGHT}
          grow={1}
          axisDistribution="center"
          crossAxisDistribution="center"
        >
          <Button
            onClick={onLearnHowToImproveReputationClicked}
            buttonSize="small"
            buttonType="flat"
            title={translate("profile-stack.verification-banner.learn-how-rep-improves-your-profile")}
            testID="redibs-ucl.account-verification.reputation-button"
          />
        </Flex>
      </Flex>
      <Spacer direction="column" sizeStep={1} />
    </Stack>
  )
}
