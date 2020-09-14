/**
 * Google GTAG Standard Events
 *
 * List of official event parameters can be found in
 * {@link https://developers.google.com/gtagjs/reference/event
 * the gtag.js reference documentation}.
 */
export const GTAG_EVENT_ADD_PAYMENT_INFO = "add_payment_info"
export const GTAG_EVENT_BEGIN_CHECKT = "begin_checkout"
export const GTAG_EVENT_CHECKT_PROGRESS = "checkout_progress"
export const GTAG_EVENT_EXCEPTION = "exception"
export const GTAG_EVENT_LOGIN = "login"
export const GTAG_EVENT_PURCHASE = "purchase"
export const GTAG_EVENT_REFUND = "refund"
export const GTAG_EVENT_SEARCH = "search"
export const GTAG_EVENT_SET_CHECKT_OPTION = "set_checkout_option"
export const GTAG_EVENT_SHARE = "share"
export const GTAG_EVENT_SIGN_UP = "sign_up"
export const GTAG_EVENT_TIMING_COMPLETE = "timing_complete"
export const GTAG_EVENT_VIEW_ITEM = "view_item"
export const GTAG_EVENT_VIEW_ITEM_LIST = "view_item_list"
export const GTAG_EVENT_VIEW_PROMOTION = "view_promotion"
export const GTAG_EVENT_VIEW_SEARCH_RESULTS = "view_search_results"

/**
 * mobile Events
 */
export const EVENT_APP_STATE_ACTIVE = "open"
export const LOCATION_ERROR = "location_error"
export const GEOCODING_ERROR = "geocoding_error"
export const ITEM_DASHBOARD_UI_EVENT = "item_dashboard_ui_event"
export const SELLING_DASHBOARD_UI_EVENT = "selling_dashboard_ui_event"
export const MY_ACCNT_UI_EVENT = "myaccount_ui_event"
export const SELL_FASTER_UI_EVENT = "sell_faster_ui_event"
export const USER_RATING_UI_EVENT = "user_rating_ui_event"
export const SWAP_PROMOTION_UI_EVENT = "swap_promotion_ui_event"
export const PROMOTION_PURCHASED_EVENT = "promote_ala_carte_purchased"
export const PROMOTION_SUBSCRIPTION_PURCHASED_EVENT = "promote_plus_subscription_purchased"
export const PROMOTION_SUBSCRIPTION_TRIAL_EVENT = "promote_plus_subscription_free_trial_started"
export const SELL_SAVED_ITEMS_UI_EVENT = "saved_items_list_ui_event"
export const PAYMENTS_UI_EVENT = "payments_ui_event"
export const KYC_UI_EVENT = "kyc_ui_event"
export const USER_RATED_EVENT = "user_rated"
export const ITEM_SAVED_EVENT = "item_saved"

/**
 * mobile Params
 */
export const EVENT_PARAM_EMAIL = "Email"

export enum AnalyticsElementType {
  Button = "Button",
  Text = "Text",
  Link = "Link",
  Icon = "Icon",
  ListItem = "ListItem",
  Cell = "Cell",
  Image = "Image",
  CheckBox = "CheckBox",
  TextField = "TextField",
  Toggle = "Toggle",
  Button = "Button",
  Dialogue = "Dialogue",
  Carousel = "Carousel",
  Tile = "Tile",
  Clickable = "Clickable",
  InAppMessage = "InAppMessage",
  Banner = "Banner",
}

export enum AnalyticsActionType {
  Show = "Show",
  Click = "Click",
  Reorder = "Reorder",
  PreSelect = "PreSelect",
  Deselect = "Deselect",
  EndEditing = "EndEditing",
  Dialogue = "Dialogue",
  LongClick = "LongClick",
  Delete = "Delete",
}

export enum AnalyticsToggleValues {
  On = "On",
  Off = "Off",
}

export type AnalyticsElementTypeParam = keyof typeof AnalyticsElementType
export type AnalyticsActionTypeParam = keyof typeof AnalyticsActionType
