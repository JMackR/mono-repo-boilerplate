module.exports = {
  coverageDirectory: "coverage",

  coverageReporters: [
    //   "json",
    "text",
    "html",
    //   "lcov",
    //   "clover"
  ],
  transformIgnorePatterns: ["/node_modules/"],
  rootDir: "../../",
  roots: ["<rootDir>", "<rootDir>/test/non-react"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsConfig: "./test/non-react/tsconfig.json",
      diagnostics: {
        warnOnly: true,
        ignoreCodes: [6133],
      },
    },
  },
  testMatch: ["<rootDir>/validators/__tests__/*.test.*", "<rootDir>/formatters/__tests__/*.test.*"],
  reporters: ["default", "jest-junit"],
}
