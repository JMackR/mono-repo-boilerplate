import { createUploadLink } from "apollo-upload-client"
import { apolloAuthContextLink } from "./apollo-auth-context.native"

// const logGraphQLErrors = onError(({ graphQLErrors, operation }) => {
//   if (__DEV__ && _.size(graphQLErrors) > 0) {
//     graphQLErrors?.forEach((error, idx) => {
//       console.log(`GraphQL Error[${idx}]`, operation.operationName ? `for query ${operation.operationName}:` : '', `${error.message}`)
//     })
//   }
// })

// const resetToken = onError(({ networkError }) => {
//   if (
//     networkError &&
//     'statusCode' in networkError &&
//     networkError.name === 'ServerError' &&
//     (networkError.statusCode === HttpStatus.UNAUTHORIZED || networkError.statusCode === HttpStatus.FORBIDDEN)
//   ) {
//     // TODO refresh token logic should be here. CLIENT-431
//   }
// })

// const authFlowLink = apolloAuthContextLink.concat(resetToken).concat(logGraphQLErrors)

export const createApolloLink = (appUrl: string) => {
  const uploadLink = createUploadLink({
    uri: appUrl,
  })

  return apolloAuthContextLink.concat(uploadLink)
}
