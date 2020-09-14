import React, { FC } from "react"
import { Margin, Flex, Text, SVG, Border, PortfolioListStatusFunded } from "uc-lib"
import { translate } from "shared-lib"
import { useColor } from "uc-lib/themes"

export const StatusComponent: FC = ({ status }) => {
  const { colors } = useColor()
  const borderedStatus = {
    choseYou: {
      color: "green",
    },
    potential: {
      color: "grey",
    },
    update: {
      color: "larchYellow",
    },
    declined: {
      color: "paintbrushRed",
    },
  }

  return (
    <Flex direction="column">
      {borderedStatus[status] ? (
        <Border
          cornerRadius="circle"
          debugColor={colors[borderedStatus[status].color]}
          crossAxisDistribution="center"
          direction="column"
          color={borderedStatus[status].color}
        >
          <Margin marginRightStep={1.5} marginLeftStep={1.5}>
            <Text textType="smallBody2" text={translate(`portfolio-stack.portfolio-screen.${status}`)} />
          </Margin>
        </Border>
      ) : (
        <>
          <SVG tint={"primary"} localSVG={PortfolioListStatusFunded} />
          <Text textType="smallBody1" text={translate(`portfolio-stack.portfolio-screen.${status}`)} />
        </>
      )}
    </Flex>
  )
}
