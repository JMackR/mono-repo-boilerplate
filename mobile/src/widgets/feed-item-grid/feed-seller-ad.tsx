import React, { useEffect } from "react"
import { Flex, useScreen } from "uc-lib"
import { FeedItemProps } from "./feed-item-grid.d"
import { AnalyticsAds, AdScreenName, AnalyticsActionType, SellerAd } from "shared-lib"
import { FeedItemTileContents } from "./feed-item-tile-contents"

export const FeedSellerAd = React.memo<FeedItemProps>(props => {
  const { feedItem, onClick, shouldShowDetails, feedIndex, testID } = props

  const { screenName } = useScreen()

  const { tile } = feedItem
  const { listing } = tile as SellerAd
  const { id } = listing

  const trackTile = (actionType: AnalyticsActionType) => {
    const {
      ouAdId: adId,
      adExperimentId: experimentId,
      adRequestId,
      adNetwork,
      experimentDataHash,
      searchId,
    } = feedItem as SellerAd
    AnalyticsAds.trackTile({
      screenName: screenName as AdScreenName,
      actionType,
      adId,
      adNetwork,
      adRequestId,
      experimentId,
      experimentDataHash: experimentDataHash as string,
      searchId,
      feedIndex,
      itemId: id as string,
    })
  }

  const handleClick = React.useCallback(() => {
    trackTile(AnalyticsActionType.Click)
    onClick && onClick(feedItem)
  }, [feedItem, onClick])

  useEffect(() => {
    trackTile(AnalyticsActionType.Show)
  }, [])

  return (
    <Flex width="100%" testID="feed-seller-ad">
      <FeedItemTileContents
        listing={listing}
        onClick={handleClick}
        isPromoted={true}
        shouldShowDetails={shouldShowDetails}
        testID={testID}
      />
    </Flex>
  )
})
