import { TextProps } from "../../controls/text/text.props"

export interface ExpandingTextSectionProps extends TextProps {
  /**
   * Number of lines to show before truncating
   */
  truncateThreshold: number

  /**
   * Text to show on the button that shows all the text
   */
  expandButtonTitle: string

  collapseButtonTitle: string

  /**
   * Callback for interested parties to watch for text expanding
   */
  onTextExpand?: () => void

  onTextCollapse?: () => void

  /**
   * Callback for show event reporting when see more is present
   */
  reportSeeMoreShownCallback?: () => void

  reportSeeLessShownCallback?: () => void

  /**
   * Override default margin step
   */
  horizontalMarginStep?: number
}
