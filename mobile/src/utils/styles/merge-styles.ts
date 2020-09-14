import { ImageStyle, StyleProp, ViewStyle } from "react-native"
import R from "ramda"

/**
 * Merges and flattens styles or style arrays
 * Allows mixing in arrays and undefined styles, unlike StyleSheet#flatten
 * @param styles the final style
 */
export function mergeStyles<
  T extends ViewStyle | ViewStyle[] | ImageStyle | StyleProp<ViewStyle> | undefined,
  K extends ViewStyle | ViewStyle[] | ImageStyle | StyleProp<ViewStyle> | undefined
>(...styles: T[] | false[]): K {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return R.memoizeWith(R.identity, s => R.mergeAll(R.flatten(s)))(styles as any)
}
