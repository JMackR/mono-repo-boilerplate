import React, { createContext, FC, useContext, useEffect } from "react"
import { SearchProps, SearchStateProps } from "./search-provider"
import { useProvideSearch } from "./use-provide-search"
import { LocationDetails, getUserSearchLocation } from "../../utilities/location"

const initValue: SearchProps = {
  state: { searchParams: {} },
  sort: () => {},
  filter: () => {},
  resetFiltersToDefaults: () => {},
  resetFiltersToDefaultsWithOverride: () => {},
  setLocationData: () => {},
  setFeedData: () => {},
}

export const SearchContext = createContext<SearchProps>(initValue)
export const HomeContext = createContext<SearchProps>(initValue)

export const useSearch = (): SearchProps => {
  return useContext(SearchContext)
}
export const useHome = (): SearchProps => {
  return useContext(HomeContext)
}

export const SearchProvider: FC<{ initState?: SearchStateProps; context?: React.Context<SearchProps> }> = props => {
  const { initState, children, context = SearchContext } = props
  const value = initState || initValue.state
  const search = useProvideSearch(value)
  const getUserLocation = async () => {
    const userLocation = await getUserSearchLocation()
    if (userLocation) {
      search.setLocationData(userLocation)
    }
  }
  useEffect(() => {
    getUserLocation()
  }, [])
  return <context.Provider value={search}>{children}</context.Provider>
}
