import { RemoteImageProps } from "./remote-image.props"
import invariant from "invariant"

export const sanitizeAndValidateRemoteImageLayoutProps = (props: RemoteImageProps) => {
  let { width, height } = props
  const { aspectRatio } = props
  const hasWidthAndHeight = width !== undefined && height !== undefined
  const hasWidthOrHeight = width !== undefined || height !== undefined
  const hasAspectRatio = aspectRatio !== undefined
  const layoutPropsValid = hasWidthAndHeight || (hasWidthOrHeight && hasAspectRatio)

  invariant(
    layoutPropsValid === true,
    "RemoteImage's layout props are not satisfied.\n(width and height) or ((width or height) and aspectRatio) must be set",
  )

  if (hasAspectRatio) {
    if (width === undefined && typeof height === "number") {
      width = (aspectRatio as number) * (height as number)
    } else if (typeof width === "number") {
      height = (width as number) / (aspectRatio as number)
    }
  }

  return { width, height, aspectRatio }
}
