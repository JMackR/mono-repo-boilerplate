import { Linking, Platform, ActionSheetIOS } from "react-native"
import { AnalyticsDebug, translate } from "shared-lib"

/**
 * Allow the system to decide how to handle this.
 * On iOS it will open Apple Maps.
 * On Android it will open the default, or show the picker
 */
const openSystemMap = (latitude: number, longitude: number, label?: string) => {
  const latLng = `${latitude},${longitude}`
  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" })
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  })

  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url)
    } else {
      console.log("Don't know how to open URI:", url)
    }
  })
}

export const OpenURL = {
  openInExternalBrowser(url: string) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.log("Don't know how to open URI:", url)
      }
    })
  },
  openLocationInMaps(latitude: number, longitude: number, label?: string) {
    // on iOS ask the user if they want to open with Google Maps
    const googleMapsiOSUrl = `comgooglemaps://?center=${latitude},${longitude}&zoom=12&q=`
    Linking.canOpenURL(googleMapsiOSUrl).then(supported => {
      if (!supported) {
        // Google Maps on iOS not installed
        openSystemMap(latitude, longitude, label)
        return
      }

      const callback = index => {
        switch (index) {
          case 0:
            openSystemMap(latitude, longitude, label)
            break
          case 1:
            Linking.openURL(googleMapsiOSUrl)
            break
          default:
            break
        }
      }
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [translate("maps.apple-maps"), translate("maps.google-maps"), translate("common-actions.cancel")],
          title: translate("maps.open-with"),
          cancelButtonIndex: 2,
        },
        callback,
      )
    })
  },
  openDialerForNumer(phoneNumber: string) {
    const callURL = `tel:${phoneNumber}`
    Linking.canOpenURL(callURL)
      .then(supported => {
        if (supported) {
          Linking.openURL(callURL)
        } else {
          AnalyticsDebug.logError({ name: "UnsupportedURLError", message: "Can't open telephone URI:" + callURL })
        }
      })
      .catch(error => {
        AnalyticsDebug.logError(error)
      })
  },
}
