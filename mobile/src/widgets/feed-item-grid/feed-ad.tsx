import React, { useEffect } from "react"
import { max } from "lodash"
import {
  Text,
  Margin,
  Flex,
  Stack,
  RemoteImage,
  Border,
  Background,
  SpacerFlex,
  ClickableOpacity,
  useScreen,
  DangerouslyOverrideColorTheme,
} from "uc-lib"
import { FeedItemProps } from "./feed-item-grid.d"
import { View } from "react-native"
import { translate, AnalyticsAds, AdScreenName, AnalyticsActionType } from "shared-lib"
import { LIGHT_MODE_THEME_ID } from "uc-lib/themes/configs"

const MIN_ASPECT_RATIO = 0.7

export const FeedAd = React.memo<FeedItemProps>(({ feedItem, onClick, shouldShowDetails, feedIndex }) => {
  const { screenName } = useScreen()
  const trackTile = (actionType: AnalyticsActionType) => {
    const {
      ouAdId: adId,
      adExperimentId: experimentId,
      adRequestId,
      adNetwork,
      experimentDataHash,
      searchId,
    } = feedItem as BingAd
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
    })
  }

  const handleClick = () => {
    trackTile(AnalyticsActionType.Click)
    onClick && onClick(feedItem)
  }
  useEffect(() => {
    trackTile(AnalyticsActionType.Show)
  }, [])

  const { tile } = feedItem
  const {
    imageUrl: photoUri,
    imageHeight: photoHeight,
    imageWidth: photowidth,
    price,
    itemName,
    sellerName,
  } = tile as BingAd
  const photoAspectRatio = photoHeight && photowidth ? photowidth / photoHeight : 1
  const titleFont = shouldShowDetails ? "secondaryBody1" : "tertiaryBody2"
  const subtitleFont = shouldShowDetails ? "secondaryBody2" : "tertiaryBody2"
  const aspectRatio = shouldShowDetails ? 0.8 : 0.5

  return (
    <DangerouslyOverrideColorTheme themeId={LIGHT_MODE_THEME_ID}>
      <View style={{ aspectRatio }} testID="feed-ad">
        <ClickableOpacity activeOpacity={1} onClick={handleClick}>
          <Border color="limestone">
            <Background type="alwaysLight" />
            <Flex direction="column" height="101%" grow={1} axisDistribution="flex-end">
              <SpacerFlex />
              <RemoteImage
                source={{
                  uri: photoUri,
                }}
                resizeMode="contain"
                width="100%"
                aspectRatio={max([photoAspectRatio, MIN_ASPECT_RATIO])}
              />
              <SpacerFlex />
              <Margin marginStep={2} direction="column" grow={0}>
                <Stack direction="column" grow={0} childSeparationStep={1}>
                  {price && (
                    <Text textType="tertiaryBody2" numberOfLines={1} color="alwaysDark">
                      {`$${price}`}
                    </Text>
                  )}
                  {itemName && (
                    <Text numberOfLines={1} textType={titleFont} color="alwaysDark">
                      {itemName}
                    </Text>
                  )}
                  {sellerName && (
                    <Stack grow={1} direction="row">
                      <Flex grow={1} shrink={1}>
                        <Text textType={subtitleFont} color="secondary" numberOfLines={1}>
                          {sellerName}
                        </Text>
                      </Flex>
                      <Border cornerRadius="small" lineWeight="none" grow={0} shrink={0}>
                        <Background type="overlay" />
                        <Margin marginStep={0.5}>
                          <Text textType="tertiaryBody2" color="alwaysLight">
                            {translate("common-labels.ad")}
                          </Text>
                        </Margin>
                      </Border>
                    </Stack>
                  )}
                </Stack>
              </Margin>
            </Flex>
          </Border>
        </ClickableOpacity>
      </View>
    </DangerouslyOverrideColorTheme>
  )
})
