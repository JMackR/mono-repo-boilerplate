import { LayoutRectangle } from "react-native"
import { MARGIN_BETWEEN_SCREEN_AND_TOOLTIP, POINTER_WIDTH, POINTER_HEIGHT } from "./constants.native"

interface GetCoordinateParam {
  originRectangle: LayoutRectangle
  tooltipWidth: number
  tooltipHeight: number
  screenWidth: number
  screenHeight: number
  tryAlignCenter?: boolean
}

interface Coordinate {
  x: number
  y: number
}

type GetCoordinate = (param: GetCoordinateParam) => Coordinate

export const getCenter = (rectangle: LayoutRectangle) =>
  ({
    x: rectangle.x + rectangle.width / 2,
    y: rectangle.y + rectangle.height / 2,
  } as Coordinate)

export const getTooltipCoordinate: GetCoordinate = ({
  originRectangle,
  tooltipWidth,
  tooltipHeight,
  screenWidth,
  screenHeight,
  tryAlignCenter = true,
}) => {
  const center = getCenter(originRectangle)

  const isTopHalf = center.y < screenHeight / 2

  const contrainX = (newX: number) => {
    const deltaX = newX + tooltipWidth + MARGIN_BETWEEN_SCREEN_AND_TOOLTIP - screenWidth
    if (deltaX > 0) {
      newX -= deltaX
    } else if (newX < MARGIN_BETWEEN_SCREEN_AND_TOOLTIP) {
      newX = MARGIN_BETWEEN_SCREEN_AND_TOOLTIP
    }
    return newX
  }

  let y: number
  if (isTopHalf) {
    y = originRectangle.y + originRectangle.height + POINTER_HEIGHT
  } else {
    y = originRectangle.y - POINTER_HEIGHT - tooltipHeight
  }

  let x: number
  if (tryAlignCenter) {
    x = center.x - tooltipWidth / 2
  } else {
    x = originRectangle.x + originRectangle.width + MARGIN_BETWEEN_SCREEN_AND_TOOLTIP + POINTER_WIDTH - tooltipWidth
  }

  return {
    x: contrainX(x),
    y,
  }
}
