export const ATTEMPTED_AUTOMATIC_PHONE_VERIFICATION = "ATTEMPTED_AUTOMATIC_PHONE_VERIFICATION"
export const CACHED_VEHICLE_INFO_KEY = "CACHED_VEHICLE_INFO_KEY"
export const CAR_BUYER_PROFILE_SHARING_ENABLED = "CAR_BUYER_PROFILE_SHARING_ENABLED"
export const CHAT_DRAFT_MESSAGE_STORAGE_KEY = "draft-todos-message"
export const DATE_LAST_SEEN_CAR_BUYER_MODAL = "CAR_BUYER_PROFILE_LAST_SEEN_MODAL"
export const HAS_SHOWN_LETGO_BANNER_FLAG = "HAS_SHOWN_LETGO_BANNER_FLAG"
export const LISTING_DRAFT_PREFERENCES_STORAGE_KEY = "post_flow_preferences"
export const POST_LISTING_DRAFT_STORAGE_KEY = "POST_LISTING_DRAFT_STORAGE_KEY"
export const POST_SHIPPING_FTUE_STORAGE_KEY = "POST_SHIPPING_FTUE_STORAGE_KEY"
export const PREFERRED_COLOR_THEME_STORAGE_KEY = "preferred_color_theme_id"
export const RECENT_SEARCH_STORAGE_KEY = "recent-searches"
export const SERVER_TYPE_KEY = "settings.server_type"
export const SHOWED_LOCATION_PICKER_ON_FRESH_APP_LAUNCH_STORAGE_KEY = "showed-location-picker-on-fresh-app-launch"
export const SHOWED_SAVE_SEARCH_HINT_STORAGE_KEY = "showed-save-search-hint"
export const USER_SEARCH_LOCATION_STORAGE_KEY = "user_search_location"

/**
 * Enter keys below to ensure they are NOT deleted when we clear the store upon logout.
 */
export const PERMANENT_STORAGE_KEY_WHITELIST = [CACHED_VEHICLE_INFO_KEY, SERVER_TYPE_KEY]
