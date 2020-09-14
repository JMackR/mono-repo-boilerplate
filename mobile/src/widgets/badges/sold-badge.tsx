import { Background, Text, Touchable, useMargin, Flex } from "uc-lib"
import React, { FC } from "react"
import { translate } from "shared-lib/utilities"

export const SoldBadge: FC = () => {
  const { baseMargin } = useMargin()
  return (
    <Flex direction={"row"} grow={0}>
      <Touchable
        style={{
          borderRadius: baseMargin * 3,
          overflow: "hidden",
          paddingVertical: baseMargin,
          paddingHorizontal: baseMargin * 2,
        }}
      >
        <Background type="trust" />
        <Text textType="tertiaryBody1" color="primaryAlt">
          {translate("my-offers.sold")}
        </Text>
      </Touchable>
    </Flex>
  )
}
