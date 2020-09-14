import React from "react"
import { RemoteImage, Text, Margin, Stack, ClickableOpacity, Border, SpacerFlex } from "uc-lib"
import { FeedItemProps } from "./feed-item-grid.d"
import { FeedItemShippingLabel } from "./feed-item-shipping-label"
import { Listing, VehicleAttributes, translate, ListingState } from "shared-lib"
import { prettyNumberFormatter, formatMoney, MoneyTrimType } from "uc-lib/formatters/number-formatters"
import { FeedItemSoldLabel } from "./feed-item-sold-label"
import { FeedItemPromotedLabel } from "./feed-item-promoted-label"

export interface FeedItemTileContentsProps extends Omit<FeedItemProps, "feedItem" | "onClick"> {
  listing: Listing
  onClick: () => void
  isPromoted?: boolean
}

export const FeedItemTileContents = React.memo<FeedItemTileContentsProps>(props => {
  const { listing, onClick, isPromoted, shouldShowDetails, testID } = props

  const { title, state, price, photos, fulfillmentDetails, vehicleAttributes } = listing
  const isSold = state === ListingState.Sold

  const photoUri = shouldShowDetails ? photos[0]?.detail?.url : photos[0]?.list?.url

  const { shippingPrice, sellerPaysShipping, showShippingIconInFeed, shippingEnabled } = fulfillmentDetails || {}
  const buyerShippingPrice = sellerPaysShipping ? 0 : shippingPrice

  const { vehicleMiles } = (vehicleAttributes as VehicleAttributes) || {}

  const handleClick = React.useCallback(() => {
    onClick && onClick()
  }, [onClick])

  return (
    <ClickableOpacity activeOpacity={1} onClick={handleClick} testID={testID}>
      <Border color="limestone">
        <Stack direction="column" childSeparationStep={1}>
          <RemoteImage
            source={{
              uri: photoUri,
            }}
            resizeMode="cover"
            aspectRatio={1}
            width="100%"
          >
            {shippingEnabled && !isSold && showShippingIconInFeed && (
              <FeedItemShippingLabel shippingPrice={buyerShippingPrice} />
            )}
            {isSold && <FeedItemSoldLabel />}
            {!isSold && isPromoted && <FeedItemPromotedLabel />}
          </RemoteImage>
          {shouldShowDetails && (
            <Margin marginStep={1} marginRightStep={2} marginLeftStep={2}>
              <Stack direction="column" grow={1} childSeparationStep={1}>
                <Text textType="primaryBody1" numberOfLines={1}>
                  {title}
                </Text>
                <Stack direction="row" grow={1} shrink={0}>
                  <Text textType="primaryBody2">{formatMoney(price, MoneyTrimType.NoDoubleZeros)}</Text>
                  <SpacerFlex />
                  {(vehicleMiles || vehicleMiles === "0") && (
                    <Text textAlign="right" textType="primaryBody2">
                      {prettyNumberFormatter(Number(vehicleMiles), 1, false, true)} {translate("search-stack.tile.mileage")}
                    </Text>
                  )}
                </Stack>
              </Stack>
            </Margin>
          )}
        </Stack>
      </Border>
    </ClickableOpacity>
  )
})
