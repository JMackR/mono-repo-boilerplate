import { RemoteImageSource } from "../remote-image-source"
import { ResizeMode } from "../image-props"

export interface RemoteImageProps {
  resizeMode: ResizeMode
  source: RemoteImageSource

  width?: number | string
  height?: number | string
  aspectRatio?: number
  borderRadius?: number

  children?: React.ReactNode
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
