/**
 * Describes an option in a confirmation popup
 */
export interface ConfirmationPopupOption {
  /** The option text to display */
  text: string
  /** Whether this is the Cancel option, optional */
  isCancel?: boolean
  /** Whether this is a destructive option, optional */
  isDestructive?: boolean
  /** A callback to trigger on button press, optional */
  callback?: () => void
}
