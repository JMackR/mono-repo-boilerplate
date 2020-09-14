import React, { FC } from "react"
import { Margin, Flex, Text, Separator } from "uc-lib"
import { translate } from "shared-lib"

export const ListTitle: FC = () => {
  return (
    <>
      <Margin marginLeftStep={7.5} marginRightStep={7.5} marginBottomStep={2.5} marginTopStep={3.5}>
        <Flex width={"29%"}>
          <Text textType="tertiaryBody2" text={translate("portfolio-stack.portfolio-screen.status")} />
        </Flex>
        <Flex width={"41%"}>
          <Text textType="tertiaryBody2" text={translate("portfolio-stack.portfolio-screen.name")} />
        </Flex>
        <Flex width={"30%"}>
          <Text textType="tertiaryBody2" text={translate("portfolio-stack.portfolio-screen.address")} />
        </Flex>
      </Margin>
      <Margin marginLeftStep={7.5}>
        <Separator />
      </Margin>
    </>
  )
}
