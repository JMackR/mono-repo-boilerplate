import { DeliveryParamOption } from "./search-provider-constants"
import { SearchAlert, Maybe } from "../../type-defs/generated-types/type-defs"
import { LocationDetails } from "shared-lib/src/utilities"

export type SortProp = string
export interface SearchParamsProps {
  [key: string]: string | undefined | null
  query?: Maybe<string>
  sort?: Maybe<string>
  cid?: Maybe<string>
  priceMin?: Maybe<string>
  priceMax?: Maybe<string>
  zipcode?: Maybe<string>
  lon?: Maybe<string>
  lat?: Maybe<string>
  deliveryParam?: Maybe<DeliveryParamOption>
  vehicleMake?: Maybe<string>
  vehicleYearMin?: Maybe<string>
  vehicleYearMax?: Maybe<string>
  vehicleMPGMin?: Maybe<string>
  vehicleMPGMax?: Maybe<string>
  vehicleMileMax?: Maybe<string>
  vehicleTransmission?: Maybe<string>
  vehicleDrivetrain?: Maybe<string>
  radius?: Maybe<string>
  condition?: Maybe<string>
}
export interface FeedOptionOptionProps {
  label: string
  labelShort: string
  value: string
  selected?: boolean
  default?: boolean
}
export interface FeedOptionProps {
  name: string
  label: string
  labelShort: string
  options?: FeedOptionOptionProps[]
}

export interface FeedDataProps {
  feedOptions?: FeedOptionProps[]
  searchAlert?: SearchAlert
}

export interface SearchActionProps {
  type: string
  value?: SortProp | SearchParamsProps | FeedOptionProps[] | FeedDataProps | LocationDetails
}

export interface SearchStateProps {
  searchParams: SearchParamsProps
  feedOptions?: FeedOptionProps[]
  sortOptions?: FeedOptionOptionProps[]
  filterOptions?: FeedOptionProps[]
  searchAlert?: SearchAlert
}

export interface SearchProps {
  state: SearchStateProps
  sort(value: string): void
  filter(value: SearchParamsProps): void
  filterAndResetSort(value: SearchParamsProps): void
  resetFiltersToDefaults(): void
  resetFiltersToDefaultsWithOverride(value: SearchParamsProps): void
  setLocationData(value: LocationDetails): void
  setFeedData(value: FeedDataProps): void
}
