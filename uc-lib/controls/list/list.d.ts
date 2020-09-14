export interface ListLayout {
  x: number
  y: number
  height: number
  width: number
}

export interface ListScrollEvent {
  contentOffset: { x: number; y: number }
  contentSize: { height: number; width: number }
  layout: { height: number; width: number }
}

export interface ListAnimatedScrollEvent {
  contentOffset: { x: any; y: any }
  contentSize: { height: any; width: any }
  layoutMeasurement: { height: any; width: any }
}

export interface ListAnimatedOverscrollEvent {
  x: any
  y: any
}

export interface ListProps<T> {
  horizontal?: boolean
  onEndReached?: ((info: { distanceFromEnd: number }) => void) | null
  onEndReachedThreshold?: number | null
  data: T[]
  initialNumToRender?: number
  renderItem: (item: T, index: number) => JSX.Element
  onVisibilityChange?: (visible: boolean, value: T, index: number) => void
  getItemLayout?: (data: any[] | null, index: number) => { length: number; offset: number; index: number }
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
  minHeight?: string | number
  keyExtractor?: (item: T, index: number) => string
  onLayout?: (layout: ListLayout) => void
  onContentSizeChange?: (width: number, height: number) => void
  onScroll?: (e: ListScrollEvent) => void
  onScrollBeginDrag?: (e: ListScrollEvent) => void
  onScrollEndDrag?: (e: ListScrollEvent) => void
  ref?: React.RefObject<any>
  showSeparator?: boolean
  scrollEnabled?: boolean
  sticky?: boolean
  keyboardAvoidanceEnabled?: boolean
  dismissKeyboardOnDrag?: boolean
  columns?: number
  showsVerticalScrollIndicator?: boolean
  centerContent?: boolean
  contentPadding?: {
    top?: number
  }
  overscrollEnabled?: boolean
  overscrollLimits?: {
    y: {
      lower: number
      upper: number
    }
  }
  paddingBottom?: number
  paddingLeft?: number
  /**
   * Whether to start rendering from the bottom
   */
  inverted?: boolean
  animationHandlers?: {
    onScroll?: (e: ListAnimatedScrollEvent) => any
    onOverscroll?: (e: ListAnimatedOverscrollEvent) => any
  }

  activeOffsetX?: number | number[]
  activeOffsetY?: number | number[]
}

export interface ListRef {
  /**
   * Scrolls the list to the top-most element.
   * @param animated - defaults to true
   */
  scrollToTop: (animated?: boolean) => void

  /**
   * Scrolls the list to the given index
   * @param index
   * @param animated - defaults to true
   */
  scrollToIndex: (index: number, animated?: boolean) => void

  scrollToEnd: (animated?: boolean) => void
  scrollToOffset: (offset: number, animated?: boolean) => void
}
