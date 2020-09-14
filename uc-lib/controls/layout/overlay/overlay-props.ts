import { LayoutContainerProps } from "../container-props"

export interface OverlayProps extends LayoutContainerProps {
  /**
   * Indicates the multiplier on the standard margin for each inset.
   */
  insetStep?: number

  /**
   * Indicates the multiplier on the standard margin for the left inset.
   */
  insetLeftStep?: number

  /**
   * Indicates the multiplier on the standard margin for the right inset.
   */
  insetRightStep?: number

  /**
   * Indicates the multiplier on the standard margin for the top inset.
   */
  insetTopStep?: number

  /**
   * Indicates the multiplier on the standard margin for the bottom inset.
   */
  insetBottomStep?: number

  zIndex?: number
}
