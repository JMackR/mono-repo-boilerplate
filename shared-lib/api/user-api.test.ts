import { UserApi } from "./user-api"

const id = "test_user_id"

describe("getUser", () => {
  it("defaults no fields", () => {
    const request = UserApi.getUser(id)
    expect(request.method).toEqual("get")
    expect(request.endpoint).toEqual("/api/users/user/test_user_id")
    expect(request.query).toEqual({ q: "" })
  })
  it("includes fields", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const request = UserApi.getUser(id, ["profile", "parties"])
    expect(request.method).toEqual("get")
    expect(request.endpoint).toEqual("/api/users/user/test_user_id")
    expect(request.query).toEqual({ q: "parties,profile" })
  })
  it("adds authenticate for local user", () => {
    const request = UserApi.getUser("me", ["profile", "parties"])
    expect(request.method).toEqual("get")
    expect(request.endpoint).toEqual("/api/users/user/me")
    expect(request.query).toEqual({ q: "parties,profile" })
  })
})

describe("getLocalUser", () => {
  it("defaults no fields", () => {
    const request = UserApi.getLocalUser()
    expect(request.method).toEqual("get")
    expect(request.endpoint).toEqual("/api/users/user/me")
    expect(request.query).toEqual({ q: "" })
    expect(request.authenticate).toBeTruthy()
  })
  it("includes fields", () => {
    const request = UserApi.getLocalUser(["profile", "parties"])
    expect(request.method).toEqual("get")
    expect(request.endpoint).toEqual("/api/users/user/me")
    expect(request.query).toEqual({ q: "parties,profile" })
    expect(request.authenticate).toBeTruthy()
  })
  it("adds authenticate for local user", () => {
    const request = UserApi.getLocalUser(["profile", "parties"])
    expect(request.method).toEqual("get")
    expect(request.endpoint).toEqual("/api/users/user/me")
    expect(request.query).toEqual({ q: "parties,profile" })
    expect(request.authenticate).toBeTruthy()
  })
})

describe("updateProfileInfo", () => {
  test("defined", () => {
    const request = UserApi.updateProfileInfo("k1", "v1")
    expect(request.method).toEqual("put")
    expect(request.endpoint).toEqual("/api/users/user/me/profile/personal_info")
    expect(request.body).toEqual({ k1: "v1" })
    expect(request.authenticate).toBeTruthy()
  })
  test("undefined", () => {
    const request = UserApi.updateProfileInfo("test_key", undefined)
    expect(request.method).toEqual("delete")
    expect(request.endpoint).toEqual("/api/users/user/me/profile/personal_info")
    expect(request.query).toEqual({ keys: "test_key" })
    expect(request.authenticate).toBeTruthy()
  })
})

describe("updateLink", () => {
  test("defined", () => {
    const request = UserApi.updateLink("k1", "v1")
    expect(request.method).toEqual("put")
    expect(request.endpoint).toEqual("/api/users/user/me/profile/social_media")
    expect(request.body).toEqual({ k1: "v1" })
    expect(request.authenticate).toBeTruthy()
  })
  test("undefined", () => {
    const request = UserApi.updateLink("test_key", undefined)
    expect(request.method).toEqual("delete")
    expect(request.endpoint).toEqual("/api/users/user/me/profile/social_media")
    expect(request.query).toEqual({ keys: "test_key" })
    expect(request.authenticate).toBeTruthy()
  })
})

test("following", () => {
  const request = UserApi.following()
  expect(request.method).toEqual("get")
  expect(request.endpoint).toEqual("/api/users/user/me/following")
  expect(request.authenticate).toBeTruthy()
})

test("follow", () => {
  const request = UserApi.followUser("test-user-id")
  expect(request.method).toEqual("put")
  expect(request.endpoint).toEqual("/api/users/user/me/follow/test-user-id")
  expect(request.authenticate).toBeTruthy()
})

test("unfollow", () => {
  const request = UserApi.unfollowUser("test-user-id")
  expect(request.method).toEqual("delete")
  expect(request.endpoint).toEqual("/api/users/user/me/follow/test-user-id")
  expect(request.authenticate).toBeTruthy()
})

test("setFullName", () => {
  const request = UserApi.setFullName("test-user-id", "ABC")
  expect(request.method).toEqual("put")
  expect(request.endpoint).toEqual("/api/users/user/test-user-id")
  expect(request.body).toEqual({ full_name: "ABC" })
  expect(request.authenticate).toBeTruthy()
})

test("setName", () => {
  const request = UserApi.setName("test-user-id", "ABC")
  expect(request.method).toEqual("put")
  expect(request.endpoint).toEqual("/api/users/user/test-user-id")
  expect(request.body).toEqual({ login: "ABC" })
  expect(request.authenticate).toBeTruthy()
})
