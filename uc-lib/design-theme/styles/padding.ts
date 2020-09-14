import { size } from "../spacing"
import { ViewStyle } from "react-native"

export const padding = {
  /** Pads with size 1 in all directions */
  pad: {
    padding: size(1),
  } as ViewStyle,
  /** Pads with size 2 in all directions */
  pad2: {
    padding: size(2),
  } as ViewStyle,
  /** Vertical padding, size 1 */
  padVertical: {
    paddingVertical: size(1),
  } as ViewStyle,
  /** Vertical padding, size 2 */
  padVertical2: {
    paddingVertical: size(2),
  } as ViewStyle,
  /** Horizontal padding, size 1 */
  padHorizontal: {
    paddingHorizontal: size(1),
  } as ViewStyle,
  /** Horizontal padding, size 2 */
  padHorizontal2: {
    paddingHorizontal: size(2),
  } as ViewStyle,
  /** Horizontal padding, size 3 */
  padHorizontal3: {
    paddingHorizontal: size(3),
  } as ViewStyle,
  /** Pads with size 1 in top */
  padTop: {
    paddingTop: size(1),
  } as ViewStyle,
  /** Pads with size 2 in top */
  padTop2: {
    paddingTop: size(2),
  } as ViewStyle,
  /** Pads with size 3 in top */
  padTop3: {
    paddingTop: size(3),
  } as ViewStyle,
  /** Pads with size 1 in bottom */
  padBottom: {
    paddingBottom: size(1),
  } as ViewStyle,
  /** Pads with size 2 in bottom */
  padBottom2: {
    paddingBottom: size(2),
  } as ViewStyle,
  /** Pads with size 3 in bottom */
  padBottom3: {
    paddingBottom: size(3),
  } as ViewStyle,
  /** Pads with size 1 in left */
  padLeft: {
    paddingLeft: size(1),
  } as ViewStyle,
  /** Pads with size 2 in left */
  padLeft2: {
    paddingLeft: size(2),
  } as ViewStyle,
  /** Pads with size 3 in left */
  padLeft3: {
    paddingLeft: size(3),
  } as ViewStyle,
  /** Pads with size 1 in right */
  padRight: {
    paddingRight: size(1),
  } as ViewStyle,
  /** Pads with size 2 in right */
  padRight2: {
    paddingRight: size(2),
  } as ViewStyle,
}
