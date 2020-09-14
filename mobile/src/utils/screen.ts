import { Dimensions } from "react-native"

/**
 * Calculates the max number of full columns based on a target width
 * @param targetWidth
 * @return number of columns to display
 */
export const screenColumns = (targetWidth: number) => {
  return Math.floor(Dimensions.get("window").width / targetWidth)
}
