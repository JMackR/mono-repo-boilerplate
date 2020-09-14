module.exports = {
  displayName: "react-native",
  preset: "react-native",
  rootDir: "../../",

  transform: {
    "^.+\\.svg$": "<rootDir>/test/base-file-name-transformer.ts",
  },

  testPathIgnorePatterns: ["node_modules", "__snapshots__", "./test/react/*"],
  testMatch: ["<rootDir>/**/__tests__/*.native.test.*", "<rootDir>/**/__tests__/*.core.test.*"],

  setupFiles: ["./test/react-native/setupTests.js", "../node_modules/react-native-gesture-handler/jestSetup.js"],
  reporters: ["default", "jest-junit"],
}
