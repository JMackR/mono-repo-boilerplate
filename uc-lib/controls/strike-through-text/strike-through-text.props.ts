import { TextProps } from "../text/text.props"
import { TextColors } from "../../themes"

export interface StrikeThroughTextProps extends TextProps {
  lineColor: keyof TextColors
}
