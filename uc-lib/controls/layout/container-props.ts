import { CSSPropertiesComplete } from "aphrodite/no-important"
type AxisDistributionType = "flex-start" | "flex-end" | "center" | "space-between" | "space-around"
type CrossAxisDistributionType = "flex-start" | "flex-end" | "center" | "stretch" | "baseline"

export interface LayoutContainerProps {
  direction?: "row" | "column" | "row-reverse" | "column-reverse"
  grow?: number
  shrink?: number
  basis?: CSSPropertiesComplete["flexBasis"]
  axisDistribution?: AxisDistributionType
  crossAxisDistribution?: CrossAxisDistributionType
  width?: CSSPropertiesComplete["width"]
  height?: CSSPropertiesComplete["height"]
  debugColor?: CSSPropertiesComplete["backgroundColor"]
  wrap?: CSSPropertiesComplete["flexWrap"]
  /**
   * Handler to be called when the user clicks/touches inside the container
   */
  touchUpInsideHandler?: () => void
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
  maxWidth?: string | number
  overflow?: "hidden" | "scroll"
}

interface LayoutContainerDefaultProps {
  direction: "row"
  grow: number
  shrink: number
  basis: CSSPropertiesComplete["flexBasis"]
  axisDistribution: AxisDistributionType
  crossAxisDistribution: CrossAxisDistributionType
}

export const defaultLayoutContainerProps: LayoutContainerDefaultProps = {
  direction: "row",
  grow: 0,
  shrink: 1,
  basis: "auto",
  axisDistribution: "flex-start",
  crossAxisDistribution: "stretch",
}
