import { size } from "../spacing"
import { ViewStyle } from "react-native"

export const margin = {
  /** Margin with size 1 in all directions */
  margin: {
    margin: size(1),
  } as ViewStyle,
  /** Margin with size 2 in all directions */
  margin2: {
    margin: size(2),
  } as ViewStyle,
  /** Margin with size 3 in all directions */
  margin3: {
    margin: size(3),
  } as ViewStyle,
  /** Margin with size 1 to the right */
  marginRight: {
    marginRight: size(1),
  } as ViewStyle,
  /** Margin with size 1/2 to the right */
  marginRightHalf: {
    marginRight: size(1) / 2,
  } as ViewStyle,
  /** Margin with size 2 to the right */
  marginRight2: {
    marginRight: size(2),
  } as ViewStyle,
  /** Margin with size 3 to the right */
  marginRight3: {
    marginRight: size(3),
  } as ViewStyle,
  /** Margin with size 1 to the left */
  marginLeft: {
    marginLeft: size(1),
  } as ViewStyle,
  /** Margin with size 2 the left */
  marginLeft2: {
    marginLeft: size(2),
  } as ViewStyle,
  /** Margin with size 2 the left */
  marginLeft3: {
    marginLeft: size(3),
  } as ViewStyle,
  /** Margin with size 1 horizontally */
  marginHorizontal: {
    marginHorizontal: size(1),
  } as ViewStyle,
  /** Margin with size 2 horizontally */
  marginHorizontal2: {
    marginHorizontal: size(2),
  } as ViewStyle,
  /** Margin with size 3 horizontally */
  marginHorizontal3: {
    marginHorizontal: size(3),
  } as ViewStyle,
  /** Margin with size 0.5 vertically */
  marginVerticalHalf: {
    marginVertical: size(0.5),
  } as ViewStyle,
  /** Margin with size 1 vertically */
  marginVertical: {
    marginVertical: size(1),
  } as ViewStyle,
  /** Margin with size 2 vertically */
  marginVertical2: {
    marginVertical: size(2),
  } as ViewStyle,
  /** Margin with size 3 vertically */
  marginVertical3: {
    marginVertical: size(3),
  } as ViewStyle,
  /** Margin with size 1 to the top */
  marginTop: {
    marginTop: size(1),
  } as ViewStyle,
  /** Margin with size 2 to the top */
  marginTop2: {
    marginTop: size(2),
  } as ViewStyle,
  /** Margin with size 3 to the top */
  marginTop3: {
    marginTop: size(3),
  } as ViewStyle,
  /** Margin with size 1 to the bottom */
  marginBottom: {
    marginBottom: size(1),
  } as ViewStyle,
  /** Margin with size 2 to the bottom */
  marginBottom2: {
    marginBottom: size(2),
  } as ViewStyle,
  /** Margin with size 3 to the bottom */
  marginBottom3: {
    marginBottom: size(3),
  } as ViewStyle,
  /** Margin with size 0.5 at bottom TODO Do I want to do this? */
  marginBottomHalf: {
    marginBottom: size(1) / 2,
  } as ViewStyle,
  /** Margin with size 0.5 at top TODO Do I want to do this? */
  marginTopHalf: {
    marginTop: size(1) / 2,
  } as ViewStyle,
  /** Margin with size 0.5  TODO Do I want to do this? */
  marginHalf: {
    margin: size(1) / 2,
  } as ViewStyle,
}
