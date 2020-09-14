import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createApolloAuthLink } from "./apollo-auth-link"

export const createApolloAuthClient = (appUrl: string, ssrMode?: boolean) => {
  const apolloLink = createApolloAuthLink(appUrl)
  return new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
    ssrMode,
    // Disable all caching for auth requests
    defaultOptions: {
      mutate: {
        fetchPolicy: "no-cache",
      },
      query: {
        fetchPolicy: "no-cache",
      },
    },
  })
}
