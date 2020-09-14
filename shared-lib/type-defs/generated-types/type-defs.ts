export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Upload: any
}

export interface AddressInput {
  name: Scalars["String"]
  street1: Scalars["String"]
  street2?: Maybe<Scalars["String"]>
  city: Scalars["String"]
  state: Scalars["String"]
  zip: Scalars["String"]
  country: Scalars["String"]
  type?: Maybe<Scalars["String"]>
}

export interface Alert {
  __typename?: "Alert"
  actionPath?: Maybe<Scalars["String"]>
  archived: Scalars["Boolean"]
  displayAvatar?: Maybe<Scalars["String"]>
  contentThumbnails: Scalars["String"][]
  dateAdded: Scalars["String"]
  eventMetadata?: Maybe<Scalars["String"]>
  id: Scalars["String"]
  notificationText?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
  objectId: Scalars["String"]
  read: Scalars["Boolean"]
  seen: Scalars["Boolean"]
  sender?: Maybe<User>
  type: Scalars["String"]
  visualTags: VisualTag[]
}

export type AlertRow = Alert

export interface AlertsInput {
  type: AlertType
  experimentData?: Maybe<Scalars["String"]>
}

export interface AlertsResponse {
  __typename?: "AlertsResponse"
  archivedAlertsCount: Scalars["Int"]
  /** @deprecated Use `alertsWithAds`. */
  alerts: Alert[]
  alertsWithAds: AlertRow[]
}

export enum AlertType {
  Inbox = "INBOX",
  Notifications = "NOTIFICATIONS",
}

export enum ArchiveActionType {
  Archive = "ARCHIVE",
  Unarchive = "UNARCHIVE",
}

export interface ArchivedItems {
  __typename?: "ArchivedItems"
  total?: Maybe<Scalars["Int"]>
  pageMaxSize?: Maybe<Scalars["Int"]>
  pageCount?: Maybe<Scalars["Int"]>
  pageSize?: Maybe<Scalars["Int"]>
  pageCurrent?: Maybe<Scalars["Int"]>
  items?: Maybe<Listing[]>
}

export interface ArchiveInput {
  itemId: Scalars["Int"]
  action: ArchiveActionType
}

export enum AttributeOptionality {
  Optional = "Optional",
  Recommended = "Recommended",
  Required = "Required",
}

export interface BackgroundImage {
  __typename?: "BackgroundImage"
  imageSize: BackgroundImageSize
  url: Scalars["String"]
  imageWidth: Scalars["Int"]
  imageHeight: Scalars["Int"]
}

export enum BackgroundImageSize {
  Small = "SMALL",
  Medium = "MEDIUM",
  Large = "LARGE",
}

export interface BlockedInfo {
  __typename?: "BlockedInfo"
  reportToken?: Maybe<Scalars["String"]>
  blockDate?: Maybe<Scalars["String"]>
  blockedUser?: Maybe<Scalars["Int"]>
  reportId?: Maybe<Scalars["String"]>
}

export interface C2CPhoneNumber {
  __typename?: "C2CPhoneNumber"
  nationalNumber?: Maybe<Scalars["String"]>
  countryCode?: Maybe<Scalars["String"]>
}

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export interface ChangeEmailInput {
  userId: Scalars["ID"]
  email: Scalars["String"]
  multifactorHeaderInfo?: Maybe<MultifactorHeaderInfo>
}

export interface ChangePasswordInput {
  newPassword: Scalars["String"]
  oldPassword: Scalars["String"]
  userId: Scalars["ID"]
}

export interface ChartDataSegment {
  __typename?: "ChartDataSegment"
  timestamp: Scalars["String"]
  value: Scalars["Int"]
}

export interface ChartDataStream {
  __typename?: "ChartDataStream"
  totalCountInRange: Scalars["Int"]
  legendName: Scalars["String"]
  color: Scalars["String"]
  segments?: Maybe<Maybe<Maybe<ChartDataSegment>[]>[]>
}

export interface ConnectFacebookAccountInput {
  accessToken: Scalars["String"]
}

export enum ConnectionType {
  Followings = "Followings",
  Followers = "Followers",
}

export interface CreateUserInput {
  name: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
  clientType?: Maybe<Scalars["String"]>
}

export interface EmailChallengeMetadataInput {
  type: Scalars["String"]
  countryCode: Scalars["String"]
  phoneNumber: Scalars["String"]
}

export interface EmailInput {
  email: Scalars["String"]
}

export interface FederatedLoginInfo {
  __typename?: "FederatedLoginInfo"
  scope?: Maybe<Maybe<Scalars["String"]>[]>
  state: Scalars["String"]
  redirectUri: Scalars["String"]
  clientId: Scalars["String"]
}

export interface FederatedLoginInfoInput {
  clientType: Scalars["String"]
  provider: Scalars["String"]
}

export interface FederatedLoginInput {
  redirectUri: Scalars["String"]
  state: Scalars["String"]
  accessToken?: Maybe<Scalars["String"]>
  code?: Maybe<Scalars["String"]>
  user?: Maybe<Scalars["String"]>
}

export interface Following {
  __typename?: "Following"
  following: Scalars["Boolean"]
}

export interface FollowingUser {
  __typename?: "FollowingUser"
  squareAvatarURL?: Maybe<Scalars["String"]>
  publicLocationName?: Maybe<Scalars["String"]>
  following?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["Int"]>
}

export interface GenericAttribute {
  __typename?: "GenericAttribute"
  attributeType?: Maybe<Scalars["String"]>
  options: Maybe<Scalars["String"]>[]
  properties: Maybe<Property>[]
}

export interface Image {
  __typename?: "Image"
  url: Scalars["String"]
  uuid?: Maybe<Scalars["String"]>
  width: Scalars["Int"]
  height: Scalars["Int"]
}

export interface ItemList {
  __typename?: "ItemList"
  sort?: Maybe<Scalars["Int"]>
  user_required?: Maybe<Scalars["Int"]>
  userRequired?: Maybe<Scalars["Int"]>
  description?: Maybe<Scalars["String"]>
  image_medium_height?: Maybe<Scalars["Int"]>
  image_medium_url?: Maybe<Scalars["String"]>
  image_square_url?: Maybe<Scalars["String"]>
  query?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
}

export interface ItemListsData {
  __typename?: "ItemListsData"
  total: Scalars["Int"]
  item_lists: ItemList[]
}

export interface ItemPerformanceInfo {
  __typename?: "ItemPerformanceInfo"
  chartData: ChartDataStream[]
  performanceMetaData: PerformanceMetaData
}

export interface ItemViewedEventHeader {
  appVersion: Scalars["String"]
  deviceId: Scalars["String"]
  origin: Scalars["String"]
  timestamp: Scalars["String"]
  uniqueId: Scalars["String"]
  userId?: Maybe<Scalars["String"]>
}

export interface ItemViewedEventInput {
  itemId: Scalars["ID"]
  sellerId: Scalars["ID"]
  header: ItemViewedEventHeader
  mobileHeader: ItemViewedEventMobileHeader
  origin?: Maybe<Scalars["String"]>
  source?: Maybe<Scalars["String"]>
  tileType?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
}

export interface ItemViewedEventMobileHeader {
  localTimestamp: Scalars["String"]
}

export interface JwtTokenRefreshInput {
  jwtToken: Scalars["String"]
  refreshToken: Scalars["String"]
  requestShortExpiration?: Maybe<Scalars["Boolean"]>
}

export interface JwtTokenRefreshResponse {
  __typename?: "JwtTokenRefreshResponse"
  jwtToken: Scalars["String"]
  refreshToken: Scalars["String"]
  tokenType: Scalars["String"]
}

export interface Listing {
  __typename?: "Listing"
  id?: Maybe<Scalars["ID"]>
  listingId?: Maybe<Scalars["ID"]>
  title: Scalars["String"]
  price: Scalars["String"]
  originalPrice?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  condition: Scalars["Int"]
  state: ListingState
  post_date: Scalars["String"]
  postDate: Scalars["String"]
  viewCount?: Maybe<Scalars["Int"]>
  discussionCount?: Maybe<Scalars["Int"]>
  discussionVisualTags?: Maybe<VisualTag[]>
  owner?: Maybe<User>
  photos: Photo[]
  location_details: LocationDetails
  generic_attributes: Scalars["String"][]
  saved?: Maybe<Scalars["Boolean"]>
  sortLabel?: Maybe<Scalars["String"]>
  listingType?: Maybe<Scalars["Int"]>
  isFirmOnPrice: Scalars["Boolean"]
  bestOffer?: Maybe<Scalars["String"]>
  watched?: Maybe<Scalars["Boolean"]>
  quantity: Scalars["Int"]
  type: Scalars["String"]
  ownerId: Scalars["ID"]
  merchantId?: Maybe<Scalars["ID"]>
  modified?: Maybe<Scalars["String"]>
  lastChangedBy?: Maybe<Scalars["String"]>
  createdBy?: Maybe<Scalars["ID"]>
  conditionText: ListingCondition
}

export interface ListingCategoryAttribute {
  attributeName: Scalars["String"]
  attributeValue: Scalars["String"][]
}

export enum ListingCondition {
  New = "NEW",
  Refurbished = "REFURBISHED",
  OpenBox = "OPEN_BOX",
  Used = "USED",
  Broken = "BROKEN",
  Other = "OTHER",
}

export interface ListingDashboardData {
  __typename?: "ListingDashboardData"
  hideSelleradsPurchaseOnWeb?: Maybe<Scalars["Boolean"]>
  hasPromotedListings?: Maybe<Scalars["Boolean"]>
  userContext?: Maybe<PromotionUserContext>
  listing?: Maybe<Listing>
}

export interface ListingDashboardInput {
  sellFasterSimplificationVariant?: Maybe<Scalars["String"]>
  isMISEnabled?: Maybe<Scalars["Boolean"]>
  operationContext?: Maybe<Scalars["String"]>
}

export interface ListingData {
  __typename?: "ListingData"
  item?: Maybe<Listing>
}

export interface ListingImage {
  uuid: Scalars["ID"]
  width: Scalars["Float"]
  height: Scalars["Float"]
}

export interface ListingInputV2 {
  postSessionId: Scalars["ID"]
  listingId?: Maybe<Scalars["ID"]>
  title: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  price: Scalars["String"]
  isFirmPrice?: Maybe<Scalars["Boolean"]>
  condition: ListingCondition
  categoryId: Scalars["ID"]
  categoryAttributes: ListingCategoryAttribute[]
  coverImageSquare: ListingImage
  coverImageFullSize: ListingImage
  additionalImages: ListingImage[]
  latitude?: Maybe<Scalars["Float"]>
  longitude?: Maybe<Scalars["Float"]>
  zipcode?: Maybe<Scalars["String"]>
  purchaseOptionType?: Maybe<Scalars["Int"]>
}

export interface ListingResponse {
  __typename?: "ListingResponse"
  data?: Maybe<ListingData>
}

export enum ListingState {
  Incomplete = "INCOMPLETE",
  Unlisted = "UNLISTED",
  Listed = "LISTED",
  Pending = "PENDING",
  Sold = "SOLD",
  Removed = "REMOVED",
  Deleted = "DELETED",
  Unknown = "UNKNOWN",
}

export interface LocationDetails {
  __typename?: "LocationDetails"
  /** @deprecated Use `locationName`. */
  location_name?: Maybe<Scalars["String"]>
  locationName?: Maybe<Scalars["String"]>
  longitude?: Maybe<Scalars["String"]>
  latitude?: Maybe<Scalars["String"]>
  distance?: Maybe<Scalars["Int"]>
  city?: Maybe<Scalars["String"]>
  state?: Maybe<Scalars["String"]>
  zipcode?: Maybe<Scalars["String"]>
}

export interface LocationInput {
  lat?: Maybe<Scalars["String"]>
  lon?: Maybe<Scalars["String"]>
}

export interface LoginUserInput {
  email: Scalars["String"]
  password: Scalars["String"]
}

export interface Message {
  __typename?: "Message"
  id?: Maybe<Scalars["ID"]>
  /** @deprecated Use `recipientId`. */
  recipient_id?: Maybe<Scalars["Int"]>
  /** @deprecated Use `senderId`. */
  sender_id?: Maybe<Scalars["Int"]>
  recipientId?: Maybe<Scalars["Int"]>
  senderId?: Maybe<Scalars["Int"]>
  text?: Maybe<Scalars["String"]>
  /** @deprecated Use `sendDate`. */
  send_date?: Maybe<Scalars["Int"]>
  sendDate?: Maybe<Scalars["Int"]>
  metadata?: Maybe<MessageMetadata>
  metadataType?: Maybe<Scalars["Int"]>
}

export interface MessageMetadata {
  __typename?: "MessageMetadata"
  photos?: Maybe<Maybe<MessagePhoto>[]>
  messageUrl?: Maybe<Scalars["String"]>
  systemMessageContext?: Maybe<SystemMessageContext>
  messageButtonText?: Maybe<Scalars["String"]>
  messageTitle?: Maybe<Scalars["String"]>
  place?: Maybe<Place>
}

export interface MessagePhoto {
  __typename?: "MessagePhoto"
  small?: Maybe<Image>
  medium?: Maybe<Image>
  large?: Maybe<Image>
}

export interface MultifactorGeneratedResponse {
  __typename?: "MultifactorGeneratedResponse"
  mfaReferenceId: Scalars["ID"]
  mfaType: Scalars["String"]
  userId: Scalars["ID"]
}

export interface MultifactorHeaderInfo {
  userId: Scalars["ID"]
  mfaReferenceId: Scalars["String"]
  mfaType: Scalars["String"]
  otp: Scalars["String"]
}

export interface MultiFactorLoginUserInput {
  email: Scalars["String"]
  password: Scalars["String"]
  referenceId: Scalars["ID"]
  type: Scalars["String"]
  code: Scalars["String"]
}

export interface MultiFactorMetadata {
  __typename?: "MultiFactorMetadata"
  mfaReferenceId: Scalars["ID"]
  mfaType: Scalars["String"]
  description: Scalars["String"]
}

export interface MultiFactorOption {
  __typename?: "MultiFactorOption"
  type: Scalars["String"]
  challengeGenerationUrl: Scalars["String"]
  phoneNumber?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
}

export interface NotificationPreference {
  __typename?: "NotificationPreference"
  type: Scalars["String"]
  enabled: Scalars["Boolean"]
  displayString: Scalars["String"]
}

export interface NotificationPreferenceInput {
  type: Scalars["String"]
  enabled: Scalars["Boolean"]
  displayString: Scalars["String"]
}

export interface NotificationPreferencesSummary {
  __typename?: "NotificationPreferencesSummary"
  version: Scalars["Int"]
  preferences: NotificationPreference[]
}

export interface NotificationPreferencesSummaryInput {
  version: Scalars["Int"]
  preferences: NotificationPreferenceInput[]
}

export enum NotificationPreferenceType {
  Email = "EMAIL",
  Push = "PUSH",
}

export interface OptionCategories {
  __typename?: "OptionCategories"
  label: Scalars["String"]
  options: Options[]
}

export interface Options {
  __typename?: "Options"
  selected?: Maybe<Scalars["Boolean"]>
  key: Scalars["String"]
  label: Scalars["String"]
}

export interface PerformanceMetaData {
  __typename?: "PerformanceMetaData"
  itemId: Scalars["ID"]
  title: Scalars["String"]
  subtitle?: Maybe<Scalars["String"]>
  chartSummary?: Maybe<Scalars["String"]>
  image: Image
  itemState?: Maybe<Scalars["Int"]>
  callToActionText?: Maybe<Scalars["String"]>
  startTime?: Maybe<Scalars["String"]>
  endTime?: Maybe<Scalars["String"]>
}

export interface Photo {
  __typename?: "Photo"
  uuid: Scalars["String"]
  /** @deprecated Use `detailFull`. */
  detail_full: Image
  detailFull: Image
  list?: Maybe<Image>
  detail?: Maybe<Image>
  mainImage?: Maybe<Scalars["Boolean"]>
  position?: Maybe<Scalars["Int"]>
  detailSquare?: Maybe<Image>
}

export interface Place {
  __typename?: "Place"
  name?: Maybe<Scalars["String"]>
  formattedAddress?: Maybe<Scalars["String"]>
  placeId: Scalars["ID"]
  longitude?: Maybe<Scalars["String"]>
  latitude?: Maybe<Scalars["String"]>
}

export interface Property {
  __typename?: "Property"
  key: Scalars["String"]
  value: Scalars["String"]
  label: Scalars["String"]
}

export interface Review {
  __typename?: "Review"
  attributionIcon?: Maybe<Scalars["String"]>
  average?: Maybe<Scalars["String"]>
  readMoreUrl?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
  userReviews?: Maybe<UserReview[]>
}

export interface S3Photo {
  __typename?: "S3Photo"
  location: Scalars["String"]
  uuid: Scalars["String"]
}

export interface SystemMessageAction {
  __typename?: "SystemMessageAction"
  actionPath?: Maybe<Scalars["String"]>
  externalURL?: Maybe<Scalars["String"]>
  actionText?: Maybe<Scalars["String"]>
}

export interface SystemMessageContext {
  __typename?: "SystemMessageContext"
  iconUrl?: Maybe<Scalars["String"]>
  actions?: Maybe<SystemMessageAction[]>
  titleText?: Maybe<Scalars["String"]>
  bodyText?: Maybe<Scalars["String"]>
}

export interface TermsOfService {
  __typename?: "TermsOfService"
  activationDateGlobal: Scalars["String"]
  privacyPolicy: Scalars["String"]
  terms: Scalars["String"]
}

export interface TransactionHistory {
  __typename?: "TransactionHistory"
  orderId?: Maybe<Scalars["String"]>
  paymentId?: Maybe<Scalars["Int"]>
  itemImageUrl?: Maybe<Scalars["String"]>
  sellerId?: Maybe<Scalars["Int"]>
  merchantId?: Maybe<Scalars["String"]>
  purchaseDate?: Maybe<Scalars["String"]>
  itemTitle?: Maybe<Scalars["String"]>
  purchaseAmount?: Maybe<Scalars["String"]>
  payoutAmount?: Maybe<Scalars["String"]>
  isShippingTransaction?: Maybe<Scalars["Boolean"]>
  isPaymentPending?: Maybe<Scalars["Boolean"]>
}

export enum TransactionState {
  Created = "CREATED",
  BuyerMadeOffer = "BUYER_MADE_OFFER",
  BuyerCanceledOffer = "BUYER_CANCELED_OFFER",
  SellerAcceptedOffer = "SELLER_ACCEPTED_OFFER",
  SellerRejectedOffer = "SELLER_REJECTED_OFFER",
  SellerCanceledSale = "SELLER_CANCELED_SALE",
  ItemShipped = "ITEM_SHIPPED",
  ItemDelivered = "ITEM_DELIVERED",
  SellerAcceptedOfferReview = "SELLER_ACCEPTED_OFFER_REVIEW",
  BuyerFraudReview = "BUYER_FRAUD_REVIEW",
  ItemDeliveryFailed = "ITEM_DELIVERY_FAILED",
}

export interface Trim {
  __typename?: "Trim"
  name: Scalars["String"]
  vehicles: Vehicle[]
}

export interface UnseenAlertCount {
  __typename?: "UnseenAlertCount"
  total: Scalars["Int"]
  inbox: Scalars["Int"]
  notifications: Scalars["Int"]
}

export interface UpdateAddressInput {
  orderId: Scalars["String"]
  address: AddressInput
}

export interface UpdateAppResponse {
  __typename?: "UpdateAppResponse"
  updateType?: Maybe<UpdateType>
  playStoreUrl?: Maybe<Scalars["String"]>
  appStoreUrl?: Maybe<Scalars["String"]>
}

export enum UpdateType {
  Optional = "Optional",
  Forced = "Forced",
  None = "None",
}

export interface UpdateUserAccountInput {
  name?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  zipCode?: Maybe<Scalars["String"]>
  phoneNumber?: Maybe<Scalars["String"]>
  newsletter?: Maybe<Scalars["Boolean"]>
}

export interface UseInventoryItemPromoInput {
  promotionId: Scalars["String"]
  updatedItemId: Scalars["Int"]
  previousItemId?: Maybe<Scalars["Int"]>
}
export interface SessionToken {
  __typename?: "SessionToken"
  value: Scalars["String"]
  type: Scalars["String"]
}
export interface User {
  __typename?: "User"
  id: Scalars["Int"]
  sessionToken?: Maybe<SessionToken>
  refreshToken?: Maybe<SessionToken>
  profile?: Maybe<UserProfile>
  account?: Maybe<UserAccount>
  archived_items?: Maybe<Listing[]>
  archivedItems?: Maybe<Listing[]>
  notifications?: Maybe<Scalars["String"][]>
}

export interface UserAccount {
  __typename?: "UserAccount"
  facebook_id?: Maybe<Scalars["String"]>
  facebookId?: Maybe<Scalars["String"]>
  email: Scalars["String"]
  is_terms_accepted?: Maybe<Scalars["Boolean"]>
  isTermsAccepted?: Maybe<Scalars["Boolean"]>
}

export interface UserConnection {
  __typename?: "UserConnection"
  title?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  nextPageCursor?: Maybe<Scalars["Int"]>
  emptyStateErrorMessage?: Maybe<Scalars["String"]>
  followingUsers?: Maybe<Maybe<FollowingUser>[]>
}

export interface UserConnectionInput {
  userId: Scalars["Int"]
  pageId: Scalars["Int"]
  connectionType?: Maybe<ConnectionType>
}

export interface UserProfile {
  __typename?: "UserProfile"
  name: Scalars["String"]
  first_name?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  last_name?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  avatars: UserProfileAvatars
  is_phone_number_verified?: Maybe<Scalars["Boolean"]>
  isPhoneNumberVerified?: Maybe<Scalars["Boolean"]>
  is_email_verified?: Maybe<Scalars["Boolean"]>
  isEmailVerified?: Maybe<Scalars["Boolean"]>
  date_joined?: Maybe<Scalars["String"]>
  phone_number?: Maybe<Scalars["String"]>
  verified?: Maybe<Scalars["Int"]>
  has_facebook?: Maybe<Scalars["Boolean"]>
  hasFacebook?: Maybe<Scalars["Boolean"]>
  not_active?: Maybe<Scalars["Boolean"]>
  notActive?: Maybe<Scalars["Boolean"]>
  click_to_call_enabled?: Maybe<Scalars["Boolean"]>
  followers?: Maybe<Scalars["Int"]>
  c2cPhoneNumber?: Maybe<C2CPhoneNumber>
  bio?: Maybe<Scalars["String"]>
  websiteLink?: Maybe<Scalars["String"]>
  responseTime?: Maybe<Scalars["String"]>
}

export interface UserProfileAvatars {
  __typename?: "UserProfileAvatars"
  square_image: Scalars["String"]
  xl_image: Scalars["String"]
  background_images?: Maybe<Maybe<BackgroundImage>[]>
  use_default_avatar?: Maybe<Scalars["Boolean"]>
}

export interface UserProfileBadge {
  __typename?: "UserProfileBadge"
  tooltipTappableText?: Maybe<Scalars["String"]>
  tooltipText?: Maybe<Scalars["String"]>
  icon?: Maybe<Scalars["String"]>
  actionPath?: Maybe<Scalars["String"]>
  label?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["Int"]>
}

export interface VanityUrl {
  __typename?: "VanityUrl"
  url?: Maybe<Scalars["String"]>
}

export interface VanityUrlCheckInput {
  url: Scalars["String"]
}

export interface VanityUrlCheckResult {
  __typename?: "VanityUrlCheckResult"
  available: Scalars["Boolean"]
}

export interface VanityUserUrlInput {
  userId: Scalars["Int"]
}

export interface Vehicle {
  __typename?: "Vehicle"
  id: Scalars["String"]
  name: Scalars["String"]
}

export interface VerifyPhoneCode {
  code: Scalars["Int"]
}

export interface VerifyPhoneNumberInput {
  countryCode: Scalars["Int"]
  phoneNumber?: Maybe<Scalars["Int"]>
  phoneStr?: Maybe<Scalars["String"]>
}

export interface VisualTag {
  __typename?: "VisualTag"
  displayText: Scalars["String"]
  tag: Scalars["String"]
  type: Scalars["String"]
}
