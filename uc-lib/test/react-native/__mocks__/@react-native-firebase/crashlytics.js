export default {
  crashlytics: jest.fn(() => ({
    log: jest.fn(),
  })),
}
