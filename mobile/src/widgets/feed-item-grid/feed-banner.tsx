import React, { FC } from "react"
import { useMargin, Separator, Text, Margin, Stack } from "uc-lib"
import { FeedItemProps } from "./feed-item-grid.d"

export const FeedBanner: FC<FeedItemProps> = ({ feedItem }) => {
  const { baseMargin } = useMargin()
  if (!feedItem.banner) {
    return <></>
  }
  return (
    <Stack direction="column" testID="feed-banner">
      <Margin marginTopStep={baseMargin}>
        <Separator />
      </Margin>
      <Margin marginStep={baseMargin}>
        <Text textType="primaryBody1">{feedItem.banner.label}</Text>
      </Margin>
    </Stack>
  )
}
