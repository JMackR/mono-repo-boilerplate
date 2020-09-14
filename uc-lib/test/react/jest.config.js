// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  displayName: "react",
  clearMocks: true,
  coverageDirectory: "coverage",

  coverageReporters: [
    //   "json",
    "text",
    "html",
    //   "lcov",
    //   "clover"
  ],
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsConfig: "./test/react/tsconfig.json",
    },
  },

  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  setupFiles: ["<rootDir>/test/react/setupTests.ts"],

  setupFilesAfterEnv: ["<rootDir>/test/react/jest.setup.ts"],

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.svg$": "<rootDir>/test/base-file-name-transformer.ts",
  },

  transformIgnorePatterns: ["/node_modules/"],
  rootDir: "../../",
  roots: ["<rootDir>", "<rootDir>/test/react"],
  testPathIgnorePatterns: ["__snapshots__"],
  testMatch: ["<rootDir>/**/__tests__/*.web.test.*", "<rootDir>/**/__tests__/*.core.test.*"],
  reporters: ["default", "jest-junit"],
}
