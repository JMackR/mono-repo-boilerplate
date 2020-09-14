import { LocalImageProps } from "uc-lib"

export interface RefreshableImageProps extends LocalImageProps {
  refreshToken: string
}
