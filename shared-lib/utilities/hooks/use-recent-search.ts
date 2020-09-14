import { StorageController, RECENT_SEARCH_STORAGE_KEY } from "../storage"

export const useRecentSearch = () => {
  const recentSearchStorage = StorageController<Suggestion[]>(RECENT_SEARCH_STORAGE_KEY, [])
  const getRecentSearches = async () => {
    const data = await recentSearchStorage.getItem()
    return data
  }
  const addRecentSearch = async (search: Suggestion) => {
    let data = await getRecentSearches()
    if (!data) {
      data = []
    }
    const updatedData = data.filter((recentSearch: Suggestion) => recentSearch.actionPath !== search.actionPath)
    updatedData.unshift(search)
    recentSearchStorage.setItem(updatedData)
  }
  const removeRecentSearch = async (actionPath: string) => {
    const data = await recentSearchStorage.getItem()
    const updatedData = data ? data.filter((recentSearch: Suggestion) => recentSearch.actionPath !== actionPath) : []
    recentSearchStorage.setItem(updatedData)
  }
  return {
    getRecentSearches,
    addRecentSearch,
    removeRecentSearch,
  }
}
