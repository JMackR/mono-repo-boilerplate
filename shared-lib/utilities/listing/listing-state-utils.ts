export const isListingSold = (listingState: ListingState, _quantity?: number): boolean => {
  return listingState === ListingState.Sold
  // This additional logic:  `|| (listingState === ListingState.Unlisted && quantity === 0)`
  // Was added prematurely, this is for Morpho phase 2. For phase 1 we just want to check for 'SOLD'
  // for a legacy value in metadata. GQL handles that so the client just looks at one state
}
