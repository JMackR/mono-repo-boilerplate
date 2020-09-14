import { LeftButtonIconType, SnapPointsType } from "../"
import BottomSheet from "reanimated-bottom-sheet"

/**
 * ModalCard API
 */
export interface ModalCardContextProviderProps {
  /**
   * Current back button
   */
  backButton: LeftButtonIconType
  /**
   * set back button type
   */
  setBackButton: (which: LeftButtonIconType) => void
  /**
   * current title
   */
  title: string
  /**
   * Set the current modal title
   */
  setTitle: (title: string) => void
  /**
   * Get the snap points
   */
  snapPoints: SnapPointsType
  /**
   * Set the snap points
   */
  setSnapPoints: (points: SnapPointsType) => void
  /**
   * Get the current snap index
   */
  snapIndex: number
  /**
   * Set the current snap index
   */
  setSnapIndex: (index: number) => void

  /**
   * Reference that BottomSheet will use to expose control
   */
  ref: React.RefObject<BottomSheet>
  /**
   * Collapses to last index in your snap points array..
   */
  collapse: () => void
  /**
   * Safely snaps the sheet to snapIndex
   */
  refSafeSnapTo: (snapIndex: number) => void

  /**
   * Used to locate this view in end-to-end tests.
   */
  setTestID: (testID: string) => void
  testID?: string
}
