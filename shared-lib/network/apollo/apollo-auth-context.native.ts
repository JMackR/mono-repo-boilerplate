import { setContext } from "apollo-link-context"
import { getOuApiHeaders } from "../../utilities/api/api-helpers.native"

export const apolloAuthContextLink = setContext((_operation, _previousContext) => {
  const ouApiHeaders = getOuApiHeaders()
  return {
    headers: ouApiHeaders,
  }
})
