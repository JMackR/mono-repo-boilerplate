import invariant from "invariant"
import { AuthChannel } from "./constants/auth-constants"
import { AnalyticsActionType, AnalyticsElementType } from "./analytics-constants"

export interface AnalyticsButtonEvent {
  button_title: string
  button_type: string
  button_size: string
}

export interface AnalyticsUCLParams extends Partial<AnalyticsButtonEvent> {
  screen_name: string
  screen_route: string
  action_type: AnalyticsActionType
  element_type: AnalyticsElementType
  test_id?: string
}

export interface AnalyticsScreenViewParams {
  screen_name: string
  screen_route?: string
  action_type: AnalyticsActionType.Show
}

export interface AnalyticsListingParams {
  listing_id: string
  item_id: string
  category_l1: string
  category_l2: string
  category_l3: string
  firm_price: string
  price: string
  is_shippable: string
  location: string
  photos_uploaded: number
  buy_now_enabled: string
  user_state?: string
  paywall_post_count?: number
  package_size?: string
}

export interface AnalyticsAuthEvent {
  channel: AuthChannel
}

export interface AnalyticsUIEvent {
  screen_name: string
  origin_screen_name?: string
  action_type: AnalyticsActionType
  element_type: AnalyticsElementType
  element_name: string
  sub_element_name?: string | string[]
  sub_element_name_manual?: string | string[]
  sub_element_name_suggested?: string | string[]
  name?: string

  // Domain Specific
  item_id?: string
  flow_session_id?: string
  num_photos?: number
  item_title?: string
  categorization_enforced?: string
  condition?: string
  other_attributes?: string
  price?: string
  category_id_L1?: string
  category_id_L2?: string
  context?: string
  is_shippable?: string
  user_state?: string
  paywall_post_count?: number
  num_saved_searches?: number
  seller_type?: string
  type?: string
  success?: boolean
  delivery_method?: string
  zipcode?: string
  distance?: string
  user_role?: string
  tab_name?: string
  message_type?: string
  notification_type?: string
  buynow_enabled?: boolean
  engagement_type?: string
  full_price?: boolean
  offer_price?: string
  buyer_id?: string
  seller_id?: string
  num_views?: number
  num_conversations?: number
  soldPill?: boolean
  promoPill?: boolean
  promoPlusPill?: boolean
  promoExpiredPill?: boolean
  // ad
  ad_id?: string
  ad_network?: string
  ad_query?: string
  ad_request_id?: string
  experiment_id?: string
  experiment_data_hash?: string
  search_id?: string
  feed_index?: number
  status?: string
  payment_id?: string
  // order
  cancel_reason?: string
  order_number?: string
  // Self Resolution
  list_item_chosen?: string
}

export interface AnalyticsSearchParams {
  query_source?: string
  filters_applied?: string
  sort_applied?: string
  type?: string
  query?: string
  query_id?: string
  category_id_L1?: string
  category_id_L2?: string
  delivery_method?: string
  origin_screen_name?: string
  modification_type?: string
  modification_applied?: string
}

export interface AnalyticsAdsRequestedParams {
  screen_name: string
  ad_network?: string
  ad_query?: string
  ad_request_id?: string
  num_ads_requested?: number
  experiment_id?: string
  experiment_data_hash?: string
  search_id?: string
  status?: string
}

export interface ApplicationAnalyticsParams {
  platform_os?: string
  platform_version?: number | string
  device_brand?: string
  device_type?: string
  device_hardware?: string
}

export interface AnalyticsRatingParams {
  buyer_id?: string
  review_saved_dialogue: string
  num_stars: string
  feedback_selected?: string
}

export interface AnalyticsSellFasterParams {
  swapped_out_promoted_item_id?: number
  swapped_in_promoted_item_id: number
  length: string
}

export interface AnalyticsSavedItemsParams {
  list_id?: string
}

export interface AnalyticsMarkSoldParams extends AnalyticsListingParams {
  seller_id: string
  seller_type: string
  type: string
  buy_now: boolean
  full_price: boolean
  origin_screen_name: string
  buyer_id?: string
  offer_price?: string
}
export interface AnalyticsSellerShippingParams {
  item_id: string
  price: string
  buyer_id: string
  seller_id: string
  seller_type: string
  full_price: boolean
  offer_price?: string
  buynow_enabled: boolean
  engagement_type: string
  category_id_L1: string
  category_id_L2: string
  origin_screen_name: string
  type: string
}
export interface AnalyticsParams
  extends Partial<AnalyticsUIEvent>,
    Partial<ApplicationAnalyticsParams>,
    Partial<AnalyticsListingParams>,
    Partial<AnalyticsUCLParams>,
    Partial<AnalyticsSearchParams>,
    Partial<AnalyticsAdsRequestedParams>,
    Partial<AnalyticsAuthEvent>,
    Partial<AnalyticsRatingParams>,
    Partial<AnalyticsSellFasterParams>,
    Partial<AnalyticsSavedItemsParams>,
    Partial<AnalyticsMarkSoldParams>,
    Partial<AnalyticsSellerShippingParams>,
    Partial<Omit<AnalyticsScreenViewParams, "action_type">> {
  method?: string
  description?: string
  fatal?: boolean
  ip_address?: string
  affected_user_id?: string
}

export const buildScreenViewEventParams = (screenName: string, screenRoute?: string): AnalyticsScreenViewParams => {
  return {
    screen_name: screenName,
    screen_route: screenRoute,
    action_type: AnalyticsActionType.Show,
  }
}

export const buildClickEventParams = (
  screenName: string,
  elementName: string,
  elementType: AnalyticsElementType,
): AnalyticsUIEvent => {
  return {
    screen_name: screenName,
    action_type: AnalyticsActionType.Click,
    element_name: elementName,
    element_type: elementType,
  }
}

export const buildUIEventParams = (
  screenName: string,
  elementName: string,
  elementType: AnalyticsElementType,
  actionType: AnalyticsActionType,
): AnalyticsUIEvent => {
  return {
    screen_name: screenName,
    action_type: actionType,
    element_name: elementName,
    element_type: elementType,
  }
}

export const buildAuthEventParams = (authChannel: AuthChannel): AnalyticsAuthEvent => {
  return {
    channel: authChannel,
  }
}

export const getAnalyticsActionTypeFromString = (s: string): AnalyticsActionType => {
  const keys = Object.keys(AnalyticsActionType)
  invariant(keys.includes(s), "Invalid AnalyticsActionType: " + s)
  return AnalyticsActionType[s as keyof typeof AnalyticsActionType]
}

export const getAnalyticsElementTypeFromString = (s: string): AnalyticsElementType => {
  const keys = Object.keys(AnalyticsElementType)
  invariant(keys.includes(s), "Invalid AnalyticsElementType: " + s)
  return AnalyticsElementType[s as keyof typeof AnalyticsElementType]
}
