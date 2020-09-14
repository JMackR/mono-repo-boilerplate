import {
  PayPerPostDetails,
  PayPerPostPaymentData,
  ListingCondition,
  PostShippability,
  ItemCategorization,
} from "shared-lib/type-defs/generated-types/type-defs"
import { PhotoImageIdentifier } from "../../../../widgets"
import { LocationDetails } from "shared-lib"

export interface CoverPhotoEdits {
  rotation: number
  offset: { x: number; y: number }
  offset: { x: number; y: number }
  scale: number
  uri: string
}

export interface OnboardingState {
  hasUserChangedShippingToggle?: boolean
  signedUpToBecomeVerifiedPartner?: boolean
  coverPhoto?: PhotoImageIdentifier
  shippability?: PostShippability
  paywallPriceCharged?: string
  autoCategory?: ItemCategorization
  isAutoCategorizationLoading?: boolean
  payPerPost?: PayPerPostDetails
  paymentInfo?: PayPerPostPaymentData
  packageSize?: string
  isUploadingListing?: boolean
  isUploadingPhotos?: boolean
  isEditing?: boolean
  preEditCategoryId?: string
}
