import { PermissionProvider, CheckResult, Permission } from "shared-lib/utilities/permission"
import { Navigation } from "../navigation/navigation/navigation"
import { NavigableRoute } from "../navigation/navigator/navigableroute"
import { PermissionDialogProps } from "../widgets/dialog/permission-dialog.props"
import { CameraOutline, LocationPinOutline, NotificationOutline } from "uc-lib"
import { translate } from "shared-lib"
import { Platform } from "react-native"
import {
  PermissionKeyMap,
  NEVER_ASK_AGAIN_PROMPT_KEYS,
  PERMISSION_PRIMER_KEYS,
  PERMISSION_DENIED_KEYS,
  getUnavailableFeatureError,
} from "./permission-strings"
import { openSettings } from "react-native-permissions"
import { CommonNavs } from "../navigation/navigation"

export const PermissionHelper = {
  checkAndRequestPermission(permission: Permission): Promise<CheckResult.GRANTED | CheckResult.DENIED> {
    return new Promise<CheckResult.GRANTED | CheckResult.DENIED>((resolve, reject) => {
      const onPermissionGranted = () => {
        resolve(CheckResult.GRANTED)
      }
      const onPermissionDenied = () => {
        resolve(CheckResult.DENIED)
      }
      PermissionProvider.checkPermission(permission)
        .then((result) => {
          switch (result) {
            case CheckResult.GRANTED:
              onPermissionGranted()
              break
            case CheckResult.DENIED:
              const showPromptBefore = Platform.OS === "ios"
              if (showPromptBefore) {
                showPromptThenSendRequest(permission, onPermissionGranted, onPermissionDenied)
              } else {
                sendRequestThenShowPrompt(permission, onPermissionGranted, onPermissionDenied)
              }
              break
            case CheckResult.BLOCKED:
              showBlockedPrompt(permission, onPermissionDenied)
              break
            case CheckResult.UNAVAILABLE:
            default:
              showUnavailablePrompt(onPermissionDenied)
              break
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

/**
 * This is the function used for iOS to give the user a chance to deny the request before actually asking the system since we can only ask the system once
 */
const showPromptThenSendRequest = (
  permission: Permission,
  onPermissionGranted: () => void,
  onPermissionDenied: () => void,
) => {
  const onPromptAccepted = () => {
    // Blocked, denied, and unavailable are all handled by the denied callback
    sendPermissionRequest(permission, onPermissionGranted, onPermissionDenied, onPermissionDenied, onPermissionDenied)
  }

  const promptProps = permissionDialogPropsForPermission(
    permission,
    PERMISSION_PRIMER_KEYS,
    onPromptAccepted,
    onPermissionDenied,
  )
  showPrompt(promptProps)
}

const sendRequestThenShowPrompt = (
  permission: Permission,
  onPermissionGranted: () => void,
  onPermissionDenied: () => void,
) => {
  const onPromptAccepted = () => {
    sendPermissionRequest(
      permission,
      onPermissionGranted,
      onPermissionDenied,
      () => showBlockedPrompt(permission, onPermissionDenied),
      onPermissionDenied,
    )
  }

  const promptProps = permissionDialogPropsForPermission(
    permission,
    PERMISSION_DENIED_KEYS,
    onPromptAccepted,
    onPermissionDenied,
  )
  sendPermissionRequest(
    permission,
    onPermissionGranted,
    () => showPrompt(promptProps),
    () => showBlockedPrompt(permission, onPermissionDenied),
    onPermissionDenied,
  )
}

const showBlockedPrompt = (permission: Permission, onPermissionDenied: () => void) => {
  const onPromptAccepted = () => {
    // Have the page requesting handle denied permissions in this situation, it may need to re-request upon launching again
    // Better than leaving it hanging with no callback
    onPermissionDenied()
    openSettings().catch(() => {
      // Not sure how to handle this, probably don't want to bog the user down with more prompts
    })
  }
  const promptProps = permissionDialogPropsForPermission(
    permission,
    NEVER_ASK_AGAIN_PROMPT_KEYS,
    onPromptAccepted,
    onPermissionDenied,
  )
  showPrompt(promptProps)
}

const showUnavailablePrompt = (onPermissionDenied: () => void) => {
  CommonNavs.presentError({ ouException: getUnavailableFeatureError() })
  onPermissionDenied()
}

const sendPermissionRequest = (
  permission: Permission,
  onPermissionGranted: () => void,
  onPermissionDenied: () => void,
  onPermissionBlocked: () => void,
  onPermissionUnavailable: () => void,
) => {
  PermissionProvider.requestPermission(permission)
    .then((result) => {
      switch (result) {
        case CheckResult.BLOCKED:
          onPermissionBlocked()
          break
        case CheckResult.GRANTED:
          onPermissionGranted()
          break
        case CheckResult.DENIED:
          onPermissionDenied()
          break
        case CheckResult.UNAVAILABLE:
        default:
          onPermissionUnavailable()
          break
      }
    })
    .catch((_error) => {
      onPermissionUnavailable()
    })
}

const showPrompt = (promptProperties: PermissionDialogProps) => {
  Navigation.navigateToRoute(NavigableRoute.PermissionsDialog, promptProperties)
}

const permissionDialogPropsForPermission = (
  permission: Permission,
  stringSource: PermissionKeyMap,
  onPermissionGranted: () => void,
  onPermissionDenied: () => void,
): PermissionDialogProps => {
  const title = translate(stringSource[permission].title)
  const prompt = translate(stringSource[permission].prompt)
  switch (permission) {
    case Permission.Camera:
      return {
        title,
        prompt,
        localSVGSource: CameraOutline,
        onGranted: onPermissionGranted,
        onDenied: onPermissionDenied,
      }

    case Permission.Storage:
      return {
        title,
        prompt,
        localSVGSource: CameraOutline,
        onGranted: onPermissionGranted,
        onDenied: onPermissionDenied,
      }

    case Permission.PhotoGallery:
      return {
        title,
        prompt,
        localSVGSource: CameraOutline,
        onGranted: onPermissionGranted,
        onDenied: onPermissionDenied,
      }

    case Permission.LocationOnboarding:
    case Permission.LocationMeetup:
    case Permission.LocationUser:
    case Permission.LocationSearch:
      return createLocationPermissionProps(title, prompt, onPermissionGranted, onPermissionDenied)

    case Permission.Notification:
      return {
        title,
        prompt,
        localSVGSource: NotificationOutline,
        onGranted: onPermissionGranted,
        onDenied: onPermissionDenied,
      }

    default:
      throw new Error("Invalid permission requested")
  }
}

const createLocationPermissionProps = (
  title: string,
  prompt: string,
  onGranted: () => void,
  onDenied: () => void,
): PermissionDialogProps => {
  return {
    title,
    prompt,
    localSVGSource: LocationPinOutline,
    onGranted,
    onDenied,
  }
}
