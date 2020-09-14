import { Linking, Platform } from "react-native"

interface LinkOptions {
  /** Whether to open MP4 links internally, as a story modal, rather than linking out */
  storyVideo?: boolean
}

/**
 * Links to an external app with a URL
 * @param url the URL
 * @param options link options, configure behavior
 * @return Promise resolving falsy if the link cannot be opened
 */
export function link(url: string, options?: LinkOptions): Promise<any> {
  // TODO Remove the storyVideo functionality here, we have to do it component level for navigation
  if (options && options.storyVideo && url.toLowerCase().endsWith(".mp4")) {
    console.warn(`STUB navigate to story modal ${url}`)
    return Promise.resolve(true)
  }
  return Linking.canOpenURL(url)
    .then(canOpen => {
      if (canOpen) return Linking.openURL(url)
      console.error(`Cannot open ${url}`)
      return Promise.resolve(false)
    })
    .catch(e => {
      console.warn(e.toString())
      return Promise.resolve(false)
    })
}

/**
 * Links to this app, on the app store
 */
export function openAppStore(): Promise<any> {
  console.warn("openAppStore")
  return (
    Platform.select({
      ios: link("https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1484386339"),
      android: link("http://play.google.com/store/apps/details?id=com.nextmusic"),
    }) || Promise.resolve()
  )
}
