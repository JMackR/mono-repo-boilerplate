import AsyncStorage from "@react-native-community/async-storage"
import { load, loadString, save, saveString, clear, remove } from "./storage"

// fixtures
const VALUE_OBJECT = { x: 1 }
const VALUE_STRING = JSON.stringify(VALUE_OBJECT)

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>

beforeEach(() => {
  mockedAsyncStorage.getItem.mockReturnValue(Promise.resolve(VALUE_STRING))
  mockedAsyncStorage.setItem.mockReturnValue(Promise.resolve())
})

afterEach(() => jest.clearAllMocks())

describe("load", () => {
  test("succeeds", async () => {
    const value = await load("something")
    expect(value).toEqual(JSON.parse(VALUE_STRING))
  })
  test("succeeds w/ undefined value", async () => {
    // @ts-ignore
    AsyncStorage.getItem.mockReturnValue(Promise.resolve(undefined))
    const value = await load("something")
    expect(value).toEqual(null)
  })
  test("fails", async () => {
    // @ts-ignore
    AsyncStorage.getItem.mockRejectedValue(new Error())
    const value = await load("something")
    expect(value).toEqual(null)
  })
})

describe("loadString", () => {
  test("succeeds", async () => {
    const value = await loadString("something")
    expect(value).toEqual(VALUE_STRING)
  })
  test("fails", async () => {
    // @ts-ignore
    AsyncStorage.getItem.mockRejectedValue(new Error())
    const value = await loadString("something")
    expect(value).toEqual(null)
  })
})

describe("save", () => {
  test("succeeds", async () => {
    expect(await save("something", VALUE_OBJECT)).toBeTruthy()
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("something", VALUE_STRING)
  })
  test("fails", async () => {
    // @ts-ignore
    AsyncStorage.setItem.mockRejectedValue(new Error())
    expect(await save("something", VALUE_OBJECT)).toBeFalsy()
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("something", VALUE_STRING)
  })
})

describe("saveString", () => {
  test("succeeds", async () => {
    expect(await saveString("something", VALUE_STRING)).toBeTruthy()
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("something", VALUE_STRING)
  })
  test("fails", async () => {
    // @ts-ignore
    AsyncStorage.setItem.mockRejectedValue(new Error())
    expect(await saveString("something", VALUE_STRING)).toBeFalsy()
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("something", VALUE_STRING)
  })
})

test("remove", async () => {
  await remove("something")
  expect(AsyncStorage.removeItem).toHaveBeenCalledWith("something")
})

test("clear", async () => {
  await clear()
  expect(AsyncStorage.clear).toHaveBeenCalledWith()
})
