import { useReducer } from "react"
import {
  SearchProps,
  SortProp,
  SearchActionProps,
  SearchStateProps,
  FeedDataProps,
  SearchParamsProps,
} from "./search-provider"
import _ from "lodash"
import { getDefaultSearchParamsFromFeedOptions } from "./search-helpers"
import { FeedOptions } from "shared-lib/type-defs/generated-types/type-defs"
import { LocationDetails } from "shared-lib/src/utilities"

const actionType = {
  sort: "sort",
  filter: "filter",
  filterAndResetSort: "filterAndResetSort",
  resetFiltersToDefaults: "resetFiltersToDefaults",
  resetFiltersToDefaultsWithOverride: "resetFiltersToDefaultsWithOverride",
  setLocationData: "setLocationData",
  setFeedData: "setFeedData",
}
const resetStateToDefaults = (state: SearchStateProps) => {
  if (!state.feedOptions) {
    return state
  }
  const { query, sort, cid, zipcode, lat, lon } = state.searchParams
  const updatedSearchParams = {
    ...getDefaultSearchParamsFromFeedOptions(state.feedOptions as FeedOptions[]),
    query,
    sort,
    cid,
    zipcode,
    lat,
    lon,
  }
  return { ...state, searchParams: updatedSearchParams }
}

const searchReducer = (state: SearchStateProps, action: SearchActionProps): SearchStateProps => {
  switch (action.type) {
    case actionType.sort: {
      const searchParams = {
        ...state.searchParams,
        sort: action.value as SortProp,
      }
      return { ...state, searchParams }
    }
    case actionType.filter: {
      const searchParams = {
        ...state.searchParams,
        ...(action.value as SearchParamsProps),
      }
      return { ...state, searchParams }
    }
    case actionType.filterAndResetSort: {
      const searchParams = {
        ...state.searchParams,
        sort: undefined,
        ...(action.value as SearchParamsProps),
      }
      return { ...state, searchParams }
    }
    case actionType.resetFiltersToDefaults: {
      return resetStateToDefaults(state)
    }
    case actionType.resetFiltersToDefaultsWithOverride: {
      const searchState = resetStateToDefaults(state)
      const searchParams = {
        ...searchState.searchParams,
        ...(action.value as SearchParamsProps),
      }
      return { ...searchState, searchParams }
    }
    case actionType.setLocationData: {
      const { zipcode, lat, lon, didUseGPS } = action.value as LocationDetails
      let locationData: SearchParamsProps
      if (!didUseGPS) {
        locationData = {
          zipcode,
          lon: undefined,
          lat: undefined,
        }
      } else {
        locationData = {
          zipcode: undefined,
          lon: _.toString(lon),
          lat: _.toString(lat),
        }
      }
      const searchParams = {
        ...state.searchParams,
        ...locationData,
      }
      return { ...state, searchParams }
    }
    case actionType.setFeedData: {
      const { value } = action
      let currentState = {
        ...state,
      }
      if (value && value.hasOwnProperty("searchAlert")) {
        const { searchAlert } = value as FeedDataProps
        currentState = {
          ...state,
          searchAlert,
        }
      }
      if (value && value.hasOwnProperty("feedOptions")) {
        const { feedOptions } = value as FeedDataProps
        if (feedOptions) {
          const sortData = feedOptions.filter(o => o.name === "sort")
          const sortOptionData = sortData && sortData.length > 0 ? sortData[0] : undefined
          const sortOptions = sortOptionData && sortOptionData.options ? sortOptionData.options : []
          const filterOptions = feedOptions.filter(o => o.name !== "sort")
          currentState = {
            ...currentState,
            feedOptions,
            sortOptions,
            filterOptions,
          }
        }
      }
      return currentState
    }
    default:
      return {
        ...state,
      }
  }
}

export const useProvideSearch = (initState: SearchStateProps = { searchParams: {} }): SearchProps => {
  const [state, dispatch] = useReducer(searchReducer, initState)
  const sort = (value: string) => {
    dispatch({ type: actionType.sort, value })
  }
  const filter = (value: SearchParamsProps) => {
    dispatch({ type: actionType.filter, value })
  }
  const filterAndResetSort = (value: SearchParamsProps) => {
    dispatch({ type: actionType.filterAndResetSort, value })
  }
  const resetFiltersToDefaults = () => {
    dispatch({ type: actionType.resetFiltersToDefaults })
  }
  const resetFiltersToDefaultsWithOverride = (value: SearchParamsProps) => {
    dispatch({ type: actionType.resetFiltersToDefaultsWithOverride, value })
  }
  const setLocationData = (value: LocationDetails) => {
    dispatch({ type: actionType.setLocationData, value })
  }
  const setFeedData = (value: FeedDataProps) => {
    dispatch({ type: actionType.setFeedData, value })
  }

  return {
    state,
    sort,
    filter,
    filterAndResetSort,
    resetFiltersToDefaults,
    resetFiltersToDefaultsWithOverride,
    setLocationData,
    setFeedData,
  }
}
