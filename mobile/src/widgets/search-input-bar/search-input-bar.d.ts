import { MutableRefObject } from "react"

export interface SearchInputBarProps {
  query?: string
  cid?: string
  isLandingScreen?: boolean
  showSearchPlaceholder?: boolean
  showSearchAlertButton?: boolean
  onSaveAlertPress?(): void
  ref?: MutableRefObject<any>
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}

export interface SearchInputBarRef {
  saveSearch(): void
}
