import * as Keychain from "react-native-keychain"
import { load, reset, save } from "./keychain"

describe("save", () => {
  it("saves credentials when server is passed in", async () => {
    expect(save("test-username", "test-password", "test-server")).toBeTruthy()
    expect(Keychain.setInternetCredentials).toHaveBeenCalledWith(
      "test-server",
      "test-username",
      "test-password",
    )
  })
  it("handles undefined server", () => {
    expect(save("test-username", "test-password", undefined)).toBeTruthy()
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith("test-username", "test-password")
  })
  it("sets generic password when no server is passed in", () => {
    expect(save("test-username", "test-password")).toBeTruthy()
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith("test-username", "test-password")
  })
})

describe("load", () => {
  it("gets internet credentials when server is passed in", async () => {
    expect(await load("test-server")).toEqual({
      username: undefined,
      password: undefined,
      server: "test-server",
    })
    expect(Keychain.getInternetCredentials).toHaveBeenCalledWith("test-server")
  })
  it("handles undefined server", async () => {
    expect(await load()).toEqual({
      username: null,
      password: null,
      server: null,
    })
    expect(Keychain.getGenericPassword).toHaveBeenCalled()
  })
  it("handles scenario where generic password is not set", async () => {
    expect(await load()).toEqual({
      username: null,
      password: null,
      server: null,
    })
    expect(Keychain.getGenericPassword).toHaveBeenCalled()
  })
  it("handles scenario where generic password is set", async () => {
    // @ts-ignore
    Keychain.getGenericPassword.mockResolvedValue({
      username: "test-username",
      password: "test-password",
    })
    expect(await load()).toEqual({
      username: "test-username",
      password: "test-password",
      server: null,
    })
    expect(Keychain.getGenericPassword).toHaveBeenCalled()
  })
})

describe("reset", () => {
  it("resets credentials when server is passed in", async () => {
    expect(await reset("test-server")).toBeTruthy()
    expect(Keychain.resetInternetCredentials).toHaveBeenCalledWith("test-server")
  })
  it("resets generic password when no server is passed in", async () => {
    expect(await reset()).toBeTruthy()
    expect(Keychain.resetGenericPassword).toHaveBeenCalled()
  })
  it("handles an undefined server", async () => {
    expect(await reset(undefined)).toBeTruthy()
    expect(Keychain.resetGenericPassword).toHaveBeenCalled()
  })
})
