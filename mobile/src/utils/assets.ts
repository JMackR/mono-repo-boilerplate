import { PixelRatio } from "react-native"

const pixelDensityExtension = () => {
  const pixelRatio = PixelRatio.get()
  if (pixelRatio >= 3) {
    return "@3x"
  } else if (pixelRatio >= 2) {
    return "@2x"
  } else {
    return ""
  }
}

/**
 * Constructs and returns a formatted cdn url
 * @param path to asset including extension (e.g. "mojis/assassin-64.png")
 * @return the constructed cdn url
 */
export const cdnUrl = (path: string) => {
  const prefix = "https://wrkshp-cdn.com/com.nextmusic/"
  const url = `${prefix}${path}`
  const index = url.lastIndexOf(".")
  return url.slice(0, index) + pixelDensityExtension() + url.slice(index)
}
