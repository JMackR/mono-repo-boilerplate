import React from "react"
import { List } from "../../controls/list"
import { Pill } from "./pill"
import { PillDataProps, PillListProps } from "./pill-list-props"

const renderItem = (item: PillDataProps, index: number): JSX.Element => {
  return <Pill data={item} key={index} index={index} />
}

export const PillList: React.FC<PillListProps> = ({ data, paddingLeft, testID }) => {
  return (
    <List
      data={data}
      horizontal={true}
      paddingLeft={paddingLeft}
      renderItem={renderItem}
      testID={testID || "uc-lib.pill-list"}
    />
  )
}
