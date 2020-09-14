import Adapter from "enzyme-adapter-react-16"
import Enzyme from "enzyme"

import React from "react"

const mockUseEffect = jest.spyOn(React, "useEffect")
mockUseEffect.mockImplementationOnce(f => setImmediate(() => f()))

Enzyme.configure({ adapter: new Adapter() })

global.__DEV__ = false

import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock"
jest.mock("@react-native-community/async-storage", () => mockAsyncStorage)
jest.mock("react-native-localize", () => ({}))

import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock.js"

jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo)

jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"))

jest.mock("react-native-share", () => ({
  default: jest.fn(),
}))
