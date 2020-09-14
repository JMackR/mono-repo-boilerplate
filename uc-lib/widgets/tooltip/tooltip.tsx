import React, { FC, useRef } from "react"
import { StyleSheet, css } from "aphrodite/no-important"
import { ViewBlock, useMargin, useColorForBackgroundColor, ActionClose, Stack, SpacerFlex, SVG, Text } from "uc-lib"
import { TooltipProps, TooltipType, TooltipLayoutProps } from "./tooltip.d"

export const Tooltip: FC<TooltipProps> = ({
  content,
  width,
  showCloseButton = false,
  onClose,
  type = TooltipType.Primary,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef<HTMLDivElement>(null)
  const { baseMargin } = useMargin()
  let layoutConfig: TooltipLayoutProps
  switch (type) {
    case TooltipType.Highlight: {
      layoutConfig = {
        bgColor: "highlight",
        textColor: "alwaysDark",
        closeButtonColor: "alwaysDark",
      }
      break
    }
    default:
      layoutConfig = {
        bgColor: "secondary",
        textColor: "secondary",
        closeButtonColor: "alwaysDark",
      }
  }

  const backgroundColor = useColorForBackgroundColor(layoutConfig.bgColor)
  const STYLES = StyleSheet.create({
    container: {
      position: "relative",
    },
    innerContainer: {
      position: "absolute",
      overflowX: "hidden",
      zIndex: 99,
      right: 0,
    },
    closeButton: {
      position: "relative",
      marginRight: 0,
    },
    tooltipContainer: {
      width: `${width}px`,
    },
    tooltip: {
      padding: baseMargin * 4,
      backgroundColor,
      borderRadius: baseMargin,
    },
    tooltipPointer: {
      height: "14px",
      marginRight: baseMargin * 2,
    },
  })
  const handlePressClose = () => {
    onClose && onClose()
  }
  const TooltipPointer = () => {
    return (
      <Stack direction="row" axisDistribution="flex-end">
        <ViewBlock ref={pointerRef} className={css(STYLES.tooltipPointer)}>
          <svg width="18" height="11" viewBox="0 0 18 11">
            <polygon fill={backgroundColor} points="9 0 18 11 0 11" />
          </svg>
        </ViewBlock>
      </Stack>
    )
  }
  return (
    <ViewBlock ref={containerRef} className={css(STYLES.container)}>
      <ViewBlock className={css(STYLES.innerContainer)}>
        <ViewBlock className={css(STYLES.tooltipContainer)}>
          <TooltipPointer />
          <ViewBlock className={css(STYLES.tooltip)}>
            <Stack direction="column">
              {showCloseButton && (
                <Stack direction="row">
                  <SpacerFlex />
                  <SVG
                    localSVG={{
                      SVG: ActionClose.SVG,
                      size: { height: 12, width: 12 },
                    }}
                    onPress={handlePressClose}
                    tint={layoutConfig.closeButtonColor}
                  />
                </Stack>
              )}
              <Text textType="tertiaryBody1" color={layoutConfig.textColor}>
                {content}
              </Text>
            </Stack>
          </ViewBlock>
        </ViewBlock>
      </ViewBlock>
    </ViewBlock>
  )
}
