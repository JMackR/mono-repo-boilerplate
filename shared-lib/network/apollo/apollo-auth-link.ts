import { createHttpLink } from "apollo-link-http"

export const createApolloAuthLink = (appUrl: string) => {
  return createHttpLink({
    uri: appUrl,
    fetch,
    fetchOptions: { credentials: "include" },
  })
}
