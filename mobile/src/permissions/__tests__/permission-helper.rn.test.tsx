jest.mock("shared-lib/utilities/i18n/oui18n")
jest.mock("react-native-permissions")
jest.mock("shared-lib/utilities/permission/permission-provider")
jest.mock("../../navigation/navigation")
jest.mock("shared-lib/analytics/analytics-app")
jest.mock("shared-lib/analytics/analytics-auth")
jest.mock("shared-lib/analytics/analytics-debug")
jest.mock("shared-lib/analytics/analytics-event-logger.native")

import { PermissionHelper } from "../permission-helper"
import { Permission } from "shared-lib/utilities/permission/permission"
import { PermissionProvider } from "shared-lib/utilities/permission/permission-provider"
import { Navigation } from "../../navigation/navigation/navigation"
import { CommonNavs } from "../../navigation/navigation"
import { ouMockPlatform, ouResetPlatformMock } from "uc-lib/test/react-native/utility"
import * as RNPermissions from "react-native-permissions"
import { CheckResult } from "shared-lib/utilities/permission/check-result"

// Platform independent tests

describe("PermissionHelper platform independent flow tests", () => {
  test("Already granted permission calls onPermissionGranted", async () => {
    const navigationSpy = jest.spyOn(Navigation, "navigateToRoute")

    PermissionProvider.checkPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.GRANTED)
      })
    })

    const result = await PermissionHelper.checkAndRequestPermission(Permission.LocationOnboarding)
    expect(result).toBe(CheckResult.GRANTED)
    expect(navigationSpy).toBeCalledTimes(0)
  })

  test("Show prompt when permission is blocked - prompt denied", async () => {
    Navigation.navigateToRoute.mockImplementation((route, payload) => {
      payload.onDenied()
    })

    PermissionProvider.checkPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.BLOCKED)
      })
    })

    const result = await PermissionHelper.checkAndRequestPermission(Permission.Camera)
    expect(result).toBe(CheckResult.DENIED)
  })

  test("Show prompt when permission is blocked - prompt accepted launches settings", async () => {
    const settingsSpy = jest.spyOn(RNPermissions, "openSettings")

    Navigation.navigateToRoute.mockImplementation((route, payload) => {
      payload.onGranted()
    })

    PermissionProvider.checkPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.BLOCKED)
      })
    })

    const result = await PermissionHelper.checkAndRequestPermission(Permission.Camera)
    expect(result).toBe(CheckResult.DENIED)
    expect(settingsSpy).toBeCalledTimes(1)
  })

  test("Unavailable permission results in permission denied", async () => {
    CommonNavs.presentError.mockImplementation(() => {})

    PermissionProvider.checkPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.UNAVAILABLE)
      })
    })

    const result = await PermissionHelper.checkAndRequestPermission(Permission.Camera)
    expect(result).toBe(CheckResult.DENIED)
  })
})

// IOS tests
describe("PermissionHelper ios flow tests", () => {
  ouMockPlatform("ios")
  ouResetPlatformMock()

  test("Not granted permission calls Navigation.navigateToRoute", async () => {
    let promptCount = 0

    Navigation.navigateToRoute.mockImplementation((route, payload) => {
      promptCount++
      payload.onGranted()
    })
    PermissionProvider.checkPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    PermissionProvider.requestPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    //Don't worry about the result, the prompt being shown is the test
    await PermissionHelper.checkAndRequestPermission(Permission.Camera)
    expect(promptCount).toBe(1)
  })

  test("Show prompt then send request - prompt granted - permission granted", async () => {
    Navigation.navigateToRoute.mockImplementation((route, payload) => {
      payload.onGranted()
    })

    PermissionProvider.requestPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.GRANTED)
      })
    })

    PermissionProvider.checkPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    const result = await PermissionHelper.checkAndRequestPermission(Permission.Camera)
    expect(result).toBe(CheckResult.GRANTED)
  })

  test("Show prompt then send request - prompt granted - permission denied", async () => {
    Navigation.navigateToRoute.mockImplementation((route, payload) => {
      payload.onGranted()
    })

    PermissionProvider.requestPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    PermissionProvider.checkPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    const result = await PermissionHelper.checkAndRequestPermission(Permission.Camera)
    expect(result).toBe(CheckResult.DENIED)
  })

  test("Show prompt then send request - prompt denied", async () => {
    Navigation.navigateToRoute.mockImplementation((route, payload) => {
      payload.onDenied()
    })

    PermissionProvider.requestPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    PermissionProvider.checkPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    const result = await PermissionHelper.checkAndRequestPermission(Permission.Camera)
    expect(result).toBe(CheckResult.DENIED)
  })
})

// ANDROID TESTS

describe("PermissionHelper android flow tests", () => {
  ouMockPlatform("android")
  ouResetPlatformMock()
  test("Send request then show prompt - request granted", async () => {
    PermissionProvider.requestPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.GRANTED)
      })
    })

    PermissionProvider.checkPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    const result = await PermissionHelper.checkAndRequestPermission(Permission.Camera)
    expect(result).toBe(CheckResult.GRANTED)
  })

  test("Send request then show prompt - request denied - prompt denied", async () => {
    Navigation.navigateToRoute.mockImplementation((route, payload) => {
      payload.onDenied()
    })

    PermissionProvider.requestPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    PermissionProvider.checkPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    const result = await PermissionHelper.checkAndRequestPermission(Permission.Camera)
    expect(result).toBe(CheckResult.DENIED)
  })

  test("Send request then show prompt - request denied - prompt granted - request granted", async () => {
    let timesRequested = 0

    Navigation.navigateToRoute.mockImplementation((route, payload) => {
      payload.onGranted()
    })

    PermissionProvider.requestPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        if (timesRequested == 0) {
          timesRequested = 1
          resolve(CheckResult.DENIED)
        } else {
          resolve(CheckResult.GRANTED)
        }
      })
    })

    PermissionProvider.checkPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    const result = await PermissionHelper.checkAndRequestPermission(Permission.Camera)
    expect(result).toBe(CheckResult.GRANTED)
  })

  test("Send request then show prompt - request denied - prompt granted - request denied again - done", async () => {
    Navigation.navigateToRoute.mockImplementation((route, payload) => {
      payload.onGranted()
    })

    PermissionProvider.requestPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    PermissionProvider.checkPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    const result = await PermissionHelper.checkAndRequestPermission(Permission.Camera)
    expect(result).toBe(CheckResult.DENIED)
  })

  test("Send request then show prompt - request denied - prompt granted - request blocked - done", async () => {
    Navigation.navigateToRoute.mockImplementation((route, payload) => {
      payload.onGranted()
    })

    let timesRequested = 0
    PermissionProvider.requestPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        if (timesRequested == 0) {
          timesRequested = 1
          resolve(CheckResult.DENIED)
        } else {
          resolve(CheckResult.BLOCKED)
        }
      })
    })
    PermissionProvider.checkPermission.mockImplementation((permission: Permission) => {
      return new Promise<CheckResult>((resolve, reject) => {
        resolve(CheckResult.DENIED)
      })
    })

    const result = await PermissionHelper.checkAndRequestPermission(Permission.Camera)
    expect(result).toBe(CheckResult.DENIED)
  })
})
