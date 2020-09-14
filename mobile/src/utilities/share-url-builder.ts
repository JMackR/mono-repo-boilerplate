import { ITEM_SHARE_BASE_URL } from "shared-lib/utilities/share/index.native"

export const buildListingShareURL = (listingId: string) => {
  return ITEM_SHARE_BASE_URL + listingId + "/"
}
