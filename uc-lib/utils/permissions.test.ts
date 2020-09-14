import { PermissionAuthOptions, Permissions } from "./permissions"
import { Permission, PERMISSIONS } from "react-native-permissions"
import { Alert, Linking } from "react-native"

const mockCheck = jest.fn()
const mockRequest = jest.fn()
jest.mock("react-native-permissions", () => {
  return {
    PERMISSIONS: {
      IOS: {
        CAMERA: "test-camera",
        CALENDARS: "test-calendars",
      },
    },
    check: (permission: Permission) => mockCheck(permission),
    request: (permission: Permission) => mockRequest(permission),
  }
})

const title = "test-title"
const description = "test-description"
let alert: jest.SpyInstance
beforeEach(() => (alert = jest.spyOn(Alert, "alert").mockImplementation()))

describe("showSettingsPrompt", () => {
  it("shows an alert", () => {
    Permissions.showSettingsPrompt({ title, description })
    expect(alert).toHaveBeenCalledWith(title, description, expect.any(Array), {
      cancelable: false,
    })
  })

  describe("interactions", () => {
    let onOpen: jest.MockedFunction<() => void>, onCancel: jest.MockedFunction<() => void>
    beforeEach(() => {
      onOpen = jest.fn()
      onCancel = jest.fn()
    })

    it("triggers the passed in onCancel if the cancel button is pressed", () => {
      alert.mockImplementation((title, description, options) => options[0].onPress())
      Permissions.showSettingsPrompt({ title, description, onOpen, onCancel })
      expect(onCancel).toHaveBeenCalled()
      expect(onOpen).not.toHaveBeenCalled()
    })

    describe("open settings", () => {
      let openSettings: jest.SpyInstance
      beforeEach(() => {
        openSettings = jest.spyOn(Linking, "openSettings").mockResolvedValue()
        alert.mockImplementation((title, description, options) => options[1].onPress())
      })

      it("opens the settings", () => {
        Permissions.showSettingsPrompt({ title, description })
        expect(openSettings).toHaveBeenCalled()
      })

      it("triggers the passed in onOpen if the open settings button is pressed", async () => {
        Permissions.showSettingsPrompt({ title, description, onOpen, onCancel })
        await Linking.openSettings()
        expect(onOpen).toHaveBeenCalled()
        expect(onCancel).not.toHaveBeenCalled()
      })
    })
  })
})

describe("authorize", () => {
  let params: PermissionAuthOptions
  let onFailure: jest.MockedFunction<() => void>
  beforeEach(() => {
    params = { permission: PERMISSIONS.IOS.CAMERA, onGranted: jest.fn() }
    onFailure = jest.fn()
    jest.spyOn(Permissions, "showSettingsPrompt").mockImplementation()
  })

  it("calls onGranted() if the permission has been granted", () => {
    mockCheck.mockResolvedValue("granted")
    return Permissions.authorize({ ...params, onFailure }).then(() => {
      expect(mockCheck).toHaveBeenCalledWith(params.permission)
      expect(mockRequest).not.toHaveBeenCalled()
      expect(params.onGranted).toHaveBeenCalled()
      expect(onFailure).not.toHaveBeenCalled()
      expect(Permissions.showSettingsPrompt).not.toHaveBeenCalled()
    })
  })

  describe("permission denied", () => {
    beforeEach(() => mockCheck.mockResolvedValue("denied"))

    it("requests the permission if it's been denied", () =>
      Permissions.authorize(params).then(() => {
        expect(mockCheck).toHaveBeenCalledWith(params.permission)
        expect(mockRequest).toHaveBeenCalledWith(params.permission)
        expect(params.onGranted).not.toHaveBeenCalled()
        expect(Permissions.showSettingsPrompt).not.toHaveBeenCalled()
      }))

    it("calls onGranted if the request is granted", () => {
      mockRequest.mockResolvedValue("granted")
      return Permissions.authorize(params).then(() => {
        expect(mockCheck).toHaveBeenCalledWith(params.permission)
        expect(mockRequest).toHaveBeenCalledWith(params.permission)
        expect(params.onGranted).toHaveBeenCalled()
        expect(Permissions.showSettingsPrompt).not.toHaveBeenCalled()
      })
    })

    it("calls onFailure if the request isn't granted", () => {
      mockRequest.mockResolvedValue("denied")
      return Permissions.authorize({ ...params, onFailure }).then(() => {
        expect(mockCheck).toHaveBeenCalledWith(params.permission)
        expect(mockRequest).toHaveBeenCalledWith(params.permission)
        expect(params.onGranted).not.toHaveBeenCalled()
        expect(onFailure).toHaveBeenCalled()
        expect(Permissions.showSettingsPrompt).not.toHaveBeenCalled()
      })
    })
  })

  describe("permission blocked", () => {
    beforeEach(() => mockCheck.mockResolvedValue("blocked"))

    it("does nothing if a title for the alert isn't passed", () => {
      expect(params.title).toBeUndefined()
      return Permissions.authorize(params).then(() => {
        expect(mockCheck).toHaveBeenCalledWith(params.permission)
        expect(mockRequest).not.toHaveBeenCalled()
        expect(params.onGranted).not.toHaveBeenCalled()
        expect(onFailure).not.toHaveBeenCalled()
        expect(Permissions.showSettingsPrompt).not.toHaveBeenCalled()
      })
    })

    it("does nothing if a description for the alert isn't passed", () => {
      expect(params.description).toBeUndefined()
      return Permissions.authorize(params).then(() => {
        expect(mockCheck).toHaveBeenCalledWith(params.permission)
        expect(mockRequest).not.toHaveBeenCalled()
        expect(params.onGranted).not.toHaveBeenCalled()
        expect(onFailure).not.toHaveBeenCalled()
        expect(Permissions.showSettingsPrompt).not.toHaveBeenCalled()
      })
    })

    it("shows the settings prompt if both title and description are defined", () =>
      Permissions.authorize({ ...params, title, description }).then(() => {
        expect(mockCheck).toHaveBeenCalledWith(params.permission)
        expect(mockRequest).not.toHaveBeenCalled()
        expect(params.onGranted).not.toHaveBeenCalled()
        expect(onFailure).not.toHaveBeenCalled()
        expect(Permissions.showSettingsPrompt).toHaveBeenCalledWith({
          title,
          description,
        })
      }))

    it("passes the onFailure callback to the settings prompt", () =>
      Permissions.authorize({ ...params, title, description, onFailure }).then(() => {
        expect(mockCheck).toHaveBeenCalledWith(params.permission)
        expect(mockRequest).not.toHaveBeenCalled()
        expect(params.onGranted).not.toHaveBeenCalled()
        expect(onFailure).not.toHaveBeenCalled()
        expect(Permissions.showSettingsPrompt).toHaveBeenCalledWith({
          title,
          description,
          onCancel: onFailure,
        })
      }))
  })

  describe("error", () => {
    beforeEach(() => mockCheck.mockImplementation(() => Promise.reject(new Error("Check failed"))))

    it("gracefully does nothing if an onFailure callback isn't passed in", () =>
      Permissions.authorize(params).then(() => {
        expect(mockCheck).toHaveBeenCalledWith(params.permission)
        expect(mockRequest).not.toHaveBeenCalled()
        expect(params.onGranted).not.toHaveBeenCalled()
        expect(Permissions.showSettingsPrompt).not.toHaveBeenCalled()
      }))

    it("calls the onFailure callback if it's passed in", () =>
      Permissions.authorize({ ...params, onFailure }).then(() => {
        expect(mockCheck).toHaveBeenCalledWith(params.permission)
        expect(mockRequest).not.toHaveBeenCalled()
        expect(params.onGranted).not.toHaveBeenCalled()
        expect(onFailure).toHaveBeenCalled()
        expect(Permissions.showSettingsPrompt).not.toHaveBeenCalled()
      }))
  })
})
