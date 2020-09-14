import React, { FC } from "react"
import { Stack, Flex } from "uc-lib"
import { Text } from "uc-lib/controls/text/text"
import { Attribute } from "./attribute-list.props"

const AttributeItem: FC<Attribute> = props => {
  const { label, value } = props

  return (
    <Stack direction="row" childSeparationStep={2}>
      <Flex basis="40%" grow={1}>
        <Text textType="primaryBody1">{label}</Text>
      </Flex>
      <Flex basis="60%" shrink={1}>
        <Text textType="primaryBody2">{value}</Text>
      </Flex>
    </Stack>
  )
}

export { AttributeItem }
