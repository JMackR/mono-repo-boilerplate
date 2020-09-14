import { ApolloClient } from "@apollo/client"
import { fromPromise } from "apollo-link"
import { onError } from "apollo-link-error"
import invariant from "invariant"
import _ from "lodash"
import { getAuthTokens, setAuthTokens } from "../../providers/auth-provider/auth-provider-helpers"
import { AnalyticsDebug } from "../../analytics"
import { ouFlatMap } from "../../utilities/object-utils"

let isRefreshing = false
let pendingRequests: Function[] = []

const setIsRefreshing = (value: boolean) => {
  isRefreshing = value
}

const addPendingRequest = (pendingRequest: Function) => {
  pendingRequests.push(pendingRequest)
}

const resolvePendingRequests = (refreshSuccess: boolean) => {
  pendingRequests.map(callback => callback(refreshSuccess))
  pendingRequests = []
}

// tslint:disable-next-line: no-any
// const retryOperation = (operation: Operation, oldHeaders: any, authorization: string, forward: NextLink) => {
//   // modify the operation context with a new token
//   operation.setContext({
//     headers: {
//       ...oldHeaders,
//       authorization
//     }
//   })
//   // retry the request, returning the new observable
//   return forward(operation)
// }

const requestJwtTokenRefresh = async (apolloClient: ApolloClient<object>, oldAuthHeader: string) => {
  const authTokens = getAuthTokens()
  // If we're not authenticated skip
  if (!authTokens.jwtToken || !authTokens.refreshToken || !authTokens.djangoToken) {
    return
  }
  // If the JWT token has changed retry the request
  const newAuthHeader = `Bearer ${authTokens.jwtToken}`
  if (newAuthHeader !== oldAuthHeader) {
    return
  }
  // Otherwise request a new token
  console.log("[[[DEBUG]]] REFRESHING JWT TOKEN")
  const { data } = await apolloClient.mutate<Mutation, JwtTokenRefreshInput>({
    mutation: JWT_TOKEN_REFRESH,
    variables: {
      jwtToken: authTokens.jwtToken,
      refreshToken: authTokens.refreshToken,
      requestShortExpiration: true,
    },
    fetchPolicy: "network-only",
  })
  invariant(data?.jwtTokenRefresh, "JWT token and refresh token are required from refresh API.")
  const { jwtToken, refreshToken } = data?.jwtTokenRefresh
  await setAuthTokens({
    djangoToken: authTokens.djangoToken,
    jwtToken,
    refreshToken,
  })
}

export const createApolloRefreshLink = (apolloClient: ApolloClient<object>) => {
  const link = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      if (__DEV__ && _.size(graphQLErrors) > 0) {
        graphQLErrors.forEach((error, idx) => {
          console.log(
            `GraphQL Error[${idx}]`,
            operation.operationName ? `for query ${operation.operationName}:` : "",
            `${error.message}`,
          )
        })
      }

      for (const gqlError of graphQLErrors) {
        if (gqlError.extensions?.code === undefined) {
          continue
        }
        // tslint:disable-next-line: switch-default
        switch (gqlError.extensions.code) {
          case "401":
          case "UNAUTHENTICATED": {
            // error code is set to UNAUTHENTICATED
            // when AuthenticationError thrown in resolver

            const oldAuthHeader = operation.getContext().headers.authorization
            if (!oldAuthHeader) {
              // If we're not authenticated skip
              return // forward(operation)
            }

            // Otherwise request a new token
            if (!isRefreshing) {
              setIsRefreshing(true)
              const result = fromPromise(
                requestJwtTokenRefresh(apolloClient, oldAuthHeader).catch(refreshError => {
                  resolvePendingRequests(false)
                  // TODO: Propogate error to UI and suggest log out if refresh fails
                  console.log("[[[DEBUG]]] REFRESH JWT TOKEN FAILED")
                  AnalyticsDebug.logError(refreshError)
                  setIsRefreshing(false)

                  // return forward(operation)
                }),
              )
              return ouFlatMap(result, () => {
                resolvePendingRequests(true)
                console.log("[[[DEBUG]]] REFRESH JWT TOKEN SUCCEEDED")
                setIsRefreshing(false)

                return forward(operation)
              })
            } else {
              const result = fromPromise(
                new Promise((resolve, reject) => {
                  addPendingRequest((refreshSuccess: boolean) => (refreshSuccess ? resolve() : reject()))
                }),
              )
              return ouFlatMap(result, () => {
                return forward(operation)
              })
            }
          }
        }
      }
    }
    if (networkError) {
      AnalyticsDebug.logError(networkError)
      if (__DEV__) {
        // tslint:disable-next-line: no-console
        console.log(`[Network error]: ${networkError}`)
      }
    }
    return // forward(operation)
  })
  return link
}
