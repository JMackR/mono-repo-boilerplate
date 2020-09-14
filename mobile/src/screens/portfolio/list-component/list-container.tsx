import React, { FC } from "react"
import { Margin, Flex, Separator } from "uc-lib"
import { FlatList } from "react-native"

import data from "./data"
import { ListRow } from "./list-row"

interface IItem {
  item: {
    name: string
    address: string
    status: string
  }
}

export const ListContainer: FC<IItem> = () => {
  const renderItem: FC<IItem> = ({ item }) => <ListRow {...item} />

  return (
    <Flex grow={1} basis={1}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.address}
        ItemSeparatorComponent={(_) => (
          <Margin marginLeftStep={7.5}>
            <Separator />
          </Margin>
        )}
      />
    </Flex>
  )
}
