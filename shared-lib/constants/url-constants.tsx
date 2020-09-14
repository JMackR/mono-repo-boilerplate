import memoize from "lodash.memoize"
import { Urls, Url, QueryParamObject } from "../utilities"

export const WEBVIEW_WHITELIST = ["redibs.com", "help.redibs.com", "redibs-stg.com", "redibs-int.com"]
// This blacklist prevents unexpectedly passing requests from one environment to another
// e.g uat auth to help.mobile.com
export const WEBVIEW_HOSTNAME_REQUEST_HEADER_BLACKLIST = ["help.redibs.com"]

export interface WebViewLinks {
  RedibsAbout: string
  RedibsTerms: string
  redibsPrivacy: string
  HelpCenter: string
  CommunityForum: string
  ShippingFTUE: string
  VerifyPhoneWhatsThis: string
  MessagingTips: string
  AccountInviteHelp: string
  ShippingPolicyHelp: string
  ShippingParcleHelp: string
  PurchaseProtectionHelp: string
  ShippingWIMMHelp: string
  BuyerProtectionForm: (orderId?: string) => string
  SellerShippingPolicyHelp: string
  BuyerShippingPolicyHelp: string
  PaymentMethodHelp: string
  DepositMethodHelp: string
  FastDepositHelp: string
  KYCHelp: string
  ManagePromotionsHelp: string
  PromotionFTUEHelp: string
  ReportUserItemHelp: string
  TruYouVerifyHelp: string
  PromotionHelp: string
  ImproveReputationHelp: string
  MoreReviewsLink: (actionPath: string) => string
  PublicProfileByUserId: (userId: number) => string
}

export const createWebViewLinks = memoize((BASE_URL: string) => {
  const HELP_CENTER_URL = "https://help.redibs.com"
  const WEBVIEW_QUERY_PARAM = "?flavour=app"

  const appHelpLink = (helpPath: string) => {
    return BASE_URL + "/app/help/" + helpPath + "/" + WEBVIEW_QUERY_PARAM
  }

  const helpCenterLink = (helpArticleId: string) => {
    return HELP_CENTER_URL + "/hc/en-us/articles/" + helpArticleId + "/" + WEBVIEW_QUERY_PARAM
  }

  const supportLink = (helpArticleId: string) => {
    return BASE_URL + "/support/?return_to=/" + helpArticleId + "&flavour=app"
  }

  const moreReviewsLink = (actionPath: string) => {
    return BASE_URL + actionPath + WEBVIEW_QUERY_PARAM
  }

  const contactUsLink = (helpPath?: string, queryParams?: QueryParamObject) => {
    return Url.create(`${BASE_URL}${Urls.contactUs(helpPath)}`, {
      ...queryParams,
      flavour: "app",
    })
  }

  return {
    RedibsAbout: BASE_URL + "/about/" + WEBVIEW_QUERY_PARAM,
    RedibsTerms: BASE_URL + "/terms/" + WEBVIEW_QUERY_PARAM,
    redibsPrivacy: BASE_URL + "/privacy/" + WEBVIEW_QUERY_PARAM,

    HelpCenter: HELP_CENTER_URL + "/hc/en-us/" + WEBVIEW_QUERY_PARAM,

    CommunityForum: HELP_CENTER_URL + "/hc/en-us/community/topics",

    PublicProfileByUserId: (userId: number) => `${BASE_URL}/p/${userId}`,

    ShippingFTUE: helpCenterLink("360031987852"),

    VerifyPhoneWhatsThis: helpCenterLink("360032330571"),
    MessagingTips: helpCenterLink("360031965932"),
    AccountInviteHelp: helpCenterLink("360032336851"),

    ShippingPolicyHelp: helpCenterLink("360039017352"),
    ShippingParcleHelp: helpCenterLink("360032329671"),
    PurchaseProtectionHelp: supportLink("360032329891"),
    ShippingWIMMHelp: appHelpLink("seller/shipping_get_paid"),
    BuyerProtectionForm: (orderId?: string) => contactUsLink("shipping/", { order_id: orderId }),
    SellerShippingPolicyHelp: appHelpLink("seller/shipping"),
    BuyerShippingPolicyHelp: appHelpLink("buyer/shipping"),

    PaymentMethodHelp: supportLink("360032308971"),
    DepositMethodHelp: supportLink("360032334751"),
    FastDepositHelp: supportLink("360031994132"),
    KYCHelp: supportLink("360031995012"),

    ManagePromotionsHelp: supportLink("360032329911"),
    PromotionFTUEHelp: supportLink("1007527601"),
    ReportUserItemHelp: helpCenterLink("360032336271"),
    TruYouVerifyHelp: helpCenterLink("360032336151"),
    PromotionHelp: supportLink("360031994412"),
    ImproveReputationHelp: supportLink("360032336491"),

    MoreReviewsLink: moreReviewsLink,
  }
})
