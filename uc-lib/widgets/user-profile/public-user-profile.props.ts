import { ProfileRatingPropTypes } from "./user-profile-types"

export interface PublicProfilePropTypes {
  avatars?: {
    squareImage: string
  }
  name: string
  ratingSummary: ProfileRatingPropTypes
  publicLocationName: string
  isTruyouVerified: boolean
  isAutosDealer: boolean
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
  showLocation?: boolean | undefined
  showRating?: boolean | undefined
}
