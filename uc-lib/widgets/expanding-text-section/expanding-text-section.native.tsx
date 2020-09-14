import React, { useState, useEffect, FC } from "react"
import { ExpandingTextSectionProps } from "./expanding-text-section.props"
import { Text } from "../../controls/text"
import { Button } from "../../controls/button"
import { Margin } from "../../controls/layout/margin"
import { Flex } from "../../controls/layout/flex"
import { LayoutAnimation, Platform } from "react-native"

const TRUNCATE_OVERFLOW_MIN = 22
const SHOW_MORE_TOP_MARGIN_STEP = 2
const EXPAND_DURATION = 200

const EXPANDED_LINE_CNT_IOS = -1
let expandedLineCountAndroid = 1

const ExpandingTextSection: FC<ExpandingTextSectionProps> = (props: ExpandingTextSectionProps) => {
  const {
    children,
    truncateThreshold,
    expandButtonTitle,
    collapseButtonTitle,
    reportSeeMoreShownCallback,
    reportSeeLessShownCallback,
    ...rest
  } = props

  const [linesToShow, setLinesToShow] = useState(truncateThreshold)
  const horizontalMarginStep =
    props.horizontalMarginStep === undefined ? SHOW_MORE_TOP_MARGIN_STEP : props.horizontalMarginStep

  // Detects the property being updated
  if (truncateThreshold !== linesToShow && linesToShow !== getExpandedLineCountByPlatform()) {
    setLinesToShow(truncateThreshold)
  }

  const [truncated, setTruncated] = useState(false)
  const expanded = linesToShow !== truncateThreshold

  useEffect(() => {
    if (truncated) {
      if (!expanded && reportSeeMoreShownCallback) {
        reportSeeMoreShownCallback()
      } else if (expanded && reportSeeLessShownCallback) {
        reportSeeLessShownCallback()
      }
    }
  }, [truncated, expanded])

  const onTextLayout = (event: {
    nativeEvent: {
      lines: []
    }
  }) => {
    if (truncated) {
      return // Truncated indicates if it was needed, not if it is currently needed. Don't clear it if it is set
    }
    // iOS will get an array of shown lines with the final one containing the full remaining text which is truncated by the view
    // Android will get and array of all lines as they would be rendered if not truncated
    const lines = event.nativeEvent.lines

    // Android does not support -1 as a value to indicate 'show all lines', so keep track of the length of the full text for later
    expandedLineCountAndroid = lines.length

    if (linesToShow !== getExpandedLineCountByPlatform() && lines.length > 0) {
      // On iOS lines[lines.length - 1] has longer length than the rest if there's truncation
      // Get the difference and compare that to a constant as a rough approximation of whether it's truncated
      // If there's an issue with false truncation this is the place to update it
      const firstLineLength = lines[0].text.length
      const lastLineLength = lines[lines.length - 1].text.length
      const diff = lastLineLength - firstLineLength

      // Also consider the text as truncated if the full length of all lines is less than the full length of the text
      const fullLinesLength = lines.reduce((accumulator, current) => {
        if (typeof accumulator !== "number") {
          return accumulator.text.length + current.text.length
        }
        return accumulator + current.text.length
      })

      // On Android we know how many lines the text would be so we can just compare against the amount showing
      if (lines.length > linesToShow || diff >= TRUNCATE_OVERFLOW_MIN || fullLinesLength < children.length) {
        setTruncated(true)
      } else {
        setTruncated(false)
      }
    } else {
      setTruncated(false)
    }
  }

  const expandTextFunction = () => {
    if (props.onTextExpand) {
      props.onTextExpand()
    }

    // Android doesn't like these easing functions
    if (Platform.OS === "ios") {
      LayoutAnimation.configureNext(LayoutAnimation.create(EXPAND_DURATION, LayoutAnimation.Types.easeOut))
    }

    setLinesToShow(getExpandedLineCountByPlatform())
  }

  const collapseTextFunction = () => {
    if (props.onTextCollapse) {
      props.onTextCollapse()
    }
    // Android doesn't like these easing functions
    if (Platform.OS === "ios") {
      LayoutAnimation.configureNext(LayoutAnimation.create(EXPAND_DURATION, LayoutAnimation.Types.easeOut))
    }

    setLinesToShow(truncateThreshold)
  }

  return (
    <Flex direction="column">
      <Margin marginLeftStep={horizontalMarginStep}>
        <Text {...rest} numberOfLines={linesToShow} onTextLayout={onTextLayout}>
          {children}
        </Text>
      </Margin>
      {truncated &&
        renderShowMore(
          expanded ? collapseButtonTitle : expandButtonTitle,
          expanded ? collapseTextFunction : expandTextFunction,
        )}
    </Flex>
  )
}

const getExpandedLineCountByPlatform = () => {
  return Platform.OS === "android" ? expandedLineCountAndroid : EXPANDED_LINE_CNT_IOS
}

const renderShowMore = (expandButtonTitle: string, expandTextFunction: () => void) => {
  return (
    <Margin marginTopStep={SHOW_MORE_TOP_MARGIN_STEP}>
      <Flex direction="column" crossAxisDistribution="flex-start" axisDistribution="flex-start">
        <Margin marginLeftStep={SHOW_MORE_TOP_MARGIN_STEP}>
          <Text color={"brand"} onPress={expandTextFunction} text={expandButtonTitle} />
        </Margin>
      </Flex>
    </Margin>
  )
}

export { ExpandingTextSection }
