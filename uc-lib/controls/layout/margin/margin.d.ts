import { LayoutContainerProps } from "../container-props"

export interface MarginProps extends LayoutContainerProps {
  /**
   * Indicates the multiplier on the standard margin for each side.
   */
  marginStep?: number

  /**
   * Indicates the multiplier on the standard margin for the left.
   */
  marginLeftStep?: number

  /**
   * Indicates the multiplier on the standard margin for the right.
   */
  marginRightStep?: number

  /**
   * Indicates the multiplier on the standard margin for the top.
   */
  marginTopStep?: number

  /**
   * Indicates the multiplier on the standard margin for the bottom.
   */
  marginBottomStep?: number

  /**
   * Disable the invariant check for no children.
   * It is very rare that you will need to do this.
   */
  allowNoChildren?: boolean
}
