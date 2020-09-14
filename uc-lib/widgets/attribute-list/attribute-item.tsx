import React, { FC } from "react"
import { Stack, Flex } from "uc-lib"
import { Text } from "uc-lib/controls/text/text"
import { AttributeProps } from "./attribute-list.props"

const AttributeItem: FC<AttributeProps> = props => {
  const { label, value, testID } = props
  const localtestID = testID || "listing-detail-screen.details"

  return (
    <Stack direction="row" childSeparationStep={2}>
      <Flex basis="20%" grow={1}>
        <Text textType="primaryBody1" testID={localtestID + "." + label.toLowerCase().replace(" ", "-") + ".title"}>
          {label}
        </Text>
      </Flex>
      <Flex basis="80%" shrink={1}>
        <Text textType="primaryBody2" testID={localtestID + "." + label.toLowerCase().replace(" ", "-") + ".value"}>
          {value}
        </Text>
      </Flex>
    </Stack>
  )
}

export { AttributeItem }
