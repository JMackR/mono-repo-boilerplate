import { createUploadLink } from "apollo-upload-client"

export const createApolloLink = (appUrl: string) => {
  return createUploadLink({
    uri: appUrl,
    fetch,
    fetchOptions: { credentials: "include" },
  })
}
