import { ResizeMode } from "../image-props"
export interface LocalImageProps {
  resizeMode: ResizeMode
  source: {
    uri: string
  }
  width?: number | string
  height?: number | string
  aspectRatio?: number
  borderRadius?: number
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
