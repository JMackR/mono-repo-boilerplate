import React, { useRef, useEffect, FC } from "react"
import { useState } from "react"
import { ExpandingTextSectionProps } from "./expanding-text-section.props"
import { Text } from "../../controls/text"
import { Button } from "../../controls/button"
import { Margin } from "../../controls/layout/margin"
import { Flex } from "../../controls/layout/flex"
import { MutableRefObject } from "react"
import { TextRef } from "../../controls/text/text.props"

const SHOW_MORE_TOP_MARGIN_STEP = 2

const ExpandingTextSection: React.FC<ExpandingTextSectionProps> = (props: ExpandingTextSectionProps) => {
  const { children, truncateThreshold, expandButtonTitle, collapseButtonTitle, ...rest } = props

  const [linesToShow, setLinesToShow] = useState(truncateThreshold)

  const horizontalMarginStep =
    props.horizontalMarginStep === undefined ? SHOW_MORE_TOP_MARGIN_STEP : props.horizontalMarginStep

  const [truncated, setTruncated] = useState(false)

  const textRef = useRef() as MutableRefObject<TextRef>

  useEffect(() => {
    if (textRef.current) {
      setTruncated(textRef.current.isContentTruncated())
    }
  }, [textRef.current])

  const toggleExpanded = () => {
    if (linesToShow > 0) {
      setLinesToShow(-1)
    } else {
      setLinesToShow(truncateThreshold)
    }
  }

  return (
    <Flex direction="column">
      <Margin marginLeftStep={horizontalMarginStep}>
        <Text {...rest} numberOfLines={linesToShow} ref={textRef}>
          {children}
        </Text>
      </Margin>
      {truncated && (
        <ShowMore
          expandButtonTitle={linesToShow > 0 ? expandButtonTitle : collapseButtonTitle}
          expandTextFunction={toggleExpanded}
        />
      )}
    </Flex>
  )
}

const ShowMore: FC<{
  expandButtonTitle: string
  expandTextFunction: () => void
}> = ({ expandButtonTitle, expandTextFunction }) => {
  return (
    <Margin marginTopStep={SHOW_MORE_TOP_MARGIN_STEP}>
      <Flex direction="column" crossAxisDistribution="flex-start" axisDistribution="flex-start">
        <Margin marginLeftStep={SHOW_MORE_TOP_MARGIN_STEP}>
          <Text color={"brand"} onPress={expandTextFunction}>
            {expandButtonTitle}
          </Text>
        </Margin>
      </Flex>
    </Margin>
  )
}

export { ExpandingTextSection }
