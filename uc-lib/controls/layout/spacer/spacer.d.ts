export interface SpacerProps {
  /**
   * Indicates the multiplier on the standard margin to determine the spacing
   */
  sizeStep: number

  /**
   * Sets the spacing direction.
   */
  direction: "row" | "column"
}
