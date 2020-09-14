import { ApolloClient } from "apollo-client"
import "cross-fetch/polyfill"
import { useMemo } from "react"
import { apolloCache } from "./apollo-cache"
import { createApolloLink } from "./apollo-link"
import { NormalizedCacheObject } from "apollo-cache-inmemory"
import { getAppUrl } from "../../utilities/settings/server-settings"

let sharedApolloClient: ApolloClient<NormalizedCacheObject>

const getSsrMode = () => {
  return typeof window === "undefined"
}

export const createApolloClient = (ssrMode: boolean = false) => {
  const appUrl = getAppUrl(ssrMode)
  const apolloLink = createApolloLink(graphQlUrl)
  return new ApolloClient({
    link: apolloLink,
    cache: apolloCache,
    ssrMode,
  })
}

export function initializeApollo(initialState?: NormalizedCacheObject) {
  const ssrMode = getSsrMode()
  const apolloClient = sharedApolloClient ?? createApolloClient(ssrMode)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (ssrMode) {
    return apolloClient
  }
  // Create the Apollo Client once in the client
  if (!sharedApolloClient) {
    sharedApolloClient = apolloClient
  }

  return apolloClient
}

export function useApolloGraphQl(initialState?: NormalizedCacheObject) {
  const apolloClient = useMemo(() => initializeApollo(initialState), [initialState])
  return apolloClient
}
