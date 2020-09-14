import { Secrets } from "./secrets"
import * as Keychain from "react-native-keychain"

const accessGroup = "29DDGS5GDJ.com.nextmusic"

const mockedKeychain = Keychain as jest.Mocked<typeof Keychain>

afterEach(() => jest.clearAllMocks())

describe("set", () => {
  test("stores with Keychain", async () => {
    jest.spyOn(console, "info")
    expect(await Secrets.set("test_key", "test_value")).toEqual("test_value")
    expect(console.info).toHaveBeenCalledWith(
      expect.any(String),
      "Secrets#set",
      "test_key",
      "tes******lue",
    )
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith("secrets.test_key", "test_value", {
      service: "test_key",
      accessGroup,
    })
  })
  test("stores shorter value with Keychain", async () => {
    jest.spyOn(console, "info")
    expect(await Secrets.set("test_key", "test")).toEqual("test")
    expect(console.info).toHaveBeenCalledWith(expect.any(String), "Secrets#set", "test_key", "****")
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith("secrets.test_key", "test", {
      service: "test_key",
      accessGroup,
    })
  })
  test("throws an error on unsuccessful keychain storage", () => {
    // @ts-ignore
    Keychain.setGenericPassword.mockResolvedValue(false)
    expect(Secrets.set("test_key", "test_value")).rejects.toThrow()
  })
})

describe("get", () => {
  test("resolves with the value if known", () => {
    mockedKeychain.getGenericPassword.mockResolvedValue({
      service: "test_key",
      username: "test_user",
      password: "test_value",
    })
    return expect(
      Secrets.get("test_key").then(password => {
        expect(Keychain.getGenericPassword).toHaveBeenCalledWith({
          service: "test_key",
          accessGroup,
        })
        return password
      }),
    ).resolves.toEqual("test_value")
  })
  test("resolves to undefined if unknown", () => {
    mockedKeychain.getGenericPassword.mockResolvedValue(false)
    return expect(
      Secrets.get("test_key").then(password => {
        expect(Keychain.getGenericPassword).toHaveBeenCalledWith({
          service: "test_key",
          accessGroup,
        })
        return password
      }),
    ).resolves.toBeFalsy()
  })
})

describe("delete", () => {
  test("resolves if the key is not set", () => {
    expect(
      Secrets.delete("test_key").then(() => {
        expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({
          service: "test_key",
          accessGroup,
        })
      }),
    ).resolves.toBeUndefined()
  })
  test("resolves if the key is set", () => {
    Secrets.set("test_key", "test_value")
    expect(
      Secrets.delete("test_key").then(() => {
        expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({
          service: "test_key",
          accessGroup,
        })
      }),
    ).resolves.toBeUndefined()
  })
  test("throws error if unsuccessful credential delete", () => {
    // @ts-ignore
    Keychain.resetGenericPassword.mockResolvedValue(false)
    expect(Secrets.delete("test_key")).rejects.toThrow()
  })
})
