import { ActivityIndicator } from "uc-lib/controls/"
import { Flex } from "uc-lib/controls/layout"
import React from "react"

export const AccountLoadingScreen = () => (
  <Flex axisDistribution="center" crossAxisDistribution="center" grow={1}>
    <ActivityIndicator size="large" />
  </Flex>
)
