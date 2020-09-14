import React, { FC } from "react"
import { Flex } from "../flex"

export const Center: FC = ({ children }) => {
  return (
    <Flex direction="row" axisDistribution="center" crossAxisDistribution="center" grow={1}>
      {children}
    </Flex>
  )
}
