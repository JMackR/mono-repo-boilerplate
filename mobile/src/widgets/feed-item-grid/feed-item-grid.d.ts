import { FeedItem, SearchParamsProps, FeedOptions, SearchAlert } from "shared-lib"
import { ListAnimatedScrollEvent } from "uc-lib"

export interface FeedItemsGridRef {
  refetch: () => void
  scrollToTop: (animated: boolean) => void
}

export interface FeedItemsGridProps {
  ref?: React.RefObject<any>
  onQueryChanged?(q?: string): void
  onSearchAlertChanged?(searchAlert?: SearchAlert | null): void
  onSearchSuggestionChanged?(searchSuggestion: any): void
  onSearchDataChanged?(searchData: any): void
  onErrorRender?(): JSX.Element
  onLoadingRender?(): JSX.Element
  onEmptyRender?(): JSX.Element
  onFeedOptionsChanged?(feedOptions?: FeedOptions[] | null): void
  onLoadingChanged?(loading: boolean): void
  searchParams?: SearchParamsProps
  cid?: string
  onClickFeedItem: (listing: object) => void
  onClickAdItem: (ad: object) => void
  onAnimatedScroll?(event: ListAnimatedScrollEvent): any
  onPressSaveSearchBanner?(): void
  renderSaveSearchBannerOnlyPlaceholder?(): React.ReactElement
  expandedHeaderHeight?: number
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}

export interface FeedItemProps {
  feedItem: FeedItemWrapper
  onClick?: (listing: object) => void
  shouldShowDetails?: Boolean
  feedIndex?: number
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}

export interface FeedItemWrapper extends FeedItem {
  isDummyItem?: boolean
  needsTopMargin?: boolean
}
