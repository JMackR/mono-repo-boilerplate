import React from "react"
import { Text, Stack, Margin, SVG, ShippingTruckFill, Spacer, BackgroundContainer, SpacerFlex } from "uc-lib"
import { translate } from "shared-lib"

export const FeedItemShippingLabel = React.memo<{ shippingPrice?: number | null }>(({ shippingPrice }) => {
  return (
    <Stack grow={1} direction="column" axisDistribution="flex-start">
      <SpacerFlex />
      {!shippingPrice ? (
        <Margin marginStep={1} direction="column" grow={0}>
          <BackgroundContainer type="trust" borderRadius={2}>
            <Margin marginStep={1} marginTopStep={0.5} marginBottomStep={0.5} shrink={0} grow={0}>
              <Stack grow={1} direction="row" crossAxisDistribution="center" axisDistribution="center">
                <SVG localSVG={{ ...ShippingTruckFill, size: { width: 12, height: 12 } }} tint="alwaysLight" />
                <Spacer direction="row" sizeStep={1} />
                <Text color="alwaysLight" textType="tertiaryBody2" testID={"search-portfolio.free-shipping-banner"}>
                  {translate("listing-detail.shipping.free_shipping_excited")}
                </Text>
              </Stack>
            </Margin>
          </BackgroundContainer>
        </Margin>
      ) : (
        <Margin marginStep={1}>
          <BackgroundContainer type="trust" borderRadius={2}>
            <Margin marginStep={1} marginTopStep={0.5} marginBottomStep={0.5}>
              <SVG
                localSVG={{ ...ShippingTruckFill, size: { width: 12, height: 12 } }}
                tint="alwaysLight"
                testID={"search-portfolio.shipping-truck"}
              />
            </Margin>
          </BackgroundContainer>
        </Margin>
      )}
    </Stack>
  )
})
