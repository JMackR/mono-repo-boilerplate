import { ModalCardProps } from "."

export interface ModalCardHostProps {
  /**
   * optional children to display. Presence of children will render a full screen view with a bottom sheet available to use.
   */
  children?: Element

  /**
   * props to pass to the bottom panel view
   */
  modalProps: ModalCardProps

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
