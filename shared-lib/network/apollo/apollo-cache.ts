import { InMemoryCache, IntrospectionFragmentMatcher, defaultDataIdFromObject } from "apollo-cache-inmemory"

const fragmentMatcher = new IntrospectionFragmentMatcher({
  // introspectionQueryResultData,
})

export const apolloCache = new InMemoryCache({
  // fragmentMatcher,
  dataIdFromObject: object => {
    switch (object.__typename) {
      case "Listing":
        const { listingId, id } = object
        return !!listingId ? listingId : id
      default:
        return defaultDataIdFromObject(object)
    }
  },
})
