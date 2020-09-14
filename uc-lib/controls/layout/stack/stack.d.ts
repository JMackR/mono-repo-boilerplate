import { LayoutContainerProps } from "../container-props"

export interface StackProps extends LayoutContainerProps {
  direction: "row" | "column"

  /**
   * use the system's margin step to separate children by this amount
   */
  childSeparationStep?: number
}
