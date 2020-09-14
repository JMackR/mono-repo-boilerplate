import { Linking } from "react-native"
import { link } from "./link"

describe("link", () => {
  it("does not call openURL, resolves false, if canOpenURL false", () => {
    Linking.canOpenURL.mockResolvedValue(false)
    return expect(link("test_url")).resolves.toBeFalsy()
  })
  it("returns the promise from openURL if it can be opened", () => {
    Linking.canOpenURL.mockResolvedValue(true)
    return expect(link("test_url")).resolves.toEqual(Linking.openURL("test_url"))
  })
  it("resolves false if openURL throws an error", () => {
    Linking.canOpenURL.mockResolvedValue(true)
    Linking.openURL.mockImplementation(() => {
      throw new Error("failed")
    })
    return expect(link("test_url")).resolves.toBeFalsy()
  })
  describe("options", () => {
    describe("storyVideo", () => {
      it("links an MP4 externally by default", () => {
        return expect(link("test_url.mp4", { storyVideo: true })).resolves.toBeTruthy()
      })
      xtest("navigates to story modal if set, resolves true", () => {})
    })
  })
})
