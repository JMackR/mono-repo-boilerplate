import React from "react"
import { StockPTRHeaderProps } from "./pull-to-refresh"
import { PullToRefreshHeaderContainer } from "./pull-to-refresh-header-container"
import { ActivityIndicator, Margin, Stack, Text, Background } from "uc-lib"

const EXPANDED_SIZE = 70
export const StockPTRHeader = (props: StockPTRHeaderProps) => {
  const { text } = props

  return (
    <PullToRefreshHeaderContainer {...props}>
      <Background />
      <Margin
        direction="column"
        grow={1}
        height={EXPANDED_SIZE}
        marginStep={1}
        axisDistribution="center"
        crossAxisDistribution="center"
      >
        <Stack direction="column" grow={1} axisDistribution="center" crossAxisDistribution="center" childSeparationStep={2}>
          {text && (
            <Text textType="primaryBody2" textAlign="center">
              {text}
            </Text>
          )}
          <ActivityIndicator size={text ? "small" : "large"} />
        </Stack>
      </Margin>
    </PullToRefreshHeaderContainer>
  )
}
