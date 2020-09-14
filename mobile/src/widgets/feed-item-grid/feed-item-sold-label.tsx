import React, { FC } from "react"
import { translate } from "shared-lib"
import { Overlay, Border, Background, Text, Margin } from "uc-lib"

export const FeedItemSoldLabel: FC = () => {
  return (
    <Overlay insetLeftStep={1} insetRightStep={1} insetBottomStep={1}>
      <Border direction={"column"} cornerRadius="small" lineWeight="none" grow={1} shrink={0}>
        <Background type="overlay" />
        <Margin marginBottomStep={1} marginTopStep={1} axisDistribution="center">
          <Text textAlign="center" textType="tertiaryBody2" color="primaryAlt" testID={"search-portfolio.sold-banner"}>
            {translate("common-labels.sold")}
          </Text>
        </Margin>
      </Border>
    </Overlay>
  )
}
