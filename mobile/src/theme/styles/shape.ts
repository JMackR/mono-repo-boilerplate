import { ViewStyle } from "react-native"

export const shape = {
  /** Adds the standard drop shadow style */
  round: {
    borderRadius: Number.MAX_SAFE_INTEGER,
  } as ViewStyle,
  /** Rounds to the standard amount (4px) */
  rounded: {
    "border-radius": 4,
  } as ViewStyle,
  /** Rounds to 2x the normal amount (8px) */
  rounded2: {
    borderRadius: 8,
  } as ViewStyle,
}
