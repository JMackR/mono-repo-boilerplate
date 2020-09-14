import React, { FC, useState } from "react"
import { Margin, Flex, Text, SVG, ActionEllipsisFill } from "uc-lib"
import { useColor } from "uc-lib/themes"
import { StatusComponent } from "./status-component"
import { ExpandableSection } from "./expandable-section"
import { TouchableOpacity } from "react-native-gesture-handler"

interface IItem {
  name: string
  address: string
  status: string
}

export const ListRow: FC<IItem> = ({ name, address, status }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Margin marginLeftStep={7.5} marginRightStep={5.4} marginStep={4}>
          <Flex width={"28.3%"}>
            <StatusComponent status={status} />
          </Flex>
          <Flex width={"40%"} crossAxisDistribution="center">
            <Text textType="primaryBody1" numberOfLines={1} text={name} />
          </Flex>
          <Flex width={"26.7%"} crossAxisDistribution="center">
            <Text textType="primaryBody2" numberOfLines={1} text={address} />
          </Flex>
          <Flex width={"5%"} crossAxisDistribution="center" axisDistribution="space-between">
            <SVG tint={"primary"} localSVG={ActionEllipsisFill} />
          </Flex>
        </Margin>
      </TouchableOpacity>
      {isExpanded && <ExpandableSection />}
    </>
  )
}
