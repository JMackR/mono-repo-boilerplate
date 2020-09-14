export const ouMockPlatform = (mockPlatformName: "android" | "ios") => {
  beforeAll(() => {
    jest.mock("react-native/Libraries/Utilities/Platform", () => {
      const Platform = jest.requireActual("react-native/Libraries/Utilities/Platform")
      Platform.OS = mockPlatformName
      return Platform
    })
  })
}

export const ouResetPlatformMock = () => {
  afterAll(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })
}
