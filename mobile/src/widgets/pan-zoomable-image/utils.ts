import { LayoutRectangle } from "react-native"

export const scaleRectangle = (rectangle: LayoutRectangle, scale: number) => {
  const generatedRectangle: LayoutRectangle = {
    x: rectangle.x + rectangle.width / 2 - (rectangle.width * scale) / 2,
    y: rectangle.y + rectangle.height / 2 - (rectangle.height * scale) / 2,
    width: rectangle.width * scale,
    height: rectangle.height * scale,
  }
  return generatedRectangle
}

export const contains = (r1: LayoutRectangle, r2: LayoutRectangle) => {
  const isLeftContained = r1.x <= r2.x
  const isTopContained = r1.y <= r2.y
  const isRightContained = r1.x + r1.width >= r2.x + r2.width
  const isBottomContained = r1.y + r1.height >= r2.y + r2.height
  return isLeftContained && isTopContained && isRightContained && isBottomContained
}
