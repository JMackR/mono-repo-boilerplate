import React from "react"
import { Flex } from "uc-lib"
import { FeedItemProps } from "./feed-item-grid.d"
import { Listing } from "shared-lib"

import { FeedItemTileContents } from "./feed-item-tile-contents"

export const RNFeedItem = React.memo<FeedItemProps>(props => {
  const { feedItem, onClick, shouldShowDetails, testID } = props
  const { tile } = feedItem

  const handleClick = React.useCallback(() => {
    onClick && onClick(feedItem)
  }, [feedItem, onClick])

  return (
    <Flex width="100%" testID="feed-item">
      <FeedItemTileContents
        listing={tile as Listing}
        onClick={handleClick}
        shouldShowDetails={shouldShowDetails}
        testID={testID}
      />
    </Flex>
  )
})
