import { RemoteImageSource } from "../remote-image-source"

export interface AvatarProps {
  source?: RemoteImageSource

  size: number

  children?: React.ReactNode

  isAutosDealer?: boolean

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
