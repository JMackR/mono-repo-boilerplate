import { Permission } from "./permission"
import {
  check,
  RESULTS,
  // Permission,
  request,
  NotificationSettings,
  checkNotifications,
  requestNotifications,
  PermissionStatus,
} from "react-native-permissions"
import { PermissionConstants } from "./permission-constants"
import { CheckResult } from "./check-result"

/**
 * Adding permissions?
 *
 * Use https://github.com/react-native-community/react-native-permissions/blob/master/README.md for reference to constants for specific permissions
 * (These steps assume you are adding a permission for redibs, if using this for another app use the appropriate paths for corresponding files)
 *
 * 1. Add pod spec to redibs/ios/Podfile
 * 2. Add the reasoning strings to redibs/ios/Redibs/info.plist
 * 3. Add the permission to redibs/android/app/src/main/AndroidManifest.xml
 * 4. Add strings to translations-old for title, prompt, never ask again title, and never ask again prompt
 * 5. Add an entry to Permission for the new permission(s)
 * 6. Add constants to permission-constants.android.ts and permission-constants.ios.ts for the platform specific strings listed at the above link.
 *    Give those new constants the same name so that they can be referenced once and each platform will use the correct value
 * 7. Add the case for the new Permission to permissionConstantForEnum() to return the new constant.
 * 8. Map the new Permission(s) to title and prompt string keys added in step 4 to redibs/src/permissions/permission-strings.ts
 * 9. Create a configuration for the new Permission to redibs/src/permissions/permission-helper.ts permissionDialogPropsForPermission
 */

export const PermissionProvider = {
  checkPermission(permission: Permission): Promise<CheckResult> {
    if (permission === Permission.Notification) {
      return checkNotificationPermission()
    }

    const permissionToCheck = permissionConstantForEnum(permission)
    const checkPromise = new Promise<CheckResult>((resolve, reject) => {
      check(permissionToCheck)
        .then((result) => {
          switch (result) {
            case RESULTS.BLOCKED:
              resolve(CheckResult.BLOCKED)
              break
            case RESULTS.DENIED:
              resolve(CheckResult.DENIED)
              break
            case RESULTS.GRANTED:
              resolve(CheckResult.GRANTED)
              break
            case RESULTS.UNAVAILABLE:
            default:
              resolve(CheckResult.UNAVAILABLE)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })

    return checkPromise
  },

  requestPermission(permission: Permission): Promise<CheckResult> {
    if (permission === Permission.Notification) {
      return doRequestFullNotification()
    }

    const permissionToRequest = permissionConstantForEnum(permission)
    const requestPromise = new Promise<CheckResult>((resolve, reject) => {
      request(permissionToRequest)
        .then((result) => {
          switch (result) {
            case RESULTS.BLOCKED:
              resolve(CheckResult.BLOCKED)
              break
            case RESULTS.DENIED:
              resolve(CheckResult.DENIED)
              break
            case RESULTS.GRANTED:
              resolve(CheckResult.GRANTED)
              break
            case RESULTS.UNAVAILABLE:
            default:
              resolve(CheckResult.UNAVAILABLE)
              break
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
    return requestPromise
  },
}

const checkNotificationPermission = (): Promise<CheckResult> => {
  const checkPromise = new Promise<CheckResult>((resolve, reject) => {
    checkNotifications()
      .then(({ status }) => {
        switch (status) {
          case RESULTS.BLOCKED:
            resolve(CheckResult.BLOCKED)
            break
          case RESULTS.DENIED:
            resolve(CheckResult.DENIED)
            break
          case RESULTS.GRANTED:
            resolve(CheckResult.GRANTED)
            break
          case RESULTS.UNAVAILABLE:
          default:
            resolve(CheckResult.UNAVAILABLE)
            break
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
  return checkPromise
}

const doRequestFullNotification = (): Promise<CheckResult> => {
  const requestPromise = new Promise<CheckResult>((resolve, reject) => {
    requestNotifications(["alert", "sound", "badge"])
      .then(({ status }) => {
        switch (status) {
          case RESULTS.BLOCKED:
            resolve(CheckResult.BLOCKED)
            break
          case RESULTS.DENIED:
            resolve(CheckResult.DENIED)
            break
          case RESULTS.GRANTED:
            resolve(CheckResult.GRANTED)
            break
          case RESULTS.UNAVAILABLE:
          default:
            resolve(CheckResult.UNAVAILABLE)
            break
        }
      })
      .catch((error) => {
        console.log("unexpected notification error", error)
      })
  })
  return requestPromise
}

const permissionConstantForEnum = (ouPermission: Permission): Permission => {
  switch (ouPermission) {
    case Permission.Camera:
      return PermissionConstants.Camera

    case Permission.PhotoGallery:
      return PermissionConstants.PhotoGallery
    case Permission.Storage:
      return PermissionConstants.Storage

    // Multiple Location enums to allow for different prompt strings all map to one actual permission
    case Permission.LocationMeetup:
    case Permission.LocationPost:
    case Permission.LocationPrimer:
    case Permission.LocationSearch:
    case Permission.LocationUser:
      return PermissionConstants.Location

    case Permission.Notification:
      return PermissionConstants.Notification
  }
}
