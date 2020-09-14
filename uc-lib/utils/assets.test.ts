import { PixelRatio } from "react-native"
import { cdnUrl } from "./assets"

describe("cdnUrl", () => {
  describe("@3x", () => {
    test("> 3", () => {
      jest.spyOn(PixelRatio, "get").mockReturnValue(6)
      expect(cdnUrl("test-path.png")).toEqual(
        "https://wrkshp-cdn.com/com.nextmusic/test-path@3x.png",
      )
    })
    test("=== 3", () => {
      jest.spyOn(PixelRatio, "get").mockReturnValue(3)
      expect(cdnUrl("test-path.png")).toEqual(
        "https://wrkshp-cdn.com/com.nextmusic/test-path@3x.png",
      )
    })
  })
  describe("@2x", () => {
    test("> 2", () => {
      jest.spyOn(PixelRatio, "get").mockReturnValue(2.5)
      expect(cdnUrl("test-path.png")).toEqual(
        "https://wrkshp-cdn.com/com.nextmusic/test-path@2x.png",
      )
    })
    test("=== 2", () => {
      jest.spyOn(PixelRatio, "get").mockReturnValue(2)
      expect(cdnUrl("test-path.png")).toEqual(
        "https://wrkshp-cdn.com/com.nextmusic/test-path@2x.png",
      )
    })
  })
  describe("@1x", () => {
    test("> 1", () => {
      jest.spyOn(PixelRatio, "get").mockReturnValue(1.5)
      expect(cdnUrl("test-path.png")).toEqual("https://wrkshp-cdn.com/com.nextmusic/test-path.png")
    })
    test("=== 1", () => {
      jest.spyOn(PixelRatio, "get").mockReturnValue(1)
      expect(cdnUrl("test-path.png")).toEqual("https://wrkshp-cdn.com/com.nextmusic/test-path.png")
    })
    test("< 1", () => {
      jest.spyOn(PixelRatio, "get").mockReturnValue(0.5)
      expect(cdnUrl("test-path.png")).toEqual("https://wrkshp-cdn.com/com.nextmusic/test-path.png")
    })
  })
})
