export interface ProfileRatingPropTypes {
  count: number
  average: number
}

export interface ProfilePropTypes {
  id: string
  avatar: string
  name: string
  rating: ProfileRatingPropTypes
  joined: string
  isAutosDealer?: boolean
  isMerchant?: boolean
  isSubPrimeDealer?: boolean
  tagLine?: string
}

export interface UserProfilePropTypes {
  profile: ProfilePropTypes
  avatarSize?: number
  onClick?(): void
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
