import _ from "lodash"
import { DeliveryParamOption } from "./search-provider-constants"
import { SearchStateProps, FeedOptionProps, FeedOptionOptionProps, SearchParamsProps } from "./search-provider"
import {
  FeedOptions,
  FeedOptionListSelection,
  FeedOptionNumericRange,
} from "shared-lib/type-defs/generated-types/type-defs"
import { translate } from "../../utilities/i18n/i18n"

const LOCATION_OPTION_NAME = "radius"
const PRICE_OPTION_NAME = "price"
const DELIVERY_PARAM_OPTION_NAME = "delivery_param"

export const getDeliveryMethodFeedOption = (searchState: SearchStateProps): FeedOptionListSelection | undefined => {
  const deliveryParamFeedOption = searchState?.feedOptions?.find(
    feedOption => feedOption.name === DELIVERY_PARAM_OPTION_NAME,
  )
  return deliveryParamFeedOption as FeedOptionListSelection | undefined
}

/**
 * @param searchState The current search state
 * @returns the currently selected delivery method according to the feedOption returned in the search response. If one does not exist, then it defaults to `DeliveryParamOption.Pickup`.
 */
export const getSelectedDeliveryMethod = (searchState: SearchStateProps): DeliveryParamOption => {
  const deliveryParamFeedOption = getDeliveryMethodFeedOption(searchState)
  if (!deliveryParamFeedOption) {
    return DeliveryParamOption.Pickup
  }

  const selectedDeliveryMethodOption = deliveryParamFeedOption.options?.find(option => option.selected)
  return (selectedDeliveryMethodOption?.value as DeliveryParamOption) ?? DeliveryParamOption.Pickup
}

export const getFeedInfoText = (searchState: SearchStateProps) => {
  const { feedOptions } = searchState
  if (!feedOptions) {
    return ""
  }

  const selectedDeliveryMethod = getSelectedDeliveryMethod(searchState)
  const locationData = feedOptions.filter(opt => opt.name === LOCATION_OPTION_NAME)
  const locationOptionData = locationData && locationData.length > 0 ? locationData[0] : undefined
  const locationOptions = locationOptionData && locationOptionData.options ? locationOptionData.options : []
  const locationName = locationOptionData ? locationOptionData.labelShort : ""
  const selectedRadii = locationOptions.filter(opt => opt.selected)
  const radius = selectedRadii.length > 0 ? selectedRadii[0].labelShort : searchState.searchParams.radius || "Nearby"
  let text
  if (selectedDeliveryMethod === DeliveryParamOption.Shipping) {
    text = translate("search-stack.shipping")
  } else {
    if (locationName) {
      text = _.capitalize(locationName) + `: `
    } else {
      text = ""
    }
    text += radius
    if (selectedDeliveryMethod === DeliveryParamOption.PickupShipping) {
      text += ` + ${translate("search-stack.shipping")}`
    }
  }
  return text
}

export const getCountSelectedFilterOptions = (searchState: SearchStateProps) => {
  const { filterOptions } = searchState
  if (!filterOptions) {
    return 0
  }
  const priceFilterData = filterOptions.find(opt => opt.name === PRICE_OPTION_NAME)
  const priceSelectedFilterCount = priceFilterData?.options?.find(opt => !!opt.currentValue) ? 1 : 0
  const otherSelectedFiltersCount = filterOptions.filter(
    opt => opt.name !== PRICE_OPTION_NAME && opt.options && !!opt.options.find(subOpt => subOpt.selected && !subOpt.default),
  ).length
  return priceSelectedFilterCount + otherSelectedFiltersCount
}

export const getSelectedSortName = (searchState: SearchStateProps, excludedDefaultOption: boolean = false) => {
  const {
    searchParams: { sort },
    sortOptions,
  } = searchState
  if (!sort || !sortOptions) {
    return undefined
  }
  const selectedSortOption = sortOptions.find(opt => opt.value === sort)
  if (!selectedSortOption || (excludedDefaultOption && selectedSortOption.default)) {
    return ""
  }
  return selectedSortOption.label
}

export const getSortFilterOptions = (feedOptions: FeedOptionProps[]) => {
  const sortData = feedOptions.filter(o => o.name === "sort")
  const sortOptionData = sortData && sortData.length > 0 ? sortData[0] : undefined
  const sortOptions = sortOptionData && sortOptionData.options ? sortOptionData.options : []
  const filterOptions = feedOptions.filter(o => o.name !== "sort")
  return {
    sortOptions,
    filterOptions,
  }
}

export const getFilterOptionsByName = ({ name, feedOptions }: { name: string; feedOptions: FeedOptionProps[] }) => {
  const filterData = feedOptions.filter(opt => opt.name === name)
  const filterOptionData = filterData && filterData.length > 0 ? filterData[0] : undefined
  const filterOptions = filterOptionData && filterOptionData.options ? filterOptionData.options : []
  return filterOptions
}

export const getLabelFromOptions = ({ value, options }: { value?: string; options: FeedOptionOptionProps[] }) => {
  if (!value) {
    return undefined
  }
  const data = options.filter(option => option.value === value)
  const optionData = data && data.length > 0 ? data[0] : undefined
  return optionData && optionData.label
}

export const getDefaultSearchParamsFromFeedOptions = (
  feedOptions: FeedOptions[],
  includeSortParams?: boolean,
): SearchParamsProps => {
  const defaultSearchParams = feedOptions.reduce((accumulator: SearchParamsProps, feedOption: FeedOptions) => {
    if (!includeSortParams && feedOption.name === "sort") {
      return accumulator
    }

    if (feedOption.type === "single_select" || feedOption.type === "multi_select" || feedOption.type === "slider") {
      accumulator = addDefaultsForListFilter(accumulator, feedOption as FeedOptionListSelection)
    } else if (feedOption.type === "numeric_range") {
      accumulator = addDefaultsForNumericFilter(accumulator, feedOption as FeedOptionNumericRange)
    }

    return accumulator
  }, {})

  // Hardcode the deliveryParam as PickupShipping
  defaultSearchParams.delivery_param = DeliveryParamOption.PickupShipping

  return defaultSearchParams
}

const addDefaultsForListFilter = (accumulator: SearchParamsProps, listFilter: FeedOptionListSelection) => {
  const defaultSelections = listFilter.options.reduce((listSelectionDefaults: string[], optionValue) => {
    if (optionValue && optionValue.default && optionValue.value) {
      listSelectionDefaults.push(optionValue.value)
    }
    return listSelectionDefaults
  }, [])
  accumulator[listFilter.queryParam] = defaultSelections.length ? defaultSelections.join(",") : undefined
  return accumulator
}

const addDefaultsForNumericFilter = (accumulator: SearchParamsProps, numericFilter: FeedOptionNumericRange) => {
  accumulator[numericFilter.leftQueryParam] = _.propertyOf(numericFilter)("options.0.value")
  accumulator[numericFilter.rightQueryParam] = _.propertyOf(numericFilter)("options.1.value")
  return accumulator
}
