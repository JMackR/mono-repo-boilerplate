import { Dimensions } from "react-native"

export const getScreenWidthMinusMargin = (marginAmount: number): number => {
  const { width } = Dimensions.get("window")
  return width - (marginAmount + marginAmount)
}
