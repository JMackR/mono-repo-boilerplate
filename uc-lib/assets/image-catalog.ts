// Redibs Image Catalog
// Welcome to the catalog for all of our scalable vector graphics.
// Check out this doc for information on how to use this catalog and add to it:
// https://redibs.atlassian.net/wiki/spaces//pages/667779133/Adding+SVG+files+to+Client+Applications

import { deepFreeze } from "shared-lib/utilities/object-utils"
import { LocalSVGSource } from "../controls/image/svg/svg.props-base"

// TabBar
import HomeFill from "./svgs/navigation/home-fill.svg"
import HomeOutline from "./svgs/navigation/home-outline.svg"
import NotificationsFill from "./svgs/navigation/notifications-fill.svg"
import NotificationsOutline from "./svgs/navigation/notifications-outline.svg"
import PostFill from "./svgs/navigation/post-fill.svg"
import PostOutline from "./svgs/navigation/post-outline.svg"
import MyOffersFill from "./svgs/navigation/my-offers-fill.svg"
import MyOffersOutline from "./svgs/navigation/my-offers-outline.svg"
import ProfileFill from "./svgs/navigation/profile-fill.svg"
import ProfileOutline from "./svgs/navigation/profile-outline.svg"
import RNLocationPinOutline from "./svgs/location/location-line-pin.svg"
import LockTwoFactorAuthentication from "./svgs/account_verification/account-secure-2-fa.svg"
import RNShippingTruckFill from "./svgs/shipping/shipping-fill-shipping-truck.svg"
import RNShippingTruckFillBlue from "./svgs/shipping/shipping-fill-shipping-truck-blue.svg"
import RNShippingTruckLine from "./svgs/shipping/shipping-truck-line.svg"
import RNShippingBoxLine from "./svgs/shipping/shipping-box-check.svg"
import RNPaymentsFillCreditCard from "./svgs/payments/payments-fill-credit-card.svg"
import RNPaymentsFillLock from "./svgs/payments/payments-fill-lock.svg"

export const TabBarHomeFill: LocalSVGSource = deepFreeze({
  SVG: HomeFill,
})
export const TabBarHomeOutline: LocalSVGSource = deepFreeze({
  SVG: HomeOutline,
})
export const TabBarNotificationsFill: LocalSVGSource = deepFreeze({
  SVG: NotificationsFill,
})
export const TabBarNotificationsOutline: LocalSVGSource = deepFreeze({
  SVG: NotificationsOutline,
})
export const TabBarPostFill: LocalSVGSource = deepFreeze({
  SVG: PostFill,
})
export const TabBarPostOutline: LocalSVGSource = deepFreeze({
  SVG: PostOutline,
})
export const TabBarMyOffersFill: LocalSVGSource = deepFreeze({
  SVG: MyOffersFill,
})
export const TabBarMyOffersOutline: LocalSVGSource = deepFreeze({
  SVG: MyOffersOutline,
})
export const TabBarProfileFill: LocalSVGSource = deepFreeze({
  SVG: ProfileFill,
})
export const TabBarProfileOutline: LocalSVGSource = deepFreeze({
  SVG: ProfileOutline,
})

// Navigation
import OpenNewTabOutline from "./svgs/navigation/open-new-tab-outline.svg"
import RNCategoriesOutline from "./svgs/navigation/categories-outline.svg"

export const CategoriesOutline: LocalSVGSource = deepFreeze({
  SVG: RNCategoriesOutline,
})

export const OpenNewTabIcon: LocalSVGSource = deepFreeze({
  SVG: OpenNewTabOutline,
})

// Loading
import LoadingSpinner from "./svgs/loading/alerts-loading.svg"
import RNErrorIcon from "./svgs/loading/error.svg"

export const LoadingSpinnerIcon: LocalSVGSource = deepFreeze({
  SVG: LoadingSpinner,
})

export const ErrorIcon: LocalSVGSource = deepFreeze({
  SVG: RNErrorIcon,
})

import RNHomeImage1 from "./svgs/brand/home-image-1.svg"
import RNHomeSignup from "./svgs/brand/home-signup.svg"
import RNHomeSignin from "./svgs/brand/home-signin.svg"
import RNHomeThanks from "./svgs/brand/home-thanks.svg"

export const HomeImage1: LocalSVGSource = deepFreeze({
  SVG: RNHomeImage1,
})
export const HomeSignup: LocalSVGSource = deepFreeze({
  SVG: RNHomeSignup,
})
export const HomeSignin: LocalSVGSource = deepFreeze({
  SVG: RNHomeSignin,
})
export const HomeThanks: LocalSVGSource = deepFreeze({
  SVG: RNHomeThanks,
})
// Location
import RNLocationPinFill from "./svgs/location/location-fill-pin.svg"
export const LocationPinFill: LocalSVGSource = deepFreeze({
  SVG: RNLocationPinFill,
})

// Inbox
import RNEmailEnvelope from "./svgs/communication/email-envelope.svg"
import CarBuyerProfile from "./svgs/communication/car-buyer-profile.svg"
import LightningBolt from "./svgs/communication/lightning-bolt.svg"

export const EmailEnvelope: LocalSVGSource = deepFreeze({
  SVG: RNEmailEnvelope,
})

export const CarBuyerProfileIcon: LocalSVGSource = deepFreeze({
  SVG: CarBuyerProfile,
})

export const LightningBoltIcon: LocalSVGSource = deepFreeze({
  SVG: LightningBolt,
})

// Actions
import RNShareLine from "./svgs/actions/actions-share-line.svg"
import RNShare from "./svgs/actions/actions-share.svg"
import SettingsFill from "./svgs/actions/actions-settings-fill.svg"
import SettingsLine from "./svgs/actions/actions-settings-line.svg"
import RNHeartFill from "./svgs/actions/actions-heart-fill.svg"
import RNHeartLine from "./svgs/actions/actions-heart-line.svg"
import CloseLine from "./svgs/actions/actions-close-line.svg"
import Menu from "./svgs/actions/actions-menu-line.svg"
import AndroidChevron from "./svgs/actions/actions-chevron-android-line.svg"
import LeftChevron from "./svgs/actions/actions-chevron-left-line.svg"
import RightChevron from "./svgs/actions/actions-chevron-right-line.svg"
import UpChevron from "./svgs/actions/actions-chevron-up-line.svg"
import DownChevron from "./svgs/actions/actions-chevron-down-line.svg"
import RNSearch from "./svgs/actions/actions-line-search.svg"
import RNAlertLine from "./svgs/actions/actions-alert-line.svg"
import RNAlertFill from "./svgs/actions/actions-alert-fill.svg"
import RNDeleteLine from "./svgs/actions/actions-delete-line.svg"
import RNDropDownFill from "./svgs/actions/actions-dropdown-fill.svg"
import RNArrowUpLine from "./svgs/actions/actions-arrow-up-line.svg"
import RNFilterIcon from "./svgs/actions/actions-filter.svg"
import RNSortIcon from "./svgs/actions/actions-sorting.svg"
import ReportFillSvg from "./svgs/actions/actions-report-flag-fill.svg"
import ReportLineSvg from "./svgs/actions/actions-report-flag-line.svg"
import TrashFill from "./svgs/actions/actions-trash-fill.svg"
import TrashCircleFill from "./svgs/actions/actions-trash-circle-fill.svg"
import ChatCheck from "./svgs/chat/chat-check.svg"
import EllipsisFill from "./svgs/actions/actions-ellipsis-fill.svg"
import Plus from "./svgs/actions/action-add-plus-icon.svg"
import EditPencil from "./svgs/actions/actions-edit-pencil.svg"
import OpenNewTab from "./svgs/actions/actions-open-new-tab.svg"
import Download from "./svgs/actions/download.svg"
import Clear from "./svgs/actions/actions-clear.svg"

export const ActionSettings: LocalSVGSource = deepFreeze({
  SVG: SettingsFill,
})
export const ActionSettingsLine: LocalSVGSource = deepFreeze({
  SVG: SettingsLine,
})
export const Search: LocalSVGSource = deepFreeze({
  SVG: RNSearch,
})
export const AlertLine: LocalSVGSource = deepFreeze({
  SVG: RNAlertLine,
})
export const AlertFill: LocalSVGSource = deepFreeze({
  SVG: RNAlertFill,
})
export const ActionClose: LocalSVGSource = deepFreeze({
  SVG: CloseLine,
})
export const ActionMenu: LocalSVGSource = deepFreeze({
  SVG: Menu,
})
export const ActionAndroidChevron: LocalSVGSource = deepFreeze({
  SVG: AndroidChevron,
})
export const ActionLeftChevron: LocalSVGSource = deepFreeze({
  SVG: LeftChevron,
})
export const ActionRightChevron: LocalSVGSource = deepFreeze({
  SVG: RightChevron,
})
export const ActionUpChevron: LocalSVGSource = deepFreeze({
  SVG: UpChevron,
})
export const ActionDownChevron: LocalSVGSource = deepFreeze({
  SVG: DownChevron,
})
export const HeartFill: LocalSVGSource = deepFreeze({
  SVG: RNHeartFill,
})
export const HeartLine: LocalSVGSource = deepFreeze({
  SVG: RNHeartLine,
})

export const DeleteLine: LocalSVGSource = deepFreeze({
  SVG: RNDeleteLine,
})
export const DropDownFill: LocalSVGSource = deepFreeze({
  SVG: RNDropDownFill,
})

export const ArrowUpLine: LocalSVGSource = deepFreeze({
  SVG: RNArrowUpLine,
})

export const ShippingBoxLine: LocalSVGSource = deepFreeze({
  SVG: RNShippingBoxLine,
})

export const ShippingTruckLine: LocalSVGSource = deepFreeze({
  SVG: RNShippingTruckLine,
})

export const ShippingTruckFill: LocalSVGSource = deepFreeze({
  SVG: RNShippingTruckFill,
})

export const ShippingTruckFillBlue: LocalSVGSource = deepFreeze({
  SVG: RNShippingTruckFillBlue,
})

export const PaymentsFillCreditCard: LocalSVGSource = deepFreeze({
  SVG: RNPaymentsFillCreditCard,
})

export const PaymentsFillLock: LocalSVGSource = deepFreeze({
  SVG: RNPaymentsFillLock,
})

export const ShareLine: LocalSVGSource = deepFreeze({
  SVG: RNShareLine,
})
export const Share: LocalSVGSource = deepFreeze({
  SVG: RNShare,
})
export const FilterIcon: LocalSVGSource = deepFreeze({
  SVG: RNFilterIcon,
})
export const SortIcon: LocalSVGSource = deepFreeze({
  SVG: RNSortIcon,
})
export const ActionReportFill: LocalSVGSource = deepFreeze({
  SVG: ReportFillSvg,
})
export const ActionReportLine: LocalSVGSource = deepFreeze({
  SVG: ReportLineSvg,
})
export const ActionTrashFill: LocalSVGSource = deepFreeze({
  SVG: TrashFill,
})
export const ActionTrashCircleFill: LocalSVGSource = deepFreeze({
  SVG: TrashCircleFill,
})
export const ChatCheckIcon: LocalSVGSource = deepFreeze({
  SVG: ChatCheck,
})
export const ActionEllipsisFill: LocalSVGSource = deepFreeze({
  SVG: EllipsisFill,
})
export const PlusIcon: LocalSVGSource = deepFreeze({
  SVG: Plus,
})
export const ActionEditPencil: LocalSVGSource = deepFreeze({
  SVG: EditPencil,
})
export const ActionOpenNewTab: LocalSVGSource = deepFreeze({
  SVG: OpenNewTab,
})

export const ActionDownload: LocalSVGSource = deepFreeze({
  SVG: Download,
})

export const ActionClear: LocalSVGSource = deepFreeze({
  SVG: Clear,
})
// Selection
import RNCheckBoxSelectedDisabled from "./svgs/selection/checkbox-selected-disabled.svg"
import RNCheckBoxUnselectedDisabled from "./svgs/selection/checkbox-unselected-disabled.svg"
import RNCheckBoxSelected from "./svgs/selection/checkbox-selected.svg"
import RNCheckBoxUnselected from "./svgs/selection/checkbox-unselected.svg"
import RNRadioButtonSelectedDisabled from "./svgs/selection/radiobutton-selected-disabled.svg"
import RNRadioButtonUnselectedDisabled from "./svgs/selection/radiobutton-unselected-disabled.svg"
import RNRadioButtonSelected from "./svgs/selection/radiobutton-selected.svg"
import RNRadioButtonUnselected from "./svgs/selection/radiobutton-unselected.svg"

export const CheckBoxSelectedDisabled: LocalSVGSource = deepFreeze({
  SVG: RNCheckBoxSelectedDisabled,
})
export const CheckBoxUnselectedDisabled: LocalSVGSource = deepFreeze({
  SVG: RNCheckBoxUnselectedDisabled,
})
export const CheckBoxSelected: LocalSVGSource = deepFreeze({
  SVG: RNCheckBoxSelected,
})
export const CheckBoxUnselected: LocalSVGSource = deepFreeze({
  SVG: RNCheckBoxUnselected,
})
export const RadioButtonSelectedDisabled: LocalSVGSource = deepFreeze({
  SVG: RNRadioButtonSelectedDisabled,
})
export const RadioButtonUnselectedDisabled: LocalSVGSource = deepFreeze({
  SVG: RNRadioButtonUnselectedDisabled,
})
export const RadioButtonSelected: LocalSVGSource = deepFreeze({
  SVG: RNRadioButtonSelected,
})
export const RadioButtonUnselected: LocalSVGSource = deepFreeze({
  SVG: RNRadioButtonUnselected,
})

// Alerts
import RNAlertHelpFill from "./svgs/alerts/alerts-help-fill.svg"
import RNAlertHelpLine from "./svgs/alerts/alerts-help-line.svg"
import RNAlertInfoLine from "./svgs/alerts/alerts-info-line.svg"

export const AlertHelpFill: LocalSVGSource = deepFreeze({
  SVG: RNAlertHelpFill,
})

export const AlertHelpLine: LocalSVGSource = deepFreeze({
  SVG: RNAlertHelpLine,
})

export const AlertInfoLine: LocalSVGSource = deepFreeze({
  SVG: RNAlertInfoLine,
})

// Social
import AppleIcon from "./svgs/social/apple.svg"
import FacebookIcon from "./svgs/social/facebook.svg"
import GoogleIcon from "./svgs/social/google.svg"
import EmailIcon from "./svgs/social/email.svg"
import TwitterIcon from "./svgs/social/twitter.svg"
import InstagramIcon from "./svgs/social/instagram.svg"
import LinkedinIcon from "./svgs/social/linkedin.svg"
import PinterestIcon from "./svgs/social/pinterest.svg"
import RNFacebookConnectedIcon from "./svgs/social/facebook-connected.svg"

export const SocialAppleIcon: LocalSVGSource = deepFreeze({
  SVG: AppleIcon,
})
export const SocialFacebookIcon: LocalSVGSource = deepFreeze({
  SVG: FacebookIcon,
})
export const SocialGoogleIcon: LocalSVGSource = deepFreeze({
  SVG: GoogleIcon,
})
export const SocialTwitterIcon: LocalSVGSource = deepFreeze({
  SVG: TwitterIcon,
})
export const SocialInstagramIcon: LocalSVGSource = deepFreeze({
  SVG: InstagramIcon,
})
export const SocialLinkedinIcon: LocalSVGSource = deepFreeze({
  SVG: LinkedinIcon,
})
export const SocialPinterestIcon: LocalSVGSource = deepFreeze({
  SVG: PinterestIcon,
})
export const SocialEmailIcon: LocalSVGSource = {
  SVG: EmailIcon,
}
export const FacebookConnectedIcon: LocalSVGSource = deepFreeze({
  SVG: RNFacebookConnectedIcon,
})

// Branding
import RNLogoCircle from "./svgs/brand/circle-primary-green.svg"
import RNLogoCircleSecondary from "./svgs/brand/circle-secondary.svg"
import RNLogoPrimary from "./svgs/brand/brand-logo-primary-green.svg"
import RNLogoPrimaryWithTag from "./svgs/brand/logo-primary-green-with-tagline.svg"
import AuthLanding from "./svgs/brand/auth-landing.svg"

export const AuthLandingImage: LocalSVGSource = deepFreeze({
  SVG: AuthLanding,
})

export const LogoCircle: LocalSVGSource = deepFreeze({
  SVG: RNLogoCircle,
})
export const LogoCircleSecondary: LocalSVGSource = deepFreeze({
  SVG: RNLogoCircleSecondary,
})
export const LogoPrimary: LocalSVGSource = deepFreeze({
  SVG: RNLogoPrimary,
})
export const LogoPrimaryWithTag: LocalSVGSource = deepFreeze({
  SVG: RNLogoPrimaryWithTag,
})

// Payments
import PaymentsLineCreditCard from "./svgs/payments/payments-line-credit-card.svg"
import StripeLock from "./svgs/payments/stripe-lock.svg"
import StripeLogoDarkMode from "./svgs/payments/stripe-logo-dark-mode.svg"
import StripeLogoLightMode from "./svgs/payments/stripe-logo-light-mode.svg"
import RNFastDepositCard from "./svgs/payments/fast-deposit-card.svg"
import RNPaymentCheckSample from "./svgs/payments/check-sample.svg"
import RNPaymentVisaCard from "./svgs/payments/payments-card-visa.svg"
import RNPaymentMasterCard from "./svgs/payments/payments-card-mastercard.svg"
import RNPaymentDiscoverCard from "./svgs/payments/payments-card-discover.svg"
import RNPaymentAMEXCard from "./svgs/payments/payments-card-amex.svg"
import RNPaymentDinersClubCard from "./svgs/payments/payments-card-dinersclub.svg"
import RNPaymentJCBCard from "./svgs/payments/payments-card-jcb.svg"
import RNPaymentApplePay from "./svgs/payments/payments-card-apple-pay.svg"
import RNPaymentGooglePay from "./svgs/payments/payments-card-google-pay.svg"

export const PaymentsCreditCardLineIcon: LocalSVGSource = deepFreeze({
  SVG: PaymentsLineCreditCard,
})

export const StripeLockIcon: LocalSVGSource = deepFreeze({
  SVG: StripeLock,
})

export const StripeLogoDarkModeIcon: LocalSVGSource = deepFreeze({
  SVG: StripeLogoDarkMode,
})

export const StripeLightModeIcon: LocalSVGSource = deepFreeze({
  SVG: StripeLogoLightMode,
})

export const FastDepositCard: LocalSVGSource = deepFreeze({
  SVG: RNFastDepositCard,
})

export const PaymentCheckSample: LocalSVGSource = deepFreeze({
  SVG: RNPaymentCheckSample,
})

export const PaymentVisaCard: LocalSVGSource = deepFreeze({
  SVG: RNPaymentVisaCard,
})

export const PaymentMasterCard: LocalSVGSource = deepFreeze({
  SVG: RNPaymentMasterCard,
})

export const PaymentDiscoverCard: LocalSVGSource = deepFreeze({
  SVG: RNPaymentDiscoverCard,
})

export const PaymentAMEXCard: LocalSVGSource = deepFreeze({
  SVG: RNPaymentAMEXCard,
})

export const PaymentDinersClubCard: LocalSVGSource = deepFreeze({
  SVG: RNPaymentDinersClubCard,
})

export const PaymentJCBCard: LocalSVGSource = deepFreeze({
  SVG: RNPaymentJCBCard,
})

export const PaymentApplePay: LocalSVGSource = deepFreeze({
  SVG: RNPaymentApplePay,
})

export const PaymentGooglePay: LocalSVGSource = deepFreeze({
  SVG: RNPaymentGooglePay,
})

// Promotions
import RNPromoFTUEOne from "./svgs/promotions/promo-ftue-1.svg"
import RNPromoFTUETwo from "./svgs/promotions/promo-ftue-2.svg"
import RNPromoFTUEThree from "./svgs/promotions/promo-ftue-3.svg"
import RNPromoFTUEFour from "./svgs/promotions/promo-ftue-4.svg"
import RNSellFasterManageImage from "./svgs/sell-faster/manage-top-image.svg"
import RNPromoSubscriptionGraph from "./svgs/promotions/promote-plus-graph.svg"

export const PromoFTUEOne: LocalSVGSource = deepFreeze({
  SVG: RNPromoFTUEOne,
})

export const PromoFTUETwo: LocalSVGSource = deepFreeze({
  SVG: RNPromoFTUETwo,
})

export const PromoFTUEThree: LocalSVGSource = deepFreeze({
  SVG: RNPromoFTUEThree,
})

export const PromoFTUEFour: LocalSVGSource = deepFreeze({
  SVG: RNPromoFTUEFour,
})

export const SellFasterManageImage: LocalSVGSource = deepFreeze({
  SVG: RNSellFasterManageImage,
})

export const PromoSubscriptionGraph: LocalSVGSource = deepFreeze({
  SVG: RNPromoSubscriptionGraph,
})

// Account Verification
import RNAccountVerificationEmailVerified from "./svgs/account_verification/account-email-verified.svg"
import RNAccountVerificationEmailNotVerifiedfrom from "./svgs/account_verification/account-email-not-verified.svg"
import RNAccountVerificationFacebookConnected from "./svgs/account_verification/account-facebook-connected.svg"
import RNAccountVerificationFacebookNotConnected from "./svgs/account_verification/account-facebook-not-connected.svg"
import RNAccountVerificationImageAdded from "./svgs/account_verification/account-image-added.svg"
import RNAccountVerificationImageNotAdded from "./svgs/account_verification/account-image-not-added.svg"
import RNAccountVerificationPhoneNotVerified from "./svgs/account_verification/account-phone-not-verified.svg"
import RNAccountVerificationPhoneVerified from "./svgs/account_verification/account-phone-verified.svg"
import RNAccountVerificationTruYouJoined from "./svgs/account_verification/account-tru-you-joined.svg"
import RNAccountVerificationTruYouNotJoined from "./svgs/account_verification/account-tru-you-not-joined.svg"
import RNAccountVerificationTruYouPending from "./svgs/account_verification/account-tru-you-pending.svg"
import RNAccountVerificationPhoneLine from "./svgs/account_verification/phone-line.svg"

export const AccountVerificationEmailNotVerified: LocalSVGSource = deepFreeze({
  SVG: RNAccountVerificationEmailNotVerifiedfrom,
})
export const AccountVerificationEmailVerified: LocalSVGSource = deepFreeze({
  SVG: RNAccountVerificationEmailVerified,
})
export const AccountVerificationFacebookConnected: LocalSVGSource = deepFreeze({
  SVG: RNAccountVerificationFacebookConnected,
})
export const AccountVerificationFacebookNotConnected: LocalSVGSource = deepFreeze({
  SVG: RNAccountVerificationFacebookNotConnected,
})
export const AccountVerificationImageAdded: LocalSVGSource = deepFreeze({
  SVG: RNAccountVerificationImageAdded,
})
export const AccountVerificationImageNotAdded: LocalSVGSource = deepFreeze({
  SVG: RNAccountVerificationImageNotAdded,
})
export const AccountVerificationPhoneNotVerified: LocalSVGSource = deepFreeze({
  SVG: RNAccountVerificationPhoneNotVerified,
})
export const AccountVerificationPhoneVerified: LocalSVGSource = deepFreeze({
  SVG: RNAccountVerificationPhoneVerified,
})
export const AccountVerificationTruYouJoined: LocalSVGSource = deepFreeze({
  SVG: RNAccountVerificationTruYouJoined,
})
export const AccountVerificationTruYouNotJoined: LocalSVGSource = deepFreeze({
  SVG: RNAccountVerificationTruYouNotJoined,
})
export const AccountVerificationTruYouPending: LocalSVGSource = deepFreeze({
  SVG: RNAccountVerificationTruYouPending,
})

export const AccountVerificationPhoneLine: LocalSVGSource = deepFreeze({
  SVG: RNAccountVerificationPhoneLine,
})

// Badge
import BadgeTruYouCircle from "./svgs/badges/badge-tru-you-circle.svg"
import BadgeVerifiedDealer from "./svgs/badges/badge-verified-dealer.svg"
import BadgeVerifiedProSeller from "./svgs/badges/badge-verified-pro-seller.svg"

export const BadgeTruYouCircleIcon: LocalSVGSource = deepFreeze({
  SVG: BadgeTruYouCircle,
})

export const BadgeVerifiedDealerIcon: LocalSVGSource = deepFreeze({
  SVG: BadgeVerifiedDealer,
})

export const BadgeVerifiedProSellerIcon: LocalSVGSource = deepFreeze({
  SVG: BadgeVerifiedProSeller,
})

// Avatar
import RNAvatarIcon from "./svgs/avatar/avatar-icon.svg"

export const AvatarIcon: LocalSVGSource = deepFreeze({
  SVG: RNAvatarIcon,
})

// Profile
import ProfileFillStoreFront from "./svgs/profile/profile-fill-storefront.svg"
import ProfileLineBuying from "./svgs/profile/profile-line-buying.svg"
import ProfileLineCommunityActions from "./svgs/profile/profile-line-community-actions.svg"
import ProfileLineHelp from "./svgs/profile/profile-line-help.svg"
import ProfileLineLink from "./svgs/profile/profile-line-link.svg"
import ProfileLinePromotePlus from "./svgs/profile/profile-line-promote-plus.svg"
import ProfileLineReceipt from "./svgs/profile/profile-line-receipt.svg"
import ProfileLineSearchAlerts from "./svgs/profile/profile-line-search-alerts.svg"
import ProfileLineSelling from "./svgs/profile/profile-line-selling.svg"
import ProfileLineSettings from "./svgs/profile/profile-line-settings.svg"
import ProfileLineStoreFront from "./svgs/profile/profile-line-storefront.svg"
import ProfileFillGroupIcon from "./svgs/profile/profile-fill-group.svg"
import ProfileShareVanityUrlSvg from "./svgs/profile/share_link_illo.svg"
import ProfileInviteFriendsSvg from "./svgs/profile/profile-invite-friends.svg"
import ProfilebuyingSvg from "./svgs/profile/profile-buying.svg"

export const ProfileItemBuyingIcon: LocalSVGSource = deepFreeze({
  SVG: ProfilebuyingSvg,
})

export const ProfileStoreFrontFillIcon: LocalSVGSource = deepFreeze({
  SVG: ProfileFillStoreFront,
})

export const ProfileStoreFrontLineIcon: LocalSVGSource = deepFreeze({
  SVG: ProfileLineStoreFront,
})

export const ProfileBuyingIcon: LocalSVGSource = deepFreeze({
  SVG: ProfileLineBuying,
})

export const ProfileCommunityActionsIcon: LocalSVGSource = deepFreeze({
  SVG: ProfileLineCommunityActions,
})

export const ProfileLinkIcon: LocalSVGSource = deepFreeze({
  SVG: ProfileLineLink,
})

export const ProfileHelpIcon: LocalSVGSource = deepFreeze({
  SVG: ProfileLineHelp,
})

export const ProfilePromotePlusIcon: LocalSVGSource = deepFreeze({
  SVG: ProfileLinePromotePlus,
})

export const ProfileReceiptIcon: LocalSVGSource = deepFreeze({
  SVG: ProfileLineReceipt,
})

export const ProfileLineSettingsIcon: LocalSVGSource = deepFreeze({
  SVG: ProfileLineSettings,
})

export const ProfileSellingIcon: LocalSVGSource = deepFreeze({
  SVG: ProfileLineSelling,
})

export const ProfileSearchAlertsIcon: LocalSVGSource = deepFreeze({
  SVG: ProfileLineSearchAlerts,
})

export const ProfileGroupFillIcon: LocalSVGSource = deepFreeze({
  SVG: ProfileFillGroupIcon,
})

export const ProfileShareVanityUrlGraphic: LocalSVGSource = deepFreeze({
  SVG: ProfileShareVanityUrlSvg,
})

export const ProfileInviteFriendsBanner: LocalSVGSource = deepFreeze({
  SVG: ProfileInviteFriendsSvg,
})

export const TwoFactorLock: LocalSVGSource = deepFreeze({
  SVG: LockTwoFactorAuthentication,
})

// Ratings
import RatingsEmptyStar from "./svgs/rating/rating-fill-no-star.svg"
import RatingsHalfStar from "./svgs/rating/rating-fill-half-star.svg"
import RatingsFullStar from "./svgs/rating/rating-fill-full-star.svg"

export const RatingsEmptyStarIcon: LocalSVGSource = deepFreeze({
  SVG: RatingsEmptyStar,
})
export const RatingsHalfStarIcon: LocalSVGSource = deepFreeze({
  SVG: RatingsHalfStar,
})
export const RatingsFullStarIcon: LocalSVGSource = deepFreeze({
  SVG: RatingsFullStar,
})

// Permissions
export const CameraOutline: LocalSVGSource = deepFreeze({
  SVG: PostOutline,
})

export const LocationPinOutline: LocalSVGSource = deepFreeze({
  SVG: RNLocationPinOutline,
})

export const NotificationOutline: LocalSVGSource = deepFreeze({
  SVG: NotificationsOutline,
})

// Chat
import RNMessagePending from "./svgs/chat/chat-message-pending.svg"
import RNMessageSentSuccess from "./svgs/chat/chat-message-sent-success.svg"
import RNChatReceipt from "./svgs/chat/chat-receipt.svg"
import RNChatInfo from "./svgs/chat/info.svg"
import RNChatPhotoSelect from "./svgs/chat/chat-message-photo.svg"

export const MessageSentSuccess: LocalSVGSource = deepFreeze({
  SVG: RNMessageSentSuccess,
})

export const MessagePending: LocalSVGSource = deepFreeze({
  SVG: RNMessagePending,
})

export const ChatReceipt: LocalSVGSource = deepFreeze({
  SVG: RNChatReceipt,
})

export const ChatInfo: LocalSVGSource = deepFreeze({
  SVG: RNChatInfo,
})

export const ChatPhotoSelect: LocalSVGSource = deepFreeze({
  SVG: RNChatPhotoSelect,
})
// Sell Faster
import RNSellFasterArrow from "./svgs/sell-faster/sell-faster-arrow.svg"

export const SellFasterArrow: LocalSVGSource = deepFreeze({
  SVG: RNSellFasterArrow,
})

import RNSellFasterArrowLarge from "./svgs/sell-faster/sell-faster-arrow-large.svg"

export const SellFasterArrowLarge: LocalSVGSource = deepFreeze({
  SVG: RNSellFasterArrowLarge,
})

import RNSellItemAnalyticsIcon from "./svgs/sell-faster/sell-item-analytics.svg"

export const SellItemAnalyticsIcon: LocalSVGSource = deepFreeze({
  SVG: RNSellItemAnalyticsIcon,
})

// PostFlow
import RNSelectPhotoIcon from "./svgs/onboarding/select-photo.svg"
import RNAutosFillCarFront from "./svgs/onboarding/autos-fill-car-front.svg"
import RNPhotoRotate from "./svgs/onboarding/photo-rotate.svg"
import RNUsMap from "./svgs/onboarding/shipping-ftue-us-map.svg"
import RNLabelAndEnvelope from "./svgs/onboarding/shipping-ftue-label-and-envelope.svg"
import RNShippingFTUECash from "./svgs/onboarding/shipping-ftue-cash.svg"

export const SelectPhotoIcon: LocalSVGSource = deepFreeze({
  SVG: RNSelectPhotoIcon,
})

export const AutosFillCarFront: LocalSVGSource = deepFreeze({
  SVG: RNAutosFillCarFront,
})

export const PhotoRotateIcon: LocalSVGSource = deepFreeze({
  SVG: RNPhotoRotate,
})

export const UsMap: LocalSVGSource = deepFreeze({
  SVG: RNUsMap,
})

export const LabelAndEnvelope: LocalSVGSource = deepFreeze({
  SVG: RNLabelAndEnvelope,
})

export const ShippingFTUECash: LocalSVGSource = deepFreeze({
  SVG: RNShippingFTUECash,
})

// Autos
import RNMeterIcon from "./svgs/autos/meter.svg"
import RNGasTankIcon from "./svgs/autos/gas-tank.svg"
import RNCheckIcon from "./svgs/autos/check.svg"
import RNSuccessIcon from "./svgs/autos/success.svg"
import RNWarningIcon from "./svgs/autos/warning.svg"
import RNCalendarIcon from "./svgs/autos/calendar.svg"
import RNWebsiteIcon from "./svgs/autos/website.svg"
import RNDealerBadge from "./svgs/autos/verified-auto-dealer.svg"
import RNBHPHDealerBadge from "./svgs/autos/bhph-dealer.svg"
import RNPhoneIcon from "./svgs/autos/phone.svg"

export const MeterIcon: LocalSVGSource = deepFreeze({
  SVG: RNMeterIcon,
})

export const GasTankIcon: LocalSVGSource = deepFreeze({
  SVG: RNGasTankIcon,
})

export const CheckIcon: LocalSVGSource = deepFreeze({
  SVG: RNCheckIcon,
})

export const SuccessIcon: LocalSVGSource = deepFreeze({
  SVG: RNSuccessIcon,
})

export const WarningIcon: LocalSVGSource = deepFreeze({
  SVG: RNWarningIcon,
})

export const CalendarIcon: LocalSVGSource = deepFreeze({
  SVG: RNCalendarIcon,
})

export const WebsiteIcon: LocalSVGSource = deepFreeze({
  SVG: RNWebsiteIcon,
})

export const DealerBadge: LocalSVGSource = deepFreeze({
  SVG: RNDealerBadge,
})

export const BHPHDealerBadge: LocalSVGSource = deepFreeze({
  SVG: RNBHPHDealerBadge,
})

export const PhoneIcon: LocalSVGSource = deepFreeze({
  SVG: RNPhoneIcon,
})

// Camera
import RNCameraFlashLightAuto from "./svgs/camera/camera-auto-flash.svg"
import RNCameraFlashLightOn from "./svgs/camera/camera-flash.svg"
import RNCameraFlashLightOff from "./svgs/camera/camera-no-flash.svg"
import RNCameraFill from "./svgs/camera/camera-fill.svg"
import RNCameraCapture from "./svgs/camera/camera-capture.svg"
import RNCameraFlip from "./svgs/camera/camera-flip.svg"

export const CameraFlashLightAuto: LocalSVGSource = deepFreeze({
  SVG: RNCameraFlashLightAuto,
})
export const CameraFlashLightOn: LocalSVGSource = deepFreeze({
  SVG: RNCameraFlashLightOn,
})
export const CameraFlashLightOff: LocalSVGSource = deepFreeze({
  SVG: RNCameraFlashLightOff,
})
export const CameraFill: LocalSVGSource = deepFreeze({
  SVG: RNCameraFill,
})
export const CameraCapture: LocalSVGSource = deepFreeze({
  SVG: RNCameraCapture,
})
export const CameraFlip: LocalSVGSource = deepFreeze({
  SVG: RNCameraFlip,
})

// Shipping
import RNShippingPackage from "./svgs/shipping/shipping-package.svg"

export const ShippingPackage: LocalSVGSource = deepFreeze({
  SVG: RNShippingPackage,
})

// Self Resolution
import RNSelfResolutionInspectItem from "./svgs/self-resolution/inspect.svg"
import RNSelfResolutionAddPhoto from "./svgs/self-resolution/add-photo.svg"
import RNSelfResolutionEmail from "./svgs/self-resolution/email.svg"
import RNSelfResolutionShippingBox from "./svgs/self-resolution/shipping-box.svg"
import RNSelfResolutionMoneyBag from "./svgs/self-resolution/money-bag.svg"
import RNSelfResolutionReturnBox from "./svgs/self-resolution/return.svg"
import RNSelfResolutionReturnBoxDisabled from "./svgs/self-resolution/self-resolution-window-expired.svg"

export const InspectItem: LocalSVGSource = deepFreeze({
  SVG: RNSelfResolutionInspectItem,
})

export const SelfResolutionAddPhoto: LocalSVGSource = deepFreeze({
  SVG: RNSelfResolutionAddPhoto,
})

export const SelfResolutionEmail: LocalSVGSource = deepFreeze({
  SVG: RNSelfResolutionEmail,
})

export const SelfResolutionShippingBox: LocalSVGSource = deepFreeze({
  SVG: RNSelfResolutionShippingBox,
})

export const SelfResolutionMoneyBag: LocalSVGSource = deepFreeze({
  SVG: RNSelfResolutionMoneyBag,
})

export const SelfResolutionReturnBox: LocalSVGSource = deepFreeze({
  SVG: RNSelfResolutionReturnBox,
})

export const SelfResolutionReturnBoxDisabled: LocalSVGSource = deepFreeze({
  SVG: RNSelfResolutionReturnBoxDisabled,
})

// Listing

import RNProPurchaseProtectionShield from "./svgs/listing/shield.svg"
import SavedList from "./svgs/saved/saved-list-icon.svg"
import QuickSaveList from "./svgs/saved/quick-save.svg"

export const ProPurchaseProtectionShield: LocalSVGSource = deepFreeze({
  SVG: RNProPurchaseProtectionShield,
})

export const SavedListIcon: LocalSVGSource = deepFreeze({
  SVG: SavedList,
})

export const QuickSaveListIcon: LocalSVGSource = deepFreeze({
  SVG: QuickSaveList,
})

// Meetup
import CommunityMeetupLibrary from "./svgs/meetup/library.svg"
import RNCommunityMeetupPoliceStation from "./svgs/meetup/police-station.svg"
import RNCommunityMeetupStore from "./svgs/meetup/store.svg"

export const CommunityMeetupLibraryIcon: LocalSVGSource = deepFreeze({
  SVG: CommunityMeetupLibrary,
})

export const CommunityMeetupPoliceStation: LocalSVGSource = deepFreeze({
  SVG: RNCommunityMeetupPoliceStation,
})

export const CommunityMeetupStore: LocalSVGSource = deepFreeze({
  SVG: RNCommunityMeetupStore,
})

// Infra
import RNErrorBearFailure from "./svgs/infra/error-bear-failure.svg"
import RNErrorBearMaintenance from "./svgs/infra/error-bear-maintenance.svg"
import RNErrorBearShipping from "./svgs/infra/error-bear-shipping.svg"

export const ErrorBearFailure: LocalSVGSource = deepFreeze({
  SVG: RNErrorBearFailure,
})

export const ErrorBearMaintenance: LocalSVGSource = deepFreeze({
  SVG: RNErrorBearMaintenance,
})

export const ErrorBearShipping: LocalSVGSource = deepFreeze({
  SVG: RNErrorBearShipping,
})

// Merchant

import RNOrderConfirmation from "./svgs/merchant/order-confirmation.svg"

export const OrderConfirmation: LocalSVGSource = deepFreeze({
  SVG: RNOrderConfirmation,
})

// Statues of portfolio list

import ListStatusQualifying from "./svgs/list-status/qualifying.svg"

export const PortfolioListStatusQualifying: LocalSVGSource = deepFreeze({
  SVG: ListStatusQualifying,
})

import ListStatusPitching from "./svgs/list-status/pitching.svg"

export const PortfolioListStatusPitching: LocalSVGSource = deepFreeze({
  SVG: ListStatusPitching,
})

import ListStatusContract from "./svgs/list-status/contract.svg"

export const PortfolioListStatusContract: LocalSVGSource = deepFreeze({
  SVG: ListStatusContract,
})

import ListStatusSigned from "./svgs/list-status/signed.svg"

export const PortfolioListStatusSigned: LocalSVGSource = deepFreeze({
  SVG: ListStatusSigned,
})

import ListStatusFunded from "./svgs/list-status/funded.svg"

export const PortfolioListStatusFunded: LocalSVGSource = deepFreeze({
  SVG: ListStatusFunded,
})
