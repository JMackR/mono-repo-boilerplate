import { Margin, Spacer, Stack, Text } from "uc-lib/controls"
import { BackgroundContainer } from "uc-lib/controls/layout/background-container"
import React from "react"

const ACCNT_SECTION_LABEL_HEIGHT = 48

export const AccountSectionLabel = ({ title }: { title: string }) => {
  return (
    <BackgroundContainer type="primary">
      <Margin marginLeftStep={4} direction="column" height={ACCNT_SECTION_LABEL_HEIGHT} axisDistribution="center">
        <Text textType="headline3">{title}</Text>
      </Margin>
    </BackgroundContainer>
  )
}
