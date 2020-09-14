import { StyleSheet, ViewStyle } from "react-native"

export const arrangement = {
  /** Flex of 1 */
  flex: {
    flex: 1,
  } as ViewStyle,
  /** Flex Grow of 1 */
  flexGrow: {
    flexGrow: 1,
  } as ViewStyle,
  /** Flex Grow of 0 */
  noFlexGrow: {
    flexGrow: 0,
  } as ViewStyle,
  /** Flex Shrink of 1 */
  flexShrink: {
    flexShrink: 1,
  } as ViewStyle,
  /** Flex direction is row */
  row: {
    flexDirection: "row",
  } as ViewStyle,
  /** Flex as a row, align center */
  rowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  /** Flex wrapping as a row */
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  } as ViewStyle,
  /** Absolute positioning */
  absolute: {
    position: "absolute",
  } as ViewStyle,
  /** Absolute positioning, filled */
  absoluteFill: StyleSheet.absoluteFillObject as ViewStyle,
  /** Absolute positioning, centered in both directions */
  absoluteCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  /** Absolute positioning, placed top left */
  absoluteTopLeft: {
    position: "absolute",
    left: 0,
    top: 0,
  } as ViewStyle,
  /** Absolute positioning, placed top right */
  absoluteTopRight: {
    position: "absolute",
    right: 0,
    top: 0,
  } as ViewStyle,
  /** Absolute positioning, placed bottom left */
  absoluteBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
  } as ViewStyle,
  /** Absolute positioning, placed bottom right */
  absoluteBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
  } as ViewStyle,
  /** Aligns items in the center */
  alignCenter: {
    alignItems: "center",
  } as ViewStyle,
  /** Aligns items at the start */
  alignStart: {
    alignItems: "flex-start",
  } as ViewStyle,
  /** Aligns items to stretch */
  alignStretch: {
    alignItems: "stretch",
  } as ViewStyle,
  /** Aligns items at the end */
  alignEnd: {
    alignItems: "flex-end",
  } as ViewStyle,
  /** Aligns self at the end */
  alignSelfEnd: {
    alignSelf: "flex-end",
  } as ViewStyle,
  /** Aligns self at the center */
  alignSelfCenter: {
    alignSelf: "center",
  } as ViewStyle,
  /** Aligns self to stretch */
  alignSelfStretch: {
    alignSelf: "stretch",
  } as ViewStyle,
  /** Justifies content in the center */
  justifyCenter: {
    justifyContent: "center",
  } as ViewStyle,
  /** Justifies content at the end */
  justifyEnd: {
    justifyContent: "flex-end",
  } as ViewStyle,
  justifyBetween: {
    justifyContent: "space-between",
  } as ViewStyle,
  justifyAround: {
    justifyContent: "space-around",
  } as ViewStyle,
  justifyEvenly: {
    justifyContent: "space-evenly",
  } as ViewStyle,
  /** Aligns and justifies in the center */
  center: {
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  /** Flex shrink of 1 */
  shrink: {
    flexShrink: 1,
  } as ViewStyle,
  /** Half the width of its parent */
  halfWidth: {
    width: "50%",
  } as ViewStyle,
  /** Fill parent size (100% width and height) */
  fillParent: {
    width: "100%",
    height: "100%",
  } as ViewStyle,
  /** Width of 100% */
  fullWidth: {
    width: "100%",
  } as ViewStyle,
  /** Height of 100% */
  fullHeight: {
    height: "100%",
  } as ViewStyle,
  /** Turns view into a square - aspect ratio 1 */
  aspectRatioSquare: {
    aspectRatio: 1,
  } as ViewStyle,
}
