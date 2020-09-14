import _ from 'lodash'
import { listingFromItem } from '../parsers/listing-parsers'

const sessionTokenFromSession = session => {
  return {
    value: session.jwt_token,
    type: 'jwt'
  }
}

const djangoTokenFromSession = session => {
  return {
    value: session.token,
    type: 'django'
  }
}

const refreshTokenFromSession = session => {
  return {
    value: session.refresh_token,
    type: 'refresh'
  }
}

enum OUTruYouStatus {
  JOIN_TRUYOU = 'JOIN_TRUYOU',
  TRUYOU_PENDING = 'TRUYOU_PENDING',
  TRUYOU_VERIFIED = 'TRUYOU_VERIFIED',
  TRUYOU_UNKNOWN = 'TRUYOU_UNKNOWN'
}

export const userProfileFromUser = user => {
  const profile = user.get_profile
  if (!profile) {
    return undefined
  }

  const getStatusEnum = (verificationStatus: string | undefined): OUTruYouStatus => {
    switch (verificationStatus) {
      case '0':
        return OUTruYouStatus.JOIN_TRUYOU
      case '1':
        return OUTruYouStatus.TRUYOU_PENDING
      case '2':
        return OUTruYouStatus.TRUYOU_VERIFIED
      default:
        return OUTruYouStatus.TRUYOU_UNKNOWN
    }
  }

  return {
    name: `${user.first_name} ${user.last_name || ''}`.trim(),
    first_name: user.first_name,
    firstName: user.first_name,
    last_name: user.last_name,
    lastName: user.last_name,
    rating_summary: ratingSummaryFromProfile(profile),
    ratingSummary: ratingSummaryFromProfile(profile),
    avatars: userProfileAvatarsFromProfile(profile),
    is_autos_dealer: profile.is_autos_dealer,
    isAutosDealer: profile.is_autos_dealer || (_.property('identity_attributes.is_autos_dealer')(user) as boolean),
    dma_market: profile.market,
    truYouVerificationStatus: getStatusEnum(profile.verification_status),
    dmaMarket: profile.market,
    is_truyou_verified: profile.verified,
    isTruyouVerified: profile.verified,
    is_email_verified: profile.is_email_verified,
    isEmailVerified: profile.is_email_verified,
    public_location_name: profile.public_location_name,
    publicLocationName: profile.public_location_name,
    date_joined: user.date_joined,
    dateJoined: user.date_joined,
    is_phone_number_verified: profile.is_phone_number_verified,
    isPhoneNumberVerified: profile.is_phone_number_verified,
    phoneNumber: userPhoneNumberFromProfile(profile),
    click_to_call_enabled: user.click_to_call_enabled,
    clickToCallEnabled: user.click_to_call_enabled,
    reviews: reviewsFromUser(user),
    openingHours: openingHoursFromUser(user),
    publicLocation: parsePublicLocation(_.property('public_location')(user)),
    websiteLink: _.property('websiteLink')(profile),
    c2cPhoneNumber: parseC2CPhoneNumber(_.property('c2c_phone_number')(profile))
  }
}

export const parsePublicProfile = response => {
  const profile = _.property('data.data.profile')(response)
  return {
    name: `${_.property('name')(profile)}`.trim(),
    ratingSummary: ratingSummaryFromProfile(profile),
    avatars: userProfileAvatarsFromProfile(profile),
    isAutosDealer: _.property('identity_attributes.is_autos_dealer')(profile),
    isSubPrimeDealer: _.property('feature_attributes.display_self_financed_dealer_badge')(profile),
    clickToCallEnabled: _.property('feature_attributes.click_to_call_enabled')(profile),
    isTruyouVerified: _.property('identity_attributes.identity_attributes')(profile),
    isEmailVerified: _.property('is_email_verified')(profile),
    publicLocationName: _.property('public_location_name')(profile),
    dateJoined: _.property('joined')(profile),
    isPhoneNumberVerified: _.property('is_phone_number_verified')(profile),
    itemsSold: _.property('review_summary.transaction_stats[0].value')(profile),
    itemsPurchased: _.property('review_summary.transaction_stats[1].value')(profile),
    ratingAttributes: _.property('review_summary.ratings_attributes')(profile),
    followers: _.property('followers')(profile),
    badges: badgesForClient(_.property('badges')(profile)),
    featureAttributes: parseFeatureAttributes(_.property('feature_attributes')(profile)),
    publicLocation: parsePublicLocation(_.property('public_location')(profile)),
    c2cPhoneNumber: parseC2CPhoneNumber(_.property('c2c_phone_number')(profile)),
    bio: _.property('bio')(profile),
    reviews: reviewsFromUser(profile),
    openingHours: openingHoursFromUser(profile),
    responseTime: _.property('response_time')(profile),
    websiteLink: _.property('website_link')(profile)
  }
}

const badgesForClient = badges => {
  if (!badges) {
    return []
  }
  const badgeTextOverrideMap: { [key: string]: string } = {
    'Verified for payments': 'Payments Verified'
  }
  const res = _.transform(badges, (result: any[], value: any, index) => {
    const label = badgeTextOverrideMap[value.label] || value.label
    value.label = label
    result.push(value)
    return result
  })

  return res
}

const parseFeatureAttributes = attributes => {
  if (!attributes) {
    return null
  }
  return {
    canReceiveInteractionRatings: _.property('can_receive_interaction_ratings')(attributes),
    clickToCallEnabled: _.property('click_to_call_enabled')(attributes),
    showMoreItemsFromUserInItemDetails: _.property('show_more_items_from_user_in_item_details')(attributes),
    canSendPhotosInChat: _.property('can_send_photos_in_chat')(attributes)
  }
}

const parsePublicLocation = publicLocation => {
  if (!publicLocation) {
    return null
  }
  return {
    latitude: _.property('latitude')(publicLocation),
    longitude: _.property('longitude')(publicLocation),
    name: _.property('name')(publicLocation),
    formattedAddress: _.property('formatted_address')(publicLocation)
  }
}

const parseC2CPhoneNumber = phoneNumber => {
  if (!phoneNumber) {
    return null
  }
  return {
    nationalNumber: _.toString(_.property('national_number')(phoneNumber)),
    countryCode: _.toString(_.property('country_code')(phoneNumber))
  }
}

const reviewsFromUser = user => {
  const reviews = user.reviews
  if (!reviews) {
    return null
  }
  return reviews.map(review => {
    return {
      attributionIcon: review.attribution_icon,
      average: review.average,
      readMoreUrl: review.read_more_url,
      title: review.title,
      userReviews: userReviewsFromReview(review)
    }
  })
}

const userReviewsFromReview = review => {
  return review.user_reviews.map(userReview => {
    return {
      text: userReview.text,
      profilePhotoUrl: userReview.profile_photo_url
    }
  })
}

const openingHoursFromUser = user => {
  const openingHours = user.opening_hours
  if (!openingHours) {
    return null
  }
  return openingHours.map(openingHour => {
    return {
      hours: openingHour.hours,
      day: openingHour.day
    }
  })
}

const ratingSummaryFromProfile = profile => {
  if (profile.rating == null) {
    return null
  }

  return {
    count: profile.rating.count,
    average: profile.rating.average
  }
}

const backgroundImageFromProfile = (profile, size) => {
  const backgroundImageResponse = profile.background_image[size.toLowerCase()]

  return {
    imageSize: size,
    url: backgroundImageResponse.url,
    imageWidth: backgroundImageResponse.width,
    imageHeight: backgroundImageResponse.height
  }
}

const backgroundImagesFromProfile = profile => {
  if (profile.background_image == null) {
    return null
  }
  return [backgroundImageFromProfile(profile, 'SMALL'), backgroundImageFromProfile(profile, 'MEDIUM'), backgroundImageFromProfile(profile, 'LARGE')]
}

const userProfileAvatarsFromProfile = profile => {
  return {
    square_image: profile.avatar_square,
    squareImage: profile.avatar_square,
    xl_image: profile.avatar_extra_large,
    xlImage: profile.avatar_extra_large,
    background_images: backgroundImagesFromProfile(profile),
    backgroundImages: backgroundImagesFromProfile(profile),
    use_default_avatar: profile.uses_default_avatar,
    useDefaultAvatar: profile.uses_default_avatar
  }
}

const userPhoneNumberFromProfile = profile => {
  if (profile.verified_phone_number == null) {
    return null
  }
  return `${profile.verified_phone_number.country_code}${profile.verified_phone_number.national_number}`
}

const userAccountFromSession = session => {
  const account = userAccountFromUser(session.user)
  return {
    ...account,
    is_payments_enabled: session.features.payments,
    isPaymentsEnabled: session.features.payments
  }
}

const userAccountFromUser = user => {
  const profile = user.get_profile
  if (!profile) {
    return undefined
  }

  return {
    facebook_id: profile.facebook_id,
    facebookId: profile.facebook_id,
    email: user.email,
    identityAttributes: identityAttributesFromUser(user),
    is_terms_accepted: profile.terms_accepted,
    isTermsAccepted: profile.terms_accepted
  }
}

const identityAttributesFromUser = user => {
  const identity_attributes = user.identity_attributes
  if (!identity_attributes) {
    return null
  }

  return {
    is_truyou_member: identity_attributes.is_truyou_member,
    isTruyouMember: identity_attributes.is_truyou_member,
    is_autos_dealer: identity_attributes.is_autos_dealer,
    isAutosDealer: identity_attributes.is_autos_dealer,
    is_autos_dealer_payment_info_on_file: identity_attributes.autos_dealer_payment_info_on_file,
    isAutosDealerPaymentInfoOnFile: identity_attributes.autos_dealer_payment_info_on_file,
    is_small_business: identity_attributes.is_small_business,
    isSmallBusiness: identity_attributes.is_small_business,
    is_potential_autos_seller: identity_attributes.potential_autos_seller,
    isPotentialAutosSeller: identity_attributes.potential_autos_seller
  }
}

const userFromLegacyUser = user => {
  if (!user) {
    return undefined
  }
  return {
    id: user.id,
    profile: userProfileFromUser(user),
    account: userAccountFromUser(user)
  }
}

const userFromDiscussionUserlist = response => {
  if (!response) {
    return null
  }

  const discussionUserListResponse = response.map(discussionUser => {
    return userFromDiscussionUser(discussionUser)
  })

  return discussionUserListResponse
}

const userFromDiscussionUser = response => {
  const user = {
    id: response.id,
    first_name: response.first_name,
    firstName: response.first_name,
    get_profile: {
      avatar_square: response.avatar_square,
      uses_default_avatar: response.uses_default_avatar
    },
    getProfile: {
      avatarSquare: response.avatar_square,
      usesDefaultAvatar: response.uses_default_avatar
    }
  }

  return userFromLegacyUser(user)
}

const userFromAuthResponse = response => {
  const session = response.data.data.session
  const user = session.user
  const profile = user.get_profile

  return {
    id: profile.user_id,
    sessionToken: sessionTokenFromSession(session),
    refreshToken: refreshTokenFromSession(session),
    djangoToken: djangoTokenFromSession(session),
    profile: userProfileFromUser(user),
    account: userAccountFromSession(session)
  }
}

export const vanityLinksFromResponse = response => {
  return { url: _.head(response.data.data.branch_links) }
}

export const vanityLinksFromCreationResponse = response => {
  return { url: response.data.data.branch_url }
}

const incentiveLinkFromResponse = response => {
  const info = response.data.data
  const { link, display_text, display_title, shared_text } = info
  return {
    link,
    displayText: display_text,
    displayTitle: display_title,
    shareText: shared_text
  }
}

export const federatedLoginInfoPayload = response => {
  const { scope, state, client_id: clientId, redirect_uri: redirectUri } = response.data.data
  return {
    scope,
    state,
    clientId,
    redirectUri
  }
}

const archivedItemsFromRespnse = response => {
  const data = response.data.data
  return {
    total: data.total,
    pageMaxSize: data.page_max_size,
    items: itemsArchived(data.items),
    pageCount: data.page_count,
    pageSize: data.page_size,
    pageCurrent: data.page_current
  }
}

const itemsArchived = itemsArray => {
  if (!itemsArray) {
    return null
  }
  return itemsArray.map(item => {
    return listingFromItem(item)
  })
}

const accountAvailabilityFromResponse = response => {
  const data = response.data.data
  return {
    accountAvailable: data.account_available,
    phoneLoginAvailable: data.phone_login_available
  }
}

const multifactorMetadataFromMultifactorRequestResponse = responseData => {
  return {
    mfaReferenceId: responseData.mfa_reference_id,
    mfaType: responseData.mfa_type,
    description: responseData.description
  }
}

const parseMultifactorChallengeResponse = responseData => {
  return {
    mfaReferenceId: responseData.mfa_reference_id,
    mfaType: responseData.mfa_type,
    userId: responseData.user_id
  }
}

const parseMultifactorOptions = responseData => {
  return responseData.mfa_options.map(option => {
    return {
      type: option.type,
      challengeGenerationUrl: option.challenge_generation_url,
      phoneNumber: option.phone_number,
      email: option.email_address
    }
  })
}

const jwtTokenRefreshFromResponse = response => {
  const data = response.data.data
  return {
    jwtToken: data.jwt_token,
    refreshToken: data.refresh_token,
    tokenType: data.token_type
  }
}

export {
  userFromAuthResponse,
  userFromLegacyUser,
  userFromDiscussionUserlist,
  incentiveLinkFromResponse,
  archivedItemsFromRespnse,
  accountAvailabilityFromResponse,
  multifactorMetadataFromMultifactorRequestResponse,
  parseMultifactorChallengeResponse,
  parseMultifactorOptions,
  jwtTokenRefreshFromResponse
}
