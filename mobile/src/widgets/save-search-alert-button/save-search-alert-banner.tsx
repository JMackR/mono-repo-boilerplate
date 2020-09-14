import React, { FC, useState, useEffect } from "react"
import { Button, Flex, AlertLine, Text, Background, Spacer, SpacerFlex, Margin, Separator } from "uc-lib"
import { useSearch, translate } from "shared-lib"
import { SaveSearchAlertBannerProps } from "./save-search-alert.d"

export const SaveSearchAlertBanner: FC<SaveSearchAlertBannerProps> = ({ onPress }) => {
  const [hidden, setHidden] = useState(false)
  const { state: searchState } = useSearch()
  useEffect(() => {
    setHidden(!!searchState.searchAlert?.alertId)
  }, [searchState.searchAlert])

  const handleSave = () => {
    onPress()
  }
  if (hidden) {
    return <></>
  }
  return (
    <Margin shrink={0}>
      <Flex direction="column" grow={1}>
        <Background type="primary" />
        <Margin marginStep={4} crossAxisDistribution="center">
          <Text textType="primaryBody1">{translate("search-stack.search-alert.banner-text")}</Text>
          <SpacerFlex />
          <Button
            buttonSize="small"
            buttonType="buynow"
            title={translate("search-stack.search-alert.save-search")}
            onClick={handleSave}
            icon={{ SVG: AlertLine.SVG, size: { width: 24, height: 24 } }}
          />
        </Margin>
      </Flex>
    </Margin>
  )
}
