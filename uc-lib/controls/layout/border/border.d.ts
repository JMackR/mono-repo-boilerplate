import { LayoutContainerProps } from "../container-props"
import { Colors } from "../../../themes"

export interface BorderProps extends LayoutContainerProps {
  color?: keyof Colors
  lineWeight?: "light" | "heavy" | "none"
  /**
   * Amount of curvature at the corners.  Note that circle is only supported in native
   */
  cornerRadius?: "small" | "large" | "none" | "circle"
  hidden?: boolean
  /**
   * @default 'solid'
   * @note Not yet implemented for web.
   */
  borderType?: "solid" | "dashed" | "dotted"
}
