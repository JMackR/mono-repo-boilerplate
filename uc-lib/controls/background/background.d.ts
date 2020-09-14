import { BackgroundColors } from "uc-lib/themes";
export interface BackgroundProps {
  type?: keyof BackgroundColors;
  borderRadius?: number;
  isOverlay?: boolean;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
}
