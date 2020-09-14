import { MutableRefObject } from "react"

export interface SaveSearchAlertButtonProps {
  query: string
  ref?: MutableRefObject<any>
  onSavePress?(): void
  feedIndex?: number
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}

export interface SaveSearchAlertBannerProps {
  onPress(): void
}

export interface SaveSearchAlertIconButtonContainerProps {
  children: React.ReactNode
  onPress?(): void
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}

export interface SaveSearchAlertIconButtonRef {
  save(): void
}
