import { useEffect } from "react"
import { StorageController, CACHED_LISTINGS_INFO_KEY } from "shared-lib/utilities/storage"
import { useApolloClient } from "@apollo/react-hooks"
import { ListingResponse, Listings, Maybe } from "../shared-lib/type-defs/generated-type-defs/type-defs"

/* tslint:disable-next-line: no-magic-numbers */
const TWO_DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 2

interface CachedPortfolioInfo {
  syncToken?: Maybe<string>
  listings?: Maybe<Listings[]>
  lastSyncTimeStamp?: number
}

const listingsInfoStorage = StorageController<CachedPortfolioInfo>(CACHED_LISTINGS_INFO_KEY, {})

const getDataFromStorage = async () => {
  const cachedVehicleInfo = await listingsInfoStorage.getItem()
  return cachedVehicleInfo as CachedPortfolioInfo
}

export const getPortfolioDataSetFromDisk = async () => {
  const cachedPortfolioInfo = await getDataFromStorage()
  return cachedPortfolioInfo.listings || []
}

export const usePortfolioFetchOnce = () => {
  const apolloClient = useApolloClient()

  const loadDataOnce = async () => {
    const cachedPortfolioInfo = await getDataFromStorage()
    if (needsData(cachedPortfolioInfo)) {
      const syncToken = cachedPortfolioInfo.syncToken
      /**
       *TODO Refactor with axios
       */
      // apolloClient
      //   .query({
      //     query: AUTOS_YEAR_MAKE_MODEL_QUERY,
      //     variables: { syncToken },
      //   })
      //   .then(updateCache)
      //   .catch(() => {
      //     /* Intentionally do nothing */
      //   })
    }
  }

  /* tslint:disable-next-line: no-any */
  const updateCache = async (result: any) => {
    if (!!!result.data || !!!result.data.listings) {
      return
    }
    const cachedPortfolioInfo = await getDataFromStorage()
    const response = result.data.listings as ListingResponse
    if (!response.noChange) {
      cachedPortfolioInfo.listings = response.listings
      cachedPortfolioInfo.syncToken = response.syncToken
    }
    cachedPortfolioInfo.lastSyncTimeStamp = new Date().getTime()
    listingsInfoStorage.setItem(cachedPortfolioInfo)
  }

  useEffect(() => {
    loadDataOnce()
  }, [])
}

const needsData = (cachedPortfolioInfo: CachedPortfolioInfo) => {
  if (!cachedPortfolioInfo || !cachedPortfolioInfo.lastSyncTimeStamp || !cachedPortfolioInfo.listings) {
    return true
  } else {
    const currentTime = new Date().getTime()
    const timeDiff = currentTime - cachedPortfolioInfo.lastSyncTimeStamp
    const timeSinceLastRefreshIsGreaterThanTwoDays = timeDiff > TWO_DAYS_IN_MILLISECONDS
    return timeSinceLastRefreshIsGreaterThanTwoDays
  }
}
