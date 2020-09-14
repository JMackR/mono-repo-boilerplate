import _ from "lodash"
import { ActivityIndicator, Grid, Margin, RemoteImage, Touchable, GridItemType } from "uc-lib"
import React, { FC, useEffect, useState } from "react"
import { useApolloClient } from "@apollo/react-hooks"
export const UserItems: FC<{
  userId: string
  onClickItem?: (item: Listing) => void
}> = ({ userId, onClickItem }) => {
  const [items, setItems] = useState<Listing[]>([])
  const apolloClient = useApolloClient()
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [finished, setFinished] = useState<boolean>(false)
  const loadMore = async () => {
    if (finished) {
      return
    }
    setLoading(true)
    const { data } = await apolloClient.query<Query>({
      query: PUBLIC_PROFILE_USER_ITEMS_QUERY,
      variables: {
        userId: _.toNumber(userId),
        page,
      },
    })
    if (!_.size(data.userItems)) {
      setFinished(true)
    } else {
      setItems(
        items.concat(data.userItems!).map(value => {
          value.type = GridItemType.Item
          return value
        }),
      )
    }
    setPage(page + 1)
    setLoading(false)
  }
  useEffect(() => {
    loadMore()
  }, [])
  const onClick = (item: Listing) => () => onClickItem && onClickItem(item)
  const renderItem = (item: Listing) => {
    return (
      <Touchable onPress={onClick(item)}>
        <RemoteImage
          source={{ uri: _.property("photos[0].list.url")(item) as string }}
          width="100%"
          resizeMode="cover"
          aspectRatio={1}
        />
      </Touchable>
    )
  }
  const handleEndReached = () => {
    loadMore()
  }
  return (
    <>
      <Grid data={items} renderItem={renderItem} onEndReachedThreshold={300} onEndReached={handleEndReached} />
      <Margin direction="column" marginStep={4} crossAxisDistribution="center">
        {loading && <ActivityIndicator size="large" />}
      </Margin>
    </>
  )
}
