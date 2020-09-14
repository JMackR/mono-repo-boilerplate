import { createHttpLink } from "apollo-link-http"
import { apolloAuthContextLink } from "./apollo-auth-context.native"

export const createApolloAuthLink = (appUrl: string) => {
  const httpLink = createHttpLink({
    uri: appUrl,
  })
  return apolloAuthContextLink.concat(httpLink)
}
