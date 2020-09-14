/**
 * Calculates a grid value
 * @param multiplier the grid value
 */
import { StyleSheet } from "react-native"

export function size(multiplier = 1): number {
  return multiplier * 8
}

/**
 * Apply carefully! This is intended for thinner, non-grid elements (eg, borders)
 * @param multiplier the multiplier, defaults 1
 */
export function thin(multiplier = 1): number {
  return multiplier * 2
}

/**
 * This is a system hairline width, multiplied by given value
 * Note that this is not predictable - it's per device, calculated by pixel density and always
 * aligns itself to screen pixel size. For that reason, use only when it won't affect positions
 * The smallest size is 1 device-pixel tall, so, this may be incredibly thin on some devices
 * @param multiplier the multiplier, defaults 1
 */
export function hairline(multiplier = 1): number {
  // Note that, once we try on all devices, we may find the multiplier is not smart
  return StyleSheet.hairlineWidth * multiplier
}

/**
 * This is standard border sizing - hairline width multiplied by 4
 * @param multiplier the multiplier, defaults 1
 */
export function border(multiplier = 1): number {
  // Note that, once we try on all devices, we may find this is not the right calculation
  return StyleSheet.hairlineWidth * 4 * multiplier
}
