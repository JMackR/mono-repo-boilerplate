import { Dimensions } from "react-native"
const { width = 350 } = Dimensions.get("window")

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350

const scale = size => (width / guidelineBaseWidth) * size
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor
