const RNKeychainManager = {
  SECURITY_LEVEL_ANY: "SECURITY_LEVEL_ANY",
  SECURITY_LEVEL_SECURE_SOFTWARE: "SECURITY_LEVEL_SECURE_SOFTWARE",
  SECURITY_LEVEL_SECURE_HARDWARE: "SECURITY_LEVEL_SECURE_HARDWARE",
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
}

export default RNKeychainManager
