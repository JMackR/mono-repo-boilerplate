import { MutableRefObject } from "react"

export interface FeedHeaderProps {
  query?: string
  cid?: string
  isLandingScreen?: boolean
  isSearchFilterSort?: boolean
  showSearchPlaceholder?: boolean
  showSearchAlertButton?: boolean
  showFeedInfoBar?: boolean
  ref?: MutableRefObject<any>
  originalQuery?: string
  searchWithOriginalQuery?: () => void
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}

export interface FeedHeaderRef {
  saveSearch(): void
}
