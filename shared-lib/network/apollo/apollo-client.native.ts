import { ApolloClient } from "apollo-client"
import "cross-fetch/polyfill"
import { useMemo } from "react"
import { apolloCache } from "./apollo-cache"
import { createApolloLink } from "./apollo-link"
import { createApolloAuthClient } from "./apollo-auth-client"
import { createApolloRefreshLink } from "./apollo-refresh-link"

export const createApolloClient = (appUrl: string) => {
  const apolloLink = createApolloLink(appUrl)
  const apolloAuthClient = createApolloAuthClient(appUrl)
  const refreshLink = createApolloRefreshLink(apolloAuthClient)

  return new ApolloClient({
    link: refreshLink.concat(apolloLink),
    cache: apolloCache,
  })
}

export const useApolloGraphQl = (appUrl: string) => {
  const apolloClient = useMemo(() => createApolloClient(appUrl), [appUrl])
  return apolloClient
}
