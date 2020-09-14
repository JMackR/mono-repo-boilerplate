import React, { FC } from "react"
import { Margin, Text, Border } from "uc-lib"
import { translate } from "shared-lib"

/**
 * A title componetn
 */
export const InfoSection: FC = () => {
  return (
    <>
      <Margin marginLeftStep={7.5} marginRightStep={7.5} marginTopStep={5}>
        <Border grow={1} color="limestone" cornerRadius="small">
          <Margin marginStep={3} grow={1} axisDistribution="space-between">
            <Text textType="secondaryBody1" text={`${translate("portfolio-stack.portfolio-screen.all-leads")} ${"(89)"} `} />
            <Text textType="secondaryBody2" text={`${translate("portfolio-stack.portfolio-screen.update")} ${"(9)"}`} />
            <Text textType="secondaryBody2" text={`${translate("portfolio-stack.portfolio-screen.new-leads")} ${"(12)"}`} />
          </Margin>
        </Border>
      </Margin>
    </>
  )
}
