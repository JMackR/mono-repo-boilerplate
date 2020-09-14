import React, { FC } from "react"
import { translate } from "shared-lib"
import { Overlay, Border, Background, Text } from "uc-lib"

export const FeedItemPromotedLabel: FC = () => {
  return (
    <Overlay insetLeftStep={1} insetRightStep={1} insetTopStep={1}>
      <Border direction={"column"} cornerRadius="small" lineWeight="none" grow={1} shrink={0}>
        <Background type="overlay" />
        <Text textAlign="center" textType="tertiaryBody2" color="primaryAlt" testID={"search-portfolio.promote-banner"}>
          {translate("common-labels.promoted")}
        </Text>
      </Border>
    </Overlay>
  )
}
