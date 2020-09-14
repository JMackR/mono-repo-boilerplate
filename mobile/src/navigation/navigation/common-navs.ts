import {
  Listing,
  LocationDetails,
  getUserSearchLocation,
  isSetZipCodeFTUE,
  SearchLocationPickerEventHandlers,
  didSearchLocationChange,
  getWebsiteUrl,
  translate,
} from "shared-lib"
import { getDomain } from "shared-lib/utilities/url"
import { Navigation } from "./navigation"
import { NavigableRoute } from "../navigator/navigableroute"
import { ErrorDialogScreenProps } from "../../widgets/dialog/error-dialog-screen"
import { LocationPickerScreenProps, LocationPickerType } from "../../screens/location-picker/location-picker"
import { WebViewProps } from "uc-lib/widgets/index.native"
import { WEBVIEW_WHITELIST, WEBVIEW_HOSTNAME_REQUEST_HEADER_BLACKLIST } from "shared-lib/constants/url-constants"
import { NavigationMetaData } from "./navigation.d"
import { Linking } from "react-native"
import { getWebHeaders } from "shared-lib/utilities/api/api-helpers.native"
import { APP_AUTHORITY } from "./navigation-configuration"
import { AffirmRejectDialogScreenProps } from "../../widgets/dialog"

interface PresentLocationSearchFilterProps {
  isLandingScreen?: boolean
}

// tslint:disable-next-line: only-arrow-functions
export const CommonNavs = (function() {
  return {
    presentError(props: ErrorDialogScreenProps) {
      if (__DEV__) {
        console.log("Presenting Error Dialog: " + JSON.stringify(props, null, 2))
      }

      const sanitizedErrorProps = JSON.parse(JSON.stringify(props))

      Navigation.navigateToRoute(NavigableRoute.ErrorDialog, sanitizedErrorProps)
    },
    presentLocationPicker(props: LocationPickerScreenProps) {
      Navigation.navigateToRoute(NavigableRoute.LocationPicker, props)
    },
    async presentSearchLocationPicker(
      pickerType: LocationPickerType,
      fallbackZipcode: string | undefined,
      searchLocationChangedCallback: (locationDetails: LocationDetails) => void,
    ) {
      const prefillLocationDetails = await getUserSearchLocation(fallbackZipcode)
      const isFTUE = await isSetZipCodeFTUE()
      const pickerHelper = new SearchLocationPickerEventHandlers(isFTUE)
      const pickerProps: LocationPickerScreenProps = {
        screenName: pickerHelper.pickerScreenName,
        pickerType,
        prefillLocationDetails,
        resultCallback: async (locationDetails: LocationDetails) => {
          if (didSearchLocationChange(prefillLocationDetails, locationDetails)) {
            searchLocationChangedCallback(locationDetails)
          }
        },
        onLocationPermissionEnableClick: pickerHelper.onLocationPermissionEnableClick,
        onLocationPermissionNotNowClick: pickerHelper.onLocationPermissionNotNowClick,
        onGetMyLocationClick: pickerHelper.onGetMyLocationClick,
        onSaveLocationClick: pickerHelper.onSaveLocationClick,
        onFocusZipCodeTextInput: pickerHelper.onFocusZipCodeTextInput,
      }
    },
    /**
     * Check the URL against the APP_AUTHORITY urls. If the app cannot handle the URL, show a warning dialog.
     */
    openInternalOrExternalUrl(url: string) {
      const canOpenInternally = () => {
        const urlDomain = getDomain(url)
        const foundIndex = APP_AUTHORITY.findIndex(value => urlDomain === value)
        return foundIndex > -1
      }

      const askToOpenUrl = () => {
        const props: AffirmRejectDialogScreenProps = {
          onAffirm: () => {
            Navigation.performWhenAvailable(() => {
              CommonNavs.openExternalUrl(url)
            })
          },
          dismissOnReject: true,
          affirmText: translate("common-actions.yes"),
          rejectText: translate("common-actions.no"),
          title: translate("urls.leaving-title"),
          body: translate("urls.continue-question"),
        }
        Navigation.performWhenAvailable(() => {
          Navigation.navigateToRoute(NavigableRoute.AffirmRejectDialog, props)
        })
      }

      if (canOpenInternally()) {
        CommonNavs.openExternalUrl(url)
      } else {
        askToOpenUrl()
      }
    },
    openExternalUrl(url: string) {
      if (Linking.canOpenURL(url)) {
        Linking.openURL(url)
      }
    },
    presentSearchLocationFilters(props: PresentLocationSearchFilterProps = {}) {
      const { isLandingScreen = false } = props
      Navigation.navigateToRoute(NavigableRoute.SearchLocationFilters, { isLandingScreen })
    },
    async presentWebView(link: string, title?: string, metaData?: NavigationMetaData) {
      const requestHeaders = getWebHeaders()
      const webViewProps: WebViewProps = {
        title,
        source: {
          uri: link,
        },
        requestHeaders,
        baseUrl: await getWebsiteUrl(),
        hostNameRequestHeaderBlackList: WEBVIEW_HOSTNAME_REQUEST_HEADER_BLACKLIST,
        urlWhitelist: WEBVIEW_WHITELIST,
      }
      Navigation.navigateToRoute(NavigableRoute.WebViewScreen, webViewProps, metaData)
    },
  }
})()
